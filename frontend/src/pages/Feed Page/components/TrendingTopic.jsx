/* eslint-disable react/prop-types */



export function TrendingTopic({ category, title, posts }) {
  return (
    <div className="py-3 px-4 hover:bg-gray-50 cursor-pointer transition-colors">
      <p className="text-sm text-gray-500">{category}</p>
      <p className="font-semibold mt-0.5">{title}</p>
      <p className="text-sm text-gray-500 mt-0.5">{posts} posts</p>
    </div>
  );
}