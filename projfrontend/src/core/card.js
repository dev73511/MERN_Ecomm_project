import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  // function (f) { return f}
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);

  const [count, setCount] = useState(product.count);

  const cartTitle = product ? product.name : "A Photo from pixels";
  const cartDescription = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "Default price";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block py-2 addtocart mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="cardStyle">
      <div className="card">
        <div className="py-3 card_title">{cartTitle}</div>
        <div className="card-body linerbg">
          {getARedirect(redirect)}
          <ImageHelper product={product} />
          <p className="lead mb-0 py-3 font-weight-normal text-wrap">
            {cartDescription}
          </p>
          <p className="btn rounded  btn-sm px-4">$ {cartPrice}</p>
          <div className="row">
            <div className="col-12">{showAddToCart(addtoCart)}</div>
            <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
