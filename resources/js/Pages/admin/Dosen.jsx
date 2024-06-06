import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";

export default function Dosen({ data }) {
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [page, setPage] = useState(5);
    const [dataModal, setDataModal] = useState([]);

    useEffect(() => {
        setLoading(true);
        const endOffset = parseInt(itemOffset) + parseInt(page);
        const sortData = data
            .sort((a, b) => {
                return a.id - b.id;
            })
            .slice(itemOffset, endOffset);
        setCurrentItems(sortData);
        setPageCount(Math.ceil(data.length / page));
        setLoading(false);
    }, [itemOffset, data, page]);

    const handlePageClick = (event) => {
        window.scrollTo({
            top: 60,
            behavior: "smooth",
        });

        const newOffset = (event.selected * page) % data.length;

        setItemOffset(newOffset);
    };

    console.log(currentItems);
    return (
        <AdminLayout>
            <div className="px-5 w-full py-3 flex flex-col gap-5">
                {/* button tambah dosen */}
                <div className="flex justify-end">
                    <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
                        Tambah Dosen
                    </button>
                </div>
                <div className="overflow-x-auto ">
                    <table className="table bg-white">
                        <thead className="bg-teal-600">
                            <tr>
                                <th className="text-lg text-white">nid</th>
                                <th className="text-lg text-white">nama</th>
                                <th className="text-lg text-white">email</th>
                                <th className="text-lg text-white">prodi</th>
                                <th className="text-lg text-white">no hp</th>
                                <th className="text-lg text-white">alamat</th>
                                <th className="text-lg text-white">aksi</th>
                            </tr>
                        </thead>
                        {currentItems.map((item, index) => (
                            <tbody key={index}>
                                <tr>
                                    <th className="text-md">
                                        {item.dosen.nid}
                                    </th>
                                    <th className="text-md">{item.name}</th>
                                    <th className="text-md">{item.email}</th>
                                    <th className="text-md">
                                        {item.dosen.prodi.nama_prodi}
                                    </th>
                                    <th className="text-md">
                                        {item.dosen.no_hp}
                                    </th>
                                    <th className="text-md max-w-[8rem] truncate">
                                        {item.dosen.alamat}
                                    </th>
                                    <td className="border-x text-xs font-medium text-gray-500 uppercase tracking-wider text-center space-x-2">
                                        {/* edit and delete */}
                                        <button
                                            onClick={() => {
                                                setDataModal(item);
                                                window.my_modal_2.show();
                                            }}
                                            className="bg-yellow-500 p-2 rounded-md"
                                        >
                                            <i className="text-white fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="bg-red-600 p-2 rounded-md"
                                            onClick={() => {
                                                setDataModal(item);
                                                window.my_modal_3.show();
                                            }}
                                        >
                                            <i className="text-white fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                    <div className="flex justify-center items-center py-5">
                        <ReactPaginate
                            className="flex flex-row gap-1 w-full justify-center items-center select-none pr-10"
                            nextLabel="Next"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={1}
                            pageCount={pageCount}
                            previousLabel="Previous"
                            pageClassName=" text-sm border  p-2 rounded-md "
                            pageLinkClassName=" rounded-md  px-2 py-2 font-semibold font-roboto"
                            previousClassName=" p-2 rounded-md shadow-sh-box-sm bg-teal-600 text-white hover:scale-105 hover:scale text-xs"
                            previousLinkClassName="text-xs p-2  font-semibold font-roboto"
                            nextClassName=" p-2 rounded-md shadow-sh-box-sm bg-teal-600 text-white hover:scale-105 hover:scale text-xs"
                            nextLinkClassName="text-xs p-2  font-semibold font-roboto "
                            breakLabel="..."
                            breakClassName=" p-2 rounded-md text-teal-600"
                            breakLinkClassName="text-sm font-semibold font-roboto "
                            containerClassName="pagination"
                            activeClassName=" bg-transparan border border-yellow-600 text-yellow-600"
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
