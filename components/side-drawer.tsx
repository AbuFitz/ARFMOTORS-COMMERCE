"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  /** Sticky area under the scrolling content, e.g. totals and checkout button */
  footer?: React.ReactNode;
}

/**
 * A bottom sheet on mobile (slides up, capped height) and a full-height
 * right-hand panel from lg up. Traps focus while open, closes on Escape or
 * a tap outside, locks page scroll, and returns focus to whatever opened it.
 */
export function SideDrawer({ open, onClose, title, children, footer }: SideDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  // Inert while closed, so the off-screen panel isn't reachable by Tab
  useEffect(() => {
    const el = panelRef.current as (HTMLDivElement & { inert: boolean }) | null;
    if (el) el.inert = !open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement;
    const focusable = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => focusable()[0]?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus();
    };
  }, [open, onClose]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[70] bg-neutral-950/50 transition-opacity duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "fixed z-[71] flex flex-col bg-white transition-transform duration-300 ease-out",
          "bottom-0 left-0 right-0 max-h-[85dvh] rounded-t-2xl",
          "lg:bottom-0 lg:left-auto lg:right-0 lg:top-0 lg:max-h-none lg:w-full lg:max-w-[440px] lg:rounded-none",
          open ? "translate-y-0 shadow-2xl lg:translate-x-0" : "translate-y-full lg:translate-x-full lg:translate-y-0"
        )}
      >
        <div aria-hidden="true" className="flex shrink-0 justify-center pb-1 pt-2.5 lg:hidden">
          <span className="h-1 w-9 rounded-full bg-neutral-300" />
        </div>
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 px-5 lg:h-16">
          <h2 className="font-display text-base font-semibold text-neutral-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title.toLowerCase()}`}
            className="-mr-2.5 flex h-11 w-11 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
        {footer && <div className="shrink-0 border-t border-neutral-200 p-5">{footer}</div>}
      </div>
    </>
  );
}
