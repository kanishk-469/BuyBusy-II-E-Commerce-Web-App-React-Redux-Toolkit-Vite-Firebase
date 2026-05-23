import { NavLink, Outlet, Link } from "react-router-dom";
import style from "./Navbar.module.css";
import { useState } from "react";

function Navbar({ isLoggedIn, setIsLoggedIn, users, setUsers }) {
  const [menu, setMenu] = useState("home");

  const [isMenuOpen, setIsMenuOpen] = useState(false); // for production react app

  const openMenu = () => setIsMenuOpen(true);

  const closeMenu = () => setIsMenuOpen(false);

  function handleLogout() {
    //debug
    // console.log("Navbar:", {
    //   isLoggedIn,
    //   users,
    // });

    setIsLoggedIn(false);
    setUsers([]);

    localStorage.removeItem("loggedInUser");

    ///debug, state updates are asynchronous in nature
    // console.log("Navbar:", {
    //   isLoggedIn,
    //   users,
    // });
  }
  return (
    <>
      <div className={style.container}>
        <div className={style.brandName}>🛍️ BuyBusy</div>
        <img
          src={`${import.meta.env.BASE_URL}icons/menu_open2.svg`}
          onClick={openMenu}
          alt=""
          className={style.navMobOpen}
        />
        {isMenuOpen && <div className={style.overlay} onClick={closeMenu} />}

        <ul className={`${style.navMenu} ${isMenuOpen ? style.open : ""}`}>
          <img
            src={`${import.meta.env.BASE_URL}icons/menu_close2.svg`}
            alt=""
            onClick={closeMenu}
            className={style.navMobClose}
          />

          <NavLink to="/" onClick={closeMenu}>
            <li className={style.navItem}>
              <img
                src={`${import.meta.env.BASE_URL}icons/home.png`}
                alt="home"
              />
              <span>Home</span>
            </li>
          </NavLink>
          {isLoggedIn ? (
            <NavLink to={`/myorders/${users?.[0]?.id}`} onClick={closeMenu}>
              <li className={style.navItem}>
                <img
                  src={`${import.meta.env.BASE_URL}icons/myOrder.png`}
                  alt="myorder"
                />
                <span>My orders</span>
              </li>
            </NavLink>
          ) : null}
          {isLoggedIn && (
            <NavLink to="/cart" onClick={closeMenu}>
              <li className={style.navItem}>
                <img
                  src={`${import.meta.env.BASE_URL}icons/cart.png`}
                  alt="cart"
                />
                <span>Cart</span>
              </li>
            </NavLink>
          )}

          {isLoggedIn ? (
            <NavLink to="/signin" onClick={handleLogout}>
              <li className={style.navItem}>
                <img
                  src={`${import.meta.env.BASE_URL}icons/logout.png`}
                  alt="logout"
                />
                <span>Logout</span>
              </li>
            </NavLink>
          ) : (
            <NavLink to="/signin" onClick={closeMenu}>
              <li className={style.navItem}>
                <img
                  src={`${import.meta.env.BASE_URL}icons/login.png`}
                  alt="login"
                />
                <span>Login</span>
              </li>
            </NavLink>
          )}
        </ul>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
