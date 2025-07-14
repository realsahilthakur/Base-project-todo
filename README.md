Todo List Web App
A simple, responsive todo list web application built with HTML, CSS, JavaScript, Node.js, Express, and MongoDB Atlas. The app allows users to create, read, update, and delete todos, with a customizable theme system (standard, light, darker). The frontend is a static site, and the backend is a REST API connected to MongoDB Atlas for persistent storage.
Features

Add, mark as completed, and delete todos.
Three theme options (standard, light, darker) with smooth transitions.
Real-time date and time display in the top-left corner.
Responsive design for mobile and desktop.
Persistent storage using MongoDB Atlas.

Project Structure
The project is split into two repositories:

todo-frontend: Contains the static frontend files (index.html, main.css, main.js, time.js, etc).
todo-backend: Contains the Node.js backend (server.js, .env, .gitignore).

Prerequisites

Node.js (v16 or higher) for the backend.
MongoDB Atlas account for database storage.
Git and a GitHub account to manage repositories.
A web browser (Chrome, Firefox, etc.) for testing.

Setup Instructions
1. Clone the Repositories
Clone the repository to your local machine:
git clone https://github.com/your-username/todo-frontend.git

2. Backend Setup

Navigate to the backend directory:cd server

Install dependencies:npm install express mongoose cors dotenv


Create a .env file in the backend directory with your MongoDB Atlas connection string which looks like: 

mongodb+srv://<db_username>:<db_password>@<clusterName>.mongodb.net/?retryWrites=true&w=majority"


Replace <username> and <password> with your MongoDB Atlas credentials.
E
nsure .env is listed in .gitignore to prevent committing sensitive data.

Start the backend server:node server.js

The backend server runs on http://localhost:3000.



3. Frontend Setup

Navigate to the frontend directory:cd frontend


Install serve globally (if not already installed) to host the static site:npm install -g serve


Start the frontend server:serve -s . -p 5000 

the port 5000 is assigned in the server.js which basically connect the backend to fronend and runs the app on 5000

The app runs on http://localhost:5000.



4. Configure MongoDB Atlas

Log in to MongoDB Atlas.
Create a cluster and a database named todoapp.
Add your local IP to the Network Access IP whitelist (or use 0.0.0.0/0 for testing).
Create a database user and update the MONGO_URI in .env with the credentials.

5. Test the App

Open http://localhost:5000 in a browser.
Add todos, mark them as completed, or delete them.
Switch themes using the top-right theme selectors.
Verify todos persist in MongoDB Atlas by checking the todoapp database, todos collection.

Usage

Add Todo: Enter a task in the input field and click "Hit it!".
Complete Todo: Click the checkmark button to mark a todo as completed (strikes through the text).
Delete Todo: Click the trash button to remove a todo with a falling animation.
Change Theme: Click one of the three theme selectors (standard, light, darker) in the top-right corner to update the app’s appearance.

Security Notes

Protect .env: Never commit the .env file to GitHub. It’s excluded via .gitignore.
MongoDB Atlas:
Use a strong password for the database user.
Restrict IP access in Atlas to your local machine and Render’s servers.
Rotate the MONGO_URI password if exposed.


Private Repository: Use a private GitHub repository to limit code access.

Troubleshooting

MongoDB Connection Errors: Verify MONGO_URI in .env and ensure your IP is whitelisted in Atlas.
CORS Issues: Ensure the backend CORS origin matches the frontend URL (http://localhost:5000 locally).
Frontend Not Loading: Check the browser console (F12 > Console) for errors.
Backend Not Responding: Check Render logs or local server output (node server.js).

Future Improvements

Add user authentication (e.g., with Clerk).
Implement todo categories and due dates.
Add filtering or sorting for todos.
Enhance error handling and user feedback.

License
This project is licensed under the MIT License.