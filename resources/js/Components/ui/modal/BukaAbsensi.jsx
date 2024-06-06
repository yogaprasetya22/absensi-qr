import { router } from "@inertiajs/react";
import React from "react";

export default function BukaAbsensi({ value, title }) {
    const sumbit = (e) => {
        e.preventDefault();
        router.post(
            route("dosen.buka_absen", value.kelas_id),
            {
                kelas_id: value.kelas_id,
            },
            {
                onSuccess: () => {
                    window.my_modal_3.close();
                },
            }
        );
    };
    return (
        <dialog
            id="my_modal_3"
            className="modal backdrop-blur-sm backdrop-brightness-75"
        >
            <div className="modal-box w-full max-w-md overflow">
                <div className="w-full flex flex-row justify-between items-center  z-10">
                    <h1 className="text-2xl font-bold text-black">
                        {title && title !== "" ? title : "Buka Absensi"}
                    </h1>
                    <button
                        onClick={() => {
                            window.my_modal_3.close();
                        }}
                        className="text-2xl hover:text-gray-400 select-none"
                        aria-label="close modal"
                    >
                        <i className="fas fa-times text-sm"></i>
                    </button>
                </div>
                <div className=" w-full flex flex-col gap-5 justify-center py-5">
                    <h1 className="text-lg font-bold text-center">
                        Apakah anda yakin ingin membuka absensi?
                    </h1>
                    <p className="text-sm text-center">
                        Pada pertemuan {value.pertemuan} ini
                    </p>
                    <button
                        onClick={sumbit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Buka Absensi
                    </button>
                </div>
            </div>
        </dialog>
    );
}
