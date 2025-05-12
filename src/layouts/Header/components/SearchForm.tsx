import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {ICategoryModel, IProductSearchParam} from '~/dto';
import {AutoComplete, Input, Select, Spin} from "antd";
import {productService} from "~/services";
import {debounce} from "lodash";

interface IProps {
    categories: ICategoryModel[];
}

export const SearchForm: React.FC<IProps> = ({categories}) => {

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        console.log('suggestions', suggestions);
    }, [suggestions]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryId = params.get('categoryId');
        if (categoryId) {
            setSelectedCategory(categoryId);
        }
    }, [location.search]);
    const fetchSuggestions = debounce(async (keyword: string) => {
        if (!keyword.trim()) {
            setSuggestions([]);
            return;
        }

        setLoading(true);
        const params: IProductSearchParam = {
            keyword,
            categoryId: selectedCategory ? Number(selectedCategory) : null,
            page: 0,
            limit: 5,
        };

        try {
            const res = await productService.search(params);
            console.log('suggestions', res.data.data);
            setSuggestions(res.data?.data || []);
        } catch (err) {
            console.error('Error fetching suggestions:', err);
        } finally {
            setLoading(false);
        }
    }, 400);

    const onSearchChange = (value: string) => {
        setSearchTerm(value);
        fetchSuggestions(value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const searchParams = new URLSearchParams();

        if (searchTerm) searchParams.set('keyword', searchTerm);
        if (selectedCategory) searchParams.set('categoryId', selectedCategory);
        searchParams.set('page', '0');

        navigate(`/product?${searchParams.toString()}`);
    };


    return (
        <form className="cr-search" onSubmit={handleSearchSubmit} style={{width: '500px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                <AutoComplete
                    style={{width: '350'}}
                    value={searchTerm}
                    onChange={onSearchChange}
                    onSelect={(value) => setSearchTerm(value)}
                    options={suggestions.map((product) => ({
                        value: product.productName,
                        label: (
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                }}
                            >
                                <img
                                    src={product.thumbnailUrl}
                                    alt={product.productName}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        objectFit: 'cover',
                                        marginRight: 8,
                                        flexShrink: 0,
                                    }}
                                />
                                <span
                                    style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: 'inline-block',
                                        maxWidth: '200px', // hoặc tùy chỉnh theo thiết kế
                                    }}
                                >
                    {product.productName}
                </span>
                            </div>
                        ),
                    }))}
                    notFoundContent={loading ? <Spin size="small"/> : null}
                    placeholder="Tìm kiếm sản phẩm..."
                >
                    <Input
                        style={{
                            width: '100%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    />
                </AutoComplete>

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
                    <i className="ri-search-line"/>
                </button>
            </div>
        </form>
    );
};
