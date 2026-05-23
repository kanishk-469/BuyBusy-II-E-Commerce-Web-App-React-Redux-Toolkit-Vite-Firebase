import { useEffect, useState } from "react";
import style from "./CartPage.module.css";
import { Outlet } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../configDB/firebase";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  cartSelector,
  getInitialCartValueAsync,
  removeCartItemAsync,
} from "../../redux/reducers/cartReducer";

// function CartPage({ cartItems = [], setCartItems, users }) {
function CartPage({ users }) {
  const { cartItems } = useSelector(cartSelector);
  const dispatch = useDispatch();
  const [cartItemsWithProductDetails, setCartItemsWithProductDetails] =
    useState([]);

  // 🔹 Helper → fetch cart items with product details

  async function fetchCartItemsWithDetails(userId) {
    try {
      const cartRef = collection(db, "cartItems");
      const q = query(cartRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // // setCartItems([]);
        querySnapshot.docs.map(
          async (docSnap) => await deleteDoc(doc(db, "cartItems", docSnap.id))
        );

        setCartItemsWithProductDetails([]);
        return;
      }

      const cartItemsData = querySnapshot.docs.map((docSnap) => ({
        ...docSnap.data(),
        id: docSnap.id,
      }));
      // setCartItems(cartItemsData);

      // fetch product details
      const cartWithDetails = await Promise.all(
        cartItemsData.map(async (item) => {
          const productRef = doc(db, "products", item.productId);
          const productSnap = await getDoc(productRef);

          if (productSnap.exists()) {
            return {
              ...item,
              ...productSnap.data(),
              productDocId: productSnap.id,
            };
          }
          return item;
        })
      );

      setCartItemsWithProductDetails(cartWithDetails);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  }

  // 🔹 Remove item
  async function handleRemoveFromCart(id) {
    try {
      dispatch(removeCartItemAsync(id)); // passing action to cartReducer.js file

      // await deleteDoc(doc(db, "cartItems", id));
      await fetchCartItemsWithDetails(users[0].id); // refresh UI
      toast.warning("Item removed from cart!");
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  }

  // 🔹 Increase quantity
  async function increaseQuantity(id) {
    try {
      // const product = cartItems.find((item) => item.id === id);
      const result = await getDoc(doc(db, "cartItems", id));
      const product = result.data();
      console.log(id);

      console.log(product);
      if (!product) return;

      const newQuantity = product.quantity + 1;
      await updateDoc(doc(db, "cartItems", id), { quantity: newQuantity });

      await fetchCartItemsWithDetails(users[0].id); // refresh UI
      toast.success("Item added to cart!");
    } catch (err) {
      console.error("Error increasing quantity:", err);
    }
  }

  // 🔹 Decrease quantity
  async function decreaseQuantity(id) {
    try {
      // const product = cartItems.find((item) => item.id === id);
      const product = (await getDoc(doc(db, "cartItems", id))).data();
      if (!product) return;

      if (product.quantity > 1) {
        const newQuantity = product.quantity - 1;
        await updateDoc(doc(db, "cartItems", id), { quantity: newQuantity });
        toast.warning("Item removed from cart!");
      } else {
        await handleRemoveFromCart(id);
        return;
      }

      await fetchCartItemsWithDetails(users[0].id); // refresh UI
    } catch (err) {
      console.error("Error decreasing quantity:", err);
    }
  }

  // 🔹 fetch on mount and update
  // useEffect(() => {
  //   if (!users || users.length === 0) return;

  //   // 🔹 Fetch whenever user changes or cart updates in Redux
  //   fetchCartItemsWithDetails(users[0].id);
  //   console.log("cartItems", cartItems);
  //   // }, [users, cartItems]);
  // }, [users]);

  useEffect(() => {
    if (!users || users.length === 0) return;

    // First fetch all cart items into Redux store
    dispatch(getInitialCartValueAsync())
      .unwrap()
      .then(() => {
        // Then fetch Firestore product details
        fetchCartItemsWithDetails(users[0].id);
      })
      .catch((err) => console.error("Error fetching cart items:", err));
  }, [users, dispatch]);

  return (
    <>
      <div className={style.container}>
        {!cartItems || cartItems.length === 0 ? (
          <p style={{ color: "red", textAlign: "center", fontSize: "25px" }}>
            No Items found.
          </p>
        ) : (
          <div className={style.productContainer}>
            {cartItemsWithProductDetails.map((product) => (
              <div className={style.productCardContainer} key={product.id}>
                <div className={style.productCard}>
                  <img
                    src={product.image}
                    alt="product"
                    className={style.productImage}
                  />
                  <div className={style.productName}>{product.title}</div>
                  <div className={style.productPrice}>
                    ₹{product.price}
                    <span className={style.productQuantity}>
                      <span onClick={() => decreaseQuantity(product.id)}>
                        {" "}
                        -{" "}
                      </span>
                      <span>{product.quantity}</span>
                      <span onClick={() => increaseQuantity(product.id)}>
                        {" "}
                        +{" "}
                      </span>
                    </span>
                  </div>
                  <button
                    className={style.removeFromCartBtn}
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    Remove From Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
      <Outlet
        context={{
          cartItems: cartItemsWithProductDetails,
          userId: users[0].id,
          // setCartItems,
          // setOrderedItems,
        }}
      />
    </>
  );
}

export default CartPage;
