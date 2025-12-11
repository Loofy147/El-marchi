# El-marchi: A Tinder-like Shopping Experience

## Project Vision

El-marchi is a mobile-first shopping application that transforms the discovery of new products into a fun and engaging experience. By leveraging a Tinder-style swipe mechanism and an AI-powered recommendation engine, El-marchi provides a continuous stream of curated items tailored to each user's unique tastes.

## Target Audience

This application is designed for tech-savvy millennials and Gen Z consumers who are seeking a more personalized, entertaining, and mobile-native alternative to traditional e-commerce platforms.

## Core Features (MVP)

-   **User Authentication:** Secure sign-up and login functionality.
-   **Swipe Interface:** Swipe right to like a product, and left to pass.
-   **Product Profiles:** View detailed product pages with high-quality images, descriptions, and pricing.
-   **Wishlist:** A personal collection of liked items for future reference.

## Technology Stack

-   **Frontend:** React Native with Expo for cross-platform mobile development (iOS and Android).
-   **Backend:** Node.js with Express for building scalable and efficient APIs.
-   **Database:** MongoDB for a flexible and scalable data store.

## Getting Started

### Prerequisites

-   Node.js and npm
-   Expo CLI
-   MongoDB

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file and add the following environment variables:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
4.  Start the server:
    ```bash
    npm start
    ```

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file with your backend API URL:
    ```
    API_URL=http://your-backend-api-url
    ```
4.  Start the development server:
    ```bash
    npm start
    ```
