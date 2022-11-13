exports.authGlobalError = (res) => {
    return res.status(401).json({ 
      code: "error",
      status: 401,
      message: "Problem in authentication process"
    });
}

exports.authTokenNotFound = (res) => {
  return res.status(403).json({ 
    code: 'error',
    status: 403,
    message: "Token not found in the request headers"
  });
}

exports.authTokenNotGoodOrExpired = (res) => {
    return res.status(403).json({
      code: 'error',
      status: 403,
      message: "Peut être que votre session a expirée, en tout cas le token contenu dans votre requête est invalide, vous devez vous connecter"
    });
}

exports.authTokenExpired = (res) => {
    return res.status(403).json({
      code: "error",
      status: 403,
      message: "Le token a expiré, vous devez vous reconnecter"
    });
}

exports.authTokenGoodAndUnexistUser = (res) => {
  return res.status(403).json({
    code: "error",
    status: 403,
    message: "Votre token contient des informations incorrectes, il est possible que vous ne soyez plus enregistré en base de données, vous devriez vous inscrire de nouveau" 
  });
}