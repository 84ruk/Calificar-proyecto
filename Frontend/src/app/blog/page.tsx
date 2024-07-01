import { ProfessorGrid } from "@/components/professors/ProfessorGrid";
import { FaRegHeart } from "react-icons/fa6";

import { getPaginatedPostsWithImages } from '@/actions';
import { PostsGrid } from "@/components/blog/PostsGrid";



interface Props {
  searchParams: {
    page?: string; 
  }
}

export default async function ProfessorsPage({ searchParams }: Props) {

   const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  const { posts, currentPage, totalPages } = await getPaginatedPostsWithImages({ page });


  if ( posts.length === 0 ) {
    redirect('/');
  } 




  return (
    <>

    <PostsGrid
      posts={posts}
    /> 


    </>
  );
}
