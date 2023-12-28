import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS của Bootstrap
import * as bootstrap from 'bootstrap';
export default function BannerProduct() {
  useEffect(() => {
    const carouselElement = document.getElementById('carouselExampleIndicators');
    if (carouselElement) {
      const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 2000,
        wrap: true,
      });
      return () => {
        carousel.dispose();
      };
    }
    return undefined;
  }, []);

  return (
    <section className="banner-product">
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="../../../BANNER-PRODUCT3.png"
              className="d-block"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="../../../BANNER-PRODUCT1.png"
              className="d-block"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img src="../../../BANNER-PRODUCT2.png" className="d-block" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
}
