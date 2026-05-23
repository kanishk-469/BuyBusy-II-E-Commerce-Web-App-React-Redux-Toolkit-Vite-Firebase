// import { useNavigate, useOutletContext } from "react-router-dom";
// import style from "./FilterSidebar.module.css";
// import { useEffect, useState } from "react";
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDocs,
//   or,
//   setDoc,
// } from "firebase/firestore";
// import { db } from "../../configDB/firebase";

// function CartSummarySidebar() {
//   const {
//     products,
//     filteredProducts,
//     maxPrice,
//     setMaxPrice,
//     selectedCategories,
//     setSelectedCategories,
//     cartItems,
//     userId,
//   } = useOutletContext();

//   // const [inputfilterRangeValue, setInputFilterRangeValue] = useState(100);
//   // const [selectedCategories, setSelectedCategories] = useState([]);

//   const [isPurchasing, setIsPurchasing] = useState(false);

//   const navigate = useNavigate();

//   ////handle purchased items
//   async function handlePurchase() {
//     try {
//       // setOrderedItems(cartItems);
//       // setCartItems([]);
//       //save/set ordered items to orderedItems collection in firestore

//       ///1st approach not optimized code
//       // const orderedItemsCollectionRef = collection(db, "orderedItems");
//       // cartItems.map(async (item) => {
//       //   console.log(item);
//       //   await addDoc(orderedItemsCollectionRef, {
//       //     orderItemId: item.id,
//       //     userId: item.userId,
//       //     title: item.title,
//       //     productId: item.productId,
//       //     quantity: item.quantity,
//       //     price: item.price,
//       //     status: "success",
//       //     orderedAt: new Date().toISOString(),
//       //   });
//       // });

//       //2nd approach optimized code
//       if (isPurchasing) return;
//       setIsPurchasing(true);
//       // create manual firestore id here then store my cart data
//       const orderedItemsCollectionRef = collection(db, "orderedItems");

//       const totalPrice = cartItems.reduce((total, item) => {
//         return total + item.price * item.quantity;
//       }, 0);

//       //Create manual Firestore ID (if you want your own instead of auto-generated)
//       const newOrderRef = doc(orderedItemsCollectionRef); // creates an empty ref with unique ID
//       const orderId = newOrderRef.id; // you can log or store this for later

//       ////Prepare product data from cart
//       const orderedProducts = cartItems.map((item) => ({
//         productId: item.productId,
//         title: item.title,
//         price: item.price,
//         quantity: item.quantity,
//       }));

//       //Save order document
//       await setDoc(newOrderRef, {
//         orderId: orderId,
//         userId: userId,
//         totalPrice: totalPrice,
//         products: orderedProducts,
//         status: "success",
//         orderedAt: new Date().toISOString(),
//       });

//       ///remove from cartItems collections from firestore database
//       // cartItems.map(async (item) => {
//       //   await deleteDoc(doc(db, "cartItems", item.id));
//       // });
//       await Promise.all(
//         cartItems.map((item) => deleteDoc(doc(db, "cartItems", item.id)))
//       );

//       // if (!cartItems.length) return;
//       navigate(`/myorders/${cartItems[0].userId}`);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsPurchasing(false);
//     }
//   }

//   function handleFilterPrice(e) {
//     setMaxPrice(Number(e.target.value));
//   }

//   function handleCategoryChange(e) {
//     const { value, checked } = e.target;

//     let updatedCategories;

//     if (checked) {
//       updatedCategories = [...selectedCategories, value];
//     } else {
//       updatedCategories = selectedCategories.filter(
//         (category) => category !== value
//       );
//     }

//     setSelectedCategories(updatedCategories);

//     // applyFilters(inputfilterRangeValue, updatedCategories);
//   }

//   // apply combined filters (price + categories)
//   // function applyFilters(priceValue, categories) {
//   //   let filteredProducts = products.filter((product) => {
//   //     return product.price <= priceValue;
//   //   });

//   //   if (categories.length > 0) {
//   //     filteredProducts = filteredProducts.filter((product) =>
//   //       categories.includes(product.category)
//   //     );
//   //   } else {
//   //     setFilteredProducts(filteredProducts);
//   //   }

//   //   setFilteredProducts(filteredProducts);
//   // }

