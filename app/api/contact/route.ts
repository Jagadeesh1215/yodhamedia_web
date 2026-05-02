import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { saveContactLead } from "@/lib/blog/store";
import { escapeHtml } from "@/lib/escape";
import { sendMail } from "@/lib/mail";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const company = String(body.company || "").trim();
    const service = String(body.service || "").trim();
    const budget = String(body.budget || "").trim();
    const message = String(body.message || "").trim();
    const honeypot = String(body.website || "").trim();

    if (honeypot) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 },
      );
    }

    const lead = {
      id: randomUUID(),
      type: "contact",
      name,
      email,
      phone,
      company,
      service,
      budget,
      message,
      source: body.source || "contact-page",
      pageUrl: body.pageUrl || null,
      createdAt: new Date().toISOString(),
    };

    await saveContactLead(lead);
    await sendMail({
      subject: `New contact request from ${name}`,
      replyTo: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Company: ${company || "-"}`,
        `Service: ${service || "-"}`,
        `Budget: ${budget || "-"}`,
        "",
        message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1a1035">
          <h2 style="margin:0 0 12px">New contact request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Company:</strong> ${company || "-"}</p>
          <p><strong>Service:</strong> ${service || "-"}</p>
          <p><strong>Budget:</strong> ${budget || "-"}</p>
          <div style="margin-top:16px;padding:16px;border-left:4px solid #c9910d;background:#fff8e6">
            ${escapeHtml(message).replace(/\n/g, "<br />")}
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      ok: true,
      message: "We received your request and will reply shortly.",
    });
  } catch (error) {
    console.error("Contact form error", error);
    return NextResponse.json(
      { ok: false, error: "Unable to submit the form right now." },
      { status: 500 },
    );
  }
}
