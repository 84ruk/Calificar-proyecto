'use client'

import { Post } from "@/interfaces";
import Link from "next/link";
import { useState } from "react";
import { FaHeart } from 'react-icons/fa';
import clsx from 'clsx';
import { likePost, unLikePost } from "@/actions/blog/create-comment-post"; 

interface Props {
  post: Post;
}

export const PostGridItem = ({ post }: Props) => {
  const { id, author, title, content, createdAt, commentCount, likeCount } = post;
  const { name } = author;

  const [likes, setLikes] = useState(likeCount);
  const [isLiked, setIsLiked] = useState(false); 

  const handleLike = async (event) => {
    event.preventDefault(); 
    
    if (isLiked) {
      try {
        await unLikePost(id);
        setLikes(likes - 1); 
        setIsLiked(false); 
      } catch (error) {
        console.error('Error unliking the post:', error);
      }
    } else {
      try {
        await likePost(id); 
        setLikes(likes + 1); 
        setIsLiked(true); 
      } catch (error) {
        console.error('Error liking the post:', error);
      }
    }
  };

  return (
    <Link href={`/blog/${id}`} className="block">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto my-4 flex items-center justify-center">
        <div className="flex-1 w-100">
          <div className="flex items-center mb-2">
            <h2 className="text-xl font-semibold text-center">{title}</h2>
          </div>
          <p className="text-gray-600 mb-2">{content}</p>

          <div className="mt-2 text-gray-500 flex items-center justify-between">
            <div className="flex">
              <p className="mr-4">
                {commentCount} {commentCount === 1 ? "Comentario" : "Comentarios"}
              </p>
              <p>
                {likes} {likes === 1 ? "Me gusta" : "Me gusta"}
              </p>
            </div>
            <FaHeart
              className={clsx('cursor-pointer', { 'text-red-500': isLiked, 'text-black': !isLiked })}
              style={{ fill: isLiked && 'red', stroke: 'black', fontSize: '17px' }}
              onClick={handleLike}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
