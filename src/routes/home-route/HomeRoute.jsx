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
import accountimg from "../../assets/images/account.svg";

const HomeRoute = () => {
  const [logout, nav] = useHome();
  return (
    <div className="flex h-screen  bg-slate-400 flex-row">
      <div className="bg-primary h-screen w-52 px-5 text-white  hidden lg:block">
        <div className="h-16 justify-center items-center flex">
          <h1>title</h1>
        </div>
        <SideBarOptions
          icon={<AiOutlinePieChart />}
          title={"Dash Board"}
          onClick={nav}
          path={"/home/"}
        />
        <SideBarOptions
          icon={<BsBagCheck />}
          title={"Products"}
          onClick={nav}
          path={"/home/products/"}
        />
        <SideBarOptions
          icon={<AiOutlineShoppingCart />}
          title={"Orders"}
          onClick={nav}
          path={"/home/orders/"}
        />
        <SideBarOptions
          icon={<AiOutlineUser />}
          title={"Users"}
          path={"/home/users/"}
          onClick={nav}
        />
        <SideBarOptions
          icon={<AiOutlineLogout />}
          title={"Logout"}
          onClick={logout}
        />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex items-center justify-end h-16 border-b-2 border-gray-200 bg-white px-5">
          <div className="flex flex-row items-center gap-2 text-sm leading-4">
            <div>
              <p className="font-bold">name name</p>
              <p>name@gmail.com</p>
            </div>
            <div className="bg-primary rounded-2xl w-8 h-8 items-center justify-center flex">
              <img src={accountimg} className="w-4 " />
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default HomeRoute;
