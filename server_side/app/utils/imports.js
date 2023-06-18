const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");

/**
 * @param id
 * @returns {boolean}
 * 
 */

exports.validateObjectId = (id)=> mongoose.Types.ObjectId.isValid(id);


/**
 * Encrypts the password
 * @param {string} password
 */

exports.hashPassword= async(password)=>{
    const salt = await bcrypt.genSalt(10)
    const hashed =  await  bcrypt.hash(password,salt)
    return hashed
}