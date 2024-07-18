import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const useFireStore = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("GetDAta");
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const dataRef = collection(db, "urls");
      const q = query(
        dataRef,
        where("uid", "==", "85D4pNYhdvMCPOi24zxUjTPnEgs1")
      );
      const querySnapshot = await getDocs(q);
      const dataDB = querySnapshot.docs.map((doc) => doc.data());
      setData(dataDB);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return {
    data,
    error,
    loading,
  };
};
