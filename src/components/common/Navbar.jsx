import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";

import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import ProfileDropDown from "../cors/Auth/Profiledropdown";

import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

//self
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/Apis";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  // fetch the data from backend
  //self made

  const fetchCatalog = async()=>{

    setLoading(true);
    try {
      console.log("jai shree ram")
      const res = await apiConnector("GET",categories.CATEGORIES_API,null);
      console.log("response is ",res)
      setItems(res.data.data);
    } catch (error) {
      console.log("Could not fetch Categories.", error);
    }
    setLoading(false);
   }
  useEffect(() => {
    fetchCatalog();
  }, []);

  return (
    <div className="flex h-14 items-center bg-richblack-800 justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent   gap-[32px]">
        {/* first */}
        <Link to="/">
          <img
            src={logo}
            alt="logo image"
            width={160}
            height={32}
            loading="lazy"
          />
        </Link>

        {/* second */}
        <nav className="hidden md:block">
          <ul className="flex flex-row gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title == "Catalog" ? (
                  <div
                    className={`relative flex ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-50"
                        : "text-richblack-25"
                    } flex-row items-center gap-2 group cursor-pointer`}
                  >
                    <p>{link.title}</p>
                    <MdOutlineKeyboardDoubleArrowDown className="cursor-pointer" />
                    <div
                      className="invisible z-10 absolute left-[50%]
                    translate-x-[-50%] translate-y-[20%] top-[50%] flex flex-col rounded-md bg-white 
                    p-4 text-richblack-900  transition-all duration-200 group-hover:visible
                    group-hover:opacity-100 lg:w-[300px]"
                    >
                      <div
                        className="absolute z-10 left-[50%] top-0 h-6 w-6 rotate-45 translate-y-[-45%]
                     rounded bg-white  translate-x-[80%]"
                      ></div>

                      {items && items.length ? (
                        items.map((category, index) => (
                          <Link
                            key={index}
                            to={`/catalog/${category.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                          >
                            <p className="border-b-richblack-300  hover:text-white hover:rounded-lg hover:bg-richblack-900 hover:bg-opacity-25 text-richblack-900  font-bold font-serif px-2 py-2 ">
                              {category.name}
                            </p>
                          </Link>
                        ))
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p
                      className={`${
                        matchRoute(link.path)
                          ? "text-yellow-23"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* third   */}
        {/* login signup dashboard  */}
        <div className="hidden items-center gap-x-4 md:flex">
          {/* is show the cart icon or not  */}
          {user && user.accountType != "Instructor" && (
            <Link
              to="/dashboard/cart"
              className="relative flex gap-2 items-center justify-center"
            >
              <AiOutlineShoppingCart className="text-white" />
              {totalItems > 0 && (
                <span className="text-white">{totalItems}</span>
              )}
            </Link>
          )}
          {/* is login button is show or not  */}

          {token == null && (
            <Link to="/login">
              <button
                className={`${
                  matchRoute("/login") ? "text-yellow-23" : "text-richblack-25 "
                } border border-richblack-700
          bg-richblack-800 px-[12px] py-[5px] rounded-md`}
              >
                Login
              </button>
            </Link>
          )}
          {/* sign up button is shown or not  */}
          {token == null && (
            <Link to="/signup">
              <button
                className={`${
                  matchRoute("/signup") ? "text-yellow-23" : "text-richblack-25"
                } border border-richblack-700
          bg-richblack-800 px-[12px] py-[5px] rounded-md`}
              >
                Sign Up
              </button>
            </Link>
          )}

           {token == null && (
            <Link to="/verification-admin">
              <button
                className={`${
                  matchRoute("/verification-admin") ? "text-yellow-23" : "text-richblack-25 "
                } border border-richblack-700
          bg-richblack-900 px-[12px] py-[5px] rounded-md`}
              >
               Admin
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
