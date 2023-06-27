import SellerCarCard from "@/components/sellerCarCard";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Pagination } from "@/components/pagination";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { iUser } from "./interface";
import { ICarsReturn } from "@/interfaces/cars.interfaces";
import { API } from "@/services/apis";
import { useRouter } from "next/router";
import CommonUserCarCard from "@/components/commonUserCard";
import { useAuth } from "@/contexts/authContext";
import { ModalCreateAnnouncement } from "@/components/Modals/ModalCreateAnnouncement/ModalCreateAnnouncement";

const SellerPage = () => {
  const router = useRouter();

  const arr = [1, 12, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const cardsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [userCars, setUserCars] = useState<ICarsReturn[]>([]);
  const [sellerUser, setSellerUser] = useState<iUser | undefined>();
  const [loggedUser, setLoggedUser] = useState<boolean>(true);
  const [modalCreateAnnouncement, setModalCreateAnnouncement] = useState(false);
  const { user } = useAuth();

  const toggleModalCreateAnnouncement = () =>
    setModalCreateAnnouncement(!modalCreateAnnouncement);

  const paramId = router.query.id;

  useEffect(() => {
    const cookies = parseCookies();
    if (!cookies.token) {
      setLoggedUser(false);
    }

    const getUserCars = async () => {
      try {
        const carResponse = await API.get("/cars");

        const carData = carResponse.data.cars;

        const carsFromUser: ICarsReturn[] = carData.filter((elem: any) => {
          return elem.user.id == paramId;
        });

        const response = await API.get("/users/" + paramId);

        const data = response.data;

        if (data.id === user.id && data.isSeller === false) router.push("/");

        setSellerUser(data);

        setUserCars(carsFromUser);
      } catch (error) {
        router.push("/");
      }
    };
    if (paramId) getUserCars();
  }, [paramId, user.id, router]);

  if (!sellerUser) return;
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="h-screen flex flex-col justify-start">
      <Header />
      <section className="relative">
        <div className="bg-brand-1 w-full h-[360px]"></div>
        <div className=" w-11/12 mx-auto max-w-[1204px]">
          <div className="absolute bg-white top-0 mt-[75px] z-[5] w-11/12 max-w-[1204px] rounded border py-[40px] px-[29px] mx-auto">
            <p className="p-0 m-0 flex items-center justify-center text-white bg-brand-1 text-heading2  w-[104px] h-[104px] rounded-full mb-6">
              {sellerUser.name.split("")[0]}
            </p>
            <div className="flex gap-2 items-center mb-6">
              <p className="font-600 text-heading6 text-grey-1 capitalize">
                {sellerUser.name}
              </p>
              <span className="btn-brand-white font-500 py-1 px-2 rounded ">
                Anunciante
              </span>
            </div>
            <p className="text-grey-2 font-400 text-base text mb-6">
              {sellerUser.description
                ? sellerUser.description
                : "Este usuário não possui descrição"}
            </p>
            {loggedUser ? (
              user!.id == sellerUser.id ? (
                <button
                  onClick={toggleModalCreateAnnouncement}
                  className="btn-brand-white bg-white border-[1.5px] font-600 border-brand-1 py-3 px-7 rounded"
                >
                  Criar anuncio
                </button>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </section>

      <main
        className={`bg-grey-8 w-full h-full mb-72 ${
          !userCars.length ? "mb-72" : "mt-[-10rem]"
        }  flex flex-col justify-between md:mt-[-200px] `}
      >
        {!userCars.length ? (
          <ul className="bg-grey-8 mt-[-4rem] mb-[-20rem] md:mt-[-4rem] md:mb-[-20rem] mx-auto w-11/12 flex flex-col gap-12 md:flex-row md:flex-wrap">
            <div className="relative bottom-5 md:z-0 md:top-48 2xl:top-56 mt-52 w-full border border-grey-1 p-4 max-w-[1204px] bg-grey-8 mx-auto flex text-center flex-col gap-12 md:flex-row md:flex-wrap items-center justify-center">
              <p className="text-3xl font-600 text-grey-1">
                Este usuário não possui anúncios cadastrados
              </p>
            </div>
          </ul>
        ) : (
          <div className=" md:mt-[-5rem] md:mb-[-150px]">
            <ul
              className={`mt-44 h-full md:mt-60 ${
                userCars.length < 16 ? "mb-10" : ""
              } list-none w-full bg-grey-8 mx-auto flex flex-col gap-12 md:flex-row md:flex-wrap items-center justify-center `}
            >
              {loggedUser === false
                ? userCars.map((elem, index) => (
                    <CommonUserCarCard
                      key={index}
                      description={elem.description}
                      brand={elem.brand}
                      id={elem.id}
                      model={elem.model}
                      price={elem.price}
                      quilometers={elem.quilometers}
                      year={elem.year}
                      published={elem.published}
                      user={elem.user.name}
                      frontImage={elem.frontImage}
                    />
                  ))
                : String(user!.id) !== paramId
                ? userCars.map((elem) => (
                    <CommonUserCarCard
                      key={elem.id + Math.random()}
                      description={elem.description}
                      brand={elem.brand}
                      id={elem.id}
                      model={elem.model}
                      price={elem.price}
                      quilometers={elem.quilometers}
                      year={elem.year}
                      published={elem.published}
                      user={elem.user.name}
                      frontImage={elem.frontImage}
                    />
                  ))
                : userCars.map((elem) => (
                    <SellerCarCard
                      key={elem.id + Math.random()}
                      description={elem.description}
                      brand={elem.brand}
                      id={elem.id}
                      model={elem.model}
                      price={elem.price}
                      quilometers={elem.quilometers}
                      year={elem.year}
                      published={elem.published}
                      frontImage={elem.frontImage}
                    />
                  ))}
            </ul>
          </div>
        )}
        {userCars.length > 16 && (
          <div className="col-span-4 mb-[62.5px] mt-[62.5px]">
            <Pagination
              totalPages={Math.ceil(arr.length / cardsPerPage)}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </main>
      <Footer />
      {modalCreateAnnouncement && (
        <ModalCreateAnnouncement toggleModal={toggleModalCreateAnnouncement} />
      )}
    </div>
  );
};

export default SellerPage;
