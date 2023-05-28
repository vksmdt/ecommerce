import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData.js";
import { Delete, Edit } from "@mui/icons-material";
import Sidebar from "./Sidebar.js";
import { deleteUser, getAllUsers, clearError } from "../../action/userAction.js";
import { DELETE_USER_RESET } from "../../constants/userCConstents.js";

const UserList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { users, error } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted, message } = useSelector(
    (state) => state.profile
  );

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate, message]);

  const columns = [
    { field: "id", headerName: "USER ID", minWidth: 200, flex: 0.5 },
    { field: "email", headerName: "Email", minWidth: 350, flex: 1 },
    {
      field: "name",
      headerName: "Name",

      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      type: "Number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "action",
      flex: 0.5,
      headerName: "Action",
      minWidth: 150,
      type: "Number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.id}`}>
              <Edit />
            </Link>
            <Button onClick={() => deleteUserHandler(params.id)}>
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item, index) => {
      rows.push({
        id: item._id,
        email: item.email,
        name: item.name,
        role: item.role,
      });
    });

  return (
    <Fragment>
      <MetaData title="All USERS - Admin" />
      <div className="dashBoard">
        <Sidebar />
        <div className="productListontainer">
          <h1 id="produtListHeading">All USERS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UserList;
