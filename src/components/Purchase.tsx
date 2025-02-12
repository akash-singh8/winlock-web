import Image from "next/image";
import { RefObject, useEffect, useState } from "react";
import { toast } from "react-toastify";

import styles from "@/styles/purchase.module.scss";
import cross from "@/assets/svgs/cross.svg";
import razorpay from "@/assets/svgs/razorpay.svg";
import arrow from "@/assets/faq/uparrow.svg";

type PurchaseParams = {
  plan: "Premium" | "Professional";
  price: string;
  currency: string;
  onClose: () => void;
  popupRef: RefObject<HTMLDivElement> | undefined;
};

const Purchase = ({
  plan,
  price,
  currency,
  onClose,
  popupRef,
}: PurchaseParams) => {
  const product = `Winlock ${plan === "Premium" ? "Premium" : "Pro"}`;
  const access = plan === "Premium" ? "1 year access" : "Lifetime access";

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activationKey, setActivationKey] = useState("");

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

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

  const handlePaymentSuccess = async (response: any) => {
    toast.success("Payment successful! Retrieving your activation key...");
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      response;

    try {
      const res = await fetch("/api/activation-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          plan,
          email,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setActivationKey(data.activationKey);
        toast.success(
          "Thank you for your purchase! Your activation key has been generated. Please copy and save it securely."
        );
      } else {
        setError("Payment verification failed. Please contact support.");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setError("Unable to fetch Activation-Key. Please contact support.");
    } finally {
      setLoading(false);
    }
  };

  const makePayment = async () => {
    setLoading(true);

    // 1.Generate an order
    const res = await fetch("/api/razorpay", {
      method: "POST",
      body: JSON.stringify({ plan: plan.toLowerCase(), currency }),
    });
    const data = await res.json();

    // 2. Configure Razorpay options
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      name: "Winlock",
      description: "Payment for your product or service",
      image: "/logo.svg",
      handler: handlePaymentSuccess,
      modal: {
        ondismiss: function () {
          toast.info("Payment cancelled or closed.");
          setLoading(false);
        },
      },
    };

    // 3. Open the Razorpay checkout modal
    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", () => {
      setError("Payment failed. Please try again.");
      setLoading(false);
    });
    paymentObject.open();
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
                <p>
                  Enter your email to receive your activation key (optional)
                </p>
                <input
                  type="email"
                  placeholder="you@example.com"
                  autoFocus={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className={styles.paymentButton}>
                <button onClick={makePayment} disabled={loading}>
                  Buy Now
                  <Image src={arrow} alt=">" width={12}></Image>
                </button>

                <div>
                  <p>Secured by</p>
                  <Image src={razorpay} alt="Razorpay" height={20}></Image>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Purchase;
