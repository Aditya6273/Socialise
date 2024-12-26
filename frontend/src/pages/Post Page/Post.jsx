import { useParams } from "react-router-dom";

const Post = () => {
  const param = useParams();
  console.log(param);
  return <div>Post</div>;
};

export default Post;
