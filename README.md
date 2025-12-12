# 🛡️ Global Threat Radar

> A real-time cyber threat visualization tool with a **Neopurple Cyberpunk Aesthetic**.

![Project Banner](public/screenshot.png)
*(Note: Don't forget to replace this path with an actual screenshot of your dashboard)*

## 📜 Overview
**Global Threat Radar** is a web-based dashboard that visualizes global cyber threats in real-time. It fetches live data from global threat intelligence feeds (Abuse.ch) and maps them onto an interactive world map using **D3.js**.

Designed with a high-contrast **Neon/Cyberpunk interface** to simulate a Security Operations Center (SOC) monitor.

## ✨ Features
* **🌍 Interactive World Map:** Built with D3.js to render GeoJSON data.
* **📡 Real-Time Data:** Fetches live botnet and malware IPs from Feodo Tracker.
* **🎨 Cyberpunk UI:** Custom "Neopurple" design with glowing effects and CRT aesthetics.
* **⚠️ Live Logs:** Auto-scrolling side panel showing detected malware (Emotet, QakBot, etc.).
* **🚀 Node.js Backend:** Express server to handle API requests and serve static files.

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3 (Custom Animations), JavaScript (ES6+), D3.js (v7).
* **Backend:** Node.js, Express.js, Axios.
* **Data Source:** [Abuse.ch Feodo Tracker](https://feodotracker.abuse.ch/).

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YourUsername/Global-Threat-Radar.git](https://github.com/YourUsername/Global-Threat-Radar.git)
    cd Global-Threat-Radar
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the server:**
    ```bash
    node server.js
    ```

4.  **Access the Dashboard:**
    Open your browser and visit: `http://localhost:3000`

## 📂 Project Structure
```text
Global-Threat-Radar/
├── public/             # Client-side files (HTML, CSS, JS, Map Data)
│   ├── world.geojson   # Map coordinates
│   └── script.js       # D3.js visualization logic
├── server.js           # Backend server (API Proxy)
└── README.md           # Project documentation
