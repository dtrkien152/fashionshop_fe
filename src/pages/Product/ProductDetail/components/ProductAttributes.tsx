import { useState, useEffect } from 'react';
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
    <div>
      <div className="cr-size-weight">
        <h5>
          <span>Màu sắc</span> :
        </h5>
        <div className="cr-kg">
          <ul>
            {colors.map((color, index) => (
              <li
                key={index}
                className={selectedColor === color ? 'active-color' : ''}
                onClick={() => handleColorSelect(color)}
              >
                {color}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="cr-size-weight">
        <h5>
          <span>Kích thước</span> :
        </h5>
        <div className="cr-kg">
          <ul>
            {sizes.map((size, index) => {
              const isDisabled = !props.productSubDetails.some(
                (item) => item.color === selectedColor && item.size === size
              );
              return (
                <li
                  key={index}
                  className={(selectedSize === size ? 'active-color' : '') + (isDisabled ? 'disabled' : '')}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {selectedColor && selectedSize && (
        <div className="cr-size-weight">
          <h5>
            <span>Số lượng còn lại</span> :
          </h5>
          <div className="cr-kg">{'  ' + maxQuantity}</div>
        </div>
      )}
    </div>
  );
};

export default ProductAttributes;
