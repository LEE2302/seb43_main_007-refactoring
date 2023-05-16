import styled from "styled-components";
import { CommentProps } from "./postDetailTypes";
import CreateReply from "./CreateReply";
import Reply from "./Reply";

function Comment({
   comment,
   handleReplySubmit,
   handleReplyClick,
   isReplySelected,
   selectedCommentId,
}: CommentProps) {
   const handleReplySubmitWrapper = (content: string) => {
      handleReplySubmit(comment.commentId, content);
   };

   return (
      <>
         <CommentContainer>
            <AuthorInfoContainer>
               <AuthorInfo>
                  <img
                     src={comment.picture}
                     alt="comment-author-img"
                     className="comment-author-img"
                  />
                  <span className="comment-author">{comment.nickname}</span>
               </AuthorInfo>
            </AuthorInfoContainer>
            <CommentContent>
               <div className="comment-content">{comment.content}</div>
            </CommentContent>
            <DateAndReplyButton>
               <span className="comment-createdAt">{comment.createdAt}</span>
               <ReplyButton
                  onClick={() =>
                     handleReplyClick(
                        isReplySelected ? null : comment.commentId
                     )
                  }
               >
                  {isReplySelected ? "취소" : "댓글 추가"}
               </ReplyButton>
            </DateAndReplyButton>
         </CommentContainer>
         {isReplySelected && (
            <CreateReply
               onSubmit={handleReplySubmitWrapper}
               onCancel={() => handleReplyClick(null)}
            />
         )}
         {comment.replies &&
            comment.replies.map((reply) => (
               <Reply key={reply.commentId} comment={reply} />
            ))}
      </>
   );
}

export default Comment;

export const CommentContainer = styled.li`
   width: 100%;
   padding: 10px 0 10px 15px;
   border-bottom: 1px solid #dfdfdf;
   display: flex;
   justify-content: space-between;
`;

export const AuthorInfoContainer = styled.div`
   height: 100%;
`;

export const AuthorInfo = styled.div`
   display: flex;
   align-items: center;
   width: 140px;

   .comment-author-img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 5px;
   }
   .comment-author {
      font-size: 12px;
   }
`;

export const CommentContent = styled.div`
   width: 790px;
   height: 100%;
   margin-top: 3px;

   .comment-content {
      font-size: 13px;
   }
`;

export const DateAndReplyButton = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: flex-end;
   height: 100%;
   font-size: 12px;
   width: 120px;
   margin-top: 3px;
`;

export const ReplyButton = styled.button`
   border: none;
   padding: 0;
   background-color: transparent;
   cursor: pointer;
   margin-top: 5px;
   font-size: 12px;
`;
