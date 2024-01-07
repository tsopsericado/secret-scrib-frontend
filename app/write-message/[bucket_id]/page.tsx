"use client"
import Link from "next/link";
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from "react";

import { MdSend } from "react-icons/md";
import { API_URL } from "../../_components/constant";
import { useParams } from "next/navigation";
import { IBucket } from "@/app/_services/utils";
import RedirectPopup from "@/app/_components/popup";

export default function page() {
  const [content, setContent] = useState('');
  const [bucket, setBucket] = useState<IBucket | null>(null);
  const [successMessage, SetSuccessMessage] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const params = useParams<{ bucket_id: string }>();

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
  };

  const sendMessage = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URL + '/message', { content, bucket_id: params.bucket_id });
      const { message } = response.data;
      console.log(message)
      SetSuccessMessage(true)
      // Do something with the retrieved message
    } catch (error) {
      console.error('Error:', error);
    }
    // Open the popup
    setIsPopupOpen(true);

    setContent('')
  };

  const handleClose = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const fetchBucket = async () => {
      try {
        const { data } = await axios.get<IBucket>(API_URL + '/bucket/' + params.bucket_id);
        console.log(data)
        setBucket(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBucket();
  }, []);



  return (
    <div className="bg-gradient-to-tr from-green to-cream text-white min-h-screen bg-gradie flex items-center justify-center">
      <div className="w-[25%] sm:w-[25%] h-[45%] py-10 rounded shadow-2xl px-9 bg-gradient-to-t from-cream to-green">

        {/* success message  */}
        {successMessage && (
          <p className="text-sm font-extrabold text-lime-100 mb-4 flex justify-center">Message sent successfully 🎉 </p>
        )}
        <h1 className="text-2xl font-extrabold font-sans items-center mb-10">
          😅 Say Something... <br />
          <p className="text-xl italic">{bucket ? `about: ${bucket.title}` : ''}</p>
        </h1>

        {/* Write secret message */}
        <form onSubmit={sendMessage}>
          <div className="">
            <p className="text-sm">What is that you always want to tell me <span className="text-red-700">*</span></p>
            <fieldset className="border-none">
              <textarea
                className="w-full h-40 px-3 py-2 bg-transparent text-white resize-none focus:outline-none"
                placeholder="Write your secret message..."
                value={content}
                onChange={handleContentChange}
              ></textarea>
            </fieldset>
          </div>

          <p className="mt-6 font-mono text-sm">254 characters remaining</p>
          <hr className="mt-2 border-b-2 w-[20vw]" />

          <button
            // href="/profile"
            className="flex rounded-md my-6 justify-center items-center bg-gradient-to-tr from-green to-cream w-[20vw] border-2 border-green py-2 pl-4"
          >
            Send Message
            <MdSend className="ml-3" />
          </button>
        </form>

        <p className="text-green">
          Say what do you think about daisyb3ll3 or Leave a feedback for
          daisyb3ll3 anonymously using the form above.. 🥰 Thank You!! 😍😊
        </p>
        {/* after confirmation the user should be chance to create their own link  */}
        <div className="hidden">
          <p>
            Click here 👇🏿 to create your own secret message link!
          </p>
          <Link
            href="/login"
            className="flex rounded-md my-6 justify-center items-center bg-gradient-to-tr from-green to-cream w-[20vw] border-2 border-green py-2 pl-4"
          >
            🔏 Create Link
          </Link>
        </div>
      </div>
      {isPopupOpen && (<RedirectPopup onClose={handleClose} visible={isPopupOpen} />)}
    </div>
  );
};
