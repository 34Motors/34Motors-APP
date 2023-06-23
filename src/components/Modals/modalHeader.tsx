import { IoMdClose } from "react-icons/io";

interface iModalHeaderProps {
  title: string;
  toggleModal: () => void;
}

export const ModalHeader = ({ title, toggleModal }: iModalHeaderProps) => {
  return (
    <div className={`flex justify-between items-center`}>
      <h3 className={`modal-title`}>{title}</h3>
      <button onClick={toggleModal} className={`justify-center items-center`}>
        <IoMdClose className="fill-grey-4 text-[25px]" />
      </button>
    </div>
  );
};
