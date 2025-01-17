import { Collection } from "mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import getDb from "@/libs/mongodb";

const createActivationKey = async (plan: string) => {
  try {
    if (!plan) {
      return { status: 400, message: "Plan is required!" };
    }
    plan = plan.toLowerCase();

    if (!["premium", "professional"].includes(plan)) {
      return { status: 400, message: "Invalid plan specified!" };
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error("Server configuration error: Missing secret key!");
    }

    let activationKey: string;

    if (plan === "premium") {
      activationKey = jwt.sign({ plan, createdAt: new Date() }, secretKey, {
        expiresIn: "1y",
      });
    } else {
      const saltRounds = 10;
      activationKey = await bcrypt.hash(secretKey, saltRounds);
    }

    const db = await getDb();
    const collection: Collection<{
      _id: string;
      createdAt: Date;
    }> = db.collection("Devices");

    await collection.insertOne({
      _id: activationKey,
      createdAt: new Date(),
    });

    return { status: 200, activationKey };
  } catch (error) {
    return { status: 500, error };
  }
};

export default createActivationKey;
