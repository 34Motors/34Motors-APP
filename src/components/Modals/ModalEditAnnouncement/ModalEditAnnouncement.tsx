import { ICarsReturn } from "@/interfaces/cars.interfaces";
import ModalBase from "../modalBase";
import { ModalHeader } from "../modalHeader";
import { useState } from "react";
import { ModalEditImages } from "../ModalEditImages/ModalEditImages";
import { FormEditAnnouncement } from "./Form";
import ConfirmDelete from "./ConfirmDelete/ConfirmDelete";

interface ModalEditAnnouncementProps {
  toggleModal: () => void;
  announcement: ICarsReturn;
}

export const ModalEditAnnouncement = ({
  toggleModal,
  announcement,
}: ModalEditAnnouncementProps) => {
  const [page, setPage] = useState(1);
  const handlePage = (number: number) => setPage(number);

  return (
    <ModalBase toggleModal={toggleModal}>
      <div id="modal-edit-announcement" className="modal-window">
        <ModalHeader title="Editar anuncio" toggleModal={toggleModal} />
        <h4 className={`text-body2 font-500 text-grey-0 font-inter`}>
          Informações do veículo
        </h4>
        {page == 1 && (
          <FormEditAnnouncement
            announcement={announcement}
            setPage={handlePage}
          />
        )}
        {page == 2 && (
          <ModalEditImages
            setPage={handlePage}
            announcementId={announcement.id}
            toggleModal={toggleModal}
          />
        )}
        {page == 3 && (
          <ConfirmDelete id={announcement.id} setPage={handlePage} />
        )}
      </div>
    </ModalBase>
  );
};
