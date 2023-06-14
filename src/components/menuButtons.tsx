import Link from "next/link";
import React, { useState } from "react";
import { iUserData } from "./header";
import { Inter } from "next/font/google";
import ModalEditUser from "./Modals/ModalEditUser/modalEditUser";
import ModalEditAddress from "./Modals/ModalEditAddress/modalEditAddress";

const inter = Inter({ subsets: ["latin"] });

export const MenuButtons = () => {
  return (
    <div className="flex items-center gap-11">
      <div className={`border-l-2 border-grey-6 h-[79px] drop-shadow-md`}></div>
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
  );
};

export const MenuModalButtons = () => {
  return (
    <ul
      className={`absolute right-0 top-20 w-full bg-white  h-[184px] flex flex-col items-center px-3 py-9 gap-11 text-black`}
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
  );
};

export const UserMenuModalButtons = ({ isSeller }: iUserData) => {
  const [isOpenModalEditUser, setIsOpenModalEditUser] = useState(false);
  const [isOpenModalEditAddress, setIsOpenModalEditAddress] = useState(false);

  const toggleModalEditUser = () => setIsOpenModalEditUser(!isOpenModalEditUser);
  const toggleModalEditAddress = () => setIsOpenModalEditAddress(!isOpenModalEditAddress);

  return (
    <ul
      className={`absolute right-2 top-16 w-[200px] bg-white drop-shadow-dropDownShadow rounded p-5 flex flex-col items-center gap-4 text-grey-2 font-400 text-body1 ${inter.className}`}
    >
      <button onClick={toggleModalEditUser}>Editar Perfil</button>
      {isOpenModalEditUser && <ModalEditUser toggleModal={toggleModalEditUser}/>}

      <button onClick={toggleModalEditAddress}>Editar Endereço</button>
      {isOpenModalEditAddress && <ModalEditAddress toggleModal={toggleModalEditAddress}/>}

      {isSeller && <Link href={"/announcements"}>Meus anúncios</Link>}
      
      <button >Sair</button>
    </ul>
  );
};
