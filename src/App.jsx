import { UserContext } from "./context/UserProvider";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import Register from "./routes/Register";
import Navbar from "./components/Navbar";
import Perfil from "./routes/Perfil";
import Login from "./routes/Login";
import Home from "./routes/Home";

import LayourContainerForm from "./components/layouts/LayoutContainerForm";
import LayoutRequireAuth from "./components/layouts/LayoutRequireAuth";
import LayoutRedirect from "./components/layouts/LayoutRedirect";
import NotFound from "./routes/NotFound";

const App = () => {
  const { user } = useContext(UserContext);

  if (user === false) {
    return <p>Loading....</p>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LayoutRequireAuth />}>
          <Route index element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>

        <Route path="/" element={<LayourContainerForm />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>

        <Route path="/:nanoid" element={<LayoutRedirect />}>
          <Route index element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
