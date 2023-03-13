export default interface ICreateComment{
  success: boolean;
  msg: string;
  data:{
    commentId: string;
    comment: string;
    userId: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
  }
}