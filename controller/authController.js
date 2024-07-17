const bcrypt = require("bcryptjs");
const { createUserdb, checkUser, getUserByEmail } = require("../config/db");

const registerUser = async (username, email, pass, res) => {
  try {
    if (await checkUser(email)) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    bcrypt.hash(pass, 10, async (err, hash) => {
      if (err) {
        throw new Error(err.message);
      }
      await createUserdb(username, email, hash);
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

const signInUser = async (email, pass, res) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) return res.status(401).json({ message: "User Not Found" });

    bcrypt.compare(pass, user.password, function (err, resp) {
      if (err) throw new Error(err.message);
      if (resp) {
        console.log("resp", resp);
        return res.status(200).json({ message: "Success" });
      }

      return res.status(401).json({ message: "Incorrect Password" });
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { registerUser, signInUser };
