const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Import your existing controllers
const {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
} = require("../controllers/authController");

// =============================
// 🔐 LOCAL AUTH ROUTES
// =============================

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forget", forgotPassword);
router.post("/verify", verifyEmail);


// =============================
// 🔐 JWT GENERATOR
// =============================

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


// =============================
// 🔵 GOOGLE OAUTH
// =============================

// Step 1: Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = generateToken(req.user);

    res.redirect(
      `http://localhost:5173/login-success?token=${token}`
    );
  }
);


// =============================
// 🟣 GITHUB OAUTH
// =============================

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  (req, res) => {
    const token = generateToken(req.user);

    res.redirect(
      `http://localhost:5173/login-success?token=${token}`
    );
  }
);


// =============================
// 🔵 FACEBOOK OAUTH
// =============================

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  (req, res) => {
    const token = generateToken(req.user);

    res.redirect(
      `http://localhost:5173/login-success?token=${token}`
    );
  }
);


module.exports = router;