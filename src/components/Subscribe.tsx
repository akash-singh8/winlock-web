"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import styles from "@/styles/subscribe.module.scss";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubscribe = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsDisabled(true);

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.message || "Subscription failed");
      } else {
        toast.success(data?.message || "Subscribed successfully");
      }
    } catch (error) {
      console.error("Error during subscription:", error);
      toast.error("An error occurred. Please try again later.");
    }

    setIsDisabled(false);
    setEmail("");
  };

  return (
    <section className={styles.subscribe}>
      <h2>Stay ahead with latest Winlock updates</h2>

      <form onSubmit={handleSubscribe}>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={isDisabled}>
          Subscribe now
        </button>
      </form>
    </section>
  );
};

export default Subscribe;
