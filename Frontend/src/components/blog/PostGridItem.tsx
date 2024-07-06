// components/ProfessorGridItem.tsx
import { IoPersonSharp } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";

import { AiFillDislike } from "react-icons/ai";

import { FaRegComment } from "react-icons/fa";


import { Post } from "@/interfaces";
import Link from "next/link";

interface Props {
  post: Post;
}

export const PostGridItem = ({ post }: Props) => {
  
  
  const { id, author, title, content, createdAt  } = post;
  const { name, avatar, id: authorId } = author;

  console.log(post)

  return (
    <Link href={`/blog/${id}`} className="block">
    <div className="bg-white shadow-lg rounded-lg p-6 mx-auto my-4 flex items-center justify-center">
      <div className="flex-1 w-100">
        <div className="flex items-center mb-2">
          
          <h2 className="text-xl font-semibold text-center">{title}</h2>
        </div>
        <p className="text-gray-600 mb-2">{content}</p>

        <div className="flex w-full space-between ">
          <p className="text-gray-600 mr-2 underline hover:cursor-pointer">{name}</p>
          <p className="text-gray-400">{new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
    </Link>
  );
};
