import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./card";
import { loadCart } from "./helper/cartHelper";
import Paymentb from "./Paymentb";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2 className="mb-4">Product Added</h2>
        <div className="row">
          {products.map((product, index) => (
            <div className="col-md-6 mb-4">
              <Card
                key={index}
                product={product}
                removeFromCart={true}
                addtoCart={false}
                setReload={setReload}
                reload={reload}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2>This sec to load for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center pb-5">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No Products in cart</h3>
          )}
        </div>
        <div className="col-6">
          <Paymentb products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
