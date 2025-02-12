import { NextResponse } from "next/server";
import createActivationKey from "@/libs/createActivationKey";
import sendEmail from "@/libs/sendEmail";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan,
      email,
    } = await request.json();

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !plan
    )
      return NextResponse.json(
        { error: "Required parameters: order, payment, signature or plan" },
        { status: 400 }
      );

    // Verify the payment signature: The signature is generated using HMAC SHA256 with your Razorpay secret
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Payment verification failed. Invalid signature." },
        { status: 400 }
      );
    }

    // Payment verified successfully; Create an activation key based on the provided plan.
    const getKey = await createActivationKey(plan);

    if (getKey.status !== 200) {
      console.error("Activation Key Creation Error:", getKey);
      return NextResponse.json(
        { error: "Failed to create activation key. Please contact support." },
        { status: 500 }
      );
    }

    if (email) {
      const isMailSent = await sendEmail(
        email,
        true,
        plan,
        getKey.activationKey
      );

      if (!isMailSent) {
        console.error("Unable to send email on PURCHASE!");
        console.log("OrderID:", razorpay_order_id);
        console.log("Email and Plan:", email, plan);
      }
    }

    return NextResponse.json({
      success: true,
      activationKey: getKey.activationKey,
    });
  } catch (error: any) {
    console.error("Unable to create or send activation key:", error);
    return NextResponse.json(
      { error: error.message || "Server Error while sending activation key." },
      { status: 500 }
    );
  }
}
