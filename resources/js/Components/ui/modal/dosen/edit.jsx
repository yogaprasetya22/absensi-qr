import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import InputError from "@/Components/ui/InputError";
import InputLabel from "@/Components/ui/InputLabel";
import TextInput from "@/Components/ui/TextInput";
import { useEffect } from "react";

export default function Edit({ value }) {
    const {
        data: dataFrom,
        setData,
        patch,
        processing,
        errors,
        reset,
    } = useForm({
        nama: "",
        email: "",
        prodi: "",
        no_hp: "",
        alamat: "",
    });

    useEffect(() => {
        setData({
            nama: value?.name,
            email: value?.email,
            prodi: value?.dosen?.prodi_id,
            no_hp: value?.dosen?.no_hp,
            alamat: value?.dosen?.alamat,
        });
    }, [value]);

    const { prodi } = usePage().props;

    const submit = (e) => {
        e.preventDefault();
        patch(route("admin.dosen.update", value?.id), {
            onSuccess: () => {
                window.my_modal_2.close();
            },
        });
    };
    return (
        <dialog
            id="my_modal_2"
            className="modal backdrop-blur-sm backdrop-brightness-75"
        >
            <div className="modal-box w-full max-w-2xl overflow">
                <div className="w-full flex flex-row justify-between items-center  z-10">
                    <h1 className="text-2xl font-bold text-black">
                        Edit dosen
                    </h1>
                    <button
                        onClick={() => {
                            window.my_modal_2.close();
                        }}
                        className="text-2xl hover:text-gray-400 select-none"
                        aria-label="close modal"
                    >
                        <i className="fas fa-times text-sm"></i>
                    </button>
                </div>
                <form
                    onSubmit={submit}
                    className=" w-full flex flex-col gap-5 justify-center py-5"
                >
                    <div className="flex flex-row gap-5 w-full">
                        <div className="w-full flex flex-col gap-2">
                            <InputLabel value="Nama" />
                            <TextInput
                                className="input-text"
                                value={dataFrom.nama}
                                onChange={(e) =>
                                    setData("nama", e.target.value)
                                }
                            />
                            <InputError message={errors.nama} />
                        </div>
                    </div>
                    <div className="flex flex-row gap-5 w-full">
                        <div className="w-full flex flex-col gap-2">
                            <InputLabel value="Email" />
                            <TextInput
                                className="input-text"
                                value={dataFrom.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError message={errors.email} />{" "}
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <InputLabel value="Prodi" />
                            <select
                                value={dataFrom.prodi}
                                onChange={(e) =>
                                    setData("prodi", e.target.value)
                                }
                                className="input-text"
                            >
                                <option value="" disabled>
                                    Pilih Prodi
                                </option>
                                {prodi.map((item, index) => (
                                    <option key={index} value={item.id}>
                                        {item.nama_prodi}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.prodi} />{" "}
                        </div>
                    </div>
                    <div className="flex flex-row gap-5 w-full">
                        <div className="w-full flex flex-col gap-2">
                            <InputLabel value="No HP" />
                            <TextInput
                                className="input-text"
                                value={dataFrom.no_hp}
                                onChange={(e) =>
                                    setData("no_hp", e.target.value)
                                }
                            />
                            <InputError message={errors.no_hp} />{" "}
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <InputLabel value="Alamat" />
                            <TextInput
                                className="input-text"
                                value={dataFrom.alamat}
                                onChange={(e) =>
                                    setData("alamat", e.target.value)
                                }
                            />
                            <InputError message={errors.alamat} />{" "}
                        </div>
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 p-2 rounded-md text-white"
                            disabled={processing}
                        >
                            Tambah dosen
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}
