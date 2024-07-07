'use client'


import { Post } from "@/interfaces";
import Link from "next/link";
import { useState } from "react";
import { FaHeart } from 'react-icons/fa';

interface Props {
  post: Post;
}

export const PostGridItem = ({ post }) => {
  const { id, author, title, content, createdAt, commentCount, likeCount } = post;
  const { name, avatar, id: authorId } = author;

  const [likes, setLikes] = useState(likeCount);

  const handleLike = async () => {
    try {
      const response = await fetch(`/posts/${id}/like`, { method: 'PATCH' });
      if (response.ok) {
        setLikes(likes + 1);
      } else {
        console.error('Error liking the post');
      }
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  console.log(post);

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
              className="text-red-500 cursor-pointer"
              onClick={handleLike}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
