import { useEffect, useState } from 'react';
import { orderService } from '~/services';
import { OrderDto, OrderFilter } from '~/dto';
import { Flex } from 'antd';
import OrderItem from '~/components/OrderItem/OrderItem.tsx';
import { ORDER_STATUS, ORDER_STATUS_OPTIONS } from '~/constants';

const OrderListPage = () => {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [filterCriteria, setFilterCriteria] = useState<OrderFilter>({
    page: 1,
    limit: 100,
  });

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [filterCriteria.status]);

  const onChangeStatusFilter = (status?: ORDER_STATUS) => {
    setFilterCriteria((criteria) => ({ ...criteria, status }));
  };

  const handleSearch = () => {
    orderService.getAllMyOrders(filterCriteria).then((res) => {
      setOrders(res.data.data);
    });
  };

  return (
    <div className="cr-order-list padding-tb-50">
      <div className="container">
        <div className="cr-status-tabs">
          <a
            className={'cr-status-tab ' + (!filterCriteria.status ? 'active' : '')}
            onClick={() => onChangeStatusFilter()}
          >
            Tất cả
          </a>
          {ORDER_STATUS_OPTIONS.map((status, index) => (
            <a
              key={index}
              className={
                'cr-status-tab ' + (filterCriteria.status === status.value ? 'active' : '')
              }
              onClick={() => onChangeStatusFilter(status.value)}
            >
              {status.label}
            </a>
          ))}
        </div>
        {/*<div className="title-2 mb-30">*/}
        <div className="cr-search mb-30">
          <input
            className="search-input"
            type="search"
            placeholder="Search For items..."
            value={filterCriteria.searchTerm}
            onChange={(e) =>
              setFilterCriteria((criteria) => ({ ...criteria, searchTerm: e.target.value }))
            }
          />
          <select
            className="form-select"
            aria-label="Select category"
            value={filterCriteria.searchBy}
            onChange={(e) =>
              setFilterCriteria((criteria) => ({ ...criteria, searchBy: e.target.value }))
            }
          >
            <option value="">Tìm kiếm điều kiện</option>
            <option value="code">Mã đơn hàng</option>
            <option value="customerName">Tên khách hàng</option>
            <option value="customerPhone">Số điện thoại khách hàng</option>
          </select>
          <button type="submit" className="search-btn" onClick={handleSearch}>
            <i className="ri-search-line"></i>
          </button>
        </div>
        <Flex vertical={true} gap={24}>
          {orders.map((order, index) => (
            <OrderItem order={order} key={index} />
          ))}
        </Flex>
      </div>
    </div>
  );
};
export default OrderListPage;
