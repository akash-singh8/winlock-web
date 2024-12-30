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
      <Link href="/" className={styles.brand}>
        <Image src="/logo.png" height={24} width={24} alt="logo" />
        <h1>Winlock</h1>
      </Link>

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
          href="/support"
          className={currentRoute == "support" ? styles.active : ""}
        >
          Support
        </Link>
        <button>Download</button>
      </div>
    </nav>
  );
};

export default Navbar;
