import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { formValidate } from "../utils/formValidate";
import { ErroresFirebase } from "../utils/ErroresFirebase";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const navegate = useNavigate();
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "jarafelipe29@gmail.com",
      password: "123123",
    },
  });

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      navegate("/");
    } catch (error) {
      console.log(error.code);
      setError("firebase", {
        message: ErroresFirebase(error.code),
      });
    }
  };

  return (
    <>
      <h1>Login </h1>
      <FormError error={errors.firebase} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese Email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
        ></FormInput>
        <FormError error={errors.email} />
        <FormInput
          type="password"
          placeholder="Ingrese contraseña"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
        ></FormInput>
        <FormError error={errors.password} />
        <button type="submit">Acceder</button>
      </form>
    </>
  );
};

export default Login;
