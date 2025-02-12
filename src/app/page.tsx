import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.scss";
import Pricing from "@/components/Pricing";
import FAQs from "@/components/FAQs";
import Subscribe from "@/components/Subscribe";

import hacking from "@/assets/home/girlHacking.png";
import feature1 from "@/assets/home/feature1.png";
import feature2 from "@/assets/home/feature2.png";
import feature3 from "@/assets/home/feature3.png";
import feature4 from "@/assets/home/feature4.png";
import secureFile from "@/assets/home/secureFile.png";

export default function Home() {
  return (
    <>
      <section className={styles.header}>
        <Image src={hacking} alt="Girl Hacking" />

        <div className={styles.about}>
          <div>
            <h1>Protect your files from unauthorized access</h1>
            <p>
              Winlock provides an easy and safe way to lock your folders with
              passwords using in-place encryption — no file moving needed.
            </p>
          </div>

          <div className={styles.action}>
            <Link href={process.env.NEXT_PUBLIC_DOWNLOAD_LINK!}>
              <button>Download now</button>
            </Link>
            <Link href="/download">
              <button>Learn more</button>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.featuresBox}>
        <h2>Why do you need Winlock?</h2>

        <div className={styles.features}>
          <div>
            <Image src={feature1} alt="feature" />
            <div>
              <p className={styles.featureTitle}>Easy to Use</p>
              <p className={styles.featureDesc}>
                Just a single click to lock your folders — no file moving
                needed.
              </p>
            </div>
          </div>
          <div>
            <Image src={feature2} alt="feature" />
            <div>
              <p className={styles.featureTitle}>High Security</p>
              <p className={styles.featureDesc}>
                Use the latest encryption technology to protect your files
              </p>
            </div>
          </div>
          <div>
            <Image src={feature3} alt="feature" />
            <div>
              <p className={styles.featureTitle}>Fast Encryption</p>
              <p className={styles.featureDesc}>
                It only takes a few seconds to encrypt your files
              </p>
            </div>
          </div>
          <div>
            <Image src={feature4} alt="feature" />
            <div>
              <p className={styles.featureTitle}>Support Any Type of Files</p>
              <p className={styles.featureDesc}>
                No matter what type of file you want to encrypt, it can be
                easily done
              </p>
            </div>
          </div>
        </div>
      </section>

      <Pricing />

      <FAQs additional={false} />

      <section className={styles.readyToDownload}>
        <Image src={secureFile} alt="Secured File" />

        <div className={styles.footerDownload}>
          <p>Ready to protect your files?</p>
          <div className={styles.action}>
            <Link href={process.env.NEXT_PUBLIC_DOWNLOAD_LINK!}>
              <button>Download now</button>
            </Link>
          </div>
        </div>
      </section>

      <Subscribe />
    </>
  );
}