//   //   if (cartItems?.length > 0) {
//   // console.log("cartItems", cartItems);
//   return (
//     <>
//       <div className={style.container}>
//         <div className={style.filterContainer}>
//           <h2 className={style.filterHeading}>Filter</h2>
//           <div className={style.price}>
//             TotalPrice:
//             {cartItems
//               ? cartItems.reduce(
//                   (acc, curr) => acc + curr.price * curr.quantity,
//                   0
//                 )
//               : 0}
//             /-
//           </div>
//           <button disabled={isPurchasing} onClick={handlePurchase}>
//             {isPurchasing ? "Processing..." : "Purchase"}
//           </button>
//         </div>
//       </div>
//     </>
//   );
//   //   } else {
//   //     return (
//   //       <>
//   //         <div className={style.container}>
//   //           <div className={style.filterContainer}>
//   //             <h2 className={style.filterHeading}>Filter</h2>
//   //             <div className={style.price}>Price: {maxPrice}</div>
//   //             <div className={style.priceSlider}>
//   //               <input
//   //                 type="range"
//   //                 name=""
//   //                 id=""
//   //                 min="100"
//   //                 max="99999"
//   //                 value={maxPrice}
//   //                 onChange={handleFilterPrice}
//   //               />
//   //             </div>
//   //           </div>

//   //           <div className={style.categoryContainer}>
//   //             <h2 className={style.categoryHeading}>Category</h2>
//   //             <div className={style.categoryItems}>
//   //               <div>
//   //                 <input
//   //                   type="checkbox"
//   //                   value="men"
//   //                   checked={selectedCategories.includes("men")}
//   //                   onChange={handleCategoryChange}
//   //                 />{" "}
//   //                 <span> Men's Clothing</span>
//   //               </div>
//   //               <div>
//   //                 <input
//   //                   type="checkbox"
//   //                   value="women"
//   //                   checked={selectedCategories.includes("women")}
//   //                   onChange={handleCategoryChange}
//   //                 />
//   //                 <span> Women's Clothing</span>
//   //               </div>
//   //               <div>
//   //                 <input
//   //                   type="checkbox"
//   //                   value="jewelery"
//   //                   checked={selectedCategories.includes("jewelery")}
//   //                   onChange={handleCategoryChange}
//   //                 />
//   //                 <span> Jewelery</span>
//   //               </div>
//   //               <div>
//   //                 <input
//   //                   type="checkbox"
//   //                   value="electronics"
//   //                   checked={selectedCategories.includes("electronics")}
//   //                   onChange={handleCategoryChange}
//   //                 />
//   //                 <span> Electronics </span>
//   //               </div>
//   //             </div>
//   //           </div>
//   //         </div>
//   //       </>
//   //     );
//   //   }
// }
// export default CartSummarySidebar;

import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";

import { db } from "../../configDB/firebase";
import style from "./CartSummarySidebar.module.css";

function CartSummarySidebar() {
  const { cartItems = [], userId } = useOutletContext();

  const navigate = useNavigate();

  const [isPurchasing, setIsPurchasing] = useState(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  async function handlePurchase() {
    if (!cartItems.length) return;

    try {
      setIsPurchasing(true);

      const orderedItemsRef = collection(db, "orderedItems");

      const newOrderRef = doc(orderedItemsRef);

      const orderedProducts = cartItems.map((item) => ({
        productId: item.productId,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      }));

      await setDoc(newOrderRef, {
        orderId: newOrderRef.id,
        userId,
        totalPrice,
        products: orderedProducts,
        status: "success",
        orderedAt: new Date().toISOString(),
      });

      await Promise.all(
        cartItems.map((item) => deleteDoc(doc(db, "cartItems", item.id)))
      );

      navigate(`/myorders/${userId}`);
    } catch (err) {
      console.error("Purchase failed:", err);
    } finally {
      setIsPurchasing(false);
    }
  }

  return (
    <div className={style.container}>
      <div className={style.filterContainer}>
        <h2 className={style.filterHeading}>Order Summary</h2>

        <div className={style.price}>Total: ₹{totalPrice}</div>

        <button
          className={style.purchaseBtn}
          disabled={isPurchasing || cartItems.length === 0}
          onClick={handlePurchase}
        >
          {isPurchasing ? "Processing..." : "Purchase"}
        </button>
      </div>
    </div>
  );
}

export default CartSummarySidebar;
