import QRScene from "@/Components/ui/modal/QRScene";
import Layout from "@/Layouts/Layout";
import React from "react";

export default function MatkulDiajar({ data_matkul }) {
    console.log(data_matkul);
    return (
        <Layout>
            <div className=" w-full px-[5rem] flex flex-col gap-5">
                <div className="w-2/3 flex flex-col gap-5 bg-white shadow-lg rounded-md p-5">
                    <div className="w-full flex justify-between px-2 items-center">
                        <h1 className="text-xl font-bold">Jadwal Kelas</h1>
                    </div>
                    <div className="w-full p-2 bg-gray-100 shadow-sm rounded-md flex flex-row justify-between items-center">
                        <h1 className="text-sm font-bold">
                           2023 / 2024 genap
                        </h1>
                    </div>
                    {data_matkul.map((item, index) => (
                        <div
                            key={index}
                            className="w-full flex flex-col gap-3 border-2 border-gray-300 shadow-sm rounded-md p-5 relative"
                        >
                            <div className="w-full flex justify-between">
                                <h1 className="text-lg font-bold">
                                    {item.matkul.nama_matkul}
                                </h1>
                            </div>
                            <div className="flex flex-row  gap-14">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-row gap-3 items-center">
                                        <i className="fas fa-clock text-md text-gray-300"></i>
                                        <p className="text-sm">
                                            {/* {item.matkul.daftar_kelas[0]
                                                .presensi.jam_mulai +
                                                " - " +
                                                item.matkul.daftar_kelas[0]
                                                    .presensi.jam_selesai} */}
                                        </p>
                                    </div>
                                    <div className="flex flex-row gap-3 items-center">
                                        <i className="fas fa-user text-md text-gray-300"></i>
                                        <p className="text-sm">
                                            {item.matkul.prodi.dosen.user.name}
                                        </p>
                                    </div>
                                    <div className="flex flex-row gap-3 items-center">
                                        <i className="fas fa-home text-md text-gray-300"></i>
                                        <p className="text-sm">
                                            {/* {
                                                item.matkul.daftar_kelas[0]
                                                    .kelas.ruangan
                                            } */}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-row gap-3 items-center">
                                        <i className="fas fa-calendar text-md text-gray-300"></i>
                                        <p className="text-sm">
                                            {item.matkul.sks}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex justify-end absolute bottom-0 right-0 p-3">
                                <button
                                    className="border-2 border-gray-300 text-gray-500 px-3 py-1 rounded-md"
                                    // onClick={() => {
                                    //     setDataModal({
                                    //         data: item.matkul.mahasiswa,
                                    //         title: item.matkul.nama_matkul,
                                    //     });
                                    //     window.my_modal_2.show();
                                    // }}
                                >
                                    <i className="fas fa-users text-md text-gray-400 pr-2"></i>{" "}
                                    Lihat Mahasiswa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
