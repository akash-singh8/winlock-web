import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Collection } from "mongodb";
import getDb from "@/libs/mongodb";

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

    if (!["premium", "professional"].includes(plan)) {
      return NextResponse.json(
        { message: "Invalid plan specified!" },
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

    const saltRounds = 10;
    const activationKey =
      plan === "premium"
        ? jwt.sign({ plan }, secretKey, { expiresIn: "1y" })
        : await bcrypt.hash(secretKey, saltRounds);

    const db = await getDb();
    const collection: Collection<{ _id: string }> = db.collection("Devices");

    await collection.insertOne({ _id: activationKey });

    return NextResponse.json({ activationKey });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
