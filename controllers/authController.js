import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email is already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  const token = jwt.sign({id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.status(201).json({ 
    user: { 
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const pwdVerified = await bcrypt.compare(password, user.password);
  if (!pwdVerified) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.status(201).json({ 
    user: { 
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  });
};
