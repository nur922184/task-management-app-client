# Task Management Application

A modern and responsive task management application built with React, Firebase, and Tailwind CSS. This application allows users to manage tasks using a drag-and-drop interface, with real-time updates and authentication.

## Live Demo

Check out the live demo of the application: [Live Demo](https://task-management-applicat-a011a.web.app/)

## Features

- **User Authentication**: Sign in with Google using Firebase Authentication.
- **Task Management**: Add, edit, delete, and reorder tasks.
- **Drag-and-Drop Interface**: Move tasks between categories (To-Do, In Progress, Done) using `@dnd-kit/core` and `@dnd-kit/sortable`.
- **Real-Time Updates**: Tasks are synced in real-time with Firebase Firestore.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **Dark Mode**: Toggle between light and dark themes.

## Technologies Used

- **Frontend**: React, Vite.js, Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore)
- **State Management**: React Query (`@tanstack/react-query`)
- **Drag-and-Drop**: `@dnd-kit/core`, `@dnd-kit/sortable`
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Notifications**: React Toastify
- **Icons**: React Icons
- **Local Storage**: LocalForage
- **Sorting**: `match-sorter`, `sort-by`
- **Alerts**: SweetAlert2

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/task-management-app.git
   cd task-management-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Firebase**:
   - Create a Firebase project at Firebase Console.
   - Add your Firebase configuration in `src/utils/firebase.js`.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open the application**:
   - Visit `http://localhost:5000` in your browser.

## Dependencies

Here are the main dependencies used in this project:

### Frontend:
- `react: ^18.0.0`
- `react-dom: ^18.0.0`
- `react-router-dom: ^7.2.0`
- `@dnd-kit/core: ^6.3.1` (Drag-and-Drop functionality)
- `@dnd-kit/sortable: ^10.0.0` (Sortable components)
- `firebase: ^11.3.1` (Authentication and Firestore)
- `axios: ^1.7.9` (HTTP requests)
- `react-icons: ^5.5.0` (Icons)
- `react-toastify: ^11.0.3` (Notifications)
- `framer-motion: ^12.4.7` (Animations)
- `@tanstack/react-query: ^5.66.8` (State management)
- `@tailwindcss/vite: ^4.0.7` (Tailwind CSS integration with Vite)
- `localforage: ^1.10.0` (Local storage)
- `match-sorter: ^8.0.0` (Sorting and filtering)
- `sort-by: ^1.2.0` (Sorting utility)
- `sweetalert2: ^11.17.2` (Alerts and popups)
- `react-loader-spinner: ^6.1.6` (Loading spinners)

### Backend:
- Firebase (Authentication, Firestore)

## Folder Structure

```
task-management-app/
├── public/
├── src/
│   ├── assets/            # Static assets (images, icons, etc.)
│   ├── components/        # Reusable components
│   ├── context/           # Context API for global state
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Page components
│   ├── utils/             # Utility functions (Firebase config, API calls)
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Entry point
├── .gitignore
├── package.json
├── README.md
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite configuration
```

## Available Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run lint`: Run ESLint to check for code issues.
- `npm run preview`: Preview the production build locally.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.


---

Made with ❤️ by Task Management Application

