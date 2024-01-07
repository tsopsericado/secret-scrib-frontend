"use client"

import Link from "next/link";
import axios from 'axios';
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { API_URL } from "../_components/constant";
import { CurrentUserGuard } from "../_services/ui";
import { IBucket, IMessage, IUser } from "../_services/utils";
import { useRouter } from "next/navigation";

interface Props {
  currentUser: IUser;
}

function viewSecretMessage({ currentUser }: Props) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [buckets, setBuckets] = useState<IBucket[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    // Fetching messages
    const fetchMessages = async () => {
      try {
        const response = await axios.get(API_URL + '/message');
        const { messages } = response.data;
        setMessages(messages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, [])

  // Fetching buckets 
  useEffect(() => {
    const fetchUserBuckets = async () => {
      try {
        const response = await axios.get(API_URL + '/bucket/user/' + currentUser._id);
        const { buckets } = response.data;
        if (buckets && buckets.length > 0) setBuckets(buckets);
        console.log({ buckets });

      } catch (error) {
        console.error(error);
      }
    };
    fetchUserBuckets()
  }, [])


  return (
    <div className="bg-gradient-to-tr from-green to-cream text-white min-h-screen bg-gradie flex items-center justify-center">
      <div className="w-[30%] sm:w-[30%] h-[45%] py-10 rounded shadow-2xl px-9 bg-gradient-to-tr from-cream to-green items-center flex flex-col">
        <div className="relative inline-block text-left">
          <button type="button" onClick={toggleDropdown} className="transition duration-300 ease-in-out inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">Select a buckect To view the message  <FaAngleDown className="-mr-1 h-5 w-5 text-black" />
          </button>
          {isOpen && (
            <ul className="h-fit min-h-[16rem] overflow-y-auto scrollbar-none absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none " role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
              {buckets.map((bucket) => (
                <li key={bucket._id} className="bg-black block text-white px-4 py-4 my-2">
                  <Link href={`/view-message/${bucket._id}`}>{bucket.title}</Link>
                </li>
              ))}

              {buckets?.length <= 0 && (
                <div className="h-full w-full flex justify-center items-center">
                  <span className="text-black tex-[2rem]">No Topics Found</span>
                </div>
              ) || null}
            </ul>
          )}
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
            <div className="flex  flex-col mt-2">
              <ul>
                {messages?.map((message) => (
                  <li key={message._id}>{message.content}</li>
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

export default CurrentUserGuard(viewSecretMessage);

