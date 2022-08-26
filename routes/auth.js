const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
require("dotenv").config();
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    var myData = new User({
        username:  req.body.username,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SecretKeyofCrypto).toString(),
        email: req.body.email
    });
    // console.log(myData)
    try {
      const savedUser = await myData.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post("/login", async (req, res)=>{
    try {
      const user = await User.findOne({username: req.body.username});
      // console.log(user)
      !user && res.status(401).json("khong tim thay username")
 
      const hashedpassword = CryptoJS.AES.decrypt(user.password, process.env.SecretKeyofCrypto);
      
      const originalPassword = hashedpassword.toString(CryptoJS.enc.Utf8)
     
      originalPassword !== req.body.password && res.status(401).json("khong trung password")

      const accessToken = jwt.sign({
        id: user._id, 
        isAdmin: user.isAdmin,
      }, process.env.JWT_Secretkey, {expiresIn: "3d"} )


      const { password, ...others} = user._doc;
      res.status(200).json({...others, accessToken})

    } catch (error) {
      res.json(error)
    }
})



module.exports = router;