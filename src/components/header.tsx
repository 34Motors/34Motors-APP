import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../assets/logo-34-motors-black.png";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import Link from "next/link";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [navIsOpen, setNavIsOpen] = useState(false);

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
    <div
      className={`w-full container px-4 flex justify-between items-center bg-grey-10 h-[80px] sticky top-0 border-b-2 border-grey-6`}
    >
      <Image width={200} src={logo} alt="Logo 34 Motors" />
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
      ) : (
        <div className="flex items-center gap-11">
          <div
            className={`border-l-2 border-grey-6 h-[79px] drop-shadow-md`}
          ></div>
          <Link href={"/login"} className={`text-grey-2 text-heading7 font-600`}>
            Fazer Login
          </Link>
          <Link
            href={"/register"}
            className={`text-grey-0 border-2 border-grey-4 py-3 px-7 rounded text-heading7 font-600`}
          >
            Cadastrar
          </Link>
        </div>
      )}
      {navIsOpen && (
        <ul
          className={`absolute w-full bg-white right-0 top-20 h-[184px] flex flex-col items-center px-3 py-9 gap-11 text-black`}
        >
          <Link href={"/login"} className={`text-grey-2 text-heading7 font-600 `}>
            Fazer Login
          </Link>
          <Link
            href={"/register"}
            className={`w-full text-center text-grey-0 border-2 border-grey-4 py-3 px-7 rounded text-heading7 font-600`}
          >
            Cadastrar
          </Link>
        </ul>
      )}
    </div>
  );
};

export default Header;
