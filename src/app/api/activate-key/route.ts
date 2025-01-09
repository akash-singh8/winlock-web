import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    // step 1: verify the transaction then only proceed
    const { plan } = await request.json();
    if (!plan) {
      return NextResponse.json(
        { message: "Plan is required!" },
        { status: 400 }
      );
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { message: "Server configuration error: Missing secret key!" },
        { status: 500 }
      );
    }

    if (plan === "premium") {
      const activationKey = jwt.sign({ plan }, secretKey, { expiresIn: "1y" });
      return NextResponse.json({ activationKey });
    }

    if (plan === "professional") {
      const saltRounds = 10;
      const activationKey = await bcrypt.hash(secretKey, saltRounds);
      return NextResponse.json({ activationKey });
    }

    return NextResponse.json(
      { error: "Invalid plan specified!" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
