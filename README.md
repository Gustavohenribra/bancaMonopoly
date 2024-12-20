
# Project Setup

## Installation and Setup

1. **Clone the Repository and Navigate to the Project Directory**
   Clone the repository and move into the project folder:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install Dependencies**
   Run the following command to install the required dependencies:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Set up your environment variables by following one of these methods:
   - Manually set the environment variables in your current terminal session.
   - Alternatively, copy and populate the `.env.example` files:
     ```bash
     cp packages/server/.env.example packages/server/.env
     cp packages/client/.env.example packages/client/.env
     ```

4. **Build the Project**
   Build the dependencies by running:
   ```bash
   npm run build
   ```

5. **Start the Server**
   Launch the server with:
   ```bash
   npm start
   ```

---

## Development Setup

To enable **hot-reloading** during development for both backend and frontend:

1. Start the backend in development mode:
   ```bash
   npm run server:dev
   ```

2. Start the frontend with hot-reloading enabled:
   ```bash
   npm run client:dev
   ```

3. Optionally, `launch.json` provides debugging capabilities for the server while running the frontend with hot-reloading.

---

## NPM Workspaces

This project uses **npm workspaces** for managing packages effectively. Below are a few example commands:

1. **Add a Dependency to the Client**
   Add a specific dependency to the client package:
   ```bash
   npm install <dependency> -w ./packages/client --save
   ```

2. **Build Only the Client**
   Compile only the client package:
   ```bash
   npm run build -w ./packages/client
   ```
