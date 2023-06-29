import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

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
import { commentReturn } from "@/interfaces/comment.interfaces";
import { formatCurrency } from "@/utils/formatingFunctions";
import { useAuth } from "@/contexts/authContext";
import { LoadingScreen } from "@/components/loadingScreen";

const Announcement = () => {
  const router = useRouter();
  const [car, setCar] = useState({} as ICarsReturn);
  const [owner, setOwner] = useState({} as iUserBody);
  const [comments, setComments] = useState([] as commentReturn[]);
  const [loading, setLoading] = useState(true);
  const [carImage, setCarImage] = useState("");
  const [openImageModal, setOpenImageModal] = useState(false);
  const { isLoggedIn, setIsloggedIn, user } = useAuth();

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.token) setIsloggedIn(true);

    const { id } = router.query;
    const getPageDependecies = () => {
      API.get(`/cars/${id}`).then((response) => {
        API.get(`/comments/${id}`).then((commentResponse) => {
          setCar(response.data);
          setOwner(response.data.user);
          setComments(commentResponse.data);
          setLoading(false);
        });
      });
    };

    if (id) getPageDependecies();
  }, [router.query, router.isReady]);

  const disable = isLoggedIn ? false : true;
  let userInitials = "";

  if (owner.name) {
    const userName = owner.name.split(" ");
    userName.forEach((name) => {
      userInitials += name[0];
    });
  }

  let carImages: React.JSX.Element[] = [];

  const toggleModal = () => {
    setOpenImageModal(!openImageModal);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    const foundImage = car.images.find(
      (image) => image.id === parseInt(target.id)
    );
    foundImage && setCarImage(foundImage.imageUrl);
    toggleModal();
  };

  if (car.images) {
    carImages = car.images.map((image: CarImage) => {
      return (
        <CarImageComponent
          key={image.id}
          id={image.id.toString()}
          carImage={image}
          callback={handleImageClick}
        />
      );
    });
  }

  const { register, handleSubmit, reset } = useForm<commentReturn>({});

  const submit = async (data: commentReturn) => {
    try {
      const response = await API.post(`/comments/${car.id}`, data);
      const commentData: commentReturn = response.data;
      setComments([...comments, commentData]);
      reset()
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>
          {car.brand} {car.model} - 34 Motors
        </title>
        <meta
          name="description"
          content="34 Motors é uma aplicação feita em NextJS, como trabalho de conclusão do curso da Kenzie Academy Brasil."
        />
      </Head>
      <Header />
      <div className="bg-brand-1 h-[436px] w-full absolute z-0"></div>
      <div className="bg-grey-8">
        <main className="grid gap-4 grid-cols-1 w-11/12 mx-auto my-10 relative z-1 md:grid-cols-3 md:max-w-6xl">
          <div className="bg-grey-10 rounded h-[355px] md:col-start-1 md:col-end-3 ">
            <Image
              src={car.frontImage}
              width={351}
              height={355}
              alt={`Foto de um ${car.brand} ${car.model}`}
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
                {formatCurrency(car.price)}
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
                className={`h-[77px] w-[77px] capitalize bg-brand-1 text-white text-[26px] font-500 font-inter rounded-full p-2 flex items-center justify-center`}
              >
                {userInitials}
              </div>
              <h6 className="text-heading6 text-grey-1 font-lexend font-600 mb-8">
                {owner.name}
              </h6>
              <p className="text-base text-grey-2 font-400 font-inter leading-7 text-center">
                {owner.description}
              </p>
              <Link
                href={`/seller/${owner.id}`}
                className="bg-grey-0 font-inter font-600 text-base text-white p-2 rounded"
              >
                Ver todos anúncios
              </Link>
            </div>
          </div>
          <div className="bg-grey-10 rounded px-7 py-9 md:col-start-1 md:col-end-3">
            <CommentsList comments={comments} />
          </div>
          <div className="bg-grey-10 rounded p-7 grid gap-6 md:col-start-1 md:col-end-3">
            {user.name && (
              <UserBadge
                bg_color="bg-brand-1"
                initials_color="text-white"
                name_color="grey-1"
                name={user.name}
              />
            )}
            <form className="relative" onSubmit={handleSubmit(submit)}>
              <textarea
                id=""
                className="w-full h-[128px] p-3 border-solid border-grey-7 border-[1.5px] rounded text-grey-3 font-inter font-400 focus:border-brand-2 focus:border-[1.5px] focus:outline-none"
                placeholder="Digitar comentário"
                disabled={disable}
                {...register("description")}
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
        {openImageModal && (
          <ModalCarImage toggleModal={toggleModal} carImage={carImage} />
        )}
        <Footer />
      </div>
    </>
  );
};

export default Announcement;
