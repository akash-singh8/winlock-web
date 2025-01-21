import Image from "next/image";
import Link from "next/link";

import FAQs from "@/components/FAQs";
import Subscribe from "@/components/Subscribe";

import styles from "./page.module.scss";
import poster from "@/assets/faq/poster.png";
import chat from "@/assets/faq/chat.svg";
import email from "@/assets/faq/email.svg";
import people from "@/assets/faq/people.svg";
import arrow from "@/assets/faq/uparrow.svg";

const Support = () => {
  return (
    <>
      <div className={styles.poster}>
        <Image src={poster} alt="We're here to help" />
      </div>

      <div className={styles.faqs}>
        <FAQs additional={true} />
      </div>

      <section className={styles.morehelp}>
        <h2>Still need help?</h2>
        <div>
          <Link
            href="https://www.linkedin.com/in/akash-singh8"
            target="_blank"
            className={styles.helpOption}
          >
            <div className={styles.helpImg}>
              <Image src={chat} alt="chat" />
            </div>
            <div className={styles.helpType}>
              <p>Contact Founder</p>
              <p>Response Time: 10 hours</p>
            </div>

            <Image src={arrow} alt="Arrow" className={styles.arrow} />
          </Link>

          <Link
            href="mailto:developer.akash8@gmail.com"
            className={styles.helpOption}
          >
            <div className={styles.helpImg}>
              <Image src={email} alt="email" />
            </div>
            <div className={styles.helpType}>
              <p>Email us</p>
              <p>Response Time: 24 hours</p>
            </div>

            <Image src={arrow} alt="Arrow" className={styles.arrow} />
          </Link>

          <Link
            href="https://join.slack.com/t/win-lock/shared_invite/zt-2wutihszr-jnZoixZqZRDKBVmK0arY7w"
            target="_blank"
            className={styles.helpOption}
          >
            <div className={styles.helpImg}>
              <Image src={people} alt="peoples" />
            </div>
            <div className={styles.helpType}>
              <p>Ask the community</p>
              <p>Response Time: 12 hours</p>
            </div>

            <Image src={arrow} alt="Arrow" className={styles.arrow} />
          </Link>
        </div>
      </section>

      <Subscribe />
    </>
  );
};

export default Support;
