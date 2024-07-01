export interface PostResponse {
  posts: {
    id: string;
    title: string;
    content: string;
    author: {
      id: string;
      name: string;
    };
  }[];
  total: number;
  currentPage: number;
  totalPages: number;
}
