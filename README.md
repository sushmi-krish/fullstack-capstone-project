# GiftLink
# Project Overview
GiftLink is a full-stack web application designed to connect users who want to give away household items they no longer need with users who prefer recycling and finding free items that suit their tastes rather than buying new ones.

The application provides a seamless user experience through a rich front-end interface built with React, supported by a robust backend API with Node.js, Express, and MongoDB. It also features secure authentication, item listings, search, and profile management.
----
# Features
1. User Interface:
  
 - Home page showcasing available gifts.
 - Listings page with detailed information on items.
 - Navigation bar with links to all key sections.
 - Search functionality with multi-parameter filtering.
 - Item details page to view specifics about each gift.
 - User registration and login pages.
 - Editable user profile page.
   
 2. Backend:
- RESTful API endpoints for managing gifts, users, authentication, and search.
- MongoDB as a NoSQL database for storing users and gifts data.
- Secure authentication with JSON Web Tokens (JWT).
- Sentiment analysis service to analyze user comments (optional module).

3. Deployment:
  - Containerized with Docker.
  - Deployed to cloud platforms including Kubernetes clusters and IBM Code Engine.
  - Continuous Integration/Continuous Deployment (CI/CD) pipelines using GitHub Actions.
---
# Technology Stack
- Frontend: React, React Router, Bootstrap, CSS
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Authentication: JSON Web Tokens (JWT)
- DevOps & Deployment: Docker, Kubernetes, GitHub Actions, IBM Code Engine
- Other: Sentiment Analysis API (for comments), Agile development practic
----
# CI/CD and Deployment
This project uses GitHub Actions to automate Continuous Integration and Continuous Deployment (CI/CD) workflows:

* Automated Tests: On every push and pull request, the workflow runs automated tests to ensure code quality.
* Build & Lint: The React frontend and Node.js backend are built and linted to catch errors early.
* Docker Build & Push: Docker images for frontend and backend are automatically built and pushed to a container registry.
* Deployment: The app is deployed to cloud platforms such as Kubernetes clusters and IBM Code Engine as part of the pipeline.
*  GitHub Actions workflows ensure smooth and reliable deployment cycles and quick feedback on code changes.
----

# Setup and Installation
# Prerequisites
    - Node.js and npm
    - MongoDB instance (local or cloud)
    - Docker (for containerization)
# Backend Setup
    1.Clone the repository.
    2.Navigate to the backend folder.
    3.Install dependencies:
     ```bash
         npm install
        ```
    4.In .env file :
     ```bash 
        MONGODB_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_key
      ```
    5.Start the backend server:
     ```bash
     npm start
    ```
# Frontend setup
   1.Navigate to the frontend folder.
   2.Install dependencies:
   ```bash
     npm install
   ```
   3.Run the React app:
   ```bash
      npm start
   ```
-----
# Running the Application
 * Backend API will run at http://localhost:3060 (or your configured port).
 * Frontend app will run at http://localhost:3000.
The frontend communicates with backend APIs to fetch and manage data dynamically.
----
# API Endpoints Overview
* User Authentication
   - POST /api/auth/register - Register new users
   - POST /api/auth/login - User login
   - PUT /api/auth/update - Update user profile
* Gifts Management
   - GET /api/gifts - Retrieve all gift listings
   - POST /api/gifts - Add new gift (admin or authorized users)
   - GET /api/gifts/:id - Retrieve gift details by ID
* Search
  - GET /api/search - Search gifts with multiple parameters
----
# Deployment
The app is containerized with Docker and deployed on cloud platforms with CI/CD pipelines. The backend and frontend servers are deployed separately and configured to communicate securely.

----
# Summary 
  *  The project follows Agile development methodology, starting with a template of user stories provided via a forked GitHub repository. The actual user stories were authored and tailored by the develop
  * Sentiment analysis for comments is implemented to enhance user engagement.
  * The application is fully deployed to the cloud, with screenshots available to verify successful deployment and UI accessibility.
