/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { cn } from '@/lib/utils';



export function ImageUpload({
  value,
  onChange,
  children,
  className,
  accept = "image/*"
}) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        accept={accept}
        className="hidden"
      />
      {value ? (
        <img
          src={value}
          alt="Uploaded"
          className={cn('object-cover transition bg-zinc-800', className)}
        />
      ) : (
        children
      )}
    </div>
  );
}