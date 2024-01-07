"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { API_URL, FRONT_END_URL } from '../_components/constant';
import { HiOutlineExternalLink } from "react-icons/hi";
import { CurrentUserGuard } from '../_services/ui';
import { IUser } from '../_services/utils';
import { toast } from 'sonner';
import Link from 'next/link';
import { FaArrowLeft } from "react-icons/fa";


interface Props {
  currentUser: IUser;
}

const GenerateLink = ({ currentUser }: Props) => {
  const [title, setTitle] = useState('');
  const [topicLink, setTopicLink] = useState<string>('');

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  //generate bucket link
  const generateLink = (bucket_id: string) => {
    return `${FRONT_END_URL}/write-message/${bucket_id}`;
  }

  //copy link function
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(topicLink);
      toast.success("copied!")
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  }

  const createBucket = async () => {

    try {
      const response = await axios.post(API_URL + '/bucket', { title, creator_id: currentUser._id });
      console.log({ response })

      const { _id } = response.data;
      const url = generateLink(_id);
      setTopicLink(url);
      // Do something with the generated link
    } catch (error) {
      console.error(error);
    }
    setTitle("")
  };


  return (
    <div className=' bg-gradient-to-tr from-green to-cream text-black min-h-screen flex flex-col items-center gap-4 justify-center'>
      <div className='w-[30%] sm:w-[25%] h-[30%] bg- py-10 shadow-2xl px-9 bg-gradient-to-tr from-cream to-green flex flex-col gap-8'>
        <h1 className='text-[25px] italic flex'>Generate your bucket link and share</h1>
        <div className='flex items-center gap-3'>
          <label htmlFor="title" className='text-[23px] pr-4 '>Title:</label>
          <input placeholder='Enter a title' type="text" value={title} className="px-3 border-2 border-cream py-3 bg-transparent text-white focus:outline-none placeholder:text-white w-[80%]" onChange={handleTitleChange} />
        </div>
        <div className='flex flex-row justify-between  gap-2'>
          {
            topicLink && (
              <section>
                <li className='text-white max-w-[300px] border border-gray-700 fixed'>{topicLink}</li>
              </section>
            )
          }
          <HiOutlineExternalLink onClick={copyLink} size="1.7rem" className="border border-gray-700 cursor-pointer relative" />
        </div>
        <button onClick={createBucket} className="flex items-center justify-center border-2 border-green py-2 p-4 rounded-xl">Generate Link</button>
        <p className="border-b-2 w-[20vw]"></p>

        <Link
          href="/profile"
          className="flex rounded-xl my-2 justify-center items-center bg-gradient-to-tr from-green to-cream  border-2 border-green py-2 pl-4"
        >
          Go back
          <FaArrowLeft className="ml-3" />
        </Link>
      </div>
    </div>

  )
}

export default CurrentUserGuard(GenerateLink);
