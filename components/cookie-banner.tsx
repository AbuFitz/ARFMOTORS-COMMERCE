"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie, Settings } from "lucide-react";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after 1 second
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookie-consent", JSON.stringify(consent));

    // Initialize tracking scripts
    initializeTracking(true, true);

    setShowBanner(false);
  };

  const rejectAll = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookie-consent", JSON.stringify(consent));
    setShowBanner(false);
  };

  const savePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookie-consent", JSON.stringify(consent));

    // Initialize tracking based on preferences
    initializeTracking(preferences.analytics, preferences.marketing);

    setShowBanner(false);
    setShowSettings(false);
  };

  const initializeTracking = (analytics: boolean, marketing: boolean) => {
    if (typeof window === "undefined") return;

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

      console.log("✓ Google Analytics enabled");
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

      console.log("✓ Facebook Pixel enabled");
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

      console.log("✓ TikTok Pixel enabled");
    }
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      >
        <div className="mx-auto max-w-7xl">
          <div className="bg-white border-2 border-neutral-900 rounded-2xl shadow-2xl overflow-hidden">
            {!showSettings ? (
              // Main Banner
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Cookie className="h-8 w-8 text-primary-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                      We Value Your Privacy
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                      We use cookies to improve your browsing experience, show personalized content, analyze site traffic, and understand where our visitors are coming from. By clicking "Accept All", you consent to our use of cookies.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={acceptAll}
                        className="bg-neutral-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-500 transition-colors"
                      >
                        Accept All
                      </button>
                      <button
                        onClick={rejectAll}
                        className="bg-neutral-100 text-neutral-900 px-6 py-3 rounded-lg font-bold hover:bg-neutral-200 transition-colors"
                      >
                        Reject All
                      </button>
                      <button
                        onClick={() => setShowSettings(true)}
                        className="flex items-center gap-2 bg-white border-2 border-neutral-900 text-neutral-900 px-6 py-3 rounded-lg font-bold hover:bg-neutral-50 transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        Customize
                      </button>
                    </div>
                    <p className="text-xs text-neutral-500 mt-3">
                      Read our{" "}
                      <a href="/privacy" className="underline hover:text-primary-500">
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a href="/terms" className="underline hover:text-primary-500">
                        Terms & Conditions
                      </a>
                    </p>
                  </div>
                  <button
                    onClick={rejectAll}
                    className="flex-shrink-0 text-neutral-400 hover:text-neutral-900"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
            ) : (
              // Settings Panel
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                      Cookie Preferences
                    </h3>
                    <p className="text-sm text-neutral-600">
                      Choose which cookies you want to allow
                    </p>
                  </div>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-neutral-400 hover:text-neutral-900"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Necessary Cookies */}
                  <div className="flex items-start justify-between p-4 bg-neutral-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-bold text-neutral-900 mb-1">
                        Necessary Cookies
                      </h4>
                      <p className="text-sm text-neutral-600">
                        Required for the website to function. Cannot be disabled.
                      </p>
                    </div>
                    <div className="ml-4">
                      <input
                        type="checkbox"
                        checked={true}
                        disabled
                        className="w-5 h-5 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start justify-between p-4 bg-neutral-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-bold text-neutral-900 mb-1">
                        Analytics Cookies
                      </h4>
                      <p className="text-sm text-neutral-600">
                        Help us understand how visitors interact with our website.
                      </p>
                    </div>
                    <div className="ml-4">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) =>
                          setPreferences({ ...preferences, analytics: e.target.checked })
                        }
                        className="w-5 h-5 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-start justify-between p-4 bg-neutral-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-bold text-neutral-900 mb-1">
                        Marketing Cookies
                      </h4>
                      <p className="text-sm text-neutral-600">
                        Used to show you relevant ads and track campaign performance.
                      </p>
                    </div>
                    <div className="ml-4">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) =>
                          setPreferences({ ...preferences, marketing: e.target.checked })
                        }
                        className="w-5 h-5 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={savePreferences}
                    className="flex-1 bg-neutral-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-500 transition-colors"
                  >
                    Save Preferences
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-6 py-3 text-neutral-600 hover:text-neutral-900 font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
