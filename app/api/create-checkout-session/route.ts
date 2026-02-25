import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2024-06-20",
    })
  : null;

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured on the server." },
      { status: 500 }
    );
  }

  let amount: number | undefined;

  try {
    const body = await req.json();
    amount = Number(body?.amount);
  } catch {
    // ignore, will be validated below
  }

  // Amount is expected in cents (e.g. 500 = $5.00)
  if (!amount || !Number.isFinite(amount) || amount < 100) {
    return NextResponse.json(
      { error: "Invalid donation amount." },
      { status: 400 }
    );
  }

  const origin =
    process.env.NEXT_PUBLIC_APP_URL ||
    req.headers.get("origin") ||
    "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Donation to 365Academy",
            },
            unit_amount: Math.round(amount),
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/donate?status=success`,
      cancel_url: `${origin}/donate?status=cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe Checkout session", error);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}

