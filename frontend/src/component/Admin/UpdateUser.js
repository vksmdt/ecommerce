import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData.js";
import { Mail, Person, VerifiedUser } from "@mui/icons-material";
import Sidebar from "./Sidebar.js";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_USER_RESET } from "../../constants/userCConstents.js";
import {
  getUserDetails,
  updateUser,
  clearError,
} from "../../action/userAction.js";
import Loader from "../layout/loader/Loader.js";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, user,loading} = useSelector((state) => state.userDetails);
  const { loading: updateLoding, error: updateError, isUpdated } = useSelector(
    (state) => state.profile
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(id, myForm));
  };

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, navigate, id, isUpdated, updateError, user]);
  return (
    <Fragment>
      <MetaData title="UPDATE USER" />
      <div className="dashBoard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>UPDATE USER</h1>
              <div>
                <Person />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Mail />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUser />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value=""> Choose Role</option>
                  <option value="admin"> Admin</option>
                  <option value="user"> User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoding ? true : false || role === "" ? true : false
                }
              >
                UPDATE
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
