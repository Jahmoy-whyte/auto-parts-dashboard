import {
  AiOutlineMenu,
  AiOutlinePieChart,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineLogout,
  AiOutlineCar,
} from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import { PiUsersFour } from "react-icons/pi";
import { Outlet, useNavigate } from "react-router-dom";
import useHome from "./useHome";
import accountimg from "../../assets/images/account.svg";
import SideMenu from "./components/side-menu/SideMenu";
import SideMenuOptions from "./components/side-menu-options/SideMenuOptions";

const HomeRoute = () => {
  const [logout, nav, menuIsOpen, setMenuIsOpen, windowWidth] = useHome();

  const menuList = [
    {
      id: 1,
      icon: <AiOutlinePieChart />,
      title: "Dash Board",

      path: "/home/",
    },

    {
      id: 2,
      icon: <BsBagCheck />,
      title: "Products",

      path: "/home/products/",
    },

    {
      id: 3,
      icon: <AiOutlineCar />,
      title: "Specification",

      path: "/home/ProductSpecification/",
    },

    {
      id: 4,
      icon: <AiOutlineShoppingCart />,
      title: "Orders",

      path: "/home/orders/",
    },
    {
      id: 5,
      icon: <AiOutlineUser />,
      title: "Users",

      path: "/home/users/",
    },
    {
      id: 6,
      icon: <PiUsersFour />,
      title: "Employees",

      path: "/home/employees/",
    },

    ,
  ];

  // nav={nav}
  //       logout={logout}
  //       visible={menuIsOpen}
  //       setMenuIsOpen={setMenuIsOpen}
  //       windowWidth={windowWidth}

  return (
    <div className="flex h-screen  bg-slate-400 flex-row">
      <SideMenu visible={menuIsOpen} setMenuIsOpen={setMenuIsOpen}>
        {menuList.map((options) => (
          <SideMenuOptions
            icon={options.icon}
            onClick={nav}
            path={options.path}
            title={options.title}
            key={options.id}
          />
        ))}

        <SideMenuOptions
          icon={<AiOutlineLogout />}
          onClick={logout}
          title={"logout"}
        />
      </SideMenu>

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex items-center justify-between h-16 border-b-2 border-gray-200 bg-white px-5">
          <AiOutlineMenu onClick={() => setMenuIsOpen(!menuIsOpen)} />

          <div className="flex flex-row items-center gap-2 text-sm leading-4 ">
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
