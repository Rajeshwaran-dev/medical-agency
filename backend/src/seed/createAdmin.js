const dotenv = require("dotenv");
const connectDB = require("../config/db");
const User = require("../models/User");

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME || "Admin";

    if (!email || !password) {
      throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required");
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    await User.create({ name, email, password, role: "admin" });
    console.log("Admin user created successfully");
    process.exit(0);
  } catch (error) {
    console.error(`Admin seed failed: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
