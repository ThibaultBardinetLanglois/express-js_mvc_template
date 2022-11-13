const usersServices = require('../services/usersService');


exports.register = async (req, res) => {
  const { user } = req.body;
  try {
    const userPayload  = await usersServices.register(user);
    console.log('user in controller:', userPayload);
    res
      .status(201)
      .json(
        {
          ...userPayload,
          message: `L'utilisateur ${user.name} a été créé avec succes, vous êtes actuellement connecté`,
        }
  );
  } catch (e) {
    console.log('error in controller', e);
    res.status(e.status).send(e);
  }
}

exports.login = async (req, res) => {
  const { credentials } = req.body;
  try {
    const token  = await usersServices.login(credentials);
    
    res
      .status(200)
      .json(
        {
          token,
          message: `Vous êtes actuellement connecté`,
        }
  );
  } catch (e) {
    console.log('error in controller', e);
    res.status(e.status).send(e);
  }
}