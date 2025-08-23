# 🎨 AIPalette: An AI-Powered Color Palette Generator

<p align="center">
  <img src="https://socialify.git.ci/muhurtkumar/AIPalette/image?language=1&name=1&owner=1&theme=Light" alt="project-image">
</p>

<p align="center">
  <!-- Project Info Badges -->
  <img src="https://img.shields.io/github/stars/muhurtkumar/AIPalette?style=flat-square&logo=github" alt="Stars">
  <img src="https://img.shields.io/github/forks/muhurtkumar/AIPalette?style=flat-square&logo=github" alt="Forks">
  <img src="https://img.shields.io/github/issues/muhurtkumar/AIPalette?style=flat-square" alt="Issues">
  <img src="https://img.shields.io/github/last-commit/muhurtkumar/AIPalette?style=flat-square&logo=git" alt="Last Commit">
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square&logo=github" alt="PRs Welcome">
  <br/>
  <!-- Tech Stack Badges -->
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=flat-square&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=flat-square&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/Database-MongoDB-brightgreen?style=flat-square&logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/Package_Manager-npm-CB3837?style=flat-square&logo=npm" alt="npm">
</p>

AIPalette is an AI-powered color palette generator built for developers and designers. This application helps users generate palettes using **Gemini AI** or through a random process, and provides tools to tweak colors, explore shades, visualize themes, and save their favorite palettes to a personal dashboard.

---

## 📑 Table of Contents

- [Live Demo](#-live-demo)
- [Project Screenshots](#-project-screenshots)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Getting Started](#-getting-started)
  - [Installation](#-installation)
  - [Environment Variables](#-environment-variables)
  - [Usage](#-usage)
- [Contribution](#-contribution)

---

## 🚀 Live Demo

Explore the deployed version of **AIPalette**:  
🔗 [https://ai-palette-client.vercel.app/](https://ai-palette-client.vercel.app/)

---

## 📸 Project Screenshots

Here’s a preview of the app:

<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="https://res.cloudinary.com/dzretztrz/image/upload/v1755981667/Screenshot_2025-08-24_020602_ue9vf6.png" alt="project-screenshot-1" width="450">
  <img src="https://res.cloudinary.com/dzretztrz/image/upload/v1755984894/Screenshot_2025-08-24_030402_bswut1.png" alt="project-screenshot-2" width="450">
</div>

---

## ✨ Features  

### 🤖 AI-Powered Generation  
Generate **9 intelligent color palettes** using Gemini AI, including shade-based, tint-based, and website-optimized themes.  

### 🎨 Palette Customization  
Fine-tune and adjust individual colors to craft the perfect palette for your needs.  

### 🌈 Shade Exploration  
Dive deep into variations by exploring different shades of any chosen color.  

### 🖼️ Theme Visualization  
Instantly preview how your color themes will look in real-world use cases.  

### 📂 Personal Dashboard  
Save and manage your favorite palettes and colors in a personalized dashboard for easy access later.  

## 🧰 Technologies Used

| Technology        | Purpose                           |
|-------------------|-----------------------------------|
| **Frontend**      | React.js                          |
| **Backend**       | Node.js, Express.js               |
| **Database**      | MongoDB                           |
| **AI Integration**| Gemini API                        |
| **Image Handling**| Cloudinary                        |

---

## 🛠 Getting Started

Follow these instructions to run the project locally.

### 📦 Installation

Clone the repository:

```bash
git clone https://github.com/muhurtkumar/AIPalette.git
cd AIPalette
```
Install frontend dependencies:

```bash
cd ../client
npm install
# or yarn install
```

---

### 🔐 Environment Variables

#### `server/.env`

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_api_secret

# Gemini
GEMINI_API_KEY=your_gemini_api_key
```

#### `client/.env`

```env
VITE_BACKEND_URL=http://localhost:5000
```

> Replace the placeholders with your actual credentials from each provider.

---

### ▶️ Usage

Start the backend server:

```bash
cd server
npm start
# or yarn start
```

Backend runs at: [http://localhost:5000](http://localhost:5000)

Start the frontend client:

```bash
cd ../client
npm start
# or yarn start
```

Frontend opens at: [http://localhost:3000](http://localhost:5173)

---

## 🤝 Contribution
Contributions are welcome!
Please fork the repository and submit a pull request with your changes.
