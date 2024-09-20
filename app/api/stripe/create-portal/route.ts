import { NextResponse } from 'next/server';
import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  console.log("API route /api/stripe/create-portal hit");
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userSubscription = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.userId, userId),
    });

    let customer;
    if (userSubscription) {
      customer = { id: userSubscription.stripeCustomerId };
    } else {
      const customerData = { metadata: { dbId: userId } };
      const response = await stripe.customers.create(customerData);
      customer = { id: response.id };
      await db.insert(subscriptions).values({
        userId,
        stripeCustomerId: customer.id,
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    if (!customer?.id) {
      return NextResponse.json({ error: "Failed to get a customer id" }, { status: 500 });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${baseUrl}/payments`,
    });

    console.log("Stripe session created:", session);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}