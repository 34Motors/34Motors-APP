import SellerCarCard from "@/components/sellerCarCard";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Pagination } from "@/components/pagination";
import axios from "axios";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { iUser } from "./interface";
import { ICarsReturn } from "@/interfaces/cars.interfaces";


const SellerPage = () => {
    const arr = [1, 12, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    const cardsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [userCars, setUserCars] = useState([]);
    const [user, setUser] = useState<iUser | undefined>();

    useEffect(() => {

        const cookies = parseCookies()
        const user: iUser = JSON.parse(cookies.user)

        setUser(user)

        const getUsers = async () => {

            const carResponse = await axios.get("http://localhost:4002/cars")

            const carData = carResponse.data

            carData.filter((elem: any) => {
                elem.UserId === user.id
            })
            setUserCars(carData)
        }

        getUsers()
    }, [])

    if (!user) return
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex flex-col justify-between">
            <Header />
            <section className="relative">
                <div className="bg-brand-1 w-full h-[360px]"></div>
                <div className=" w-11/12 mx-auto max-w-[1204px]">
                    <div className="absolute bg-white top-0 mt-[75px] z-[5] w-11/12 max-w-[1204px] rounded border py-[40px] px-[29px] mx-auto">
                        <p className="p-0 m-0 flex items-center justify-center text-white bg-brand-1 text-heading2  w-[104px] h-[104px] rounded-full mb-6">{user.name.split("")[0]}</p>
                        <div className="flex gap-2 items-center mb-6">
                            <p className="font-600 text-heading6 text-grey-1 capitalize">{user.name}</p>
                            <span className="btn-brand-white font-500 py-1 px-2 rounded ">anunciante</span>
                        </div>
                        <p className="text-grey-2 font-400 text-base text mb-6">{user.description ? user.description : "este usuário não possui descrição"}</p>
                        <button className="btn-brand-white bg-white border-[1.5px] font-600 border-brand-1 py-3 px-7 rounded">criar anuncio</button>
                    </div>
                </div>
            </section>
            <main className="bg-grey-8 w-full flex flex-col justify-between">
                {!userCars.length ? (
                    <ul className="bg-grey-8 mx-auto w-11/12 flex flex-col gap-12 md:flex-row md:flex-wrap mb-10">
                        <div className="mt-52 w-full border border-grey-1 p-4 max-w-[1204px] bg-grey-8 mx-auto flex text-center flex-col gap-12 md:flex-row md:flex-wrap items-center justify-center">
                            <p className="text-3xl font-600 text-grey-1">Este usuário não possui anúncios cadastrados</p>
                        </div>
                    </ul>
                ) : (
                    <div className="mt-40 list-none w-full bg-grey-8 mx-auto flex flex-col gap-12 md:flex-row md:flex-wrap items-center justify-center ">
                        {userCars?.map((elem: ICarsReturn) => <SellerCarCard key={elem.id + Math.random()} elem={elem} />)}
                    </div>
                )}

                {userCars.length > 0 &&
                    <div className="col-span-4 mb-[62.5px] mt-[62.5px]">
                        <Pagination
                            totalPages={Math.ceil(arr.length / cardsPerPage)}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                }
                <Footer />
            </main >
        </div>
    );
}

export default SellerPage;