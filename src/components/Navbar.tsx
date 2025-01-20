"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "@/styles/navbar.module.scss";
import hamburger from "@/assets/svgs/hamburger.svg";

const Navbar = () => {
  const pathName = usePathname();
  const currentRoute = pathName.split("/").pop();
  const [windowWidth, setWindowWidth] = useState(800);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const handleMenu = () => {
    const nav = document.querySelector(`.${styles.navbar}`) as HTMLDivElement;
    const isOpen = nav.style.height === "295px";

    if (isOpen) {
      nav.style.height = "63px";
    } else {
      nav.style.height = "295px";

      const handleClickOutside = () => {
        nav.style.height = "63px";
        document.removeEventListener("click", handleClickOutside);
      };

      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 100);
    }
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.brand}>
        <Image src="/logo.svg" height={24} width={24} alt="logo" />
        <h1>Winlock</h1>
      </Link>

      <Image
        src={hamburger}
        height={26}
        width={26}
        alt="menu"
        className={styles.mobileNav}
        onClick={handleMenu}
      />

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
        <Link
          href="/download"
          className={
            windowWidth <= 680
              ? currentRoute == "download"
                ? styles.active
                : ""
              : `${styles.downloadBtn} ${
                  currentRoute == "download" ? styles.downloadActive : ""
                }`
          }
        >
          {windowWidth <= 680 ? "Download" : <button>Download</button>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
