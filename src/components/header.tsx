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
      className={`w-full flex justify-between items-center bg-grey-10 h-[80px] sticky top-0 `}
    >
      <Image width={200} src={logo} alt="Logo 34 Motors" />
      {isMobile ? (
          <IoMdMenu className={`text-black text-3xl`} />
      ) : (
        <div className="flex items-center gap-11">
          <div className={`border-l-2 border-grey-6 h-[80px]`}></div>
          <Link href={"/"} className={`text-grey-2`}>Fazer Login</Link>
          <Link href={"/register"} className={`text-grey-0 border-2 border-grey-4 py-3 px-7 rounded`}>Cadastrar</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
