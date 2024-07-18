import { Outlet } from "react-router-dom";

const LayourContainerForm = () => {
  return (
    <div className="w-96 mx-auto mt-10">
      <Outlet />
    </div>
  );
};

export default LayourContainerForm;
