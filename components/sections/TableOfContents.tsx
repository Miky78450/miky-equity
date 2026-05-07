"use client";

import { useEffect, useRef, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const article = document.getElementById("article-content");
    if (!article) return;

    // Collect h2 and h3 headings
    const nodes = Array.from(article.querySelectorAll("h2, h3"));
    const extracted: Heading[] = nodes.map((el) => {
      const text = el.textContent ?? "";
      const id = slugify(text);
      el.id = id; // Assign id for scrollspy
      return { id, text, level: el.tagName === "H2" ? 2 : 3 };
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(extracted);

    // IntersectionObserver for active highlight
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0 }
    );

    nodes.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table des matières"
      className="sticky top-28 hidden xl:block"
    >
      <p className="text-label-caps text-muted-foreground mb-4">
        TABLE DES MATIÈRES
      </p>
      <ul className="space-y-1" role="list">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(h.id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className={[
                "block py-1 text-[11px] leading-snug transition-colors duration-150",
                h.level === 3 ? "pl-3" : "",
                activeId === h.id
                  ? "text-gold"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
              aria-current={activeId === h.id ? "location" : undefined}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
