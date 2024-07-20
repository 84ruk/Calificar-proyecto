// pages/blog/[id].tsx
import { fetchPostById } from '../../../actions/index'; 
import { MdChatBubbleOutline } from 'react-icons/md';
import { IoHeartOutline } from 'react-icons/io5';
import CommentField from '../../../components/blog/CommentField';
import { submitComment } from '@/actions/blog/create-comment-post';
import InteractionUI from '@/components/blog/InteractionUI';
export const revalidate = 3600 // revalidate the data at most every hour
 
export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  const post = await fetchPostById(id)
  const { commentCount, likeCount } = post;
  console.log('post', post)




  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-300"></div>
        <div>
          <h2 className="text-lg font-semibold">{post.author}</h2>
          <p className="text-sm text-gray-600">{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-3">{post.title}</h1>
      <p className="text-gray-700 mb-4">{post.content}</p>
      <InteractionUI postId={id} initialLikes={likeCount} commentCount={commentCount}/>
      <h3 className="text-lg font-semibold mt-5">Comentar</h3>
      <CommentField postId={id} />
      <h3 className="text-lg font-semibold mt-4">Comentarios</h3>
      {post.comments.length > 0 ? (
        <div className="space-y-4 mt-4">
          {post.comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                <div>
                  <p className="text-sm font-semibold">{comment.author.fullName}</p>
                  <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <p className="text-gray-700 mt-2">{comment.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No hay comentarios todavía.</p>
      )}
    </div>
  )
}




