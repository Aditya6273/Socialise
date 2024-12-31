/* eslint-disable react/prop-types */
import ReactMarkdown from "react-markdown";



export const PostContent = ({ image, title, description }) => {
  return (
    <>
      {image && (
        <div className="relative h-[400px] sm:h-[500px]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="prose prose-invert mb-6 max-w-none">
        <ReactMarkdown className="text-gray-100 text-2xl font-bold leading-tight mb-4">
          {title}
        </ReactMarkdown>
        <ReactMarkdown className="text-gray-300 leading-relaxed">
          {description}
        </ReactMarkdown>
      </div>
    </>
  );
};