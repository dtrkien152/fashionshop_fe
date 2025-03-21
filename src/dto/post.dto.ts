export interface IPostWithComments {
  id: number;
  code?:string;
  title: string;
  content: string;
  author: string;
  thumbnailUrl: string;
  isActive: boolean;
  createdAt: Date;
  categoryId: number;
  categoryName: string;
  comments?: ICommentDetail[];
}

export interface ICommentDetail {
  id: number;
  userId: number;
  avatar: string;
  fullName: string;
  content: string;
  createdAt: Date;
}
export interface BlogPostProps {
  id: number;
  title: string;
  content: string;
  code?:string;
  author: string;
  createdAt: string;
  thumbnailUrl: string | null;
}

export interface BlogListProps {
  posts: BlogPostProps[];
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
export interface PostCategory {
  id: number;
  name: string;
  postCount: number;
}

export interface IPostDetail {
  id: number;
  code: string;
  title: string;
  author: string;
  content: string;
  thumbnailUrl: string | null;
  isActive: boolean;
  createdAt: Date;
  categoryId: number;
  categoryName: string;
  comments:ICommentDetail[];
}


export interface ICommentDetail {
  id: number;
  userId: number;
  fullName: string;
  content: string;
  createdAt: Date;
}
