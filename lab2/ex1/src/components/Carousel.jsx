import React from "react";

export default function Carousel() {
  return (
    <div id="pizzaCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/pizza/picture1.jpg" className="d-block w-100" alt="Pizza 1" style={{ height: "400px", objectFit: "cover" }} />
          <div className="carousel-caption d-none d-md-block">
            <h1 className="fw-bold">Neapolitan Pizza</h1>
            <p>If you are looking for traditional Italian pizza, the Neapolitan is the best option!</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/pizza/picture6.jpg" className="d-block w-100" alt="Pizza 2" style={{ height: "400px", objectFit: "cover" }} />
          <div className="carousel-caption d-none d-md-block">
            <h1 className="fw-bold">Mushroom Pizza</h1>
            <p>Delicious mushroom pizza for your taste!</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/pizza/picture7.jpg" className="d-block w-100" alt="Pizza 3" style={{ height: "400px", objectFit: "cover" }} />
          <div className="carousel-caption d-none d-md-block">
            <h1 className="fw-bold">Hawaiian Pizza</h1>
            <p>Try our sweet and savory Hawaiian pizza!</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/pizza/picture8.jpg" className="d-block w-100" alt="Pizza 3" style={{ height: "400px", objectFit: "cover" }} />
          <div className="carousel-caption d-none d-md-block">
            <h1 className="fw-bold">Hawaiian Pizza</h1>
            <p>Try our sweet and savory Hawaiian pizza!</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/pizza/picture9.jpg" className="d-block w-100" alt="Pizza 3" style={{ height: "400px", objectFit: "cover" }} />
          <div className="carousel-caption d-none d-md-block">
            <h1 className="fw-bold">Hawaiian Pizza</h1>
            <p>Try our sweet and savory Hawaiian pizza!</p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#pizzaCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#pizzaCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}