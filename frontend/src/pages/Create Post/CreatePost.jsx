import { useState } from "react";
import { Type, FileText, Upload, ImagePlus, X } from "lucide-react";
import { usePostStore } from "@/Stores/usePostStore";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const { createPost, isLoading } = usePostStore();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (file) => {
    setFormData((prev) => ({ ...prev, image: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreview(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      console.log("Selected file:", file);
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleFileSelect(file);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  
    try {
      const res = await createPost(formData);
      if (res) {
        navigate("/profile"); // Navigate to profile page or elsewhere
      }
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-zinc-900 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-100">
                Create New Post
              </h1>
              <p className="mt-2 text-gray-400">
                Share your thoughts with the world
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-100 gap-2">
                  <Type size={18} />
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out bg-transparent"
                  placeholder="Enter a captivating title"
                />
              </div>

              {/* Description Input */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-100 gap-2">
                  <FileText size={18} />
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out resize-none bg-transparent"
                  placeholder="Write your post content here..."
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-100 gap-2">
                  <ImagePlus size={18} />
                  Upload Image
                </label>

                <div
                  className={`relative w-full flex items-center justify-center px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-500"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                  name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="text-center">
                    <ImagePlus
                      className={`mx-auto h-12 w-12 transition-colors duration-200 ${
                        isDragging ? "text-blue-500" : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`mt-2 block text-sm font-medium transition-colors duration-200 ${
                        isDragging ? "text-blue-600" : "text-gray-600"
                      }`}
                    >
                      {isDragging
                        ? "Drop image here"
                        : "Drag and drop or click to upload"}
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </span>
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
                      onClick={clearImage}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                    >
                      <X size={18} className="text-gray-600" />
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                } font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out`}
              >
              <Upload size={18} />
                {isLoading ? "Creating..." : "Create Post"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
