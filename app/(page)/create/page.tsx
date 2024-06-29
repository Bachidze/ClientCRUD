"use client";
import axios from "axios";
import {useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
    const router = useRouter()
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [expiration, setExpiration] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://servercrud-v4ut.onrender.com/products", {
        name,
        price,
        expiration
      });
      if(res.status === 201){
        toast.dark("Created Successfully")
        router.push("/")
      }
      console.log(res, "res");
    } catch (error) {
      toast.error('Name and Price are required', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      console.log(error, "error");
    }
  };
  return (
    <div className=" bg-black text-white w-[90%] m-auto pt-20 pb-20 border-4 border-[purple] rounded-lg">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-2">
        <input
        className="outline-none border-2 border-[purple] rounded-md h-[35px] text-[purple] placeholder-[purple]"
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
        className="outline-none border-2 border-[purple] rounded-md  h-[35px] text-[purple]"
          onChange={(e) => setPrice(+e.target.value)}
          value={price}
          type="number"
          placeholder="price"
        />
        <label> Is expiration </label>
        <input
          type="checkbox"
          id="true"
          name="expiration"
          onChange={() => {
            setExpiration((prev) => !prev);
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
