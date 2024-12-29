/* eslint-disable react/prop-types */
import { PostHeader } from "./PostHeader";
import { PostContent } from "./PostContent";
import { PostActions } from "./PostActions";

export function PostCard({ post }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isOwner = user?._id === post?.userId._id;
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
          postId={post._id}
          commentCount={post.comments?.length || 0}
          likeCount={post.likes?.length || 0}
        />
      </div>
    </article>
  );
}
