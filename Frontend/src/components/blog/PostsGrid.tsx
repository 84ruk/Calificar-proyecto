import { Post } from '@/interfaces';
import { PostGridItem } from './PostGridItem';

interface Props {
  posts: Post[];
}


export const PostsGrid = ( { posts }: Props ) => {

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className=" p-5">
        {posts.map((posts) => (
          <div className="mt-10 max-w-screen-md mx-auto align-middle " key={posts.id}>

            <PostGridItem key={posts.id} post={posts} />
          </div>
        ))}
      </div>
    </div>


  );
};