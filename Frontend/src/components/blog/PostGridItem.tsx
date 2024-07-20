'use client'

import { Post } from "@/interfaces";
import Link from "next/link";
import InteractionUI from "./InteractionUI";

interface Props {
  post: Post;
}

export const PostGridItem = ({ post }: Props) => {
  const { id, author, title, content, createdAt, commentCount, likeCount } = post;
  const { name } = author;



  return (
    <Link href={`/blog/${id}`} className="block">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto my-4 flex items-center justify-center">
        <div className="flex-1 w-100">
          <p className="text-gray-500 ">{name} - {new Date(createdAt).toLocaleDateString()}</p>
          <p className="text-xs text-gray-500 mb-2"></p>
          <div className="flex items-center mb-2">
            <h2 className="text-xl font-semibold text-center">{title}</h2>
          </div>
          <p className="text-gray-600 mb-2">{content}</p>
          
          <InteractionUI postId={id} initialLikes={likeCount} commentCount={commentCount}/>
          
        </div>
      </div>
    </Link>
  );
};
