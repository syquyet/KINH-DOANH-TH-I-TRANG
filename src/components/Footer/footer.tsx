import "./footer.css";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row-footer">
          <div className="footer-col">
            <h4>Sươngg store</h4>
            <ul>
              <li>Địa chỉ:42-Phạm Ngọc Thạch, TP.Vinh,Việt Nam.</li>
              <li>Hot line: 0888999888</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Theo dõi</h4>
            <div className="social-links">
              <a href="https://www.facebook.com/thusuong.1302">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#">
                <i className="fab fa-twitter" />
              </a>
              <a href="#">
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
          <div className="footer-col">
            <div>
              <iframe
                id="maps-shop"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15338.561926949256!2d108.2038231!3d16.0322201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1693217574068!5m2!1svi!2s"
                width="500px"
                height="250px"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
