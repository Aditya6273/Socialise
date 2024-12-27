import { useState } from 'react';

export function useDragAndDrop(onFileSelect) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      onFileSelect(file);
      e.dataTransfer.clearData();
    }
  };

  return {
    isDragging,
    dragHandlers: {
      onDragEnter: handleDragIn,
      onDragLeave: handleDragOut,
      onDragOver: handleDrag,
      onDrop: handleDrop,
    },
  };
}