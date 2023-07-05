import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../assets/logo-34-motors-black.png";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import Link from "next/link";
import { parseCookies } from "nookies";
import { UserBadge } from "./userBadge";
import {
  MenuButtons,
  MenuModalButtons,
  UserMenuModalButtons,
} from "./menuButtons";
import { iUserComplete } from "@/interfaces/user.interfaces";
import { useAuth } from "@/contexts/authContext";

const Header = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [navIsOpen, setNavIsOpen] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState<iUserComplete>({} as iUserComplete);
  const [loggedToken, setLoggedToken] = useState<string>("");
  const { user } = useAuth();

  useEffect(() => {
    const validateUser = () => {
      const cookies = parseCookies();

      if (cookies.token) {
        setLoggedUser(user);
        setLoggedToken(cookies.token);
      }
    };
    validateUser();
  }, [user]);

  const toggleDropdown = () => {
    setNavIsOpen(!navIsOpen);
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);


  return (
    <header
      className={`z-10 w-full px-4 bg-grey-10 h-[80px] sticky top-0 border-b-2 border-grey-6`}
    >
      <div
        className={`w-full h-[80px] px-4 mx-auto flex justify-between items-center `}
      >
        <Link href={"/"}>
          <Image width={200} src={logo} alt="Logo 34 Motors" />
        </Link>
        {isMobile ? (
          !navIsOpen ? (
            <button onClick={toggleDropdown}>
              <IoMdMenu className={`text-black text-3xl`} />
            </button>
          ) : (
            <button onClick={toggleDropdown}>
              <IoMdClose className={`text-black text-3xl`} />
            </button>
          )
        ) : loggedToken ? (
          <button onClick={toggleDropdown}>
            <UserBadge
              bg_color={user.userColor}
              initials_color="text-white"
              name_color="grey-2"
              name={user.name}
            />
          </button>
        ) : (
          <MenuButtons />
        )}

        {navIsOpen &&
          (loggedToken ? (
            <UserMenuModalButtons isSeller={user?.isSeller} />
          ) : (
            <MenuModalButtons />
          ))}
      </div>
    </header>
  );
};

export default Header;
