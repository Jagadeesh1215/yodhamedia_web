"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import { categories, blogPosts } from "@/lib/constants/blog";

export function BlogTabs() {
  return (
    <Tabs.Root defaultValue="All" className="mt-10">
      <Tabs.List className="sticky top-20 z-20 flex gap-5 overflow-x-auto border-b border-[var(--border-soft)] bg-[var(--bg-frost)] py-3 backdrop-blur">
        {categories.map((category) => (
          <Tabs.Trigger
            key={category}
            value={category}
            className="whitespace-nowrap border-b-2 border-transparent px-1 pb-3 font-heading text-sm font-semibold text-[var(--text-secondary)] transition data-[state=active]:border-gold-warm data-[state=active]:text-gold-warm"
          >
            {category}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {categories.map((category) => {
        const posts = category === "All" ? blogPosts : blogPosts.filter((post) => post.category === category);
        return (
          <Tabs.Content key={category} value={category} className="mt-10">
            <div className="grid gap-6 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="panel group overflow-hidden transition hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-card)]">
                  <div className="relative flex h-52 items-center justify-center bg-gradient-to-br from-purple-deep to-purple-vivid text-7xl transition group-hover:brightness-110">
                    {post.icon}
                    <span className="absolute left-4 top-4 rounded-full bg-gold-warm px-3 py-1 font-label text-[11px] uppercase tracking-wider text-white">{post.category}</span>
                  </div>
                  <div className="p-6">
                    <p className="font-body text-xs text-[var(--text-secondary)]">{post.date} | {post.readTime}</p>
                    <h2 className="mt-3 font-heading text-xl font-semibold text-[var(--text-primary)]">{post.title}</h2>
                    <p className="mt-3 font-body text-sm leading-7 text-[var(--text-secondary)]">{post.excerpt}</p>
                    <span className="mt-5 inline-flex font-heading text-sm font-semibold text-gold-warm">Read More {"->"}</span>
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
