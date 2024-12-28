import Image from "next/image";

import styles from "@/styles/pricing.module.scss";
import check from "@/assets/pricing/check.svg";

const Pricing = () => {
  return (
    <div className={styles.pricing}>
      <h2>Choose the Plan That&apos;s Right for You</h2>

      <div className={styles.plans}>
        <Card
          title="Free"
          price={0}
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
          price={24}
          type="yearly"
          action="Get Premium"
          features={[
            "Unlimited Folder Protection",
            "3 Devices",
            "Unlimited Bandwidth",
            "Priority Email Support",
          ]}
        />
        <Card
          title="Professional"
          price={98}
          type="lifetime"
          action="Get Professional"
          features={[
            "Lifetime Free",
            "Unlimited Folder Protection",
            "Unlimited Devices",
            "Unlimited Bandwidth",
            "24/7 Priority Support",
          ]}
        />
      </div>
    </div>
  );
};

type CartParams = {
  title: string;
  price: number;
  type: string;
  action: string;
  features: string[];
};

const Card = ({ title, price, type, action, features }: CartParams) => {
  return (
    <div className={styles.card}>
      <div>
        <p className={styles.title}>{title}</p>
        <p className={styles.price}>
          <span>${price}</span> / {type}
        </p>
      </div>

      <button className={styles.action}>{action}</button>

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
