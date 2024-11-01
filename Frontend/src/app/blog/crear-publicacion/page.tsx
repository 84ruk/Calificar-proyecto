/* export const revalidate = 604800; //7 días */

import { Metadata, ResolvingMetadata } from "next";
import { getProfessorById } from "@/actions";
import { PublicacionForm } from "./ui/PublicacionForm";


export default async function Home( ) {



  return (
    <div className=" w-full flex justify-center min-h-screen">
    <div className="bg-white p-8 rounded-lg w-full max-w-md">
      <h2 className="text-5xl font-extrabold mb-6 text-center dark:text-white">Crear publicacion</h2>
     <PublicacionForm />
    </div>
  </div>
  );
}
