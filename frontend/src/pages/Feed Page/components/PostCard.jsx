/* eslint-disable react/prop-types */
import { PostHeader } from "./PostHeader";
import { PostContent } from "./PostContent";
import { PostActions } from "./PostActions";
import { useLikes } from "../hooks/useLikes";

export function PostCard({ post  }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isOwner = user?._id === post?.userId._id;
    const {
      likes,
      hasLiked,
      handleLikeUnlike,
      likesCount,
      likesLoading
    } = useLikes(post._id, post?.likes || []);
   
  return (
    <article className="p-4 border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
      <div className="space-y-4">
        <PostHeader
        postId={post.postId}
          isOwner={isOwner}
          author={post.userId}
          createdAt={post.createdAt}
        />
        <PostContent
          title={post.title}
          description={post.description}
          image={post.image}
        />
        <PostActions
    
          likesLoading={likesLoading}
          postId={post._id}
          commentsCount={post.comments?.length || 0}
          likesCount={likesCount}
          hasLiked={hasLiked}
          onLikeClick={handleLikeUnlike}
        />
      </div>
    </article>
  );
}
