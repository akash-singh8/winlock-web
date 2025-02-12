![Group 8 (1)](https://github.com/user-attachments/assets/feea3e6d-2784-4d04-a87f-4e7a13e8c95e)

# Winlock Web

Winlock Web is a **Next.js 15** web application that serves as the portal for downloading [**Winlock**](https://github.com/akash-singh8/winlock/)—a Windows desktop application that securely locks your folders—as well as for purchasing activation keys for Winlock Premium or Pro plans.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)

---

## Features

- **Download Winlock:** Direct link for users to download the Winlock desktop application.
- **Purchase Activation Keys:** Seamless integration with Razorpay to handle transactions for Premium and Pro plans.
- **Secure Activation:** Uses JWT for creating and verifying activation keys.
- **Database Integration:** Connects to MongoDB for managing user and transaction data.
- **Email Notifications:** Configured to send emails via Google for key confirmations and updates.

## Installation

To get a local copy up and running, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/akash-singh8/winlock-web.git
   cd winlock-web
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file:**  
   Copy the provided environment variables (see [Environment Variables](#environment-variables)) into a `.env` file in the root directory.

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Your application should now be running on [http://localhost:3000](http://localhost:3000).

## Environment Variables

The application requires the following environment variables to function correctly. Create a `.env` file in your project root and add:

```env
# JWT secret for activation keys
JWT_SECRET_KEY="secret to create or verify activation keys"

# MongoDB connection string
MONGODB_URI="database url"

# Download link for the Winlock installer
NEXT_PUBLIC_DOWNLOAD_LINK="https://github.com/akash-singh8/winlock/releases/download/v1.0.0/WinlockSetup.exe"

# Email configuration for sending notifications
GOOGLE_EMAIL="xyz@example.com"
GOOGLE_APP_PASS="email app password"

# Payment related variables - not compulsory
RAZORPAY_KEY="abc"
RAZORPAY_SECRET="xyz"
NEXT_PUBLIC_RAZORPAY_KEY="abc"
```

_Make sure to replace the placeholder values with your actual credentials and configuration details._

## Contributing

Contributions are welcome! If you have suggestions or improvements, please feel free to fork the repository and submit a pull request.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## Contact

For any questions, issues, or feedback, please open an issue on [GitHub](https://github.com/akash-singh8/winlock-web/issues) or contact us.

## License

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** license. For more details, see the [license page](https://creativecommons.org/licenses/by-nc/4.0/).

---

_Happy Coding!_
