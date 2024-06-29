"use client";
import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <>
    <div className="flex justify-between w-[90%] pt-8">
      <div className="w-[40px] h-[40px] rounded-[50%] border-2 border-[purple] "></div>
      <div className="w-[40px] h-[40px] rounded-[50%] border-2 border-[red] "></div>
    </div>
    <div>
      <h1 className="text-white">First Request delay  by 50 seconds or more.</h1>
    </div>
    <div className="flex gap-4 justify-center pt-8 text-[#C1D7EC]">
      <Link href={"/"}>Home Page</Link>
      <Link href={"/create"}>Create Product</Link>
    </div>
    </>
  );
}
