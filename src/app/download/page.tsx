import Image from "next/image";
import styles from "./page.module.scss";
import windows from "@/assets/faq/windows.svg";

const page = () => {
  return (
    <section className={styles.download}>
      <div className={styles.header}>
        <h2>Download Winlock</h2>
        <p>Free and built on open source.</p>
      </div>

      <button className={styles.mainDownload}>
        <Image src={windows} alt="Windows" />
        <p>Download for Windows</p>
      </button>

      <p>Requirements: Windlows 11/10 (32-bit/64-bit)</p>

      <div className={styles.requirements}>
        <div>
          <p>Supported OS</p>
          <p>Windows 10, 11</p>
        </div>

        <div>
          <p>File Size</p>
          <p>112MB</p>
        </div>

        <div>
          <p>Latest Version</p>
          <p>Version 1.0.0</p>
        </div>
      </div>

      <div className={styles.guide}>
        <h2>Install Winlock on your PC</h2>
        <ol type="1">
          <li>Download the Winlock installer</li>
          <li>
            Run the downloaded file <strong>WinlockSetup.msi</strong>
          </li>
          <li>
            Click <strong>&apos;Yes&apos;</strong> when prompted by the User
            Account Control (UAC)
          </li>
          <li>
            Follow the on-screen instructions to complete the installation
          </li>
          <li>Launch Winlock from the Start Menu or Desktop shortcut</li>
          <li>Set up your first folder lock to get started!</li>
        </ol>
      </div>
    </section>
  );
};

export default page;
