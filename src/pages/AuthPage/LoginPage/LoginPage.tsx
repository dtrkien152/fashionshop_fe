import { IMAGES } from '~/images';

const LoginPage = () => {
  return (
    <section className="section-login padding-tb-150">
      <div className="container">
        <div className="row d-none">
          <div className="col-lg-12">
            <div className="mb-30" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400">
              <div className="cr-banner">
                <h2>Login</h2>
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
            <div className="cr-login" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400">
              <div className="form-logo">
                <img src={IMAGES.logo} alt="logo" />
              </div>
              <form className="cr-content-form">
                <div className="form-group">
                  <label>Email Address*</label>
                  <input type="email" placeholder="Enter Your Email" className="cr-form-control" />
                </div>
                <div className="form-group">
                  <label>Password*</label>
                  <input type="password" placeholder="Enter Your password" className="cr-form-control" />
                </div>
                <div className="remember">
                                <span className="form-group custom">
                                    <input type="checkbox" id="html" />
                                    <label htmlFor="html">Remember Me</label>
                                </span>
                  <a className="link" href="forgot.html">Forgot Password?</a>
                </div>
                <br />
                <div className="login-buttons">
                  <button type="button" className="cr-button">Login</button>
                  <a href="register.html" className="link">
                    Signup?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default LoginPage;