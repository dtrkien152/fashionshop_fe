import { OrderSummary } from '~/pages/ChecOutPage/OrderSummary';
import { DeliveryMethod } from '~/pages/ChecOutPage/DeliveryMethod';
import { PaymentMethod } from '~/pages/ChecOutPage/PaymentMethod';
import { CustomerInfo } from '~/pages/ChecOutPage/CustomerInfo';
import { BillingDetails } from '~/pages/ChecOutPage/BillingDetails';

const CheckOutPage = () => {
  return (
    <section className="cr-checkout-section padding-tb-100">
      <div className="container">
        <div className="row">
          <div className="cr-checkout-rightside col-lg-4 col-md-12">
            <OrderSummary />
            <DeliveryMethod />
            <PaymentMethod />
          </div>
          <div className="cr-checkout-leftside col-lg-8 col-md-12 m-t-991">
            <div className="cr-checkout-content">
              <div className="cr-checkout-inner">
                <CustomerInfo />
                <BillingDetails />
                <span className="cr-check-order-btn">
                  <a className="cr-button mt-30" href="#">
                    Place Order
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CheckOutPage;
