/* eslint-disable react/prop-types */

import { ImagePlus, X } from 'lucide-react';
import { useDragAndDrop } from '../hooks/useDragAndDrop';



export default function FileUpload({ onFileSelect, preview, onClear }) {
  const { isDragging, dragHandlers } = useDragAndDrop(onFileSelect);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file && !file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    onFileSelect(file);
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center text-sm font-medium text-gray-100 gap-2">
        <ImagePlus size={18} />
        Upload Image
      </label>
      
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          {...dragHandlers}
          className={`w-full flex items-center justify-center px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-500'
          }`}
        >
          <div className="text-center">
            <ImagePlus 
              className={`mx-auto h-12 w-12 transition-colors duration-200 ${
                isDragging ? 'text-blue-500' : 'text-gray-400'
              }`} 
            />
            <span className={`mt-2 block text-sm font-medium transition-colors duration-200 ${
              isDragging ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {isDragging ? 'Drop image here' : 'Drag and drop or click to upload'}
            </span>
            <span className="mt-1 block text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB
            </span>
          </div>
        </label>
      </div>

      {preview && (
        <div className="relative mt-4 rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover"
          />
          <button
            type="button"
            onClick={onClear}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
          >
            <X size={18} className="text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
}