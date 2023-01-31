export default interface IInfo {
  pageSize: number;
  pages: number;
  numberOfPosts: number;
  currentPage: number;
  next: string | null;
  previous: string | null;
}
