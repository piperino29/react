import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErroresFirebase } from "../utils/ErroresFirebase";
import FormError from "../components/FormError";
import { formValidate } from "../utils/formValidate";
import FormInput from "../components/FormInput";
import TitleForm from "../components/TitleForm";
import Button from "../components/Button";
import ButtonLoading from "../components/ButtonLoading";

const Register = () => {
  const { registerUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const navegate = useNavigate();
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      email: "text@text.com",
      password: "123123",
      repassword: "123123",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await registerUser(data.email, data.password);
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
      <TitleForm title={"Register"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese Email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          label="Ingresa tu correo"
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
          label="Ingrese contraseña"
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="Ingrese contraseña"
          {...register("repassword", {
            validate: validateEquals(getValues("password")),
          })}
          label="Repita la contraseña"
          error={errors.repassword}
        >
          <FormError error={errors.repassword} />
        </FormInput>

        {loading ? (
          <ButtonLoading />
        ) : (
          <Button text="Registrar" type={"submit"} />
        )}
      </form>
    </>
  );
};

export default Register;
