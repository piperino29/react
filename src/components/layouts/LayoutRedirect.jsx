import { Outlet, useParams } from "react-router-dom";
import { useFireStore } from "../../hooks/useFirestore";
import { useEffect, useState } from "react";
import TitleForm from "../TitleForm";

const LayoutRedirect = () => {
  const { nanoid } = useParams();
  const { searchData } = useFireStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchData(nanoid).then((docSnap) => {
      if (docSnap.exists()) {
        let originUrl = docSnap.data().origin;
        if (!/^(https?:\/\/)/i.test(originUrl)) {
          originUrl = `http://${originUrl}`;
        }
        console.log(originUrl);
        window.location.href = originUrl;
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) return <TitleForm title="Cargando redireccionamiento" />;

  return (
    <div className="mx-auto container">
      <Outlet />
    </div>
  );
};
export default LayoutRedirect;
