import { User } from "../models/User.js";

export const login = async (req, res) => {
  const { email, name, role } = req.body;
  let user = await User.findOne({ email });
  
  if (!user) {
    user = await User.create({ email, name, role });
  }
  
  res.json(user);
};
