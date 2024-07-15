import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErroresFirebase } from "../utils/ErroresFirebase";
import FormError from "../components/FormError";
import { formValidate } from "../utils/formValidate";
import FormInput from "../components/FormInput";

const Register = () => {
  const { registerUser } = useContext(UserContext);
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
      email: "jarafelipe29@gmail.com",
      password: "123123",
      repassword: "123123",
    },
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);
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
      <h1>Register</h1>
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

        <FormInput
          type="password"
          placeholder="Ingrese contraseña"
          {...register("repassword", {
            validate: validateEquals(getValues),
          })}
        ></FormInput>
        <FormError error={errors.repassword} />

        <button type="submit">Registar</button>
      </form>
    </>
  );
};

export default Register;
