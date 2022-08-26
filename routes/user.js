const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyJwt")
const User = require("../models/User");

const router = require("express").Router()

router.put("/:id", verifyTokenAndAuthorization, async(req, res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SecretKeyofCrypto).toString()
    }

    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async(req, res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User của bạn đã được xóa")
    } catch (error) {
        res.status(500).json("KHÔNG XÓA ĐƯỢC USER")
        
    }
})

// GET USER
router.get("/find/:id", verifyTokenAndAdmin, async(req, res)=>{
    try {
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json("KHÔNG GET ĐƯỢC USER")
        
    }
})

//GET USER MUON CHON
router.get("/findallusers", verifyTokenAndAdmin, async(req, res)=>{
    const query = req.query.new;
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(3   )
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
})


// router.get("/stats", verifyTokenAndAdmin, async(req, res)=>{
    
//     try {
//         const date = new Date();
//         const lastYear = new Date(date.setFullYear(date.getFullYear()));
//         const data = await User.aggregate([
//             {$match: {createdAt : {$gte: lastYear}}},
//             {
//                 $project: {
//                     month: {$month: "$createddAt"},
//                 }
//             },
//             {
//                 $group: {
//                     _id: "$month",
//                     total: { $sum : 1}
//                 }
//             }
//         ])
//         console.log("data: "+ data)
//         res.status(200).json({data})
//     } catch (error) {
//         res.status(500).json(err)
//     }

// })

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router