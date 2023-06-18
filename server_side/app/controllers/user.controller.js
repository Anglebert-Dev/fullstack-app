const {compare} = require('bcryptjs')
const {validateUser , validateUserLogin, User} = require("../models/user.model");

const {hashPassword}=require("../utils/imports")

/***
 *  Create's a new user
 * @param req
 * @param res
 */

exports.createUser = async(req,res)=>{
    try {
        // if it fail to validate user input
        const {error}=validateUser(req.body)
        if(error) return res.status(400).json({
            message:error.details[0].message
        });

        // check if admin exists
        let count = await User.countDocuments({});
        if(count) return res.status(400).send({message:"Admin already exists"})
        
        // change the format of the password 
        req.body.password = await hashPassword(req.body.password);
        // add user to database
        const newUser = new User(req.body);
        const result = await newUser.save();

        return res.status(201).send({
            message:"user created successfully ",
            data : result
        })
    } catch (err) {
        return res.status(500).json(e.toString().split('\"').join(''))
    }
    
}

/***
 *  current  user
 * @param req
 * @param res
 */

exports.getCurrentUser = async (req, res) => {
    try {
  
      const result = await User.findOne({
        _id: req.user._id
      });
  
      return res.status(201).send({
        message: 'OK',
        data: result
      });
    } catch (e) {
      return res.status(500).send(e.toString().split('\"').join(''))
    }
  }

  /**
 * Login User
 * @param req
 * @param res
 */

  exports.userLogin = async (req, res) => {
    try {
      const {
        error
      } = validateUserLogin(req.body);
      if (error) return res.status(400).send({
        message: error.details[0].message
      });
  
      const user = await User.findOne({
        email: req.body.email
      });
      if (!user) return res.status(404).send({
        message: 'Invalid credentials'
      });
      console.log(user);
      const validPassword = await compare(req.body.password, user.password);
      if (!validPassword) return res.status(404).send({
        message: 'Invalid credentials'
      });
      const token=await user.generateAuthToken()
      res.cookie("token"  ,"Bearer " +token, {
        httpOnly:true,
        maxAge:24*60*1000
      })
      return res.status(200).send({
        message: 'OK',
        token
      });
  
    } catch (e) {
      return res.status(500).send(e.toString().split('\"').join(''))
    }
  }
  
  /***
 *  updates's a new user
 * @param req
 * @param res
 */
exports.updateUser = async (req, res) => {
    try {
  
      const {
        error
      } = validateUser(req.body,true);
      if (error) return res.status(400).send({
        message: error.details[0].message
      });
  
      let {
        email,
        nationalId,
        phone
      } = req.body
  
    //   let dupplicate_user = await User.findOne({
    //     _id: {
    //       $ne: req.user._id
    //     },
    //     $or: [{
    //       email: email
    //     }, {
    //       nationalId: nationalId
    //     }, {
    //       phone: phone
    //     }],
    //   })
  
    //   if (dupplicate_user) {
    //     const phoneFound = phone == dupplicate_user.phone
    //     const emailFound = email == dupplicate_user.email
    //     return res.status(400).send({
    //       message: `User with same ${phoneFound ? 'phone ' : emailFound ? 'email ' :  'nationalId '} arleady exist`
    //     });
    //   }
  
      const result = await User.findOneAndUpdate({
        _id: req.user._id
      }, req.body, {
        new: true 
      });
  
      return res.status(200).send({
        message: 'UPDATED',
        data: result
      });
    } catch (e) {
      return res.status(500).send(e.toString().split('\"').join(''))
    }
  }
/***
 *  delete's a new user
 * @param req
 * @param res
 */
exports.deleteUser = async (req, res) => {
    try {
  
      const result = await User.findOneAndDelete({
        _id: req.user._id
      });
      if (!result)
        return res.status(404).send({
          message: 'User not found'
        });
  
      return res.send({
        message: 'DELETED',
        data: result
      });
    } catch (e) {
      return res.status(500).send(e.toString().split('\"').join(''))
    }
  }  