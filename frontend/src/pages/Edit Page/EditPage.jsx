import { useUserStore } from "@/Stores/useUserStore";
import { useNavigate } from "react-router-dom";

const EditPage = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/profile");
  };

  const handleFileChange = (e) => {
    console.log(`${e.target.name} file selected:`, e.target.files[0]);
  };
  const { isLoading, updateProfile } = useUserStore();
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target); // Extract data directly from the form

      const res = await updateProfile(formData);
        if (res) {
         navigate("/profile");
        }
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-900">
      <div className="max-w-lg w-full p-6 bg-zinc-800 text-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Edit Profile</h2>
        <form className="space-y-4" onSubmit={handleSave}>
          <div>
            <label
              htmlFor="coverImg"
              className="block text-sm font-medium mb-2"
            >
              Cover Image
            </label>
            <input
              type="file"
              id="coverImg"
              name="coverImg"
              onChange={handleFileChange}
              className="w-full text-white bg-zinc-700 rounded-md file:bg-zinc-600 file:border-0 file:text-white file:cursor-pointer file:px-4 file:py-2"
            />
          </div>

          <div>
            <label
              htmlFor="profilePic"
              className="block text-sm font-medium mb-2"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              onChange={handleFileChange}
              className="w-full text-white bg-zinc-700 rounded-md file:bg-zinc-600 file:border-0 file:text-white file:cursor-pointer file:px-4 file:py-2"
            />
          </div>

          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full p-2 bg-zinc-700 text-white rounded-md border border-zinc-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full p-2 bg-zinc-700 text-white rounded-md border border-zinc-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-md transition"
            >
              Cancel
            </button>
            <button
                disabled={isLoading}
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
