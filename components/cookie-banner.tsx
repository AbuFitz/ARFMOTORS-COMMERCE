"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "cookie-consent";
/** Fire this event (e.g. from the footer) to reopen the cookie settings. */
export const OPEN_COOKIE_SETTINGS = "open-cookie-settings";

interface Consent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

function saveConsent(analytics: boolean, marketing: boolean) {
  const consent: Consent = { necessary: true, analytics, marketing, timestamp: new Date().toISOString() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Storage blocked: the choice still applies for this visit
  }
  initializeTracking(analytics, marketing);
}

// Loads analytics and marketing tags for the categories the visitor allowed.
// Guarded so a tag is only ever added once per page load.
const loaded = { analytics: false, marketing: false };

function initializeTracking(analytics: boolean, marketing: boolean) {
  if (typeof window === "undefined") return;
  analytics = analytics && !loaded.analytics;
  marketing = marketing && !loaded.marketing;
  if (analytics) loaded.analytics = true;
  if (marketing) loaded.marketing = true;

  // Google Analytics 4 (GA4)
  if (analytics && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    // Load GA4 script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag("config", gaId);

  }

  // Facebook Pixel
  if (marketing && process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID) {
    const fbPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

    // Load Facebook Pixel
    (function(f: any, b: any, e: any, v: any) {
      if (f.fbq) return;
      const n: any = f.fbq = function(...args: any[]) {
        n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      const t = b.createElement(e);
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );

    (window as any).fbq("init", fbPixelId);
    (window as any).fbq("track", "PageView");

  }

  // TikTok Pixel
  if (marketing && process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID) {
    const ttPixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

    // Load TikTok Pixel
    (function(w: any, d: any, t: string) {
      w.TiktokAnalyticsObject = t;
      const ttq: any = (w[t] = w[t] || []);
      ttq.methods = [
        "page",
        "track",
        "identify",
        "instances",
        "debug",
        "on",
        "off",
        "once",
        "ready",
        "alias",
        "group",
        "enableCookie",
        "disableCookie",
      ];
      ttq.setAndDefer = function(t: any, e: any) {
        t[e] = function() {
          t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
        };
      };
      for (let i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.instance = function(t: any) {
        const e = ttq._i[t] || [];
        for (let n = 0; n < ttq.methods.length; n++)
          ttq.setAndDefer(e, ttq.methods[n]);
        return e;
      };
      ttq.load = function(e: any, n: any) {
        const i = "https://analytics.tiktok.com/i18n/pixel/events.js";
        ttq._i = ttq._i || {};
        ttq._i[e] = [];
        ttq._i[e]._u = i;
        ttq._t = ttq._t || {};
        ttq._t[e] = +new Date();
        ttq._o = ttq._o || {};
        ttq._o[e] = n || {};
        const o = document.createElement("script");
        o.type = "text/javascript";
        o.async = true;
        o.src = i + "?sdkid=" + e + "&lib=" + t;
        const a = document.getElementsByTagName("script")[0];
        if (a.parentNode) a.parentNode.insertBefore(o, a);
      };

      ttq.load(ttPixelId);
      ttq.page();
    })(window, document, "ttq");

  }
}

function Toggle({ checked, onChange, disabled, label }: { checked: boolean; onChange?: (v: boolean) => void; disabled?: boolean; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors",
        checked ? "bg-neutral-900" : "bg-neutral-300",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <span className={cn("inline-block h-5 w-5 rounded-full bg-white shadow transition-transform", checked ? "translate-x-[22px]" : "translate-x-0.5")} />
    </button>
  );
}

const CATEGORIES = [
  { key: "necessary", title: "Necessary", text: "Keep the site working: your cart, wishlist and checkout. Always on." },
  { key: "analytics", title: "Analytics", text: "Help us understand which pages are useful so we can improve the site." },
  { key: "marketing", title: "Marketing", text: "Measure our adverts and show you relevant ones on other sites." },
] as const;

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [manage, setManage] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    const consent = readConsent();
    if (consent) {
      // Returning visitor: apply their earlier choice
      initializeTracking(consent.analytics, consent.marketing);
      setPrefs({ analytics: consent.analytics, marketing: consent.marketing });
    } else {
      const t = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const reopen = () => {
      const consent = readConsent();
      if (consent) setPrefs({ analytics: consent.analytics, marketing: consent.marketing });
      setManage(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen);
  }, []);

  const decide = (analytics: boolean, marketing: boolean) => {
    saveConsent(analytics, marketing);
    setOpen(false);
    setManage(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie preferences"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-3 bottom-3 z-[65] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[400px]"
        >
          <div className="max-h-[85dvh] overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xl">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100">
                <Cookie className="h-[18px] w-[18px] text-primary-500" />
              </span>
              <h2 className="font-display text-base font-semibold text-neutral-900">{manage ? "Cookie settings" : "Cookies on ARF Commerce"}</h2>
            </div>

            {!manage ? (
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                We use necessary cookies to run the site. With your permission we&apos;d also like to use analytics and
                marketing cookies. See our{" "}
                <Link href="/privacy" className="font-medium text-neutral-900 underline underline-offset-2">
                  privacy policy
                </Link>
                .
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {CATEGORIES.map((c) => (
                  <li key={c.key} className="flex items-start justify-between gap-4 rounded-xl bg-neutral-50 p-3.5">
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{c.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-neutral-600">{c.text}</p>
                    </div>
                    {c.key === "necessary" ? (
                      <Toggle checked disabled label="Necessary cookies (always on)" />
                    ) : (
                      <Toggle checked={prefs[c.key]} onChange={(v) => setPrefs((p) => ({ ...p, [c.key]: v }))} label={`${c.title} cookies`} />
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <button type="button" onClick={() => decide(false, false)} className="rounded-full border border-neutral-900 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100">
                Reject all
              </button>
              <button type="button" onClick={() => decide(true, true)} className="rounded-full bg-neutral-900 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800">
                Accept all
              </button>
            </div>
            {manage ? (
              <button type="button" onClick={() => decide(prefs.analytics, prefs.marketing)} className="mt-2.5 w-full rounded-full bg-primary-500 py-2.5 text-sm font-semibold text-white hover:bg-primary-600">
                Save my choices
              </button>
            ) : (
              <button type="button" onClick={() => setManage(true)} className="mt-3 w-full text-center text-sm font-medium text-neutral-600 underline underline-offset-2 hover:text-neutral-900">
                Manage cookies
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
