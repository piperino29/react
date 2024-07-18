export const ErroresFirebase = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return {
        code: "email",
        message: "Usuario ya registrado",
      };
    case "auth/invalid-email":
      return {
        code: "email",
        message: "Formato email no válido",
      };
    case "auth/invalid-login-credentials":
      return {
        code: "email",
        message: "Credenciales incorrectas",
      };
    default:
      return {
        code: "email",
        message: "Ocurrio un error en el server",
      };
  }
};
