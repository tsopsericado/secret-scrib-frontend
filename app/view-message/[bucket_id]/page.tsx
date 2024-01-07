"use client"

import Link from "next/link";
import axios from 'axios';
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { API_URL } from "../../_components/constant";
import { useParams, useRouter } from "next/navigation";

export default function page() {
  const [messages, setMessages] = useState<any[]>([]);
  const params = useParams<{ bucket_id: string }>();

  const router = useRouter()

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(API_URL + '/message/bucket/' + params.bucket_id);
        setMessages(data.messages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, []);


  const handleback = () => {
    router.push('/view-message')
  }


  return (
    <div className="bg-gradient-to-tr from-green to-cream text-white min-h-screen bg-gradie flex items-center justify-center">
      <div className="w-[30%] sm:w-[30%] h-[45%] py-10 rounded shadow-2xl px-9 bg-gradient-to-tr from-cream to-green items-center flex flex-col">
        <div onClick={handleback} className="bg-white text-black border border-gray-800 flex flex-row justify-between items-center gap-4 px-4 py-3 rounded-md cursor-pointer">
          <FaArrowLeft className="ml-3" /> <p>Go back to select a bucket</p>
        </div>
        <h1 className="text-5xl font-extrabold text-cream items-center">
          My SecretScribe 😅{" "}
        </h1>
        <p className="font-semibold w-[20vw] my-4">
          👇 Scroll 👇 down or check 👇 out the messages that you have received
        </p>

        {/* Recieve secret message */}
        <div className="w-[20vw]">
          <fieldset className="border-2 border-cream rounded p-4">
            <legend className="text-sm font-semibold">Messages:</legend>
            <div className="flex  flex-col mt-2 overflow-y-scroll h-[200px]">
              <ul >
                {messages?.map((message) => (
                  <li className="mb-4 mr-2 rounded-lg bg-slate-100 px-4 py-4 text-black  text-base text-primary-600"
                    role="alert" key={message._id}>{message.content}</li>
                ))}
              </ul>
              <p className="text-sm mt-4">_anonymous Time sent</p>
              <button className="border rounded-xl mt-3 py-1">
                ✨ Share response ✨
              </button>
            </div>
            {/* Place your received messages and time sent here */}
          </fieldset>

          <fieldset className="border-2 border-cream text-green font-bold rounded p-3 mt-3">
            <p>
              You Have Reached The End! 🏁 🙋 Ask your friends to send more
              messages or view Archived Messages
            </p>
          </fieldset>

          <fieldset className="border-2 hidden border-red-600 text-red-700 font-bold rounded p-3 mt-3">
            {/* Found no message text  */}
            <p> Sorry 😔 you haven't recieve any message in the past 48hours. Share your link to yours friends to get secret message(s)</p>
          </fieldset>
        </div>

        <button className="flex rounded-xl my-6 justify-center items-center bg-gradient-to-tr from-green to-cream w-[20vw] border-2 border-green py-2">
          <img src="/time.png" alt="time logo" className="w-8 h-6 mr-3" />
          Load More
        </button>

        <p className="border-b-2 w-[20vw]"></p>

        <Link
          href="/profile"
          className="flex rounded-xl my-6 justify-center items-center bg-gradient-to-tr from-green to-cream w-[20vw] border-2 border-green py-2 pl-4"
        >
          Go back
          <FaArrowLeft className="ml-3" />
        </Link>
      </div>
    </div>
  );
};
