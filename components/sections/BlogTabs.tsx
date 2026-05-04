"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/blog/types";
import { blogCategories } from "@/lib/blog/types";
import { ArrowUpRight } from "lucide-react";

export function BlogTabs({ posts }: { posts: BlogPost[] }) {
  return (
    <Tabs.Root defaultValue="All" className="mt-6">
      {/* --- RESPONSIVE MINIMALIST TABS --- */}
      <div className="sticky top-[80px] z-30 flex justify-center w-full px-4">
        <Tabs.List className="flex items-center gap-1 p-1 rounded-full max-w-full overflow-x-auto no-scrollbar border-[var(--border-soft)] bg-[var(--bg-app)]/60 backdrop-blur-xl shadow-sm">
          {blogCategories.map((category) => (
            <Tabs.Trigger
              key={category}
              value={category}
              className=" group relative px-5 py-2 cursor-none rounded whitespace-nowrap text-[10px] uppercase tracking-[0.15em] transition-all duration-300 text-[var(--text-muted)] hover:text-[var(--text-primary)] data-[state=active]:text-[var(--gold-warm)] "
            >
              {/* Label */}
              <span className="relative z-10">{category}</span>

              {/* Active Pill Background */}
              <div
                className="
          absolute inset-0 z-0 scale-90 opacity-0 rounded-full 
          bg-[var(--gold-warm)]/[0.08] transition-all duration-300 
          group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100"
              />

              {/* Active Dot indicator */}
              <div
                className="
          absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px]  
          bg-[var(--gold-warm)] opacity-0 transition-all duration-300
          group-data-[state=active]:bottom-1 group-data-[state=active]:opacity-100"
              />
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </div>

      {blogCategories.map((category) => {
        const filteredPosts =
          category === "All"
            ? posts
            : posts.filter((post) => post.category === category);

        return (
          <Tabs.Content
            key={category}
            value={category}
            className="mt-8 outline-none"
          >
            <div className="grid gap-x-10 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-[var(--border-soft)] bg-[var(--bg-panel)]">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-5xl opacity-20">
                        {post.icon}
                      </div>
                    )}

                    {/* Floating Category Label */}
                    <div className="absolute left-4 top-4">
                      <span className="bg-[var(--bg-app)]/90 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-[var(--gold-warm)] backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="mt-8 flex flex-1 flex-col">
                    <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-widest text-[var(--text-muted)]">
                      <span>{post.date}</span>
                      <span className="h-px w-4 bg-[var(--border-soft)]" />
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--gold-warm)]">
                      {post.title}
                    </h2>

                    <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {post.excerpt}
                    </p>

                    {/* Minimal Footer */}
                    <div className="mt-auto pt-6">
                      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[var(--gold-warm)]">
                        View Entry{" "}
                        <ArrowUpRight
                          size={12}
                          className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
}
