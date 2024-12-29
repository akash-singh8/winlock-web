"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "@/styles/navbar.module.scss";

const Navbar = () => {
  const pathName = usePathname();
  const currentRoute = pathName.split("/").pop();

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <Image src="/logo.png" height={24} width={24} alt="logo" />
        <h1>Winlock</h1>
      </div>

      <div className={styles.menu}>
        <Link href="/" className={currentRoute ? "" : styles.active}>
          Home
        </Link>
        <Link
          href="/pricing"
          className={currentRoute == "pricing" ? styles.active : ""}
        >
          Pricing
        </Link>
        <Link
          href="/faqs"
          className={currentRoute == "faqs" ? styles.active : ""}
        >
          FAQ
        </Link>
        <button>Download</button>
      </div>
    </nav>
  );
};

export default Navbar;
