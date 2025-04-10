import { useEffect, useMemo, useState } from 'react';
import { IProductSubDetailResponse } from '~/dto';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux';

export interface Props {
  productSubDetails: IProductSubDetailResponse[];
  onSelect: (selectedProduct?: IProductSubDetailResponse) => void;
}

const ProductAttributes = (props: Props) => {
  const { sites } = useSelector((state: RootState) => state.site);
  const [colorSelected, setColorSelected] = useState<string>();
  const [sizeSelected, setSizeSelected] = useState<string>();
  const [unitInStocks, setUnitInStocks] = useState();

  const colors = useMemo(
    () => [...new Set(props.productSubDetails?.map((item) => item.color))],
    [props.productSubDetails],
  );

  const sizes = useMemo(
    () => [...new Set(props.productSubDetails?.map((item) => item.size))],
    [props.productSubDetails],
  );

  useEffect(() => {
    if (colorSelected && sizeSelected) {
      const selectedProduct = props.productSubDetails.find(
        (item) => item.color === colorSelected && item.size === sizeSelected,
      );
      if (selectedProduct) {
        if (selectedProduct.unitInStocks[0] > 0) {
          props.onSelect(selectedProduct);
        } else {
          props.onSelect();
        }
      } else {
        props.onSelect();
      }
      setUnitInStocks(selectedProduct?.unitInStocks);
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
            {sizes.map((size, index) =>
              (
                <li
                  key={index}
                  className={
                    (sizeSelected === size ? 'active-color' : '')
                  }
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </li>
              ))}
          </ul>
        </div>
      </div>
      {colorSelected && sizeSelected && (
        <>
          <div className="cr-size-weight">
            <h5>
              <span>Số lượng còn lại</span> :
            </h5>
            <div className="cr-kg">{'  ' + (unitInStocks?.[0] ?? 0)}</div>
          </div>
          {sites
            .filter((site) => site.id != 0)
            .some((site: any) => unitInStocks?.[site.id] && unitInStocks?.[site.id] > 0) && (
            <ul className="cr-unit-stock">
              <h5>Măt hàng này còn lại tại cửa hàng:</h5>
              {sites
                .filter((site) => site.id != 0)
                .filter((site: any) => unitInStocks?.[site.id] && unitInStocks?.[site.id] > 0)
                .map((site, index) => (
                  <li key={index}>
                    {site.name} - {site.phone} - {site.address}
                  </li>
                ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default ProductAttributes;
