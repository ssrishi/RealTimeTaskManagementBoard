# RealTimeTaskManagementBoard

# Real-Time Task Board

A modern, collaborative task board application built with React and Firebase. It allows users to manage tasks in real-time with drag-and-drop functionality, intuitive editing options, and seamless synchronization across clients.

## Features

* **Add, Edit & Delete Tasks** – Intuitive task management with inline actions.
* **Drag-and-Drop** – Move tasks across columns: To Do, In Progress, Done.
* **Real-Time Sync** – Backed by Firebase Firestore for live updates.
* **Responsive Design** – Tailwind CSS ensures mobile-friendly UI.
* **Deployed on Netlify** – Live and accessible from any device.

## Tech Stack

* **Frontend:** React (with Vite), Tailwind CSS
* **State & Events:** React Hooks, @hello-pangea/dnd
* **Database:** Firebase Firestore (real-time)
* **Deployment:** Netlify

## Project Structure

```
project-root/
├── src/
│   ├── App.jsx           # Core component with task board logic
│   ├── main.jsx          # React entry point
│   └── firebase.js       # Firebase config (not included for security)
├── public/
│   └── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Firebase Setup (Required)

This project uses Firebase Firestore. You need to configure it locally:

1. Create a project on [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Replace the `firebase.js` with your credentials:

```js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

> **Note:** Do not share service account keys or admin credentials. Always secure your database with proper [Firestore Security Rules](https://firebase.google.com/docs/rules).

## Getting Started Locally

1. Clone the repository:

```bash
git clone https://github.com/your-username/task-board.git
cd task-board
```

2. Install dependencies:

```bash
npm install
```

3. Add your `firebase.js` config in `src/`

4. Run the development server:

```bash
npm run dev
```

## Deployment

This project is deployed on Netlify:

* **Live Demo:** [https://your-task-board.netlify.app](https://your-task-board.netlify.app)

To deploy it yourself:

1. Build the app:

```bash
npm run build
```

2. Upload `/dist` to Netlify manually or connect the GitHub repo.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to fork, use, and improve it.

---

**Author:** Rishi Sharma
**Connect:** [LinkedIn](https://www.linkedin.com/in/rishi-sharma-a6a187217/)
**Email:** [ssrishi17@gmail.com](mailto:ssrishi17@gmail.com)
