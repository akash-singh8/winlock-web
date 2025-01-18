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

    const data = await collection.findOne({ _id: activationKey });

    if (!data) {
      return NextResponse.json(
        { message: "Invalid or Expired Activation Key!" },
        { status: 403 }
      );
    }
    const plan = data.plan;

    if (action === "add" && plan !== "professional") {
      // subtract 3 for the _id(activation-key), createdAt and plan field
      const deviceUsed = Object.keys(data).length - 3;

      if (deviceUsed >= 3) {
        return NextResponse.json(
          {
            message:
              "Device limit exceeded. Upgrade to Professional or purchase another activation key.",
          },
          { status: 429 }
        );
      }
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
