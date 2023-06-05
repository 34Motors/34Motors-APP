import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../assets/logo-34-motors-black.png";
import { IoMdMenu } from "react-icons/io";

const Header = () => {
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
      className={`w-full flex justify-between items-center bg-white p-[45px]`}
    >
      <Image width={200} src={logo} alt="Logo 34 Motors" />
      {isMobile ? (
          <IoMdMenu className={`text-black text-3xl`} />
      ) : (
        <button className="bg-black">Componente de usuário</button>
      )}
    </div>
  );
};

export default Header;
