import React from "react";
import "./Sidebar.css";
import Logo from "../../../src/images/logo.png";
import { Link } from "react-router-dom";
import {
  Add,
  Dashboard,
  ExpandMore,
  ImportExport,
  ListAlt,
  People,
  PostAdd,
  RateReview,
} from "@mui/icons-material";
// import TreeView from "@mui/lab/TreeView";
import {TreeItem,TreeView} from "@mui/lab";

const Sidebar = () => {
  return (
    <div className="sideBar">
      <Link to="/">
        <img src={Logo} alt="Ecommerce" />
      </Link>

      <Link to="/admin/dashboard">
        <Dashboard /> Dashboard
      </Link>
      <div className="sd">
        <TreeView
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ImportExport />}
        >
          <TreeItem nodeId="1" label="Product">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAdd />} />
            </Link>
            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<Add />} />
            </Link>
          </TreeItem>
        </TreeView>
      </div>
      <Link to="/admin/orders">
        <p>
          <ListAlt /> Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <People /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReview /> Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
