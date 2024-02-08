// components/ProfessorGridItem.tsx
import { IoPersonSharp } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";

import { AiFillDislike } from "react-icons/ai";

import { FaRegComment } from "react-icons/fa";


import { Professor } from "@/interfaces";
import Link from "next/link";

interface Props {
  professor: Professor;
}

export const ProfessorGridItem = ({ professor }: Props) => {
  const { id, name, lastName, averageRating } = professor;

  return (
<div className="items-center h-full place-content-center">
    <h2 className="text-lg font-semibold mb-2">
      <div className="flex items-center">
        <IoPersonSharp className="my-auto mr-2" />
        <span>{name} {lastName}</span>
      </div>
    </h2>

    <div className="flex  text-center items-center justify-center mt-3">
      <p className="text-sm mr-4">Calificación promedio: </p>
      
    </div>
    <div className="flex items-center justify-center">

      <p className="text-2xl antialiased">{averageRating}</p>
    </div>

    <div className="flex items-center justify-center mb-3 mt-5">
      <BiSolidLike className="mr-1" />
      <span className="text-green-500 mr-3">1</span>
      
      <AiFillDislike className="mr-1" />
      <span className="text-red-500 mr-3">1</span>
      
      <FaRegComment className="mr-1" />
      <span className="text-red-500">1</span>


      <Link href={`/profesores/${id}`} className="rounded-sm text-center mx-auto btn-primary text-white  px-2 py-1 ml-5">
      Ver detalles
    </Link>

    
  </div>
</div>


  );
};
