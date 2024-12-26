import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/Stores/useUserStore";


export function EditProfile() {
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [coverImgPreview, setCoverImgPreview] = useState("");

  const { isLoading, updateProfile } = useUserStore();
  const navigate = useNavigate();

  const profilePicRef = useRef(null);
  const coverImgRef = useRef(null);

  const handleImageClick = (inputRef) => {
    inputRef.current.click();
  };

  const handleImageUpload = (type) => (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (type === "profilePic") {
        setProfilePicPreview(imageUrl);
      } else if (type === "coverImg") {
        setCoverImgPreview(imageUrl);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await updateProfile(formData);
      if (res) {
        navigate("/profile"); // Navigate to profile page or elsewhere
      }
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  const parsedUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="overflow-hidden rounded-lg max-w-2xl bg-transparent shadow-lg w-full">
        <h1 className="text-2xl font-bold text-white p-4 bg-zinc-900">
          Edit Profile
        </h1>
        <form onSubmit={handleSave}>
          {/* Cover Image Upload */}
          <div className="relative">
            <div className="group relative h-56 w-full overflow-hidden">
              <div
                className="cursor-pointer relative group"
                onClick={() => handleImageClick(coverImgRef)}
              >
                {coverImgPreview ? (
                  <img
                    src={coverImgPreview}
                    alt="Cover"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-64 w-full items-center justify-center bg-zinc-900 transition-colors group-hover:bg-opacity-70">
                    <img
                      src={parsedUser.coverImg ? parsedUser.coverImg :"/default_cover_img.jpeg"}  
                      className="h-full w-full object-cover"
                      alt="previous pic"
                    />
                    <div className="flex flex-col items-center gap-2 text-slate-900 absolute">
                      <ImagePlus className="h-8 w-8" />
                      <span className="text-sm font-bold">Add Cover Photo</span>
                    </div>
                  </div>
                )}
              </div>
              <input
                ref={coverImgRef}
                type="file"
                name="coverImg"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload("coverImg")}
              />
            </div>

            {/* Profile Image Upload */}
            <div className="absolute -bottom-16 left-8">
              <div
                className="group relative h-32 w-32 rounded-full cursor-pointer group"
                onClick={() => handleImageClick(profilePicRef)}
              >
                {profilePicPreview ? (
                  <img
                    src={profilePicPreview}
                    alt="Profile"
                    className="h-full w-full rounded-full border-4 border-white object-cover shadow-md"
                  />
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 overflow-hidden bg-zinc-900 border-zinc-500 shadow-md group-hover:bg-opacity-70">
                    <ImagePlus className="h-8 w-8 text-slate-400" />
                    <img
                      src={parsedUser.profilePic ? parsedUser.profilePic : "/default_profile_pic.jpeg"}
                      className="h-full w-full object-cover"
                      alt="previous pic"
                    />
                  </div>
                )}
              </div>
              <input
                ref={profilePicRef}
                type="file"
                name="profilePic"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload("profilePic")}
              />
            </div>
          </div>

          {/* Profile Form */}
          <div className="space-y-6 p-8 pt-20">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  defaultValue={parsedUser.firstName || ""}
                  placeholder="John"
                  className="border-[1px] border-zinc-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  defaultValue={parsedUser.lastName || ""}
                  placeholder="Doe"
                  className="border-[1px] border-zinc-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                defaultValue={parsedUser.bio || ""}
                placeholder="Tell us about yourself..."
                className="min-h-[120px] resize-none border-[1px] border-zinc-500"
              />
            </div>

            <Button type="submit" className="w-full md:w-auto mr-2">
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              variant="destructive"
              className="w-full md:w-auto ml-2"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
