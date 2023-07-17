import Head from "next/head";
import Resizer from "react-image-file-resizer";
import { useState } from "react";
import { storageBucket } from "../firebase";
import axios from "axios";
import UploadFile from "../components/UploadFile";
import ImageComponent from "../components/ImageComponent";
import LoaderComponent from "../components/LoaderComponent";
import { capitalize } from "../functions";

const Home = () => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(true);
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({
    image: "",
    emotion: "",
  });

  const fileUploadAndPredict = async (e) => {
    let files = e.target.files;
    console.log(files);

    if (!files) return;
    setShow(true);
    console.log(files[0]);

    if (files[0] != undefined) {
      const storageRef = storageBucket.ref(files[0].name);
      Resizer.imageFileResizer(files[0], 720, 720, "JPEG", 100, 0, (uri) => {
        console.log(uri);
        storageRef.putString(uri, "data_url").on(
          "state_changed",
          (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            if (percentage === 100) setUploading(false);
            setProgress(percentage);
          },
          (err) => {
            console.log(err);
            setShow(false);
            alert("upload Error");
          },
          async () => {
            const url = await storageRef.getDownloadURL();
            const { data } = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND}predict`,
              {
                photo: url,
              }
            );
            setValues({ image: url, emotion: data.emotion });

            setShow(false);

            setProgress(0);
          }
        );
      });
    }
  };

  return (
    <div>
      <Head>
        <title>Emotion Recoginition</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex min-h-screen flex-col h-full items-center justify-center py-2">
          <div className="flex w-full flex-1 flex-col items-center justify-center text-center">
            <h1 className="text-3xl font-bold">Facial Emotion Recogonition </h1>

            <div className="w-full flex flex-col items-center justify-center">
              <label className="block text-lg font-medium leading-6 text-gray-700">
                {values.emotion && "Emotion: " + capitalize(values.emotion)}
              </label>
              <LoaderComponent
                show={show}
                uploading={uploading}
                progress={progress}
              />
              <ImageComponent image={values.image} />
              <UploadFile fileUploadAndPredict={fileUploadAndPredict} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
