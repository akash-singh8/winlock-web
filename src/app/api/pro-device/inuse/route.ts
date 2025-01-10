import { NextRequest, NextResponse } from "next/server";
import getDb from "@/libs/mongodb";

export async function POST(request: NextRequest) {
  try {
    const { activationKey } = await request.json();
    if (!activationKey) {
      return NextResponse.json(
        { message: "Activation key is required!" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const collection = db.collection("Devices");

    const devices = await collection.findOne({ _id: activationKey });

    if (!devices) {
      return NextResponse.json(
        { message: "Invalid or Expired Activation Key!" },
        { status: 403 }
      );
    }

    const deviceUsed = Object.keys(devices).length - 1; // subtract 1 for the activation-key or _id

    return NextResponse.json({ deviceUsed });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
