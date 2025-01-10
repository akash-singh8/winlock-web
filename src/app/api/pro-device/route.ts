import { NextRequest, NextResponse } from "next/server";
import getDb from "@/libs/mongodb";

export async function POST(request: NextRequest) {
  try {
    const { activationKey, deviceID, action } = await request.json();
    if (!activationKey || !deviceID || !action) {
      return NextResponse.json(
        { message: "Activation Key, Device ID and Action are required!" },
        { status: 400 }
      );
    }

    // Validate action before interacting with the database
    if (!["add", "remove"].includes(action)) {
      return NextResponse.json(
        { message: "Invalid action specified!" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const collection = db.collection("Devices");

    const activationKeyExists = await collection.countDocuments({
      _id: activationKey,
    });

    if (activationKeyExists === 0) {
      return NextResponse.json(
        { message: "Invalid or Expired Activation Key!" },
        { status: 403 }
      );
    }

    const updatedResult = await collection.updateOne(
      {
        _id: activationKey,
      },
      action === "add"
        ? { $set: { [deviceID]: true } }
        : { $unset: { [deviceID]: "" } }
    );

    if (updatedResult.matchedCount === 0) {
      return NextResponse.json(
        { message: "DeviceID not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `Device ${action === "add" ? "added" : "removed"} successfully.`,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
