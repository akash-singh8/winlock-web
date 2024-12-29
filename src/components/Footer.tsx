import Image from "next/image";

import styles from "@/styles/footer.module.scss";

import github from "@/assets/socials/github.svg";
import twitter from "@/assets/socials/twitter-x.svg";
import linkedin from "@/assets/socials/linkedin.svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2025 Winlock. All rights reserved</p>

      <div className={styles.socials}>
        <a href="https://github.com/akash-singh8/winlock-web" target="_blank">
          <Image src={github} alt="Github" />
        </a>
        <a href="https://x.com/dev_skyi" target="_blank">
          <Image src={twitter} alt="Twitter" />
        </a>
        <a href="https://www.linkedin.com/in/akash-singh8/" target="_blank">
          <Image src={linkedin} alt="Linkedin" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
