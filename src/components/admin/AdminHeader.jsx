import React from "react"
import {Car} from "lucide-react";
import {Link} from "react-router-dom";

function AdminHeader(){
  return (
    <header className="bg-[#1a2234] bg-[url('/images/admin/header.jpg')] bg-center text-white h-60 overflow-hidden w-full relative">
      <div className="h-full w-full backdrop-blur-sm p-4 flex items-end">
      <Car className="h-20 w-20" />
      <Link to="/" className="text-5xl font-bold p-2 text-blue">Mingo Cars</Link>
      </div>
    </header>
  )
}

export default AdminHeader;