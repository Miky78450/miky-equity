import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/mdx/Callout";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-headline-lg text-foreground mt-12 mb-8 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-headline-md text-foreground border-gold/20 mt-10 mb-6 border-b pb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-body-lg text-foreground mt-8 mb-4 font-semibold">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-body-md text-muted-foreground mb-5 leading-relaxed">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="text-body-md text-muted-foreground marker:text-gold mb-5 list-disc space-y-2 pl-6">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="text-body-md text-muted-foreground marker:text-gold mb-5 list-decimal space-y-2 pl-6">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-gold text-muted-foreground my-6 border-l-2 pl-6 italic">
        {children}
      </blockquote>
    ),
    strong: ({ children }) => (
      <strong className="text-foreground font-semibold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="text-muted-foreground italic">{children}</em>
    ),
    hr: () => <hr className="border-border my-10" />,
    code: ({ children }) => (
      <code className="text-gold rounded bg-white/5 px-1.5 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="text-foreground mb-6 overflow-x-auto rounded border border-white/10 bg-white/5 p-4 font-mono text-sm">
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className="mb-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="border-gold/30 border-b">{children}</thead>
    ),
    th: ({ children }) => (
      <th className="text-label-caps text-gold px-4 py-3 text-left font-medium">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="text-muted-foreground border-b border-white/5 px-4 py-3">
        {children}
      </td>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-gold hover:text-gold/70 underline underline-offset-4 transition-colors"
      >
        {children}
      </a>
    ),
    Callout,
    ...components,
  };
}
