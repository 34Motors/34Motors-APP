import ModalBase from "../modalBase";
import { ModalCreateAnnouncementForm } from "./form/ModalCreateForm";
import { ModalHeader } from "../modalHeader";

export const ModalCreateAnnouncement = ({ toggleModal }: any) => {
  return (
    <ModalBase toggleModal={toggleModal}>
      <div id={"modal-create-announcement"} className={`modal-window`}>
        <ModalHeader title="Criar anúncio" toggleModal={toggleModal} />
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
