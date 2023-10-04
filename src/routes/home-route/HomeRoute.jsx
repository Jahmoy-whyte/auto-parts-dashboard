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
import {
  ADMIN_ONLY,
  ADMIN_AND_EMPLOYEE,
} from "../../helper/permissions/permissions";

const HomeRoute = () => {
  const [
    logout,
    nav,
    menuIsOpen,
    setMenuIsOpen,
    user,
    currentPage,
    setCurrentPage,
  ] = useHome();

  const menuList = [
    {
      id: 1,
      icon: <AiOutlinePieChart />,
      title: "Dash Board",
      permissions: ADMIN_ONLY,
      path: "/home/",
    },

    {
      id: 2,
      icon: <BsBagCheck />,
      title: "Products",
      permissions: ADMIN_AND_EMPLOYEE,
      path: "/home/products/",
    },

    {
      id: 3,
      icon: <AiOutlineCar />,
      title: "Specification",
      permissions: ADMIN_AND_EMPLOYEE,
      path: "/home/ProductSpecification/",
    },

    {
      id: 4,
      icon: <AiOutlineShoppingCart />,
      title: "Orders",
      permissions: ADMIN_AND_EMPLOYEE,
      path: "/home/orders/",
    },
    {
      id: 5,
      icon: <AiOutlineUser />,
      title: "Users",
      permissions: ADMIN_ONLY,
      path: "/home/users/",
    },
    {
      id: 6,
      icon: <PiUsersFour />,
      title: "Employees",
      permissions: ADMIN_ONLY,
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
        {menuList.map((options) => {
          if (options.permissions.includes(user.role)) {
            return (
              <SideMenuOptions
                icon={options.icon}
                onClick={nav}
                path={options.path}
                title={options.title}
                key={options.id}
              />
            );
          }
        })}

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
              <p className="font-bold text-right">{user?.email}</p>
              <p className="text-right">{`${user?.firstName} ${user?.lastName}`}</p>
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
