# Smart-task-Manager

1. Project Overview
   
A full-stack mobile application developed using the MERN stack. It provides a secure platform for users to manage tasks with real-time cloud synchronization, ensuring data is accessible from any device.

2. Architecture Decisions
   
The Tech Stack
Frontend: React Native (via Expo). Chosen for its "write once, run anywhere" capability and fast development cycle.
Backend: Node.js with Express. Selected for its non-blocking I/O, making it ideal for handling multiple concurrent API requests.
Database: MongoDB Atlas. A NoSQL cloud database chosen for its flexibility in handling JSON-like task objects.
Hosting: Render. Utilized for automated deployment directly from the GitHub repository.

Key Design Patterns
Decoupled Architecture: The frontend and backend are completely separate. The app communicates with the server via a RESTful API, allowing the backend to be replaced or updated without breaking the mobile app.
JWT Authentication: Uses JSON Web Tokens for stateless security. Instead of the server "remembering" the user, the app presents a secure token with every request.
Centralized API Management: All cloud calls are routed through a single api.ts file using Axios Interceptors to automatically attach security headers.

3. System Components & Flow
   
Client (Mobile): Captures user input (Register/Login/Tasks) and sends it via HTTPS.
Server (Render): Receives requests, validates the JWT, and communicates with the database.
Database (MongoDB): Persists user credentials (hashed with Bcrypt) and task data.

4. Setup & Installation
   
Backend Setup
Clone the Repo: git clone <gh repo clone studyarisina-max/Smart-task-Manager>
Install Packages: npm install
Environment Variables: Create a .env file containing your MONGO_URI and JWT_SECRET.
Deployment: Push to GitHub and connect to Render.com using the "Web Service" setting.

Frontend Setup
Dependencies: Run npm install in the frontend folder.
API Configuration: In services/api.ts, update the baseURL to your live Render link:
https://internship-11-ju1d.onrender.com/api
Execution: Run npx expo start  to generate the connection bridge.
Testing: Scan the QR code 

5. Security & Error Handling
Password Hashing: Implemented bcryptjs to ensure user passwords are never stored in plain text.

CORS Management: Enabled Cross-Origin Resource Sharing on the server to allow the mobile app to securely communicate across different domains.

Graceful Recovery: The app includes logic to detect "Cold Starts" (when the free server is sleeping) and provides user feedback during wait times.
