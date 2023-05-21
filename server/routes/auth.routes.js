const Router = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')


// /auth/register
router.post(
  '/register', 
  [
    //check('password', 'Minimum password lenght = 8').isLength( {min : 8})
  ],
  async (req,res) => {
  try {
    /////////////////////////////////////////
    //////// REGISTER VALIDATION
    /////////////////////////////////////////
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Uncorrect register data!'
      })
    }

    /////////////////////////////////////////
    //////// USER EXISTING CHECK
    /////////////////////////////////////////
    const {login, password} = req.body
    const candidate = await Users.findOne({login})

    if(candidate) {
      res.status(400).json({message : 'User already exists!' })
    }

    /////////////////////////////////////////
    //////// PASSWORD HASHING
    /////////////////////////////////////////
    const hashed_password = await bcrypt.hash(password, 12)
    const User = new Users({login, password: hashed_password})

    await User.save()
    res.status(201).json({message : 'Ok!'})

  } 
  catch (error) {
    res.status(500).json({message: "Something wrong!"})
  }

})


// /auth/login
router.post(
  '/login', 
  [
    //check('password', 'Enter password').exists()
  ],
  async (req,res) => {
  try {
    /////////////////////////////////////////
    //////// LOGIN VALIDATION
    /////////////////////////////////////////
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Uncorrect login data!'
      })
    }

    const {login, password} = req.body

    const user = await Users.findOne({ login })

    if(!user) {
      return res.status(400).json({message : 'User not found!'})
    }

    const password_is_match = await bcrypt.compare(password, user.password)

    if(!password_is_match) {
      return res.status(400).json({message : 'Password is wrong!'})
    }

    const token = jwt.sign(
      { id: user.id},
      config.get('jwt_secret'),
      {expiresIn: '1h'}
    )
    res.json({ token, id: user.id })
  } 
  catch (error) {
    res.status(500).json({message: "Something wrong!"})
  }

})

module.exports = router