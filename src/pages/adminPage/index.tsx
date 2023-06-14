import AdminCarCard from "@/components/AdminCarCard";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Pagination } from "@/components/pagination";
import { useState } from "react";


const AdminPage = () => {
    const arr = [1, 12, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,16]
    const cardsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);


    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    return (
        <>
            <Header />
            <section className="relative">
                <div className="bg-brand-1 w-full  h-[360px]"></div>
                <div className=" w-11/12 mx-auto max-w-[1204px]">
                    <div className="absolute bg-white top-0 mt-[75px] z-[5] w-11/12 max-w-[1204px] rounded border py-[40px] px-[29px] mx-auto">
                        <p className="flex items-center text-white bg-brand-1 justify-center w-[104px] h-[104px] rounded-full mb-6">PM</p>
                        <div className="flex gap-2 items-center mb-6">
                            <p className="font-600 text-heading6 text-grey-1">userName</p>
                            <span className="btn-brand-white font-500 py-1 px-2 rounded ">anunciante</span>
                        </div>
                        <p className="text-grey-2 font-400 text-base text mb-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        <button className="btn-brand-white bg-white border-[1.5px] font-600 border-brand-1 py-3 px-7 rounded">criar anuncio</button>
                    </div>
                </div>
            </section>
            <main className="bg-grey-8 w-full">
                <ul className="bg-grey-8 mx-auto w-11/12 flex flex-col gap-12 md:flex-row md:flex-wrap mb-10">
                    <div className="mt-52 w-full bg-grey-8 mx-auto flex flex-col gap-12 md:flex-row md:flex-wrap items-center justify-center ">
                        {arr.map(_ => <AdminCarCard key={Math.random()} />)}
                    </div>
                </ul>
                <div className="col-span-4 mb-[62.5px] mt-[62.5px]">
                    <Pagination
                        totalPages={Math.ceil(arr.length / cardsPerPage)}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
                <Footer />
            </main>
        </>
    );
}

export default AdminPage;