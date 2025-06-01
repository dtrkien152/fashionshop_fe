import { BASE_URL, httpService } from '~/services/index.ts';

const postService = {
  // Lấy 5 bài viết mới nhất
  top5lastest: () => {
    httpService.attachTokenToHeader();
    return httpService.get(`${BASE_URL}/api/posts/top5lastest`);
  },

  // Lấy danh sách bài viết theo categoryId
  search: (params:any) => {
    httpService.attachTokenToHeader();
    return httpService.post(BASE_URL + `/api/posts/search`, params);
  },

  // Lấy tất cả category kèm số bài viết trong category đó
  getAllCategories: () => {
    httpService.attachTokenToHeader();
    return httpService.get(`${BASE_URL}/api/posts/category/all`);
  },

  // Lấy chi tiết bài viết theo mã code
  getPostDetail: (code: string) => {
    httpService.attachTokenToHeader();
    return httpService.get(`${BASE_URL}/api/posts/detail/${code}`);
  },

  gettopPostLastest: () => {
    httpService.attachTokenToHeader();
    return httpService.get(`${BASE_URL}/api/posts/gettopPostLastest`);
  },
  addComment: (data: { postId: number; content: string }) => {
    httpService.attachTokenToHeader();
    return httpService.post(`${BASE_URL}/api/posts/add-comment`, data); // Không cần bọc thêm "content"
  },
};

export default postService;
