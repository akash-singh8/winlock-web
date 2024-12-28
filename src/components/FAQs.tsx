"use client";

import { useState } from "react";
import Image from "next/image";

import styles from "@/styles/faqs.module.scss";
import uparrow from "@/assets/faq/uparrow.svg";

const FAQs = ({ additional }: { additional: boolean }) => {
  return (
    <div className={styles.faqs}>
      <h2>FAQs</h2>

      <div className={styles.questions}>
        <Card
          que="How do I lock a folder?"
          ans="To lock a folder, right-click on it and select the 'Protect with Password' option from the menu. Your folder will be locked and encrypted."
          active={true}
        />

        <Card
          que="How do I unlock a folder?"
          ans="To unlock a folder, double-click on it. You’ll be prompted to enter the password. Once you enter the correct password, the folder will be unlocked."
        />

        <Card
          que="Can I change my password?"
          ans="If you’ve enabled a global password, you can change it in the app settings. For unique passwords, unlock the folder and re-lock it with a new password."
        />

        <Card
          que="How do I access locked folders?"
          ans="Locked folders will display a unique folder-lock icon with the Winlock symbol. You can also view all locked folders in the 'Locked History' section of the Winlock app."
        />

        {additional && (
          <Card
            que="What happens if I uninstall Winlock?"
            ans="If you uninstall Winlock, locked folders remain encrypted. Reinstall the app to unlock them."
          />
        )}

        {additional && (
          <Card
            que="What is a global password?"
            ans="A global password is a single password used to lock and unlock all your folders. You can enable or disable it in the app settings."
          />
        )}

        {/* <Card
          que="What happens if I forget my password?"
          ans="If you forget your password, you can use the recovery option in the app, provided you’ve set up recovery questions or email verification."
        /> */}

        <Card
          que="Is my data safe with Winlock?"
          ans="Yes, your data is secured using advanced encryption algorithms, ensuring that only you can access your locked folders. Your privacy and security are our top priorities."
        />
      </div>
    </div>
  );
};

const Card = ({
  que,
  ans,
  active,
}: {
  que: string;
  ans: string;
  active?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(active ?? false);

  return (
    <div className={`${styles.card} ${isOpen ? styles.active : ""}`}>
      <div
        className={styles.question}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <p>{que}</p>
        <Image src={uparrow} alt="arrow" />
      </div>
      <p className={styles.answer}>{ans}</p>
    </div>
  );
};

export default FAQs;
