import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getaCategory, updateaCateogry } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateCategory = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    error: "",
    createdCategory: "",
    formData: "",
  });

  const { name, error, createdCategory, formData } = values;

  const preload = (categoryId) => {
    getaCategory(categoryId).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: "" });
    updateaCateogry(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.errors });
        } else {
          setValues({
            ...values,
            name: "",
            createdCategory: data.name,
          });
        }
      }
    );
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdCategory ? "" : "none" }}
    >
      <h4>{createdCategory} Updated successfully</h4>
    </div>
  );

  const updateCategoryForm = () => (
    <form className="py-4">
      <div className="form-group ">
        <label>Category</label>
        <input
          className="form-control"
          onChange={handleChange("name")}
          value={name}
          placeholder="Enter category name"
          required
          autoFocus
        />
      </div>
      <div className="form-group">
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-outline-primary"
        >
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product updation section"
      className="container p-4 mb-5 bg-white box_shadow"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row">
        <div className="col-md-8 offset-md-2 rounded">
          {successMessage()}
          {updateCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
