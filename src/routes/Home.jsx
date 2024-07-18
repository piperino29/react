import { useEffect, useState } from "react";
import TitleForm from "../components/TitleForm";
import { useFireStore } from "../hooks/useFirestore";
import Button from "../components/Button";

const Home = () => {
  const { data, error, loading, getData, addData, deleteData } = useFireStore();
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("GetDAta");
    getData();
  }, []);

  if (loading.getData) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(text);
    await addData(text);
    setText("");
  };

  const handleClickDelete = async (nanoid) => {
    console.log("Elimine");
    await deleteData(nanoid);
  };
  return (
    <>
      <TitleForm title="home" />

      <form onSubmit={handleSubmit}>
        <input
          placeholder="ex: http://bluuweb.org"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          type="submit"
          color="blue"
          text="Add Url"
          loading={loading.addData}
        />
      </form>

      {data.map((item) => {
        return (
          <div key={item.nanoid}>
            <p>{item.nanoid}</p>
            <p>{item.origin}</p>
            <p>{item.uid}</p>
            <Button
              type="button"
              color="red"
              text="Delete"
              loading={loading[item.nanoid]}
              onClick={() => handleClickDelete(item.nanoid)}
            />
          </div>
        );
      })}
    </>
  );
};

export default Home;
