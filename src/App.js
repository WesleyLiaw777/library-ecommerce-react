import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import { books } from "./data";
import BookInfo from "./pages/BookInfo";
import Cart from "./pages/Cart";
import React, { useState, useEffect } from "react";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    const dupeItem = cart.find((item) => +item.id === +book.id);
    if (dupeItem) {
      setCart(
        cart.map((item) => {
          if (+item.id === +dupeItem.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        })
      );
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
  }

  function removeFromCart(id) {
    console.log('removed!')
    setCart(cart.filter((book) => book.id !== id))
  }

  function changeQuantity(book, quantity) {
    setCart(
      cart.map((item) =>
        item.id === book.id
          ? {
              ...item,
              quantity: +quantity,
            }
          : item
      )
    );
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach(item => {
      counter += item.quantity;
    })
    return counter;
  }

  // useEffect(() => {

  // }, [cart]);

  return (
    <Router>
      <div className="App">
        <Nav numberOfItems={numberOfItems()}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books books={books} />} />
          <Route
            path="/books/:id"
            element={
              <BookInfo books={books} addToCart={addToCart} cart={cart} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart books={books} cart={cart} changeQuantity={changeQuantity} removeFromCart={removeFromCart} />
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
