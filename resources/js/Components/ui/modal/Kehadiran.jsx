import { useForm } from "@inertiajs/react";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");
import React from "react";
import { useEffect } from "react";

export default function Kehadiran({ data }) {
    const {
        data: dataFrom,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        attendances: [], // Array untuk menyimpan data kehadiran
        tanggal: moment().format("YYYY-MM-DD"),
        jam_masuk: moment().format("HH:mm:ss"),
        kelas_id: "",
    });

    useEffect(() => {
        if (data?.data) {
            const attendances = data.data.map((item) => ({
                mahasiswa_id: item.id,
                status:
                    item?.absensi_mahasiswa?.filter(
                        (absen) => absen?.kelas_id === data?.kelas_id
                    )[0]?.status || "",
            }));

            setData((prevState) => ({
                ...prevState,
                attendances,
                kelas_id: data?.kelas_id,
            }));
        }
    }, [data?.data, data?.kelas_id]);

    const submit = (e) => {
        e.preventDefault();
        post(route("dosen.absensi.store"), {
            onSuccess: () => {
                reset();
                window.my_modal_2.close();
            },
        });
    };

    return (
        <dialog
            id="my_modal_2"
            className="modal backdrop-blur-sm backdrop-brightness-75 "
        >
            <div className="modal-box w-full max-w-3xl overflow ">
                <form
                    onSubmit={submit}
                    className=" w-full flex flex-col gap-2 "
                >
                    <div className="w-full flex flex-row justify-between items-center z-10">
                        <h1 className="text-2xl font-bold text-gray-500">
                            {data?.title}
                        </h1>
                        <button
                            onClick={() => {
                                document
                                    .querySelectorAll(".radio")
                                    .forEach((item) => {
                                        item.checked = false;
                                    });
                                window.my_modal_2.close();
                            }}
                            className="text-2xl hover:text-gray-400 select-none"
                            aria-label="close modal"
                        >
                            <i className="fas fa-times text-sm"></i>
                        </button>
                    </div>
                    <div className="w-full flex justify-between pr-5">
                        {/* tombol untuk hadir semua */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                const updatedAttendances = data.data.map(
                                    (item) => ({
                                        mahasiswa_id: item.id,
                                        status: "hadir",
                                    })
                                );
                                setData("attendances", updatedAttendances);
                            }}
                            className="py-1 px-2 rounded-md bg-success text-white hover:bg-success/70"
                        >
                            Hadir semua
                        </button>
                        <div className="flex flex-row gap-2 items-center">
                            <h1 className="text-sm font-bold bg-success text-white p-2 rounded-sm">
                                Hadir
                            </h1>
                            <h1 className="text-sm font-bold bg-error text-white p-2 rounded-sm">
                                Alpa
                            </h1>
                            <h1 className="text-sm font-bold bg-accent text-white p-2 rounded-sm">
                                Sakit
                            </h1>
                            <h1 className="text-sm font-bold bg-gray-400 text-white p-2 rounded-sm">
                                Izin
                            </h1>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-3 max-h-[20rem] overflow-y-auto overflow_type pr-5">
                        {data?.data?.map((item, index) => (
                            <div
                                key={index}
                                className="w-full p-2 border-b flex flex-row justify-between items-center"
                            >
                                <h1 className="text-sm font-bold flex items-center gap-2">
                                    <i className="fas fa-user text-md text-gray-600"></i>
                                    {item.user.name}
                                </h1>
                                <h1 className="text-sm font-bold">
                                    {item.nim}
                                </h1>
                                <div className="flex flex-row gap-2">
                                    <input
                                        type="radio"
                                        name={`attendance${item.nim}`}
                                        id="hadir"
                                        className="radio radio-success"
                                        required
                                        onChange={(e) => {
                                            const updatedAttendances =
                                                dataFrom.attendances.filter(
                                                    (att) =>
                                                        att.mahasiswa_id !==
                                                        item.id
                                                );
                                            updatedAttendances.push({
                                                mahasiswa_id: item.id,
                                                status: e.target.id,
                                            });
                                            setData(
                                                "attendances",
                                                updatedAttendances
                                            );
                                        }}
                                        checked={
                                            dataFrom.attendances.filter(
                                                (att) =>
                                                    att.mahasiswa_id === item.id
                                            ).length > 0
                                                ? dataFrom.attendances.filter(
                                                      (att) =>
                                                          att.mahasiswa_id ===
                                                          item.id
                                                  )[0].status === "hadir"
                                                : false
                                        }
                                    />
                                    <input
                                        type="radio"
                                        name={`attendance${item.nim}`}
                                        id="alpa"
                                        required
                                        className="radio radio-error"
                                        onChange={(e) => {
                                            const updatedAttendances =
                                                dataFrom.attendances.filter(
                                                    (att) =>
                                                        att.mahasiswa_id !==
                                                        item.id
                                                );
                                            updatedAttendances.push({
                                                mahasiswa_id: item.id,
                                                status: e.target.id,
                                            });
                                            setData(
                                                "attendances",
                                                updatedAttendances
                                            );
                                        }}
                                        checked={
                                            dataFrom.attendances.filter(
                                                (att) =>
                                                    att.mahasiswa_id === item.id
                                            ).length > 0
                                                ? dataFrom.attendances.filter(
                                                      (att) =>
                                                          att.mahasiswa_id ===
                                                          item.id
                                                  )[0].status === "alpa"
                                                : false
                                        }
                                    />
                                    <input
                                        type="radio"
                                        name={`attendance${item.nim}`}
                                        id="sakit"
                                        required
                                        className="radio radio-accent"
                                        onChange={(e) => {
                                            const updatedAttendances =
                                                dataFrom.attendances.filter(
                                                    (att) =>
                                                        att.mahasiswa_id !==
                                                        item.id
                                                );
                                            updatedAttendances.push({
                                                mahasiswa_id: item.id,
                                                status: e.target.id,
                                            });
                                            setData(
                                                "attendances",
                                                updatedAttendances
                                            );
                                        }}
                                        checked={
                                            dataFrom.attendances.filter(
                                                (att) =>
                                                    att.mahasiswa_id === item.id
                                            ).length > 0
                                                ? dataFrom.attendances.filter(
                                                      (att) =>
                                                          att.mahasiswa_id ===
                                                          item.id
                                                  )[0].status === "sakit"
                                                : false
                                        }
                                    />
                                    <input
                                        type="radio"
                                        name={`attendance${item.nim}`}
                                        id="izin"
                                        required
                                        className="radio"
                                        onChange={(e) => {
                                            const updatedAttendances =
                                                dataFrom.attendances.filter(
                                                    (att) =>
                                                        att.mahasiswa_id !==
                                                        item.id
                                                );
                                            updatedAttendances.push({
                                                mahasiswa_id: item.id,
                                                status: e.target.id,
                                            });
                                            setData(
                                                "attendances",
                                                updatedAttendances
                                            );
                                        }}
                                        checked={
                                            dataFrom.attendances.filter(
                                                (att) =>
                                                    att.mahasiswa_id === item.id
                                            ).length > 0
                                                ? dataFrom.attendances.filter(
                                                      (att) =>
                                                          att.mahasiswa_id ===
                                                          item.id
                                                  )[0].status === "izin"
                                                : false
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-row justify-between items-center pr-5 gap-2">
                        {/* keterangan status mahasiswa */}
                        <div className="flex flex-row gap-2">
                            {dataFrom.attendances.filter(
                                (att) => att.status === "hadir"
                            ) && (
                                <h1 className="text-sm font-bold bg-success text-white p-2 rounded-sm">
                                    {
                                        dataFrom.attendances.filter(
                                            (att) => att.status === "hadir"
                                        ).length
                                    }{" "}
                                    Hadir
                                </h1>
                            )}
                            {dataFrom.attendances.filter(
                                (att) => att.status === "alpa"
                            ) && (
                                <h1 className="text-sm font-bold bg-accent text-white p-2 rounded-sm">
                                    {
                                        dataFrom.attendances.filter(
                                            (att) => att.status === "sakit"
                                        ).length
                                    }{" "}
                                    Sakit
                                </h1>
                            )}
                            {dataFrom.attendances.filter(
                                (att) => att.status === "izin"
                            ) && (
                                <h1 className="text-sm font-bold bg-gray-400 text-white p-2 rounded-sm">
                                    {
                                        dataFrom.attendances.filter(
                                            (att) => att.status === "izin"
                                        ).length
                                    }{" "}
                                    Izin
                                </h1>
                            )}
                            {dataFrom.attendances.filter(
                                (att) => att.status === "alpa"
                            ) && (
                                <h1 className="text-sm font-bold bg-error text-white p-2 rounded-sm">
                                    {
                                        dataFrom.attendances.filter(
                                            (att) => att.status === "alpa"
                                        ).length
                                    }{" "}
                                    Alpa
                                </h1>
                            )}
                        </div>
                        <div className="flex flex-row gap-2">
                            <button
                                onClick={() => {
                                    document
                                        .querySelectorAll(".radio")
                                        .forEach((item) => {
                                            item.checked = false;
                                        });
                                    window.my_modal_2.close();
                                }}
                                className="py-1 px-2 rounded-md bg-error text-white hover:bg-error/70"
                            >
                                cancel
                            </button>{" "}
                            <button
                                type="submit"
                                className="py-1 px-2 rounded-md  bg-accent text-white hover:bg-accent/70"
                            >
                                submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </dialog>
    );
}
