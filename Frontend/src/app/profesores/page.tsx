import { ProfessorGrid } from "@/components/professors/ProfessorGrid";
import { FaRegHeart } from "react-icons/fa6";

import { getPaginatedProfessorsWithImages } from '@/actions';



interface Props {
  searchParams: {
    page?: string; 
  }
}

export default async function ProfessorsPage({ searchParams }: Props) {

   const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  const { profes, currentPage, totalPages } = await getPaginatedProfessorsWithImages({ page });


  if ( profes.length === 0 ) {
    redirect('/');
  } 




  return (
    <>

    <ProfessorGrid 
      proffessors={profes}
    /> 


    </>
  );
}
