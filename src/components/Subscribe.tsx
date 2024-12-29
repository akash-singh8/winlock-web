"use client";

import { useState } from "react";
import styles from "@/styles/subscribe.module.scss";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.SyntheticEvent) => {
    e.preventDefault();

    console.log("Email :", email);

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
        <button type="submit">Subscribe now</button>
      </form>
    </section>
  );
};

export default Subscribe;
