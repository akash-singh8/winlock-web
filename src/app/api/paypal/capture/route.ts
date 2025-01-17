import { NextResponse } from "next/server";
import getPayPalAccessToken from "@/libs/paypal";
import createActivationKey from "@/libs/createActivationKey";

export async function POST(request: Request) {
  try {
    const { orderID, plan, email } = await request.json();
    if (!orderID || !plan) {
      return NextResponse.json(
        { error: "No orderID or plan provided" },
        { status: 400 }
      );
    }

    const accessToken = await getPayPalAccessToken();
    const url = `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errData = await response.text();
      console.error("PayPal Capture Error:", errData);
      return NextResponse.json(
        { error: "Failed to capture PayPal order" },
        { status: 500 }
      );
    }

    const captureData = await response.json();
    const getKey = await createActivationKey(plan);

    if (getKey.status !== 200) {
      console.error("Activation Key Creation Error:", getKey);
      return NextResponse.json(
        { error: "Failed to create activation key. Please contact support." },
        { status: 500 }
      );
    }

    // TODO: send activation key on email address
    const payerEmail = captureData.payer?.email_address;
    console.log("Sending email to", email || payerEmail);

    return NextResponse.json({
      success: true,
      activationKey: getKey.activationKey,
    });
  } catch (error: any) {
    console.error("PayPal Capture Error:", error);
    return NextResponse.json(
      { error: error.message || "Server Error while capturing payment." },
      { status: 500 }
    );
  }
}
