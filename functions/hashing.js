import bcrypt from "bcrypt";

//hashing password
export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while hashing password",
      errror: error.message,
    });
  }
};

//checking password
export const comparePassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while comparing password",
      errror: error.message,
    });
  }
};
