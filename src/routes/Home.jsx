import TitleForm from "../components/TitleForm";
import { useFireStore } from "../hooks/useFirestore";

const Home = () => {
  const { data, error, loading } = useFireStore();
  console.log("data ", data);
  if (loading) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <TitleForm title="home" />
      {data.map((item) => {
        return (
          <div key={item.nanoid}>
            <p>{item.nanoid}</p>
            <p>{item.origin}</p>
            <p>{item.uid}</p>
          </div>
        );
      })}
    </>
  );
};

export default Home;
