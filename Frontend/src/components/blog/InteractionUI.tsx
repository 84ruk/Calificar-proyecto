// components/InteractionUI.tsx
'use client'

import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import clsx from 'clsx';
import { likePost, unLikePost } from "@/actions/blog/create-comment-post"; 
import { useAuthStore } from '@/store';
import { useAuthMessageStore } from '@/store/auth/autMessage-store';

interface InteractionUIProps {
  postId: number;
  initialLikes: number;
  commentCount: number;
}

const InteractionUI = ({ postId, initialLikes, commentCount }: InteractionUIProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const { setShowMessage } = useAuthMessageStore();

  const handleLike = async (event) => {
    event.preventDefault(); 
    
    if (!isAuthenticated) {
      setShowMessage(true, 'Es necesario iniciar sesión para dar "Me gusta".');
      setTimeout(() => setShowMessage(false), 3000); 
      return;
    }

    if (isLiked) {
      try {
        await unLikePost(postId);
        setLikes(likes - 1); 
        setIsLiked(false); 
      } catch (error) {
        console.error('Error unliking the post:', error);
      }
    } else {
      try {
        await likePost(postId); 
        setLikes(likes + 1); 
        setIsLiked(true); 
      } catch (error) {
        console.error('Error liking the post:', error);
      }
    }
  };

  return (
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
  );
};

export default InteractionUI;
