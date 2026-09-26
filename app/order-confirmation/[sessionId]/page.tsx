import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Package, Mail, ArrowRight, Clock } from "lucide-react";
import { getStripe } from "@/lib/stripe";

async function getOrderFromSession(sessionId: string) {
  const stripe = getStripe();
  if (!stripe) return null;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
    return session;
  } catch {
    return null;
  }
}

interface PageProps {
  params: { sessionId: string };
}

export default async function OrderConfirmationPage({ params }: PageProps) {
  const session = await getOrderFromSession(params.sessionId);

  if (!session || session.payment_status !== "paid") {
    redirect("/shop");
  }

  const orderNumber = session.metadata?.orderNumber || "—";
  const customerEmail = session.customer_details?.email || session.customer_email || "";
  const customerName = session.customer_details?.name || "";
  const deliveryMessage = session.metadata?.deliveryMessage || "5-7 business days";
  const fittingRequested = Boolean(session.metadata?.fittingPostcode);

  return (
    <div className="min-h-screen bg-neutral-50 py-16">
      <div className="mx-auto max-w-2xl px-6">
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="font-display text-4xl font-bold text-neutral-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-neutral-600 text-lg">
            Thank you{customerName ? `, ${customerName.split(" ")[0]}` : ""}. Your order has been placed.
          </p>
        </div>

        {/* Order Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden mb-6">
          {/* Order number */}
          <div className="bg-neutral-900 px-6 py-4">
            <p className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Order Number</p>
            <p className="font-mono text-2xl font-bold text-white">{orderNumber}</p>
          </div>

          <div className="p-6 space-y-4">
            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-neutral-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-neutral-900 text-sm">Confirmation email sent</p>
                <p className="text-sm text-neutral-600">
                  We've sent your order confirmation to{" "}
                  <span className="font-medium">{customerEmail}</span>
                </p>
              </div>
            </div>

            {/* Delivery */}
            <div className="flex items-start gap-3">
              <Package className="h-5 w-5 text-neutral-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-neutral-900 text-sm">Estimated delivery</p>
                <p className="text-sm text-neutral-600">{deliveryMessage}</p>
              </div>
            </div>

            {/* What happens next */}
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-neutral-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-neutral-900 text-sm">What happens next?</p>
                <ol className="mt-2 space-y-1 text-sm text-neutral-600 list-decimal list-inside">
                  <li>We prepare and pack your order</li>
                  <li>You receive a dispatch email with tracking</li>
                  <li>Your parts arrive at the delivery address</li>
                  {fittingRequested && (
                    <li>FixNow Mechanics contacts you to confirm your fitting price and book a time</li>
                  )}
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Items */}
        {session.line_items?.data && session.line_items.data.length > 0 && (
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
            <h2 className="font-semibold text-neutral-900 mb-4">Items Ordered</h2>
            <div className="space-y-3">
              {session.line_items.data.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-neutral-700">
                    {item.description} × {item.quantity}
                  </span>
                  <span className="font-medium text-neutral-900">
                    £{((item.amount_total ?? 0) / 100).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-neutral-200 mt-4 pt-4 flex justify-between">
              <span className="font-bold text-neutral-900">Total Paid</span>
              <span className="font-bold text-neutral-900">
                £{((session.amount_total ?? 0) / 100).toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/track-order?order=${orderNumber}`}
            className="flex-1 flex items-center justify-center gap-2 bg-neutral-900 text-white py-3 rounded-xl font-semibold hover:bg-neutral-800 transition-colors text-sm"
          >
            Track Order
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/shop"
            className="flex-1 flex items-center justify-center gap-2 border-2 border-neutral-200 text-neutral-700 py-3 rounded-xl font-semibold hover:border-neutral-400 transition-colors text-sm"
          >
            Continue Shopping
          </Link>
        </div>

        <p className="text-center text-xs text-neutral-500 mt-6">
          Questions? Email{" "}
          <a href="mailto:support@arfmotors.co.uk" className="underline hover:text-neutral-700">
            support@arfmotors.co.uk
          </a>
          {" "}or use our{" "}
          <Link href="/contact" className="underline hover:text-neutral-700">
            contact form
          </Link>
        </p>
      </div>
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: "Order Confirmed | ARF Motors",
    robots: "noindex",
  };
}
