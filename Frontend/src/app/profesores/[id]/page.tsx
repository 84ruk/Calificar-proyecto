/* export const revalidate = 604800; //7 días */
import { Metadata, ResolvingMetadata } from "next";
import { getProfessorById } from "@/actions";
/* export const revalidate = 60; // 60 segundos


import { redirect } from 'next/navigation';

import { getPaginatedPetsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';



interface Props {
  searchParams: {
    page?: string;   }
} */

interface Props {

  params: {
    id: string;
  };

}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const professor = await getProfessorById(id);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    name: professor?.name ?? "Profesor no encontrado",
  };
} 

export default async function Home({ params }: Props  ) {

  const proffessor = await getProfessorById(params.id);
  const { id, name, lastName, averageRating, comments } = proffessor;
  if ( !proffessor ) {
    redirect('/');
  }



  const characteristics = comments.reduce((acc, comment) => {
    comment.professorCharacteristics.forEach((characteristic) => {
      acc[characteristic] = (acc[characteristic] || 0) + 1;
    });
    return acc;
  }, {});

/*   const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  const { products, currentPage, totalPages } = await getPaginatedPetsWithImages({ page });


  if ( products.length === 0 ) {
    redirect('/');
  }
 */

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-5xl font-bold w-100 text-center">{ name } { lastName }</h2>
      <div className="flex flex-col md:flex-row p-5 rounded-md shadow-md">

        <div className="text-center md:text-left w-100 flex-col items-center md:block md:w-1/2 gap-5 mb-5">
          <p className="mt-5 md:ml-7 ">Calificacion promedio:</p> 
          <p className="font-bold text-4xl md:ml-24 ">{averageRating}</p>
          <p className="font-bold text-2xl mt-5">Caracteristicas</p>
          {Object.entries(characteristics).map(([characteristic, count]) => (
        <p key={characteristic} className="mt-3 px-2 py-1 bg-slate-400/50 w-fit rounded hover:cursor-pointer mx-2 bg-gray-200 text-black font-semibold antialiased">
          {characteristic} ({count})
        </p>
      ))}
        </div>
        <div className="text-center p-5 md:text-left w-100 flex-col items-center md:block md:w-1/2">
  {comments.map((comment: Comment) => (
    <div key={comment.id} className="shadow-md p-3 mb-4 rounded flex min-w-56">
      
      <div className="flex-col items-center justify-between w-1/2 ">
        <p className="text-gray-800">{comment.comment}</p>
        <div className="text-gray-600 mt-2 font-medium mr-2 space-y-3">
          {comment.professorCharacteristics.map((characteristic, index) => (
            <span key={index} className="p-1 rounded-md  bg-gray-200 text-black font-semibold antialiased w-fit">{characteristic} </span>
          ))}
        </div>
      </div>
      <div className="flex-col items-center justify-between w-1/2 h-full">
      <p className="font-bold text-4xl text-right md:ml-auto mr-10 my-auto mt-4"> {averageRating}</p>
      </div>
    </div>
  ))}
</div>



      </div>
      
    </div>
  );
}
