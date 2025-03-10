import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ICategoryModel } from '~/dto';
import { categoryService } from '~/services';
import { Select } from 'antd';

const { Option } = Select;

export const CategorySelect = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoryId') || '');
    const [categories, setCategories] = useState<ICategoryModel[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryService.getAll();
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch categories', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        // Cập nhật selectedCategory khi query param thay đổi
        setSelectedCategory(searchParams.get('categoryId') || '');
    }, [searchParams]);

    const handleChange = (value: string) => {
        setSelectedCategory(value);

        // Cập nhật query param
        if (value) {
            setSearchParams({ categoryId: value });
        } else {
            searchParams.delete('categoryId');
            setSearchParams(searchParams);
        }
    };

    return (
        <div className="center-content">
            <span style={{ marginRight: 8 }}>Danh mục:</span>
            <Select
                value={selectedCategory || undefined}
                onChange={handleChange}
                placeholder="Chọn danh mục"
                optionLabelProp="children"
                style={{
                    width: 'fit-content',
                    padding: '0 20px', // Thêm padding ngang 10px
                    minWidth: '100px',  // Đặt minWidth để tránh quá hẹp nếu không có nội dung
                }}
            >
                <Option value="">Tất cả</Option>
                {categories.map((cat) => (
                    <Option key={cat.id} value={String(cat.id)}>
                        {cat.name}
                    </Option>
                ))}
            </Select>
        </div>
    );
};
