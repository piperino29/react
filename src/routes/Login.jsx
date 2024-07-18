import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { formValidate } from "../utils/formValidate";
import { ErroresFirebase } from "../utils/ErroresFirebase";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import TitleForm from "../components/TitleForm";
import Button from "../components/Button";
import ButtonLoading from "../components/ButtonLoading";

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navegate = useNavigate();
  const { required, patternEmail, minLength, validateTrim } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "text@text.com",
      password: "123123",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await loginUser(data.email, data.password);
      navegate("/");
    } catch (error) {
      console.log(error.code);
      const { code, message } = ErroresFirebase(error.code);
      setError(code, {
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TitleForm title="Login" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese Email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          label="Ingrese su correo"
          error={errors.email}
        >
          <FormError error={errors.email} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="Ingrese contraseña"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
          label="Ingrese su contraseña"
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInput>
        <Button text="Login" type={"submit"} loading={loading} />
      </form>
    </>
  );
};

export default Login;
