/* eslint-disable react/prop-types */



export function TrendingCard({ title, description, imageUrl, link }) {
  return (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer" 
      className="group block p-4 hover:bg-zinc-800/50 transition-colors rounded-lg"
    >
      <div className="flex space-x-4">
        <div className="flex-1 min-w-0"> {/* min-w-0 allows flex child to shrink below content size */}
          <h3 className="font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors truncate">
            {title}
          </h3>
          <p className="text-sm text-zinc-400 mt-1 line-clamp-2"> {/* line-clamp-2 limits to 2 lines */}
            {description}
          </p>
        </div>
        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 group-hover:bg-blue-500/10 transition-colors" />
        </div>
      </div>
    </a>
  );
}