import QRGenerate from "@/Components/ui/modal/QRGenerate";
import Layout from "@/Layouts/Layout";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");
import React from "react";
import { useEffect } from "react";
import Kehadiran from "@/Components/ui/modal/Kehadiran";
import BukaAbsensi from "@/Components/ui/modal/BukaAbsensi";

export default function Index({ auth, matkul: data_mahasiswa }) {
    const [dataModal, setDataModal] = React.useState([]);
    const [title, setTitle] = React.useState("");
    const [dataQr, setDataQr] = React.useState({
        kelas_id: null,
        matkul_id: null,
    });
    const [data, setData] = React.useState(data_mahasiswa);
    const [date, setDate] = React.useState(new Date());
    const [open, setOpen] = React.useState(false);
    const [doubleTap, setDoubleTap] = React.useState(false);

    useEffect(() => {
        const filteredData = data_mahasiswa.filter(
            (item) =>
                moment(item.tanggal).format("YYYY-MM-DD") ===
                moment(date).format("YYYY-MM-DD")
        );
        setData(filteredData);
    }, [date, data_mahasiswa]);

    useEffect(() => {
        if (doubleTap) {
            setOpen(true);
            window.my_modal_1.show();
        }
    }, [doubleTap]);

    const handleDate = (e) => {
        setDate(e.target.value);
    };

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        // Pad single digit month and day with leading zero if needed
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }

        return `${year}-${month}-${day}`;
    };
    return (
        <Layout>
            <QRGenerate
                value={`${window.location.origin}/api/absensi?kelas_id=${dataQr.kelas_id}&matkul_id=${dataQr.matkul_id}`}
                title={title}
            />
            <Kehadiran data={dataModal} />
            <BukaAbsensi value={dataModal} />
            <div className=" w-full px-[5rem] flex flex-col gap-5">
                <div className="w-full flex flex-row gap-5 bg-white shadow-lg rounded-md">
                    <img
                        src="welcome.jpeg"
                        alt=""
                        className="h-[13rem] w-[14rem] bg-cover"
                    />
                    <div className="flex flex-col gap-2 py-5 w-1/3">
                        <h1 className="text-2xl font-bold">
                            Hai, {auth.user.name}
                        </h1>
                        <p className="text-sm">
                            Selamat datang di Sistem Presensi Kelas Universitas
                            Nasional. Silahkan melakukan pindai kode QR dengan
                            mengetuk ikon QR pada kelas hari ini untuk melakukan
                            presensi.
                        </p>
                    </div>
                </div>
                <div className="w-2/3 flex flex-col gap-5 bg-white shadow-lg rounded-md p-5">
                    <div className="w-full flex justify-between px-2 items-center">
                        <h1 className="text-xl font-bold border-b-2">
                            Jadwal Kelas
                        </h1>

                        <input
                            id="date"
                            type="date"
                            className=" border-b-2 border-t-0 border-x-0 border-gray-300 shadow-sm p-2
                            "
                            value={
                                moment(date).format("YYYY-MM-DD") ||
                                getTodayDate()
                            }
                            onChange={handleDate}
                        />
                    </div>
                    <div className="w-full p-2 bg-gray-100 shadow-sm rounded-md flex flex-row justify-between items-center">
                        <h1 className="text-sm font-bold">
                            {moment(date).format("dddd, DD MMMM YYYY")}
                        </h1>
                    </div>
                    {!data || !data.length ? (
                        <div className="w-full flex justify-center  border-2 border-gray-300 shadow-sm rounded-md p-5 py-14">
                            <h1 className="text-lg font-bold">
                                Tidak ada jadwal kelas hari ini
                            </h1>
                        </div>
                    ) : (
                        data &&
                        data.map((item, index) => (
                            <div
                                key={index}
                                className="w-full flex flex-col gap-3 border-2 border-gray-300 shadow-sm rounded-md p-5 relative"
                            >
                                <div className="w-full flex justify-between">
                                    <h1 className="text-lg font-bold">
                                        {item.matkul.nama_matkul}
                                    </h1>
                                    <button
                                        className="flex items-center gap-3 border-b"
                                        onClick={() => {
                                            if (!doubleTap) {
                                                setDoubleTap(true);
                                                setTimeout(() => {
                                                    setDoubleTap(false);
                                                }, 100);
                                                setOpen(true);
                                                setDataQr({
                                                    kelas_id: item.id,
                                                    matkul_id: item.matkul.id,
                                                });
                                                setTitle(
                                                    item.matkul.nama_matkul
                                                );
                                                window.my_modal_1.show();
                                            }
                                        }}
                                    >
                                        Pindah Kode QR{" "}
                                        <i className="fas fa-qrcode text-lg text-gray-400"></i>
                                    </button>
                                </div>
                                <div className="flex flex-row  gap-14">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-row gap-3 items-center">
                                            <i className="fas fa-clock text-md text-gray-300"></i>
                                            <p className="text-sm">
                                                {item.jam_mulai +
                                                    " - " +
                                                    item.jam_selesai}
                                            </p>
                                        </div>
                                        <div className="flex flex-row gap-3 items-center">
                                            <i className="fas fa-user text-md text-gray-300"></i>
                                            <p className="text-sm">
                                                {
                                                    item.matkul.prodi.dosen.user
                                                        .name
                                                }
                                            </p>
                                        </div>
                                        <div className="flex flex-row gap-3 items-center">
                                            <i className="fas fa-home text-md text-gray-300"></i>
                                            <p className="text-sm">
                                                {item.ruangan.nama_ruang}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-row gap-3 items-center">
                                            <i className="fas fa-calendar text-md text-gray-300"></i>
                                            <p className="text-sm">
                                                Pertemuan {item.pertemuan}
                                            </p>
                                        </div>
                                        <div className="flex flex-row gap-3 items-center ">
                                            <button
                                                className="flex flex-row gap-3 items-center"
                                                onClick={() => {
                                                    setDataModal({
                                                        data: item.matkul.prodi
                                                            .mahasiswa,
                                                        title: item.matkul
                                                            .nama_matkul,
                                                        prodi: item.matkul.prodi
                                                            .nama_prodi,
                                                        kelas_id: item.id,
                                                        pertemuan:
                                                            item.pertemuan,
                                                    });
                                                    window.my_modal_3.show();
                                                }}
                                            >
                                                <i
                                                    className={`fas fa-users text-md ${
                                                        item.buka_absen
                                                            ? "text-green-400"
                                                            : "text-gray-300"
                                                    }`}
                                                ></i>
                                                <p className="text-sm">
                                                    {item.buka_absen
                                                        ? "Absensi Terbuka"
                                                        : "Buka Absensi"}
                                                </p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex gap-2 justify-end absolute bottom-0 right-0 p-3">
                                    <button
                                        className="border-2 border-gray-300 text-gray-500 px-3 py-1 rounded-md"
                                        onClick={() => {
                                            setDataModal({
                                                data: item.matkul.prodi
                                                    .mahasiswa,
                                                title: item.matkul.nama_matkul,
                                                prodi: item.matkul.prodi
                                                    .nama_prodi,
                                                kelas_id: item.id,
                                            });
                                            window.my_modal_2.show();
                                        }}
                                    >
                                        <i className="fas fa-users text-md text-gray-400 pr-2"></i>{" "}
                                        Kehadiran
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Layout>
    );
}
