import Image from "next/image";
import logo from "../assets/logo-34-motors-white.png";
import { MdKeyboardArrowUp } from "react-icons/md";

const Footer = () => {
  return (
    <div className={`w-full flex flex-col gap-14 md:justify-between md:flex-row items-center bg-black p-[45px]`}>
      <Image width={200} src={logo} alt="Logo 34 Motors" />
      <h1 className={`text-white text-sm text-center`}>34 Motors© 2023 - Todos os direitos reservados.</h1>
      <MdKeyboardArrowUp className={`text-white h-[50px] w-[53px] rounded-lg  bg-[#212529]`} />
    </div>
  );
};

export default Footer;
