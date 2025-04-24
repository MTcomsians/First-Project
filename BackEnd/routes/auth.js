const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Harryisagood$boy';


//Route 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser',[
    body('name', 'Enter the valid name:').isLength({ min: 3 }),
    body('email', 'Enter the valid Email:').isEmail(),
    body('password').isLength({ min: 5 }),
] , async(req, res)=>{
  let success = false;
  //If there are n errors, return bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    //Check whether the user with this email exists already

    try{

    
    let user = await User.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({success, error: "Sorry a user with this email already exist"})
    }
    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password, salt);

    //Create new User
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      
      //.then(user => res.json(user))
      //res.json({error: 'Please Enter valid email:'})
      const data = {
        user: {
          id: user.id
        }
      }
      
      const authtoken = jwt.sign(data, JWT_SECRET);
      
      success = true;
      res.json({success, authtoken})
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

//Route 2: Authentication using: POST "/api/auth/login". No login required

router.post('/login',[
  body('email', 'Enter the valid Email:').isEmail(),
  body('password', 'Password cannot be Blanked').exists(),
] , async(req, res)=>{
  let success = false;

  //If there are n errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user) {
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
      success = false;
      return res.status(400).json({success, error: "Please try to login with correct credentials"});
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authtoken})
    
  } catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

})

//Route 3: Get User details using: POST "/api/auth/getuser".Login required
router.post('/getuser', fetchuser, async(req, res)=>{
try {

  userID = req.user.id;
  const user = await User.findById(userID).select("-password")
  res.send(user);
} 

catch(error){
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
})
module.exports = router