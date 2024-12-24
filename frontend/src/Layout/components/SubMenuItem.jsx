import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function SubMenuItem({ title, icon: Icon ,path  }) {
  return (
    <Link to={path} className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors flex items-center gap-2 group">
      <Icon size={16} className="group-hover:text-blue-400 transition-colors" />
      <span className="truncate">{title}</span>
    </Link>
  );
}