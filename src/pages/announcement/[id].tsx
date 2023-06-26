import Image from "next/image";
import { useRouter } from "next/router";
import { ReactEventHandler, useEffect, useState } from "react";
import Link from "next/link";

import Header from "@/components/header";
import { CardDetail } from "@/components/cardDetail";
import { CommentsList } from "@/components/commentsList";
import { UserBadge } from "@/components/userBadge";
import Footer from "@/components/footer";
import { CarImageComponent } from "@/components/carImageComponent";
import { API } from "@/services/apis";
import { CarImage, ICarsReturn } from "@/interfaces/cars.interfaces";
import { iUserBody } from "@/interfaces/user.interfaces";
import ModalCarImage from "@/components/Modals/modalCarImage";

const Announcement = () => {
  const router = useRouter();
  const [car, setCar] = useState({} as ICarsReturn);
  const [user, setUser] = useState({} as iUserBody);

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;

      API.get(`/cars/${id}`).then((carResponse) => {
        API.get(`/users/${carResponse.data.userId}`).then((response) => {
          setCar(carResponse.data);
          setUser(response.data);
        });
      });
    }
  }, [router.isReady]);

  console.log(user)
  console.log(car)

  const [isLoggedIn, setIsloggedIn] = useState(false);
  const disable = isLoggedIn ? false : true;
  let userInitials = "";

  if (user.name) {
    const userName = user.name.split(" ");
    userName.forEach((name) => {
      userInitials += name[0];
    });
  }

  let carImages: React.JSX.Element[] = [];
  const [carImage, setCarImage] = useState("")
  const [isClicked, setIsclicked] = useState(false)
  const [openImageModal, setOpenImageModal] = useState(false)
  const toggleModal = () => {
    setOpenImageModal(!openImageModal)
  }

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    const foundImage = car.images.find(image => image.id === parseInt(target.id))
    foundImage && setCarImage(foundImage.imageUrl)
    toggleModal()
  }
  
  if (car.images) {
    carImages = car.images.map((image: CarImage) => {
      return <CarImageComponent key={image.id} id={(image.id).toString()} carImage={image} callback={handleImageClick} />;
    });
  }


  return (
    <>
      <Header />
      <div className="bg-brand-1 h-[436px] w-full absolute z-0"></div>
      <div className="bg-grey-8">
        <main className="grid gap-4 grid-cols-1 w-11/12 mx-auto my-10 relative z-1 md:grid-cols-3 md:max-w-6xl">
          <div className="bg-grey-10 rounded h-[355px] md:col-start-1 md:col-end-3 ">
            <Image
              width={351}
              height={355}
              src={car.frontImage}
              alt="Foto de um carro"
              className="mt-[70px] mx-auto"
            />
          </div>

          <div className="bg-grey-10 rounded p-7 md:col-span-2 md:row-span-1">
            <h6 className="text-heading6 text-grey-1 font-lexend font-600 mb-[71px]">
              {`${car.brand} ${car.model}`}
            </h6>
            <div className="mb-6">
              <div className="flex gap-3 mb-8">
                <CardDetail text={`${car.quilometers} KM`} />
                <CardDetail text={car.year} />
              </div>
              <p className="text-heading7 text-grey-1 font-500 font-lexend">
                {`R$ ${car.price},00`}
              </p>
            </div>
            <button
              className="mb-10 btn-brand p-2 text-sm font-600 font-inter rounded"
              disabled={disable}
            >
              Comprar
            </button>
          </div>

          <div className="bg-grey-10 rounded p-7 md:col-start-1 md:col-end-3">
            <h6 className="text-heading6 text-grey-1 font-lexend font-600 mb-8">
              Descrição
            </h6>
            <p className="text-base text-grey-2 font-400 font-inter leading-7">
              {car.description}
            </p>
          </div>

          <div className="bg-grey-10 rounded p-7 md:row-start-1 md:col-start-3">
            <h6 className="text-heading6 text-grey-1 font-lexend font-600 mb-8">
              Fotos
            </h6>
            <ul className="grid grid-cols-3 gap-x-[5.5px] gap-y-12 overflow-hidden">
              {carImages}
            </ul>
          </div>
          <div className="bg-grey-10 rounded p-7 grid justify-center md:row-start-2 md:col-start-3 md:row-span-1">
            <div className="flex flex-col items-center justify-center gap-7">
              <div
                className={`h-[77px] w-[77px] bg-brand-1 text-white text-[26px] font-500 font-inter rounded-full p-2 flex items-center justify-center`}
              >
                {userInitials}
              </div>
              <h6 className="text-heading6 text-grey-1 font-lexend font-600 mb-8">
                {user.name}
              </h6>
              <p className="text-base text-grey-2 font-400 font-inter leading-7 text-center">
                {user.description}
              </p>
              <Link
                href={`/seller/${user.id}`}
                className="bg-grey-0 font-inter font-600 text-base text-white p-2 rounded"
              >
                Ver todos anúncios
              </Link>
            </div>
          </div>
          <div className="bg-grey-10 rounded px-7 py-9 md:col-start-1 md:col-end-3">
            <CommentsList />
          </div>
          <div className="bg-grey-10 rounded p-7 grid gap-6 md:col-start-1 md:col-end-3">
            <UserBadge
              bg_color="bg-brand-1"
              initials_color="text-white"
              name_color="grey-1"
              name={user.name}
            />
            <form className="relative">
              <textarea
                name=""
                id=""
                className="w-full h-[128px] p-3 border-solid border-grey-7 border-[1.5px] rounded text-grey-3 font-inter font-400 focus:border-brand-2 focus:border-[1.5px] focus:outline-none"
                placeholder="Digitar comentário"
                disabled={disable}
              ></textarea>
              <button
                className="absolute bottom-6 right-4 btn-brand p-2 text-sm font-600 font-inter rounded"
                disabled={disable}
              >
                Comentar
              </button>
            </form>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-grey-7 text-grey-3 text-xs font-inter font-500 flex items-center px-3 py-1 rounded-3xl">
                Gostei muito!
              </span>
              <span className="bg-grey-7 text-grey-3 text-xs font-inter font-500 px-3 py-1 flex items-center rounded-3xl">
                Incrível
              </span>
              <span className="bg-grey-7 text-grey-3 text-xs font-inter font-500 px-3 py-1 flex items-center rounded-3xl">
                Recomendarei para meus amigos!
              </span>
            </div>
          </div>
        </main>
        {openImageModal && <ModalCarImage toggleModal={toggleModal} carImage={carImage} /> }
        <Footer />
      </div>
    </>
  );
};

export default Announcement;
