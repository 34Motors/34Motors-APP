import ModalBase from "../modalBase";
import { ModalCreateAnnouncementForm } from "./form/ModalCreateForm";
import { ModalHeader } from "../modalHeader";
import { useState } from "react";
import { ModalEditImages } from "../ModalEditImages/ModalEditImages";

interface ModalCreateAnnouncementProps {
  toggleModal: () => void;
}

export const ModalCreateAnnouncement = ({
  toggleModal,
}: ModalCreateAnnouncementProps) => {
  const [page, setPage] = useState(1);
  const handlePage = (number: number) => setPage(number);

  return (
    <ModalBase toggleModal={toggleModal}>
      <div id={"modal-create-announcement"} className={`modal-window`}>
        <ModalHeader title="Criar anúncio" toggleModal={toggleModal} />
        <div>
          <h4 className={`text-body2 font-500 text-grey-0 mb-5 font-inter`}>
            Informações do veículo
          </h4>
          {page == 1 ?? <ModalCreateAnnouncementForm setPage={handlePage} />}
          {page == 2 ?? <ModalEditImages setPage={handlePage} />}
        </div>
      </div>
    </ModalBase>
  );
};
