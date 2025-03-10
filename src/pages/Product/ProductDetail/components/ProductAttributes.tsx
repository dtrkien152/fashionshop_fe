import { useEffect, useMemo, useState } from 'react';
import { IProductSubDetailResponse } from '~/dto';

export interface Props {
  productSubDetails: IProductSubDetailResponse[];
  onSelect: (selectedProduct?: IProductSubDetailResponse) => void;
}

const ProductAttributes = (props: Props) => {
  const [colorSelected, setColorSelected] = useState<string>();
  const [sizeSelected, setSizeSelected] = useState<string>();
  const [maxUnit, setMaxUnit] = useState(0);

  const colors = useMemo(
    () => [...new Set(props.productSubDetails?.map((item) => item.color))],
    [props.productSubDetails]
  );

  const sizes = useMemo(
    () => [...new Set(props.productSubDetails?.map((item) => item.size))],
    [props.productSubDetails]
  );

  useEffect(() => {
    if (colorSelected && sizeSelected) {
      const selectedProduct = props.productSubDetails.find(
        (item) => item.color === colorSelected && item.size === sizeSelected
      );
      if (selectedProduct) {
        props.onSelect(selectedProduct);
      } else {
        props.onSelect();
      }
      setMaxUnit(selectedProduct?.totalQuantity || 0);
    }
  }, [colorSelected, sizeSelected, props.productSubDetails]);

  const handleColorSelect = (color: string) => {
    if (color === colorSelected) {
      setColorSelected(undefined);
    } else {
      setColorSelected(color);
    }
    setSizeSelected(undefined);
  };

  const handleSizeSelect = (size: string) => {
    setSizeSelected(size);
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
                className={colorSelected === color ? 'active-color' : ''}
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
                (item) => item.color === colorSelected && item.size === size
              );
              return (
                <li
                  key={index}
                  className={
                    (sizeSelected === size ? 'active-color' : '') + (isDisabled ? 'disabled' : '')
                  }
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {colorSelected && sizeSelected && (
        <div className="cr-size-weight">
          <h5>
            <span>Số lượng còn lại</span> :
          </h5>
          <div className="cr-kg">{'  ' + maxUnit}</div>
        </div>
      )}
    </div>
  );
};

export default ProductAttributes;
