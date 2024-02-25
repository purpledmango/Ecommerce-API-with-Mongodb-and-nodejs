import validator from "validator";
import bcrypt from 'bcryptjs';
import UserModel from "../models/userM.js";
import authMiddleware from "../middlewares/authMiddleWare.js";

// Handles the login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (req.session.user) {
      return res.status(400).json({ message: "User is already logged in!" });
    }

    const user = await UserModel.findOne({ email: email });

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);


    if (!user || !passwordCorrect) {
      return res.status(400).json({ message: "User and Password do not match  " });
    }



    const { password: userPassword, ...others } = user._doc;

    const userCookieInfo = {
      uid: user.uid, email: user.email, group: user.group
    }
    req.session.user = {
      ...userCookieInfo, authenticated: true
    };

    res.status(200).json({ message: "Successful Login", user: { uid: user.uid, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
}

// Handles the Logout
export const logout = async (req, res) => {
  try {
    // Check if the user is logged in or if there is an active session
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Destroy the session and log out the user
    req.session.destroy((err) => {
      if (err) {
        console.error("Error while destroying session:", err);
        return res.status(500).json({ message: "Error while Logging out" });
      }
      // Return a success message as the response
      res.clearCookie('connect.sid');
      res.status(200).json({ message: "Logged out successfully!" });
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

export const register = async (req, res) => {
  try {
    const { name, email, contactNo, password, profilePic } = req.body;

    // Validate required fields
    if (!name || !email || !contactNo || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate email format using validator
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Validate password strength if needed
    // Example: if (password.length < 8) { return res.status(400).json({ message: "Password should be at least 8 characters long." }); }

    const saltRounds = 14;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      email,
      contactNo,
      profilePic,
      passwordHash: hashedPassword,
      active: true
    });

    const savedUser = await newUser.save();

    res.status(200).json({
      message: "Signed Up Successfully!",
      user: {
        name: savedUser.name,
        email: savedUser.email
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err: err });
  }
};

export const superuser = async (req, res) => {
  try {
    const { name, email, contactNo, password, confirmPassword, group } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate email format using validator
    if (password !== confirmPassword) {
      return res.status(403).json({ message: "Both Password Does not Match" });
    }

    // Validate password strength if needed
    // Example: if (password.length < 8) { return res.status(400).json({ message: "Password should be at least 8 characters long." }); }

    const saltRounds = 14;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      email,
      contactNo,
      active: true,
      group,
      passwordHash: hashedPassword,

    });

    const savedUser = await newUser.save();

    res.status(200).json({
      message: "User Registered Successfully!",
      user: {
        name: savedUser.name,
        email: savedUser.email
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err: err });
  }
};


// GET -- LoggedIN user INfp
export const getUser = async (req, res) => {
  try {

    authMiddleware(req, res, async () => {
      // Get the user profile data from the session
      const { uid } = req.params;
      const userData = await UserModel.findOne({ uid });
      const { passwordHash, contactNo, active, createdAt, updatedAt, _id, ...others } = userData._doc
      res.status(200).json({ message: "Session", user: { ...others } });
    });
  } catch (error) {
    // Handle errors by sending a 500 Internal Server Error response
    res.status(500).json({ message: "Internal Server error", error: error });
  }
};

// Updates the Author Info
export const updateUser = async (req, res) => {
  try {

    const newData = req.body;
    const { uid } = req.params

    const updatedUser = await UserModel.findOneAndUpdate({ uid: uid }, newData, { new: true });

    !updatedUser && res.status(404).json({ message: "User does not exist" });

    res.status(200).json(updatedUser);

  } catch (err) {
    res.status(400).json({ message: err });
  }
}


export const deleteUser = async (req, res) => {
  try {

    console.log(req.session.user)
    if (req.session.user.group !== 'Admin') {
      return res.status(403).json({ message: 'You do not have the access required for that' });
    }

    const { uid } = req.params;
    // Check if the author exists
    const existingAuthor = await UserModel.find({ uid: uid });
    if (!existingAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }

    // Perform the deletion
    await UserModel.findOneAndDelete({ uid: uid });
    res.status(200).json({ message: 'Author deleted successfully' });
  } catch (error) {
    console.error('Error deleting author:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




