"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion"
type IProducts = {
  id: number;
  name: string;
  price: number;
  expiration: boolean;
  createdAt: string;
}

export default function Home() {
  const [products, setProducts] = useState<IProducts[] | []>([]);
  async function getData(){
    axios
    .get("https://servercrud-v4ut.onrender.com/products")
    .then((res) => setProducts(res.data)).catch(er => console.log(er,"error"))
  }
  useEffect(() => {
    getData()
  }, []);

  const deletedProd = async (id:number) => {
    try {
      const res = await axios.delete(`https://servercrud-v4ut.onrender.com/products/${id}`)
      console.log(res)
      if(res.status === 200){
        toast.dark("Deleted Successfully")
        getData()
      }
    } catch (error) {
      
    }
  }
  return (
    <>
      <section className="flex flex-col flex-wrap w-[90%] m-auto gap-4 pt-4 ">
      {products.map(el => (
          <motion.div
          initial={{y:"100%"}}
          whileInView={{y:0}}
          transition={{duration:"0.6"}}
          key={el.id} className={`p-4 border-4 bg-black   border-[purple] text-[purple] rounded-lg ${el.expiration ? "border-[red]" :"border-[purple]"}  ${el.expiration ? "text-[red]" :"text-white"} `}>
          <h2>Name: {el.name}</h2>
          <h2>Price: ${el.price}</h2>
          <h2>CreatedAt: {el.createdAt}</h2>
          <div className={`border-[purple] border-2 w-[200px] flex justify-center rounded-lg text-white mt-2 ${el.expiration ? "border-[red]" :"border-[purple]"}`}>
          <button onClick={() => {
             deletedProd(el.id)
          }}>Delete</button>
          <h1 className="relative left-6">|</h1>
          <Link href={`/${el.id}`} className="pl-14">Update</Link>
          </div>
        </motion.div>
      ))}
      </section>
    </>
  );
}
