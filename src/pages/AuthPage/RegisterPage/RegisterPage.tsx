import { IMAGES } from '~/images';

const RegisterPage = () => {
  return (
    <section className="section-register padding-tb-100">
      <div className="container">
        <div className="row d-none">
          <div className="col-lg-12">
            <div className="mb-30" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400">
              <div className="cr-banner">
                <h2>Register</h2>
              </div>
              <div className="cr-banner-sub-title">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore lacus vel facilisis. </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="cr-register" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400">
              <div className="form-logo">
                <img src={IMAGES.logo} alt="logo" />
              </div>
              <form className="cr-content-form">
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label>Firast Name*</label>
                      <input type="text" placeholder="Enter Your First Name" className="cr-form-control" />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label>Last Name*</label>
                      <input type="text" placeholder="Enter Your Last Name" className="cr-form-control" />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label>Email*</label>
                      <input type="email" placeholder="Enter Your email" className="cr-form-control" />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label>Phone Number*</label>
                      <input type="text" placeholder="Enter Your phone number"
                             className="cr-form-control" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Address*</label>
                      <input type="text" placeholder="Address" className="cr-form-control" />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label>City*</label>
                      <select className="cr-form-control" aria-label="Default select example">
                        <option selected>City</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label>Post Code</label>
                      <input type="email" placeholder="Post Code" className="cr-form-control" />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label>Country*</label>
                      <select className="cr-form-control" aria-label="Default select example">
                        <option selected>Country</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label>Region State*</label>
                      <select className="cr-form-control" aria-label="Default select example">
                        <option selected>Region/State</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                  <div className="cr-register-buttons">
                    <button type="button" className="cr-button">Signup</button>
                    <a href="login.html" className="link">
                      Have an account?
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default RegisterPage;