<div align="center">
  <img src="assets/img/banner.webp" alt="Product Management System" />
</div>

# PmS - Product Management System

A simple eCormmerce product management system with basic functionalities.

## Table of Contents
 
- [Features](#features)
- [Technologies & Packages Used](#technologies-used)
- [Project Structure](#project-structure-setup-and-installation)
- [Usage](#usage)


## Features

1. **User Authentication:**
  - Sign up with email/username and password.
  - Log in with email/username and password.

2. **Product Management:**
  - Admin can add new projects with relevant information and upload product cover photo.
  - Admin panel for Viewing and managing products (Edit, Publish/Unpublish, Delete).

4. **Others:**
  - Easy-to-navigate UI with simple Navbar, etc


## Technologies & Packages Used

- **Node.js:** Backend JavaScript runtime environment.
- **AWS S3 Bucket:** A storage container in Amazon S3 used to store and manage data.
- **Express.js:** Web application framework for Node.js.
- **express-session:** Middleware for managing sessions in Express.js.
- **connect-mongodb-session:** MongoDB session store for 'express-session'.
- **MongoDB:** NoSQL database for storing product data and image-path.
- **aws-sdk:** AWS JavaScript library for interacting with AWS services.
- **Mongoose:** MongoDB object modeling tool for Node.js.
- **dotenv:** Loads environment variables from a .env file.
- **JWT: JSON** Web Tokens for user authentication.
- **bcrypt.js:** Library for hashing passwords.
- **Multer:** Middleware for handling file uploads.
- **multer-s3:** 'multer' extension for uploading files to Amazon S3.
- **EJS:** Embedded JavaScript templates for server-side rendering.
- **connect-flash:** Middleware for flash messages in Express.js.


### Prerequisites

- Node.js
- Git

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/johnkponyo/product-management-system
   cd product-management-system
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   
5. **Set Up Environment Variables**
   - Create a  `.env` file in the root directory.
   - Define the following variables:
     
    ```bash
SESSION_SECRET="your-session-secrete"
S3_REGION="your-bucket-region"
S3_BUCKET="your-bucket-path"
S3_ACCESS_KEY_ID="your-s3-access-key-id"
S3_SECRET_ACCESS_KEY="your-s3-secrete-access-key"
JWT_SECRET="your-jwt-secrete"
MONGO_DB_PASSWORD="your-mongo-db-password"
dbURI="your-mongo-db-uri"
   ```


## Usage

1. **Start the Server**
   ```bash
   npm --watch app.js
   ```
2. Access the application in your web browser at http://localhost:3000.
   
3. **Login/Register**
  Navigate to http://localhost:3000/ to access the login page. 

4. Explore! :)

  
