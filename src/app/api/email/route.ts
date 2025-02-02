import { NextRequest, NextResponse } from "next/server";
import getDb from "@/libs/mongodb";
import dns from "dns/promises";
import sendEmail from "@/libs/sendEmail";

function isValidEmailSyntax(email: string): boolean {
  // A simple regex to validate basic email format.
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Validate Domain by querying DNS for MX record
async function hasMXRecord(email: string): Promise<boolean> {
  const domain = email.split("@")[1];
  try {
    const mxRecords = await dns.resolveMx(domain);
    return mxRecords && mxRecords.length > 0;
  } catch (error) {
    console.log(`Error while checking MX Record for ${email} \n err: ${error}`);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !isValidEmailSyntax(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email!" },
        { status: 400 }
      );
    }

    const domainValid = await hasMXRecord(email);
    if (!domainValid) {
      return NextResponse.json(
        { message: "Email domain is invalid!" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const collection = db.collection("Subscribed");

    try {
      await collection.insertOne({ _id: email });
    } catch (err: any) {
      if (err?.errorResponse?.errmsg?.includes("duplicate")) {
        return NextResponse.json(
          { message: "oh Looks like you've already subscribed!" },
          { status: 403 }
        );
      }
      return NextResponse.json(
        { message: "Subscription failed, please try again." },
        { status: 500 }
      );
    }

    const isMailSent = await sendEmail(email, false);
    if (!isMailSent) {
      console.error("Unable to send email on subscription!!");
    }

    return NextResponse.json({
      message: "Subscribed successfully.",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
