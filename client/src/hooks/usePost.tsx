import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { deletePost, getPostData } from "../api/axios";
import { serverError } from "../util/toastify";
import { Post } from "../components/postdetail/postDetailTypes";

const usePost = (boardId: string) => {
   const navigate = useNavigate();
   const [post, setPost] = useState<Post | null>(null);

   useEffect(() => {
      const fetchPost = async () => {
         const data = await getPostData(parseInt(boardId, 10));
         setPost(data);
      };

      fetchPost();
   }, [boardId]);

   const handleDeletePost = async () => {
      const response = await deletePost(parseInt(boardId, 10));
      if (response) {
         console.log("게시글 삭제");
         navigate("/communitylist");
      } else {
         serverError();
      }
   };

   return { post, handleDeletePost };
};

export default usePost;
