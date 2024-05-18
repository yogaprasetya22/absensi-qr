import React from "react";
import QRCode from "react-qr-code";

export default function QRGenerate({ value, title }) {
    return (
        <dialog
            id="my_modal_1"
            className="modal backdrop-blur-sm backdrop-brightness-75"
        >
            <div className="modal-box w-full max-w-md overflow">
                <div className="w-full flex flex-row justify-between items-center  z-10">
                    <h1 className="text-2xl font-bold text-black">
                        {title && title !== "" ? title : "QR Code"}
                    </h1>
                    <button
                        onClick={() => {
                            window.my_modal_1.close();
                        }}
                        className="text-2xl hover:text-gray-400 select-none"
                        aria-label="close modal"
                    >
                        <i className="fas fa-times text-sm"></i>
                    </button>
                </div>
                <div className=" w-full flex gap-5 justify-center py-5">
                    <QRCode value={value} />
                </div>
            </div>
        </dialog>
    );
}
