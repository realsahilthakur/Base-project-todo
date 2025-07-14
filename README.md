# 📝 Todo List Web App

A simple, responsive **Todo List** web application built using **HTML, CSS, JavaScript, Node.js, Express**, and **MongoDB Atlas**.  
The app allows users to **create**, **read**, **update**, and **delete** todos with a customizable theme system (`standard`, `light`, `darker`).  
The frontend is a static site, while the backend is a REST API connected to MongoDB Atlas for persistent storage.

## 🚀 Features

- Add, mark as completed, and delete todos.
- Three theme options (standard, light, darker) with smooth transitions.
- Real-time date and time display in the top-left corner.
- Responsive design for both mobile and desktop.
- Persistent storage using MongoDB Atlas.

## 📁 Project Structure

The project is divided into two repositories:

- **`todo-frontend`**: Contains static frontend files (e.g., `index.html`, `main.css`, `main.js`, `time.js`, etc.)
- **`todo-backend`**: Contains the Node.js backend (e.g., `server.js`, `.env`, `.gitignore`)

## ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Git and a GitHub account
- Modern web browser (Chrome, Firefox, etc.)

## 🛠️ Setup Instructions

### 1. Clone the Repositories

```bash
git clone https://github.com/realsahilthakur/Base-project-todo.git
```

### 2. Backend Setup

```bash
cd todo-backend
npm install express mongoose cors dotenv
```

Create a `.env` file in the backend directory with the following content:

```env
MONGO_URI=mongodb+srv://<db_username>:<db_password>@<clusterName>.mongodb.net/?retryWrites=true&w=majority
```

> Replace `<db_username>` and `<db_password>` with your MongoDB Atlas credentials.  
> ✅ Ensure `.env` is included in `.gitignore` to avoid committing sensitive data.

Start the backend server:

```bash
node server.js
```

> The backend runs on: `http://localhost:3000`

### 3. Frontend Setup

```bash
cd todo-frontend
npm install -g serve
serve -s . -p 5000
```

> The app runs on: `http://localhost:5000`

📌 The backend is set to work with port `5000` to connect with the frontend via CORS.

### 4. Configure MongoDB Atlas

1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a cluster and a database named `todoapp`.
3. Whitelist your IP under **Network Access** (use `0.0.0.0/0` for testing).
4. Create a database user and set the credentials in your `.env`.

### 5. Test the App

- Open `http://localhost:5000` in your browser.
- Add, mark, or delete todos.
- Switch themes using the top-right buttons.
- Check your MongoDB Atlas cluster for the persisted `todoapp > todos` collection.

## 🧑‍💻 Usage

- **Add Todo**: Type in the input field and click `"Hit it!"`
- **Complete Todo**: Click ✅ to mark a todo as completed (strikethrough effect).
- **Delete Todo**: Click 🗑️ to remove a todo with an animation.
- **Change Theme**: Click on `standard`, `light`, or `darker` buttons in the top-right corner.

## 🔐 Security Notes

- **Protect `.env`**: Never commit it to GitHub. It’s excluded via `.gitignore`.
- **MongoDB Atlas**:
  - Use a strong database password.
  - Restrict IP access to your local machine or deployment servers.
  - Rotate the `MONGO_URI` password if exposed.
- **GitHub**:
  - Use a **private repository** for better security.

## 🧪 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Check `MONGO_URI` and whitelist your IP in Atlas |
| CORS issues | Ensure backend allows origin `http://localhost:5000` |
| Frontend not loading | Check browser console (F12 → Console) |
| Backend not responding | Check terminal logs (from `node server.js`) |

## 🔮 Future Improvements

- Add user authentication (e.g., with Clerk or Auth0)
- Implement todo categories and due dates
- Add filtering and sorting
- Improve error handling and user feedback

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙌 Acknowledgements

Built with ❤️ by [Your Name or GitHub Handle]
