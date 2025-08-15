import React, { useState } from "react";
import { Link } from "react-router-dom";

const products = [
  { name: "Jaggery", id:"1234", url: "/images/p3.jpg", price: "₹120/kg" },
  { name: "Pulses", id:"123454",  url: "/images/p5.jpg", price: "₹95/kg" },
  { name: "Sugar", id:"13434",  url: "/images/p7.jpg", price: "₹45/kg" },
  { name: "Salt", id:"13234",  url: "/images/p9.jpg", price: "₹20/kg" },
  { name: "Atta", id:"1334",  url: "/images/p11.jpg", price: "₹35/kg" },
  { name: "Basmati Rice", id:"14534",  url: "/images/p12.jpg", price: "₹150/kg" },
  { name: "Tea", id:"18934",  url: "/images/p13.jpg", price: "₹220/kg" },
  { name: "Dry Fruits", id:"1364",  url: "/images/p14.jpg", price: "₹500/kg" },
];

const TrendingProduct = () => {

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productName) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.name === productName
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)


  return (
    <section className="bg-gradient-to-br from-rose-100 via-pink-50 to-white py-16 px-4">
     <div className="flex items-center justify-between max-w-7xl mx-auto mb-8">
     <h2 className="md:text-4xl text-2xl font-bold text-center text-rose-700 mb-12">
        Trending Products
      </h2>

      <div className="relative hidden w-fit  text-rose-700 mb-12"  onClick={() => setIsCartOpen(!isCartOpen)}>
  {/* Cart Icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h11a1 1 0 001-1V9M7 13l.4-2M6 19a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z"
    />
  </svg>

  {/* Item Count Badge */}
  {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
              {totalItems}
            </span>
          )}



          {isCartOpen && (
          <div className="absolute top-20 right-4 bg-white shadow-lg rounded-xl p-4 w-80 z-50 border border-rose-200">
            <h3 className="text-lg font-bold mb-3 text-rose-600">Your Cart</h3>
            {cartItems?.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <ul className="space-y-3">
                {cartItems?.map((item, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{item?.name}</p>
                      <p className="text-sm text-gray-500">
                        ₹{item?.price} × {item?.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.name)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {cartItems.length > 0 && (
              <div className="mt-4 border-t pt-2">
                <p className="font-semibold text-gray-700">
                  Total: ₹{totalPrice}
                </p>
              </div>
            )}
          </div>
        )}
</div>

     </div> 

      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {products.map((product, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col"
          >
            <img
              src={product.url}
              alt={product.name}
              className="rounded-t-2xl w-full h-56 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <h3 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h3>
              {/* <p className="text-gray-600 mt-1">{product.price}</p> */}

              <div className="mt-4 flex flex-col gap-2">
                <Link to={`/shopnow/${product.id}`}  className="bg-rose-600 text-white rounded-xl py-2 px-4 hover:bg-rose-700 transition">
                  Buy Now
                </Link>
                {/* <button onClick={() => addToCart(product)} className="border border-rose-600 text-rose-600 rounded-xl py-2 px-4 hover:bg-rose-50 transition">
                  Add to Cart
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingProduct;
