import { useState, useEffect } from "react";
import { IProductSubDetailResponse } from '~/shared/model/product.model.ts';

export interface Props {
  productSubDetails: IProductSubDetailResponse[];
  onSelect: (selectedProduct: IProductSubDetailResponse | null) => void;
}
const ProductAttributes = (props: Props) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [maxQuantity, setMaxQuantity] = useState(0);

  const colors = [...new Set(props.productSubDetails?.map((item) => item.color))];
  const sizes = [...new Set(props.productSubDetails?.map((item) => item.size))];

  useEffect(() => {
    if (selectedColor && selectedSize) {
      const selectedProduct = props.productSubDetails.find(
        (item) => item.color === selectedColor && item.size === selectedSize
      );
      if (selectedProduct) {
        props.onSelect(selectedProduct);
      }
      setMaxQuantity(selectedProduct?.totalQuantity || 0);
    } else {
      props.onSelect(null);
      setQuantity(0);
    }
  }, [selectedColor, selectedSize, props.productSubDetails, props.onSelect]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="text-lg font-semibold mb-2 custom-text">Màu sắc:</label>
        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorSelect(color)}
              className={`px-4 py-1 rounded-lg border ${
                {
                  true: 'border-blue-500 bg-blue-100',
                  false: 'border-gray-300 bg-white',
                }[selectedColor === color]
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="text-lg font-semibold mb-2 custom-text">Kích thước:</label>
        <div className="flex gap-2">
          {sizes.map((size) => {
            const isDisabled = !props.productSubDetails.some(
              (item) => item.color === selectedColor && item.size === size
            );
            return (
              <button
                key={size}
                onClick={() => handleSizeSelect(size)}
                disabled={isDisabled}
                className={`px-4 py-1 rounded-lg border ${
                  {
                    true: 'border-blue-500 bg-blue-100',
                    false: 'border-gray-300 bg-white',
                  }[selectedSize === size]
                } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {selectedColor && selectedSize && (
        <div className="mb-4">
          <label className="text-lg font-semibold mb-2 custom-text">
            Số lượng còn lại:  <span className="ml-2">{'  '+maxQuantity}</span>
          </label>
        </div>
      )}
    </div>
  );
};

export default ProductAttributes;
