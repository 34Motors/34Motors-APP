import { API } from "@/services/apis";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { BiCar, BiImageAdd, BiTrash } from "react-icons/bi";
import { useAuth } from "@/contexts/authContext";
import { SmallLoading } from "@/components/smallLoading";

interface iModalProps {
  setPage: (page: number) => void;
  announcementId: number;
  toggleModal: () => void;
}

interface iImage {
  id: number;
  imageUrl: string;
  carId: number;
}

export const ModalEditImages = ({
  setPage,
  announcementId,
  toggleModal,
}: iModalProps) => {
  const [images, setImages] = useState<iImage[]>([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);
  const { token } = useAuth();

  useEffect(() => {
    async function effect() {
      await getImages();
      setLoading(false);
    }
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <SmallLoading />;
  }

  async function handleImageChange(e: any) {
    const file = e.target.files[0];

    API.defaults.headers.common.Authorization = `Bearer ${token}`;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const fd = new FormData();
    fd.append("image", file);

    try {
      setLoading(true);
      const response = await API.post(
        `/cars/${announcementId}/upload`,
        fd,
        config
      );

      setImages(response.data.images);
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteImage(imageId: number) {
    setLoading(true);
    API.defaults.headers.common.Authorization = `Bearer ${token}`;
    try {
      await API.delete(`/cars/${imageId}/images/delete`);
      toast.success("Imagem excluída com sucesso");
      await getImages();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  async function getImages() {
    try {
      const response = await API.get(`/cars/${announcementId}/images`);
      setImages(response.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-wrap gap-4 items-center">
        {images.length &&
          images.map((image) => (
            <div
              key={image.id}
              className="relative flex flex-col items-center  max-w-[150px] h-[100px] bg-grey-2 rounded-lg border-2 border-grey-2 p-1"
            >
              <Image
                src={image.imageUrl}
                alt="Imagens complementares do carro"
                width={1920}
                height={1080}
                className="rounded-lg h-full"
              />
              <BiTrash
                fill="red"
                className="absolute top-2 right-2 w-6 h-6 cursor-pointer"
                title="Excluir imagem"
                onClick={() => handleDeleteImage(image.id)}
              />
            </div>
          ))}
        {images.length < 6 && (
          <div
            className={`flex flex-col items-center justify-center w-[150px] h-[100px] bg-grey-4 rounded-lg border-2 border-gray-400`}
          >
            <input
              className="hidden"
              id="image-input"
              ref={inputRef}
              onChange={handleImageChange}
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
            />
            <label
              htmlFor="image-input"
              className="cursor-pointer w-full h-full"
            >
              <div className="flex justify-center items-center pt-5 pb-6 w-full h-full">
                <BiCar className="fill-gray-200 w-8 h-8" />
                <BiImageAdd className="fill-gray-200 w-10 h-10" />
              </div>
            </label>
          </div>
        )}
      </div>
      <div className="flex justify-between w-full">
        <button onClick={() => setPage(1)} className="btn-big btn-outline-2">
          Voltar
        </button>
        <button onClick={toggleModal} className="btn-big btn-brand">
          Confirmar alterações
        </button>
      </div>
    </div>
  );
};
