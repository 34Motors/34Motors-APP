import Image from "next/image";
import logo from "../assets/logo-34-motors-white.png";
import { MdKeyboardArrowUp } from "react-icons/md";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  return (
    <div
      className={`w-full flex flex-col gap-14 md:justify-between md:flex-row items-center bg-grey-0 p-[45px]`}
    >
      <Image width={200} src={logo} alt="Logo 34 Motors" />
      <h1 className={`text-grey-whiteFixed text-body2 font-400 text-center`}>
        34 Motors© 2023 - Todos os direitos reservados.
      </h1>
      <button onClick={scrollToTop} className={`px-5 py-4 rounded bg-grey-1 flex items-center justify-center`}>
        <MdKeyboardArrowUp
          className={`text-heading7 text-grey-whiteFixed`}
        />
      </button>
    </div>
  );
};

export default Footer;
