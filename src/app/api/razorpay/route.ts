import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  const { plan, currency } = await request.json();

  if (
    !plan ||
    !currency ||
    !["premium", "professional"].includes(plan) ||
    !["USD", "INR"].includes(currency)
  )
    return NextResponse.json(
      { message: "Please include valid 'plan' and 'currency' in the body!" },
      { status: 400 }
    );

  let exchangeRate = 1;

  try {
    if (currency === "INR") {
      const exchangeRateResponse = await fetch(
        "https://winlock.pro/api/exchangeRate"
      );
      if (exchangeRateResponse.ok) {
        const exchangeRateData = await exchangeRateResponse.json();
        exchangeRate = Math.floor(exchangeRateData.INR);
      } else {
        throw new Error("Error fetching exchange rate!!");
      }
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY!,
      key_secret: process.env.RAZORPAY_SECRET!,
    });

    const payment_capture = 1; // Automatic capture
    const amount = (plan === "premium" ? 24 : 98) * exchangeRate;

    const options = {
      amount: (amount * 100).toString(), // Razorpay accepts amount in paisa
      currency,
      receipt: randomUUID(),
      payment_capture,
    };

    // Create the order
    const order = await instance.orders.create(options);
    return NextResponse.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating order" },
      { status: 500 }
    );
  }
}
