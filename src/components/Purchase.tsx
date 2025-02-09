import Image from "next/image";
import { RefObject, useEffect, useState } from "react";
import { toast } from "react-toastify";

import styles from "@/styles/purchase.module.scss";
import cross from "@/assets/svgs/cross.svg";

type PurchaseParams = {
  plan: "Premium" | "Professional";
  price: string;
  onClose: () => void;
  popupRef: RefObject<HTMLDivElement> | undefined;
};

const Purchase = ({ plan, price, onClose, popupRef }: PurchaseParams) => {
  const product = `Winlock ${plan === "Premium" ? "Premium" : "Pro"}`;
  const access = plan === "Premium" ? "1 year access" : "Lifetime access";

  const [email, setEmail] = useState("");
  // const [error, setError] = useState<string | null>(null);
  // const [activationKey, setActivationKey] = useState("");
  const error = null;
  const activationKey = "";

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    localStorage.setItem("email", email);
  }, [email]);

  const copyActivationKey = () => {
    navigator.clipboard.writeText(activationKey).then(
      () => {
        toast.success("Activation Key copied to clipboard!");
      },
      (err) => {
        toast.error("Failed to copy Activation Key: ", err);
      }
    );
  };

  return (
    <div className={styles.container} ref={popupRef}>
      <div className={styles.purchase}>
        <div className={styles.title}>
          <h2>
            {activationKey
              ? "Thank You for Your Purchase!"
              : `Upgrade to ${plan} Today`}
          </h2>
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

            <p>{price}</p>
          </div>
          {activationKey ? (
            <div className={styles.activationKey}>
              <p>Your Activation Key for Winlock {plan}:</p>
              <div>
                <p>{activationKey}</p>
              </div>
              <button onClick={copyActivationKey}>Copy Activation Key</button>
            </div>
          ) : (
            <>
              <div className={styles.emailInput}>
                <p>Also receive the activation key via email</p>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className={styles.paymentButtons}>
                <button>Buy Now: In Progress..</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Purchase;
