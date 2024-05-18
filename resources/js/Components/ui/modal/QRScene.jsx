import { router } from "@inertiajs/react";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");
import React from "react";
import { useEffect } from "react";
import { QrReader } from "react-qr-reader";

export default function QRScene({ setOpen, dataQr }) {
    const [result, setResult] = React.useState(null);

    const handleScan = () => {
        if (!!result && dataQr) {
            const get_url = result.split("?")[1];
            const get_kelas_id = get_url.split("&")[0].split("=")[1];
            const get_matkul_id = get_url.split("&")[1].split("=")[1];
            if (
                parseInt(get_kelas_id) ===
                    parseInt(dataQr.mahasiswa_kelas_id) &&
                parseInt(get_matkul_id) === parseInt(dataQr.mahasiswa_matkul_id)
            ) {
                router.post(
                    result,
                    {
                        tanggal: moment().format("YYYY-MM-DD"),
                        jam_masuk: moment().format("HH:mm:ss"),
                    },
                    {
                        onSuccess: () => {
                            setOpen(false);
                            window.my_modal_1.close();
                        },
                    }
                );
            } else {
                alert("QR Code tidak sesuai dengan matakuliah ini!");
            }
        }
    };

    useEffect(() => {
        handleScan();
    }, [result, dataQr]);

    return (
        <dialog
            id="my_modal_1"
            className="modal backdrop-blur-sm backdrop-brightness-75"
        >
            <div className="modal-box w-full max-w-1xl overflow">
                <div className=" w-full flex flex-col gap-5">
                    <div className="w-full flex flex-row justify-between items-center -mb-[4rem] z-10">
                        <h1 className="text-2xl font-bold text-gray-500">
                            Delete owner
                        </h1>
                        <button
                            onClick={() => {
                                setOpen(false);
                                window.my_modal_1.close();
                            }}
                            className="text-2xl btn bg-transparent border-none hover:text-gray-400 hover:bg-transparent"
                            aria-label="close modal"
                        >
                            <i className="fas fa-times text-sm"></i>
                        </button>
                    </div>
                    <div className="w-full flex justify-center ">
                        <QrReader
                            className="w-full"
                            onResult={(result) => {
                                if (!!result) {
                                    setResult(result?.text);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </dialog>
    );
}
