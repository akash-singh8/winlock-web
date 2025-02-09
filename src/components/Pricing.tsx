"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ToastContainer } from "react-toastify";

import styles from "@/styles/pricing.module.scss";
import check from "@/assets/pricing/check.svg";
import Purchase from "./Purchase";

const Pricing = () => {
  const popupRef = useRef(null);
  const [isPremium, setIsPremium] = useState(true);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(1);

  useEffect(() => {
    const fetchUserLocationAndExchangeRate = async () => {
      try {
        const locationResponse = await fetch("https://ipapi.co/json/");
        const locationData = await locationResponse.json();
        const userCountry = locationData.country_code;

        if (userCountry === "IN") {
          const exchangeRateResponse = await fetch("/api/exchangeRate");

          if (exchangeRateResponse.ok) {
            const exchangeRateData = await exchangeRateResponse.json();
            const usdToInrRate = exchangeRateData.INR;
            setCurrency("INR");
            setExchangeRate(usdToInrRate);
          } else {
            console.error("Error fetching exchange rate!!");
          }
        } else {
          setCurrency("USD");
          setExchangeRate(1);
        }
      } catch (error) {
        console.error("Error fetching user location or exchange rate:", error);
      }
    };

    fetchUserLocationAndExchangeRate();
  }, []);

  // Function to get price based on currency and exchange rate
  const getPrice = (price: number) => {
    return currency === "USD"
      ? `$${price}`
      : `₹${(price * exchangeRate).toFixed(0)}`;
  };

  const handlePurchasePopup = (plan?: string) => {
    if (!isPurchaseOpen) {
      setIsPremium(plan === "Premium");
      setIsPurchaseOpen(true);

      setTimeout(() => {
        const popupContainer: HTMLDivElement = popupRef.current!;
        const popup = popupContainer.querySelector("div")!;
        popupContainer.style.opacity = "1";
        popup.style.marginBottom = "0px";
      }, 100);
    } else {
      const popupContainer: HTMLDivElement = popupRef.current!;
      const popup = popupContainer.querySelector("div")!;
      popupContainer.style.opacity = "0";
      popup.style.marginBottom = "-100%";

      setTimeout(() => {
        setIsPurchaseOpen(false);
      }, 300);
    }
  };

  return (
    <section className={styles.pricing}>
      <h2>Choose the Plan That&apos;s Right for You</h2>

      {isPurchaseOpen && (
        <Purchase
          plan={isPremium ? "Premium" : "Professional"}
          price={isPremium ? getPrice(24) : getPrice(98)}
          onClose={handlePurchasePopup}
          popupRef={popupRef}
        />
      )}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className={styles.plans}>
        <Card
          title="Free"
          price={currency === "USD" ? "$0" : "₹0"}
          type="lifetime"
          action="Get started with Free"
          features={[
            "up to 3 Folder Protection",
            "1 Device",
            "5GB Storage Limit",
            "Basic Email Support",
          ]}
        />
        <Card
          title="Premium"
          price={getPrice(24)}
          type="yearly"
          action="Get Premium"
          features={[
            "Unlimited Folder Protection",
            "3 Devices",
            "Unlimited Bandwidth",
            "Priority Email Support",
          ]}
          onClick={handlePurchasePopup}
        />
        <Card
          title="Professional"
          price={getPrice(98)}
          type="lifetime"
          action="Get Professional"
          features={[
            "Lifetime Free",
            "Unlimited Folder Protection",
            "Unlimited Devices",
            "Unlimited Bandwidth",
            "24/7 Priority Support",
          ]}
          onClick={handlePurchasePopup}
        />
      </div>
    </section>
  );
};

type CartParams = {
  title: string;
  price: string;
  type: string;
  action: string;
  features: string[];
  onClick?: (plan: string) => void;
};

const Card = ({
  title,
  price,
  type,
  action,
  features,
  onClick,
}: CartParams) => {
  const handleAction = () => {
    if (title === "Free") {
      window.location.href = process.env.NEXT_PUBLIC_DOWNLOAD_LINK!;
      return;
    }

    if (onClick) onClick(title);
  };

  return (
    <div className={styles.card}>
      <div>
        <p className={styles.title}>{title}</p>
        <p className={styles.price}>
          <span>{price}</span> / {type}
        </p>
      </div>

      <button className={styles.action} onClick={handleAction}>
        {action}
      </button>

      <div className={styles.features}>
        {features.map((feature, i) => (
          <div key={i}>
            <Image src={check} alt="check" />
            <p>{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
