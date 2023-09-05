import SideBarOptions from "./components/side-bar-options/SideBarOptions";

import { FaBeer } from "react-icons/fa";
import {
  AiOutlinePieChart,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineLogout,
} from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import useHome from "./useHome";

const HomeRoute = () => {
  const [logout] = useHome();
  return (
    <div className="flex h-screen  bg-slate-400 flex-row">
      <div className="bg-primary h-screen w-40 px-5 text-white">
        <SideBarOptions icon={<AiOutlinePieChart />} title={"Dash Board"} />
        <SideBarOptions icon={<BsBagCheck />} title={"Products"} />
        <SideBarOptions icon={<AiOutlineShoppingCart />} title={"Orders"} />
        <SideBarOptions icon={<AiOutlineUser />} title={"Users"} />
        <SideBarOptions
          icon={<AiOutlineLogout />}
          title={"Logout"}
          onClick={logout}
        />
      </div>

      <Outlet />
    </div>
  );
};

export default HomeRoute;
