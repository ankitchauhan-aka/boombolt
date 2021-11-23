import React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer-div py-4 background-image-dark">
        <div className="container">
          <div className="row">
            <div className="col-md-3 footer-content">
              <h2 className="footer-heading">How can we help?</h2>
              <p className="pt-4">
                <a href="#">
                  <span></span> Help
                </a>
              </p>
              <p>
                <a href="#">
                  <span></span> Track my order
                </a>
              </p>
              <p>
                <a href="#">
                  <span></span> Returns
                </a>
              </p>
              <p>
                <a href="#">
                  <span></span> Size Guide
                </a>
              </p>
              {/* <p>
                <a href="#">
                  <span></span> affiliates
                </a>
              </p> */}
            </div>
            <div className="col-md-3 footer-content">
              <h2 className="footer-heading">info</h2>
              <p className="pt-4">
                <a href="#">
                  <span></span> My account
                </a>
              </p>
              <p>
                <a href="#">
                  <span></span> bulk & b2b orders
                </a>
              </p>
              <p>
                <a href="#">
                  <span></span> customization
                </a>
              </p>
              <p>
                <a href="#">
                  <span></span> privacy policy
                </a>
              </p>
              <p>
                <a href="#">
                  <span></span> terms & conditions
                </a>
              </p>
            </div>
            {/* <div className="col-md-3 footer-content">
              <h2 className="footer-heading">quick links</h2>
              <p className="pt-4">
                <a href="#">
                  <span></span> my account
                </a>
              </p>
              <p>
                <a href="#">
                  <span></span> track my order
                </a>
              </p>
              <p>
                <a href="#">
                  <span></span> return my order
                </a>
              </p>
              <p>
                <a href="#">
                  <span></span> cancel my order
                </a>
              </p>
            </div> */}
            <div className="col-md-3 footer-content">
              <h2 className="footer-heading">highlights</h2>
              <p className="pt-4">
                <a href="#">100% secure payment</a>
              </p>
              <p>
                <a href="#">COD available</a>
              </p>
              <p>
                <a href="#">15 days easyreturn</a>
              </p>
              <p>
                <a href="#">lighting delivery - wolfpack exclusive</a>
              </p>
              <p>
                <a href="#">Boombolt Giftcard</a>
              </p>
              <p>
                <a href="#">Student Discount</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-partner-div py-4 background-image-check">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <p className="mb-0">experience the boombolt store app</p>
              <div className="pt-2">
                <a href="#" className="footer-app-store-img">
                  <img src={"/images/footer-logo/imageslayer_062.png"} className="play-store-img" />
                </a>
                <a href="#" className="footer-app-store-img">
                  <img src={"/images/footer-logo/imageslayer_063.png"} className="app-store-img"/>
                </a>
              </div>
            </div>
          </div>
          <div className="row mt-md-5 mt-3">
            <div className="col-md-6 text-center">
              <p className="mb-0">100% secure payment</p>
              <div className="pt-2">
                <a href="#" className="footer-secure-img">
                  <img src={"/images/footer-logo/imageslayer_057.png"} />
                </a>
                <a href="#" className="footer-secure-img">
                  <img src={"/images/footer-logo/imageslayer_058.png"} />
                </a>
                <a href="#" className="footer-secure-img">
                  <img src={"/images/footer-logo/imageslayer_059.png"} />
                </a>
                <a href="#" className="footer-secure-img">
                  <img src={"/images/footer-logo/imageslayer_061.png"} />
                </a>
                <a href="#" className="footer-secure-img">
                  <img src={"/images/footer-logo/imageslayer_060.png"} />
                </a>
              </div>
            </div>
            <div className="col-md-6 text-center mt-3 mt-md-0">
              <p className="mb-0">Shipping Partners</p>
              <div className="pt-2">
                <a href="#" className="footer-secure-img">
                  <img src={"/images/footer-logo/imageslayer_054.png"} />
                </a>
                <a href="#" className="footer-secure-img">
                  <img src={"/images/footer-logo/imageslayer_055.png"} />
                </a>
                <a href="#" className="footer-secure-img">
                  <img src={"/images/footer-logo/imageslayer_056.png"} />
                </a>
              </div>
            </div>
          </div>
          <div className="row mt-md-5 mt-3">
            <div className="col-md-12 text-center">
              <p className="mb-0">
                &#169; 2020-2021 boombolt, all rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
