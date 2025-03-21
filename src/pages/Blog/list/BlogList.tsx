import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Select, Spin } from 'antd';
import postService from '~/services/post.service.ts';
import toast from 'react-hot-toast';

import { BlogPostProps } from '~/dto/post.dto.ts';
import { BreadcrumbComponent } from '~/pages/Blog/list/components/BreadcrumbComponent.tsx';
import { BlogSidebar } from '~/pages/Blog/list/components/BlogSidebar.tsx';
import { BlogListComponent } from '~/pages/Blog/list/components/BlogListComponent.tsx';

const { Option } = Select;

interface IPost {
  id: number;
  title: string;
  author: string;
  thumbnailUrl: string | null;
  createdAt: string;
}

const DEFAULT_SEARCH_PARAMS = {
  categoryId: null,
  sortBy: 'newest',
  limit: 10,
  page: 1, // Đổi từ 0 thành 1 để đồng bộ với Antd Pagination
};

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [data, setData] = useState<{ totalItems: number; totalPages: number }>({
    totalItems: 0,
    totalPages: 0,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [searchParams]); // Chỉ gọi API khi `searchParams` thay đổi

  const buildSearchParams = () => {
    return {
      categoryId: searchParams.get('categoryId') ? Number(searchParams.get('categoryId')) : null,
      keyword: searchParams.get('keyword') || '',
      sortBy: searchParams.get('sortBy') ?? DEFAULT_SEARCH_PARAMS.sortBy,
      limit: Number(searchParams.get('limit')) || DEFAULT_SEARCH_PARAMS.limit,
      page: Number(searchParams.get('page')) || DEFAULT_SEARCH_PARAMS.page,
    };
  };

  const fetchData = async () => {
    setLoading(true);
    const params = buildSearchParams();

    console.log('📡 Gửi request API với params:', params);

    try {
      const response = await postService.search(params);

      setPosts(response.data.posts);
      setData({
        totalItems: response.data.totalItems,
        totalPages: response.data.totalPages,
      });
    } catch (error) {
      console.error('❌ Lỗi API:', error);
      toast.error('Lỗi khi tải bài viết');
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (value: string) => {
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), sortBy: value, page: '1' });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: String(page) });
  };

  return (
    <>
      <BreadcrumbComponent title="Blog Classic" currentPage="Blog Classic" homePath="/" />
      <section className="section-blog-classic padding-tb-100">
        <div className="container">
          <div className="row">
            <BlogSidebar />

            <div className="col-lg-9 col-12 md-30">
              {/* Bộ lọc */}
              <div
                style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}
              >
                {/*<Select*/}
                {/*  defaultValue={DEFAULT_SEARCH_PARAMS.sortBy}*/}
                {/*  style={{ width: 150 }}*/}
                {/*  onChange={handleSortChange}*/}
                {/*>*/}
                {/*  <Option value="newest">Mới nhất</Option>*/}
                {/*  <Option value="oldest">Cũ nhất</Option>*/}
                {/*</Select>*/}
              </div>

              {loading ? (
                <Spin size="large" />
              ) : (
                <>
                  <BlogListComponent
                    posts={posts as BlogPostProps[]}
                    totalItems={data.totalItems}
                    pageSize={DEFAULT_SEARCH_PARAMS.limit}
                    currentPage={Number(searchParams.get('page')) || DEFAULT_SEARCH_PARAMS.page}
                    onPageChange={handlePageChange}
                  />{' '}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogList;
