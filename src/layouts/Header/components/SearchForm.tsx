import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICategoryModel } from '~/dto';

interface IProps {
    categories: ICategoryModel[];
}

export const SearchForm: React.FC<IProps> = ({ categories }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const searchParams = new URLSearchParams(window.location.search);

        if (searchTerm) {
            searchParams.set('keyword', searchTerm);
        } else {
            searchParams.delete('keyword');
        }

        if (selectedCategory) {
            searchParams.set('categoryId', selectedCategory);
        } else {
            searchParams.delete('categoryId');
        }

        searchParams.set('page', '0'); // Reset về trang đầu tiên

        navigate(`/product?${searchParams.toString()}`);
    };

    return (
        <form className="cr-search" onSubmit={handleSearch}>
            <input
                className="search-input"
                type="text"
                placeholder="Search For items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
                className="form-select"
                aria-label="Select category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">Tất cả danh mục</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <button type="submit" className="search-btn">
                <i className="ri-search-line"></i>
            </button>
        </form>
    );
};
