/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

import Tooltip from './Tooltip';
import SubMenu from './SubMenu';


export default function SidebarItem({ icon: Icon, title, submenu }) {
  const [showSubmenu, setShowSubmenu] = useState(false);

  return (
    <div className="relative group/item">
      <Tooltip content={title} >
        <button
          onClick={() => setShowSubmenu(!showSubmenu)}
          className={cn(
            "w-full flex items-center gap-4 px-4 py-2 hover:bg-white/10",
            "transition-all duration-200 relative",
            showSubmenu && "bg-white/5",
           
          )}
        >
          <Icon size={20} className={cn(
            "min-w-[20px]",
            showSubmenu && "text-blue-400"
          )} />
          <span className={cn(
            "flex-1 text-left transition-all duration-300",
            
            "group-hover/sidebar:opacity-100 group-hover/sidebar:w-auto",
            "truncate"
          )}>
            {title}
          </span>
          {submenu && (
            <ChevronDown
              size={16}
              className={cn(
                "transition-transform duration-200",
                showSubmenu && "rotate-180",
                
              )}
            />
          )}
        </button>
      </Tooltip>

      {submenu && showSubmenu && (
        <SubMenu items={submenu}  />
      )}
    </div>
  );
}