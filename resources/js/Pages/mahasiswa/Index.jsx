import Layout from "@/Layouts/Layout";
import React from "react";
import QRCode from "react-qr-code";
import { QrReader } from "react-qr-reader";

export default function Index({ data }) {
    const [result, setResult] = React.useState(null);
    return (
        <Layout>
            <QrReader
                className="w-[10rem] h-[10rem]"
                onResult={(result, error) => {
                    if (!!result) {
                        setResult(result?.text);
                    }

                    if (!!error) {
                        console.info(error);
                    }
                }}
                style={{ width: "100%" }}
            />
            {!!result && (
                <div className="mt-4">
                    <h1 className="text-2xl font-bold">Result</h1>
                    <p>{result}</p>
                </div>
            )}
            <QRCode value="https://m-yogaprasetya.vercel.app" />
        </Layout>
    );
}
