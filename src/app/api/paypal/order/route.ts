import { NextRequest, NextResponse } from "next/server";
import getPayPalAccessToken from "@/libs/paypal";

export async function POST(request: NextRequest) {
  try {
    const { plan } = await request.json();
    if (!plan) {
      return NextResponse.json({ error: "No Plan provided" }, { status: 400 });
    }

    const accessToken = await getPayPalAccessToken();
    const price = plan === "Professional" ? "98.00" : "24.00";
    const url = `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`;
    const orderBody = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: price,
          },
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderBody),
    });

    if (!response.ok) {
      const errData = await response.text();
      console.error("PayPal Create Order Error:", errData);
      return NextResponse.json(
        { error: "Failed to create PayPal order" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const orderID = data.id;

    return NextResponse.json({ orderID });
  } catch (error: any) {
    console.error("PayPal Create Order Error:", error);
    return NextResponse.json(
      { error: error.message || "Server Error while capturing payment." },
      { status: 500 }
    );
  }
}
