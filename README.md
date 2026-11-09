# Sweet Crumbs Bakery 🍰

A modern, fully responsive, and full-stack web application for a home bakery. This project features a dynamic menu, a persistent shopping cart, and an automated WhatsApp checkout system integrated with a custom Node.js backend.

🔗 **Live Demo:** [https://hafizasadullahkhan-dev.github.io/sweet-crumbs-bakery/](https://hafizasadullahkhan-dev.github.io/sweet-crumbs-bakery/)

## 📸 Screenshot
<img width="1906" height="940" alt="Sweet Crumbs Bakery UI" src="https://github.com/user-attachments/assets/00eb3cc2-10e0-4c10-8617-58cb29c4c787" />

## ✨ Features
- **Dynamic Menu:** Fetches product data (cakes, cookies, etc.) dynamically from a REST API.
- **Smart Cart System:** Users can add/remove items and view total prices. The cart state is saved in `LocalStorage`, so items are not lost on page reload.
- **Seamless Checkout:** When an order is placed, it is securely saved to a MongoDB database via the backend API, and the user is redirected to WhatsApp with a pre-formatted order summary.
- **Custom UI/UX:** Replaced basic browser `alert()` with modern Toast notifications and added a smooth, responsive mobile hamburger menu.
- **Secure Backend:** The backend utilizes MVC architecture, rate-limiting, and CORS policies.

## 🛠️ Tech Stack
**Frontend:**
- HTML5, CSS3 (Flexbox, Grid, Variables)
- Vanilla JavaScript (ES6+)
- Google Fonts (Playfair Display, Poppins)

**Backend (Separate Repository):**
- Node.js & Express.js
- MongoDB & Mongoose (Database)
- Express-Rate-Limit (Security)

## 🚀 How It Works
1. User adds items to the cart.
2. User clicks "Send Order".
3. Frontend sends a POST request to the Node.js API.
4. Backend verifies the prices, calculates the total, and saves the order to MongoDB.
5. Upon successful save, the frontend opens WhatsApp with the order details.

## 💻 Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hafizasadullahkhan-dev/sweet-crumbs-bakery.git