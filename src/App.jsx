import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { useEffect, useState, lazy, Suspense } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import ErrorPage from "./pages/NotFoundPage/ErrorPage.jsx";

// import HomePage from "./pages/HomePage/HomePage.jsx";
// import CartPage from "./pages/CartPage/CartPage.jsx";
// import OrdersPage from "./pages/OrdersPage/OrdersPage.jsx";

///lazy loading , works at bundle level
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));

const CartPage = lazy(() => import("./pages/CartPage/CartPage"));

const OrdersPage = lazy(() => import("./pages/OrdersPage/OrdersPage"));

import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "./configDB/firebase.js";
// import { Provider } from "react-redux";
// import { store } from "./redux/store/store.js";
import { useDispatch } from "react-redux";

import { getInitialCartValueAsync } from "./redux/reducers/cartReducer.js"; //getInitialCartValueAsync
import HomeFilterSidebar from "./components/FilterSidebar/HomeFilterSidebar.jsx";
import CartSummarySidebar from "./components/FilterSidebar/CartSummarySidebar.jsx";
import Loader from "./components/Loader/Loader.jsx";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);

      setUsers([parsedUser]);
      setIsLoggedIn(true);
    }
  }, []);

  //Define Protected Route wrapper outside router
  const ProtectedRoutes = ({ children }) => {
    const savedUser = localStorage.getItem("loggedInUser");

    return isLoggedIn || savedUser ? (
      children
    ) : (
      <Navigate to="/signin" replace />
    );
  };

  ////retrieve all cart items from firestore
  useEffect(() => {
    try {
      // const fetchCartItems = async () => {
      //   const querySnapshot = await getDocs(collection(db, "cartItems"));
      //   const cartItemsData = querySnapshot.docs.map((doc) => {
      //     return { ...doc.data(), id: doc.id };
      //   });
      //   setCartItems(cartItemsData);
      // };
      // fetchCartItems();
      dispatch(getInitialCartValueAsync());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  // console.log(cartItems);
  // console.log(users);

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: (
          <Navbar
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            users={users}
            setUsers={setUsers}
          />
        ),
        errorElement: <ErrorPage />,
        children: [
          //we define individual routes, parent and child relationship

          //1st children of Navbar
          {
            path: "/",
            element: (
              <HomePage
                // setCartItems={setCartItems}
                users={users}
                isLoggedIn={isLoggedIn}
              />
            ),
            children: [
              {
                path: "",
                element: (
                  <div className="filter-sidebar-wrapper">
                    {/* <FilterSidebar /> */}
                    <HomeFilterSidebar />
                  </div>
                ),
              },
            ],
          },

          //2nd children of Navbar
          {
            path: "/cart",
            element: (
              <ProtectedRoutes>
                <CartPage users={users} />
              </ProtectedRoutes>
            ),
            children: [
              {
                path: "",
                element: (
                  <div className="cart-wrapper-filter-sidebar">
                    {/* <FilterSidebar /> */}
                    <CartSummarySidebar />
                  </div>
                ),
              },
            ],
          },

          //3rd children of Navbar
          {
            path: "/myorders/:userId",
            element: (
              <ProtectedRoutes>
                <OrdersPage />
              </ProtectedRoutes>
            ),
          },

          //4th children of Navbar
          {
            path: "/signup",
            element: <RegisterPage setUsers={setUsers} />,
          },
          {
            path: "/signin",
            element: (
              <LoginPage
                setIsLoggedIn={setIsLoggedIn}
                users={users}
                setUsers={setUsers}
              />
            ),
          },
        ],
      },
    ],
    {
      basename: "/buybusy", // 👈 VERY IMPORTANT
    }
  );

  return (
    <>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
