import React from "react";
import Logo from "../../../images/logo.png";
import "./Header.css";

import { ReactNavbar } from "overlay-navbar";
import { ShoppingCart, AccountBox, SearchOutlined } from "@mui/icons-material";

const Header = () => {
  return (
    <>
      <ReactNavbar
        burgerColor="black"
        burgerColorHover="#eb4034"
        logo={Logo}
        logoWidth="20vmax"
        navColor1="white"
        logoHoverSize="15px"
        logoHoverColor="#eb4034"
        logoTransition="0.5"
        logoAnimationTime="1"
        link1Text="Home"
        link2Text="Products"
        link3Text="Contact"
        link4Text="About"
        link1Url="/"
        link2Url="/products"
        link3Url="/contact"
        link4Url="/about"
        link1Size="1.9vmax"
        link1Color="black"
        nav1justifyContent="flex-end"
        nav2justifyContent="flex-end"
        nav3justifyContent="flex-start"
        nav4justifyContent="flex-start"
        link1ColorHover="#eb4034"
        link1Margin="1vmax"
        profileIconUrl="/login"
        profileIconColor="black"
        searchIconColor="black"
        cartIconColor="black"
        profileIconColorHover="#eb4034"
        searchIconColorHover="#eb4034"
        cartIconColorHover="#eb4034"
        cartIconMargin="2vmax"
        cartIconSize="5vmax"
        searchIconSize="5vmax"
        profileIcon={true}
        ProfileIconElement={AccountBox}
        cartIcon={true}
        CartIconElement={ShoppingCart}
        searchIcon={true}
        SearchIconElement={SearchOutlined}
      />
    </>
  );
};

export default Header;
