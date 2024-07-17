const mongoose = require("mongoose");
const User = require("../model/User");

mongoose.connect("mongodb://127.0.0.1:27017/finTech");

const createUserdb = async (username, email, pass) => {
  try {
    const user = await User.create({
      username: username,
      email: email,
      password: pass,
    });
    await user.save();
  } catch (err) {
    console.log(err.message);
  }
};

const checkUser = async (email) => {
    try{
        const user = await  User.findOne({email})
        if(user)
            return true
        return false
    }catch(err){
        throw new Error(err.message)

    }
}

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({email})
    return user
  }catch(err){
    throw new Error(err.message)
  }
}

module.exports = {createUserdb, checkUser, getUserByEmail}


