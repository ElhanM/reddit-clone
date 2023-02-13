export default interface IPostInfo {
  pageSize: number;
  pages: number;
  numberOfPosts: number;
  currentPage: number;
  next: string | null;
  previous: string | null;
}
