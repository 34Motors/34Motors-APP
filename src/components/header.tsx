import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../assets/logo-34-motors-black.png";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import Link from "next/link";
import { UserBadge } from "./userBadge";
import {
  MenuButtons,
  MenuModalButtons,
  UserMenuModalButtons,
} from "./menuButtons";
import { useAuth } from "@/contexts/authContext";

const Header = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [navIsOpen, setNavIsOpen] = useState<boolean>(false);
  const { user, isLoggedIn } = useAuth();

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
        ) : isLoggedIn ? (
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
          (isLoggedIn ? (
            <UserMenuModalButtons isSeller={user?.isSeller} />
          ) : (
            <MenuModalButtons />
          ))}
      </div>
    </header>
  );
};

export default Header;
