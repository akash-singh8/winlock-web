import Image from "next/image";
import styles from "@/styles/navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.brand}>
        <Image src="/logo.png" height={24} width={24} alt="logo" />
        <h1>Winlock</h1>
      </div>

      <div className={styles.menu}>
        <p className={styles.active}>Home</p>
        <p>Pricing</p>
        <p>FAQ</p>
        <button>Download</button>
      </div>
    </div>
  );
};

export default Navbar;
