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
  const [announcementId, setAnnouncementId] = useState<number | null>(null);
  const handlePage = (number: number) => setPage(number);
  const handleAnnouncementId = (id: number) => setAnnouncementId(id);

  return (
    <ModalBase toggleModal={toggleModal}>
      <div id={"modal-create-announcement"} className={`modal-window`}>
        <ModalHeader title="Criar anúncio" toggleModal={toggleModal} />
        <div>
          <h4 className={`text-body2 font-500 text-grey-0 mb-5 font-inter`}>
            Informações do veículo
          </h4>
          {page == 1 && (
            <ModalCreateAnnouncementForm
              setPage={handlePage}
              setAnnouncementId={handleAnnouncementId}
            />
          )}
          {page == 2 && (
            <ModalEditImages
              setPage={handlePage}
              announcementId={announcementId!}
              toggleModal={toggleModal}
            />
          )}
        </div>
      </div>
    </ModalBase>
  );
};
