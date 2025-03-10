import * as React from 'react';
import { useCountDown } from '~/hooks/useCountDown.ts';

interface Props {}

const DealBanner: React.FC<Props> = () => {
  const { days, hours, minutes, seconds } = useCountDown(60 * 60 * 1000);
  return (
    <section className="section-deal padding-b-100">
      <div className="bg-banner-deal">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="cr-deal-rightside">
                <div className="cr-deal-content" data-aos="fade-up" data-aos-duration="2000">
                  <span>
                    <code>40%</code> OFF
                  </span>
                  <h4 className="cr-deal-title">Great deal on Womens Fashion.</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do maecenas
                    accumsan lacus vel facilisis.
                  </p>
                  <div className="cr-counter">
                    <div className="cr-counter-inner">
                      <h4>
                        <span id="days">{days}</span>
                        Days
                      </h4>
                      <h4>
                        <span id="hours">{hours}</span>
                        Hrs
                      </h4>
                      <h4>
                        <span id="minutes">{minutes}</span>
                        Min
                      </h4>
                      <h4>
                        <span id="seconds">{seconds}</span>
                        Sec
                      </h4>
                    </div>
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
export default DealBanner;
