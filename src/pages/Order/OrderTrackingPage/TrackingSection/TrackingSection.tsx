const TrackingSection = () => {
  return (
    <section className="cr-track padding-t-100 padding-b-50">
      <div className="container">
        <div className="row">
          <div className="container">
            <div className="cr-track-box">
              <div className="row">
                <div className="col-md-4 m-b-767">
                  <div className="cr-track-card"><span className="cr-track-title">order</span><span>#9857</span>
                  </div>
                </div>
                <div className="col-md-4 m-b-767">
                  <div className="cr-track-card"><span
                    className="cr-track-title">Grasshoppers</span><span>M254HT</span></div>
                </div>
                <div className="col-md-4 m-b-767">
                  <div className="cr-track-card"><span className="cr-track-title">Expected date</span><span>Feb
                                        17, 2025</span></div>
                </div>
              </div>
              <div className="cr-steps">
                <div className="cr-steps-body">
                  <div className="cr-step cr-step-completed">
                                    <span className="cr-step-indicator">
                                        <i className="ri-check-line"></i>
                                    </span>
                    <span className="cr-step-icon">
                                        <i className="ri-shield-check-line"></i>
                                    </span>Order<br /> confirmed
                  </div>

                  <div className="cr-step cr-step-completed">
                                    <span className="cr-step-indicator">
                                        <i className="ri-check-line"></i>
                                    </span>
                    <span className="cr-step-icon">
                                        <i className="ri-settings-4-line"></i>
                                    </span>Processing<br /> order
                  </div>
                  <div className="cr-step cr-step-active">
                                    <span className="cr-step-icon">
                                        <i className="ri-gift-line"></i>
                                    </span>Quality<br /> check
                  </div>
                  <div className="cr-step">
                                    <span className="cr-step-icon">
                                        <i className="ri-truck-line"></i>
                                    </span>Product<br /> dispatched
                  </div>
                  <div className="cr-step">
                                    <span className="cr-step-icon">
                                        <i className="ri-home-5-line"></i>
                                    </span>Product<br /> delivered
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TrackingSection;