import { IoMdClose } from "react-icons/io";
import ModalBase from "../modalBase";
import { ModalCreateAnnouncementForm } from "./form/ModalCreateForm";

export const ModalCreateAnnouncement = ({ toggleModal }: any) => {
  return (
    <ModalBase toggleModal={toggleModal}>
      <div id={"modal-create-announcement"} className={`modal-window`}>
        <div className={`flex justify-between`}>
          <h3 className={`modal-title`}>Criar anúncio</h3>
          <button onClick={toggleModal} className={`text-heading6 text-grey-4`}>
            <IoMdClose />
          </button>
        </div>

        <div>
          <h4 className={`text-body2 font-500 text-grey-0 mb-5 font-inter`}>
            Informações do veículo
          </h4>
          <ModalCreateAnnouncementForm />
        </div>
      </div>
    </ModalBase>
  );
};
