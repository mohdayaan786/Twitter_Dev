# 🐦 Twitter-Backend Clone

A fully functional backend for a Twitter-like social media platform built with **Node.js**, **Express.js**, **MongoDB**, and **Passport.js**. This project supports features like tweeting with images, following users, likes, comments, retweets, user authentication, and hashtag management.

---

## 🚀 Features

### 📝 Tweeting

* Create tweets with a **250-character limit**
* Support for **image uploads** with `Multer`
* **Hashtag detection** and storage

### 👥 User System

* Authentication using **Passport.js (JWT Strategy)**
* Follow/unfollow users
* User profile includes:

  * Name
  * Bio
  * Follower count
  * Last 10 tweets

### 💬 Interactions

* Like & comment on tweets (only if you follow the author)
* Like & comment on comments
* **Retweet** functionality

### 🔍 Visibility & Access

* Tweets visible only to followers of the author
* Pagination support on tweet feeds

---

## 🧱 Tech Stack

| Technology      | Description                          |
| --------------- | ------------------------------------ |
| **Node.js**     | JavaScript runtime environment       |
| **Express.js**  | Web framework for Node.js            |
| **MongoDB**     | NoSQL database                       |
| **Mongoose**    | ODM for MongoDB                      |
| **Passport.js** | Authentication middleware            |
| **Multer**      | Middleware for handling file uploads |

---

## 📁 Folder Structure

```
src/
│
├── controllers/      # Route controllers (Tweets, Auth, Likes, etc.)
├── models/           # Mongoose schemas (Tweet, User, Comment, etc.)
├── repository/       # Database access and query logic
├── services/         # Business logic layer
├── routes/           # API route definitions
├── middlewares/      # Custom middlewares (auth, multer, etc.)
└── utils/            # Utility functions
```

---

## 📸 Tweet with Image - API Usage (via Postman)

**POST** `/api/v1/tweets`
**Headers:** `Authorization: Bearer <your_token>`
**Form-Data:**

```
Key: content      | Value: "Just setting up my twttr! #firstpost"
Key: image        | Value: (choose image file)
```

---

## 🔐 Authentication

* Signup: `POST /api/v1/signup`
* Signin: `POST /api/v1/signin`
  Returns JWT for authenticated requests.

---

## 📌 Pagination

Use query parameters for tweet feeds:

```
GET /api/v1/tweets?page=2&limit=10
```

---

## 📦 Installation & Setup

```bash
git clone https://github.com/your-username/twitter-backend.git
cd twitter-backend
npm install
```

* Set up your `.env` file with MongoDB URI and JWT secret
* Start the server:

```bash
npm start
```

---

## 🛠 Future Improvements

* Advanced rate-limiting & spam prevention
* Notifications & real-time feed (using WebSockets)
* Tweet scheduling or drafts
* Tag user functionality

---

## 🤝 Contributing

PRs are welcome! Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---
