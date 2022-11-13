const ApplicationError = require('./Application.Error');

class UsersError extends ApplicationError {
  constructor(message, status) {
    super(message, status);
    
    this.name = this.constructor.name;
    this.message = this.message + message;
  }
}

exports.userGlobalError = () => {
  throw new UsersError("Internal database connection error", 500)
}

exports.userNotFoundError = () => {
  throw new UsersError("Internal database connection error, user can't be found", 500)
}

exports.userEmailAlreadyInDBError = () => {
  throw new UsersError("Email already taken by another user, you have to choose a different one", 426)
}

exports.userEmailNotInDBError = () => {
  throw new UsersError("This email isn't registered in the database", 401)
}

exports.userCreationError = () => {
  throw new UsersError("Internal database connection error, user can't be created", 500)
}

exports.userLoginError = () => {
  throw new UsersError("Error during user connection, retry later", 500)
}

exports.userPasswordError = () => {
  throw new UsersError("You entered a wrong password", 500)
}