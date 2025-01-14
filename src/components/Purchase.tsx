import Image from "next/image";
import { RefObject } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";

import styles from "@/styles/purchase.module.scss";
import cross from "@/assets/svgs/cross.svg";

type PurchaseParams = {
  plan: "Premium" | "Professional";
  price: 24 | 98;
  onClose: () => void;
  popupRef: RefObject<HTMLDivElement> | undefined;
};

const Purchase = ({ plan, price, onClose, popupRef }: PurchaseParams) => {
  const buttonStyles: PayPalButtonsComponentProps["style"] = {
    borderRadius: 12,
    label: "pay",
    color: "silver",
  };

  const product = `Winlock ${plan === "Premium" ? "Premium" : "Pro"}`;
  const access = plan === "Premium" ? "1 year access" : "Lifetime access";

  return (
    <div className={styles.container} ref={popupRef}>
      <div className={styles.purchase}>
        <div className={styles.title}>
          <h2>Upgrade to {plan}</h2>
          <Image
            src={cross}
            alt="close"
            width={26}
            height={26}
            onClick={onClose}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.details}>
            <div className={styles.items}>
              <Image src="/logo.svg" alt="Winlock" width={46} height={48} />
              <div>
                <h2>{product}</h2>
                <p>{access}</p>
              </div>
            </div>

            <p>${price}</p>
          </div>

          <div className={styles.emailInput}>
            <p>Also receive the activation key via email</p>
            <input type="email" placeholder="you@example.com" />
          </div>

          <div className={styles.paymentButtons}>
            <PayPalScriptProvider
              options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
              }}
            >
              <PayPalButtons style={buttonStyles} />
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
