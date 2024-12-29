import Image from "next/image";

import styles from "./page.module.scss";
import Pricing from "@/components/Pricing";
import poster from "@/assets/pricing/poster.png";

const page = () => {
  return (
    <>
      <div className={styles.poster}>
        <Image src={poster} alt="Strong encryption" />

        <div>
          <h2>The Best File Security Solution in the Market</h2>
          <p>
            Lock your folders with Winlock to protect your sensitive information
            from unauthorized access. We provide military-grade 256-bit AES
            on-the-fly encryption, so you can rest easy knowing that your data
            is safe and secure. <br />
            Get started today with our flexible pricing options.
          </p>
        </div>
      </div>

      <div className={styles.pricing}>
        <Pricing />
      </div>
    </>
  );
};

export default page;
