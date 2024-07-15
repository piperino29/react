export const ErroresFirebase = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "Usuario ya registrado";
    case "auth/invalid-email":
      return "Formato email no válido";
    case "auth/invalid-login-credentials":
      return "Credenciales incorrectas";
    default:
      return "Ocurrio un error en el server";
  }
};
