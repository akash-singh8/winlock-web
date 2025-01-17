import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { plan, activationKey } = await request.json();

    if (!plan || !activationKey)
      return NextResponse.json(
        { message: "Required: Plan and ActivationKey!!" },
        { status: 400 }
      );

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { message: "Server configuration error: Missing secret key!" },
        { status: 500 }
      );
    }

    if (plan === "premium") {
      try {
        const isValid = jwt.verify(activationKey, secretKey);
        return NextResponse.json({ isValid: !!isValid });
      } catch (err: unknown) {
        console.error("Invalid Activation Key!!", err);
        return NextResponse.json({ isValid: false });
      }
    }

    if (plan === "professional") {
      const isValid = await bcrypt.compare(secretKey, activationKey);
      return NextResponse.json({ isValid });
    }

    return NextResponse.json(
      { error: "Invalid plan specified!" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
