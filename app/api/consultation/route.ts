import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { saveConsultationLead } from "@/lib/blog/store";
import { escapeHtml } from "@/lib/escape";
import { sendMail } from "@/lib/mail";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const preferredDate = String(body.preferredDate || "").trim();
    const timezone = String(body.timezone || "").trim();
    const notes = String(body.notes || "").trim();
    const bookingUrl = String(body.bookingUrl || "").trim();
    const service = String(body.service || "").trim();

    if (!name || !email || !phone) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 },
      );
    }

    const lead = {
      id: randomUUID(),
      type: "consultation",
      name,
      email,
      phone,
      preferredDate,
      timezone,
      notes,
      bookingUrl,
      service,
      source: body.source || "consultation-modal",
      createdAt: new Date().toISOString(),
    };

    await saveConsultationLead(lead);
    await sendMail({
      subject: `Consultation request from ${name}`,
      replyTo: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Preferred date: ${preferredDate || "-"}`,
        `Timezone: ${timezone || "-"}`,
        `Service: ${service || "-"}`,
        `Booking URL: ${bookingUrl || "-"}`,
        "",
        notes,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1a1035">
          <h2 style="margin:0 0 12px">Consultation request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Preferred date:</strong> ${preferredDate || "-"}</p>
          <p><strong>Timezone:</strong> ${timezone || "-"}</p>
          <p><strong>Service:</strong> ${service || "-"}</p>
          <p><strong>Booking URL:</strong> ${bookingUrl || "-"}</p>
          <div style="margin-top:16px;padding:16px;border-left:4px solid #c9910d;background:#fff8e6">
            ${escapeHtml(notes).replace(/\n/g, "<br />")}
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      ok: true,
      message:
        "Thanks, we received your consultation request. You can also pick a free slot on the booking page.",
    });
  } catch (error) {
    console.error("Consultation form error", error);
    return NextResponse.json(
      { ok: false, error: "Unable to submit the consultation request." },
      { status: 500 },
    );
  }
}
