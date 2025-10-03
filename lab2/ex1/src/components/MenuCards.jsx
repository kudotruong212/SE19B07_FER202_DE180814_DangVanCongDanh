  import React from "react";

  const menu = [
    {
      name: "Margherita Pizza",
      img: "/pizza/picture1.jpg",
      oldPrice: 40,
      price: 24,
      label: "SALE"
    },
    {
      name: "Mushroom Pizza",
      img: "/pizza/picture2.jpg",
      price: 25
    },
    {
      name: "Hawaiian Pizza",
      img: "/pizza/picture3.jpg",
      price: 30,
      label: "NEW"
    },
    {
      name: "Pesto Pizza",
      img: "/pizza/picture4.jpg",
      oldPrice: 50,
      price: 36,
      label: "SALE"
    }
  ];

  function MenuCards() {
    return (
      <div className="container py-5" style={{ background: "#2d2d2d" }}>
        <h2 className="text-white mb-4">Our Menu</h2>
        <div className="row">
          {menu.map((item, idx) => (
            <div className="col-md-3 mb-4" key={idx}>
              <div className="card position-relative">
                {item.label && (
                  <span
                    className={`badge ${item.label === "SALE" ? "bg-warning" : "bg-info"} text-dark position-absolute`}
                    style={{ top: 10, left: 10 }}
                  >
                    {item.label}
                  </span>
                )}
                <img src={item.img} className="card-img-top" alt={item.name} style={{height: '400px', objectFit: 'cover'}} />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p>
                    {item.oldPrice && (
                      <span className="text-decoration-line-through">${item.oldPrice}.00</span>
                    )}
                    <span className="text-danger ms-2">${item.price}.00</span>
                  </p>
                  <button className="btn btn-primary me-md-2 btn-outline-light">Buy</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  export default MenuCards;