import { FaRegHeart } from "react-icons/fa6";
export const revalidate = 60; // 60 segundos


import { redirect } from 'next/navigation';

import { getPaginatedPostsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { PostGridItem } from "@/components";




interface Props {
  searchParams: {
    page?: string; 
  }
}

export default async function Home({ searchParams }: Props) {

   const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  const { posts, currentPage, totalPages } = await getPaginatedPostsWithImages({ page });
 

  return (
    <>

    <section>
        <h2 className="font-bold text-4xl antialiased">Anuncios</h2>
        <div className="flex-col-span-2 mx-auto justify-center items-center bg-white  w-full h-full shadow-md rounded-lg p-8 max-w-3xl">
            <h3 className="font-semibold">Que es TECalifico?</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam condimentum turpis eget orci bibendum, a sagittis ex pulvinar.</p>
            <div className="flex items-center mt-3 ">
              <FaRegHeart className="mr-1 antialiased hover:cursor-pointer" size={22} />
              <span className="hover:cursor-pointer">2</span>
          </div>
        </div>
    </section>
    <section>
        <h2 className="font-bold text-4xl antialiased mt-10">Post Recientes</h2>
        <div className="max-w-screen-xl mx-auto">
      <div className=" p-5">
        {posts.map((posts) => (
          <div className="mt-10 max-w-screen-md mx-auto align-middle " key={posts.id}>

            <PostGridItem key={posts.id} post={posts} />
          </div>
        ))}
        </div>
      </div>
    </section>



    </>
  );
}
