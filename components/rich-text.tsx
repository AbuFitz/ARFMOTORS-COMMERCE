import Link from "next/link";
import { Fragment } from "react";

/** Renders text with [link](/url) and **bold** markup. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, href] = link;
          const external = /^https?:\/\//.test(href);
          return external ? (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-neutral-900 underline decoration-primary-500 underline-offset-2 hover:text-primary-600">
              {label}
            </a>
          ) : (
            <Link key={i} href={href} className="font-medium text-neutral-900 underline decoration-primary-500 underline-offset-2 hover:text-primary-600">
              {label}
            </Link>
          );
        }
        const bold = part.match(/^\*\*([^*]+)\*\*$/);
        if (bold) return <strong key={i} className="font-semibold text-neutral-900">{bold[1]}</strong>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

export function plainText(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "");
}
