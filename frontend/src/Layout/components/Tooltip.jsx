/* eslint-disable react/prop-types */

import { cn } from '../../lib/utils';


export default function Tooltip({ content, children, visible = true }) {
  return (
    <div className="relative group/tooltip">
      {children}
      {visible && (
        <div className={cn(
          "absolute left-full top-1/2 -translate-y-1/2 ml-2",
          "opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible",
          "transition-all duration-200 z-50"
        )}>
          <div className="bg-gray-900 text-white text-sm px-2 py-1 rounded whitespace-nowrap">
            {content}
          </div>
        </div>
      )}
    </div>
  );
}