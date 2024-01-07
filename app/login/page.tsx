"use client"
import React, { useState } from "react";
import Link from "next/link";

import { FaApple, FaEnvelope, FaFacebookF, FaTimes } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../_components/constant";
import { useRouter } from "next/navigation";
import { ApiRes } from "../_services/utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios.post(API_URL + "/auth/login", {
      email,
      password
    })
      .then((resp: ApiRes) => {
        console.log("this is the response", resp);
        localStorage.setItem("token", resp.data.token);
        router.push(`/profile`);
        // mes = resp.data.message;
        // setMessage(resp.data.message);
      })
      .catch((err) => {
        console.error("An error occured on the frontend", err);
      });
  };


  return (
    <div className="bg-gradient-to-tr from-green to-cream text-black min-h-screen bg-gradie flex items-center justify-center">
      <div className="w-[25%] sm:w-[25%] h-[45%] bg- py-10 shadow-2xl px-9 bg-gradient-to-tr from-cream to-green">
        <header className="flex justify-between pb-6 items-center">
          <button className="text-xl"><FaTimes /></button>
          <Link
            className="text-lg font-bold text-cream hover:underline"
            href="/register"
          >
            Sign Up
          </Link>
        </header>

        <div className="flex items-center justify-center leading-tight">
          <img src="/sslogo.png" alt="SecretScribe Logo" className="bg-black w-10 h-10" />
          <h1 className="text-3xl font-thin font-marker">ecretScribe</h1>
        </div>

        <h1 className="py-6 text-5xl font-marker items-center justify-center flex font-bold">Welcome back</h1>

        <form onSubmit={loginUser} className="flex flex-col space-y-6 w-[60%] ml-[20%] mt-8 text-white font-extrabold font-lobster mb-5">
          <input
            type="email" required
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 border-2 border-cream py-3 bg-transparent text-white focus:outline-none"
          />
          <input
            type="password" required
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 border-2 border-cream py-3 bg-transparent text-white focus:outline-none"
          />
          <button className="border border-black py-3" type="submit">Login</button>
        </form>

        <p className="flex justify-center items-center py-2">
          <span className="border-b flex-grow"></span>
          <span className="px-3 text-gray-500 font-bold">Or</span>
          <span className="border-b flex-grow"></span>
        </p>


        <section className="flex flex-col space-y-6 w-[60%] ml-[20%] mt-8 text-white font-extrabold font-lobster mb-5">
          <button className="flex items-center border-2 border-green py-2 pl-4"><img src="/google.png" alt="Google logo" className="w-8 h-8 mr-3" /> Sign In with Google</button>
          <button className="flex items-center border-2 border-green py-2 pl-4"><FaEnvelope className="w-5 h-5 mr-3 text-red-700" /> Sign In with Mail</button>
        </section>
        <p className="mb-10 items-center text-sm justify-center flex font-serif">Educators: Register as an individual</p>
      </div>
    </div>
  );
};

export default Login;
// style={{background: 'url("/stars.png")'}}