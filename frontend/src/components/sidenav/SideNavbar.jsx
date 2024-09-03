import { NavLink } from "react-router-dom";
import { VscAccount, VscDashboard, VscSignOut } from "react-icons/vsc";
import { MdOutlineFoodBank } from "react-icons/md";
import { RiMentalHealthLine } from "react-icons/ri";
import { LiaRunningSolid } from "react-icons/lia";
import { CiDumbbell } from "react-icons/ci";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import './sidenav.css';
import logos from '../../assests/logo-small.png';
import logo from '../../assests/logo.png';

const routes = [
  {
    path: "/profile-container",
    name: "User-Profile",
    icon: <VscAccount />,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <VscDashboard />,
  },
  {
    path: "/nutrition",
    name: "Diet",
    icon: <MdOutlineFoodBank />,
  },
  {
    path: "/exercise",
    name: "Exercise",
    icon: <CiDumbbell />,
  },
  {
    path: "/activity",
    name: "Activity",
    icon: <LiaRunningSolid />,
  },

  {
    path: "/stress",
    name: "Stress",
    icon: <RiMentalHealthLine />,
  },
  {
    path: "/signin",
    name: "Logout",
    icon: <VscSignOut />,
  },
];

const SideNavBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "220px" : "55px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                  activeClassName="icon-active"
                >
                  <img src={logo} alt="logo" />
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <img onClick={toggle} src={logos} alt="logo" />
            </div>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                  onClick={route.name === "Logout" ? handleLogout : null}
                >
                  <div className="icon icon-active">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideNavBar;
