import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../assets/logo-34-motors-black.png";
import { IoMdMenu } from "react-icons/io";
import Link from "next/link";

const  Header = () => {
  const [isMobile, setIsMobile] = useState(false);

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
      className={`w-full flex justify-between items-center bg-white h-[80px] sticky top-0 `}
    >
      <Image width={200} src={logo} alt="Logo 34 Motors" />
      {isMobile ? (
          <IoMdMenu className={`text-black text-3xl`} />
      ) : (
        <div className="flex items-center gap-11">
          <div className={`border-l-2 border-gray-300 h-[80px]`}></div>
          <Link href={"/"} className={`text-gray-600`}>Fazer Login</Link>
          <Link href={"/register"} className={`text-gray-800 border-2 py-3 px-7 rounded`}>Cadastrar</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
