/* eslint-disable react/prop-types */

import { cn } from "../../lib/utils";
import SubMenuItem from "./SubMenuItem";

export default function SubMenu({ items }) {
  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-200",
       
        "border-l border-white/5"
      )}
    >
      {items.map((item) => (
        <SubMenuItem key={item.title} {...item} path={item.path} />
      ))}
    </div>
  );
}
