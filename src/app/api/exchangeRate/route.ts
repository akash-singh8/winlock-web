import { NextResponse } from "next/server";

// In-memory cache object
let exchangeRateCache = {
  rate: null, // Cached exchange rate
  timestamp: 0, // Timestamp of when the rate was cached
};

// Cache duration: 4 hour in milliseconds
const CACHE_DURATION = 4 * 60 * 60 * 1000;

export async function GET() {
  try {
    const currentTime = Date.now();

    if (
      exchangeRateCache.rate &&
      exchangeRateCache.timestamp !== 0 &&
      currentTime - exchangeRateCache.timestamp < CACHE_DURATION
    ) {
      return NextResponse.json({ INR: exchangeRateCache.rate });
    }

    const exchangeRateResponse = await fetch(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API}/latest/USD`
    );
    const exchangeRateData = await exchangeRateResponse.json();

    if (exchangeRateData.result === "success") {
      const usdToInrRate = exchangeRateData.conversion_rates.INR;

      exchangeRateCache = {
        rate: usdToInrRate,
        timestamp: currentTime,
      };

      console.log("Fetched and cached new exchange rate:", usdToInrRate);
      return NextResponse.json({ INR: usdToInrRate });
    } else {
      throw new Error("Error fetching exchange rate!");
    }
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return NextResponse.json(
      { message: "Unable to fetch exchange rate!" },
      { status: 500 }
    );
  }
}
