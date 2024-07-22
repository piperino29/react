import { useEffect, useState } from "react";
import { useFireStore } from "../hooks/useFirestore";
import { formValidate } from "../utils/formValidate";
import { useForm } from "react-hook-form";
import { ErroresFirebase } from "../utils/ErroresFirebase";
import Button from "../components/Button";
import TitleForm from "../components/TitleForm";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";

const Home = () => {
  const { data, error, loading, getData, addData, deleteData, updateData } =
    useFireStore();
  const [newOriginID, setNewOriginID] = useState("");
  const { required, patternURL } = formValidate();
  const [copy, setCopy] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
    setValue,
  } = useForm();

  useEffect(() => {
    getData();
  }, []);

  if (loading.getData) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  const onSubmit = async ({ url }) => {
    try {
      if (newOriginID) {
        await updateData(newOriginID, url);
        setNewOriginID("");
      } else {
        await addData(url);
      }
      resetField("url");
    } catch (error) {
      const { code, message } = ErroresFirebase(error.code);
      setError(code, { message });
    }
  };

  const handleClickDelete = async (nanoid) => {
    console.log("Elimine");
    await deleteData(nanoid);
  };

  const handleClickUpdate = async ({ nanoid, origin }) => {
    console.log("click Edit");
    setValue("url", origin);
    setNewOriginID(nanoid);
  };

  const pathURL = window.location.href;

  const handleClickCopy = async (nanoid) => {
    await navigator.clipboard.writeText(window.location.href + nanoid);
    console.log("copiado");
    setCopy({ [nanoid]: true });
  };

  return (
    <>
      <TitleForm title="Mantenedor URL" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="URL"
          type="text"
          placeholder="http://bluuweb.org"
          {...register("url", {
            required,
            pattern: patternURL,
          })}
          error={errors.url}
        >
          <FormError error={errors.url} />
        </FormInput>
        {newOriginID ? (
          <Button
            type="submit"
            color="blue"
            text="Edit Url"
            loading={loading.updateData}
          />
        ) : (
          <Button
            type="submit"
            color="blue"
            text="Add Url"
            loading={loading.addData}
          />
        )}
      </form>

      {data.map((item) => {
        return (
          <div
            key={item.nanoid}
            className="p-6 bg-white mb-2 rounded-lg border border-gray-200  dark:bg-gray-800 dark:border-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {pathURL}
              {item.nanoid}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {item.origin}
            </p>
            <div className="flex space-x-2">
              <Button
                type="button"
                color="red"
                text="Delete"
                loading={loading[item.nanoid]}
                onClick={() => handleClickDelete(item.nanoid)}
              />
              <Button
                type="button"
                color="blue"
                text="Edit"
                onClick={() => handleClickUpdate(item)}
              />
              <Button
                type="button"
                color="blue"
                text={copy[item.nanoid] ? "Copied!" : "Copy"}
                onClick={() => handleClickCopy(item.nanoid)}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Home;
