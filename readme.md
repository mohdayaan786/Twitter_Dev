# 🐦 Twitter-Backend Clone

A fully functional backend for a Twitter-like social media platform built with **Node.js**, **Express.js**, **MongoDB**, and **Passport.js**. This project supports features like tweeting with images, likes, comments, retweets, user authentication, and hashtag management.

---

## 🚀 Features

### 📝 Tweeting

* Create tweets with a **250-character limit**
* Support for **image uploads** with `Multer`
* **Hashtag detection** and storage

### 👥 User System

* Authentication using **Passport.js (JWT Strategy)**
* User profile includes:

  * Name
  * Bio
  * Last 10 tweets

### 💬 Interactions

* Like & comment on tweets 
* Like & comment on comments
* **Retweet** functionality (with or without quotes)

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
| **Jest**        | JavaScript Testing Framework         |

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

tests/
├── controllers/      # Unit tests for controllers (Jest)
├── services/         # Unit tests for services
└── ...
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

## 🧪 Running Tests with Jest

This project uses **Jest** for unit and integration testing.

### 📦 Install Jest (if not already installed):

```bash
npm install --save-dev jest
```

> Jest config can be defined in `package.json` or a separate `jest.config.js`.

### 🧪 Run all tests:

```bash
npm test
```

or

```bash
npx jest
```

### 🧪 Example Test Files

* `tests/controllers/tweet-controller.test.js`
* `tests/services/tweet-service.test.js`

Each test mocks dependencies like services or models using `jest.mock()` and ensures route/controller logic behaves as expected.

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