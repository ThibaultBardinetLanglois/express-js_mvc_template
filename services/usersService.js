const usersModels = require('../models/UsersModel'),
  bcrypt = require('bcrypt'),
  usersErrors = require('../utils/customError/usersError'),
  jwt = require("jsonwebtoken"),
  serverSecret = process.env.SERVER_SECRET;


exports.getById = async (id) => {
  try {
    const retrievedUser = await usersModels.findById(id);
    console.log(('retrieved user =>', retrievedUser));
    return {...retrievedUser[0]};
  } catch (e) {
    usersErrors.userNotFoundError();
  }
}

exports.register = async (user) => {
    try {
      const isEmailAlreadyExistInDB = await usersModels.findByEmail(user.email);
      
      if (isEmailAlreadyExistInDB.length > 0) {
        throw new Error('email');
      }
      const insertedRow = await usersModels.create(user);
      console.log('YOUYOU');
      if (insertedRow.insertId) {
        const createdUser = await this.getById(insertedRow.insertId);
        delete createdUser.password;
        const token = jwt.sign(createdUser, serverSecret, { expiresIn: "24h" });
        return {user: createdUser, access_token: token};
      } else {
        throw new Error('creation');
      }
      
    } catch (e) {
      if (e.message === 'email') usersErrors.userEmailAlreadyInDBError();
      if (e.message === 'creation') usersErrors.userCreationError();
      return usersErrors.userGlobalError();
    }
}

exports.login = async (credentials) => {
  console.log('Credentials in service =>', credentials);
  const { email, password } = credentials;
  try {
    const userFoundInDB = await usersModels.findByEmail(email)
    console.log('user by id in service =>', userFoundInDB);

    if (userFoundInDB.length === 0) throw new Error('email');
    const user  = {...userFoundInDB[0]};
    console.log('user found =>', user);

    const validPassword = await bcrypt.compare(password, user.password);
      
    if (!validPassword) {
      console.log('not same!!');
      throw new Error('password');
    } 

    const payload = user;
    delete payload.password;
    
    return jwt.sign(payload, serverSecret, { expiresIn: "24h" });
      
  } catch (e) {
    if (e.message === 'email') usersErrors.userEmailNotInDBError();
    if (e.message === 'password') usersErrors.userPasswordError();
    return usersErrors.userLoginError();
  }

}