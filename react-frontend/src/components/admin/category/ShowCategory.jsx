import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import { Link } from "react-router-dom";
import { adminToken, apiUrl } from "../../common/Http";

import NoState from "../../common/NoState";
import Modal from "./Modal";
import SkeletonTable from "../../common/Loader/SkeletonTable";


const ShowCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const id=1;
  const fetchCategories = async () => {
    setLoader(true);
    const res = fetch(apiUrl + "/categories", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()} `,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.status == 200) {
          setCategories(result.data);
          setLoader(false);
        } else {
          console.error("Something Went Wrong");
        }
      });
  };
  const deleteCategory = async () => {
    try {
      const res = await fetch(apiUrl + "/categories/"+selectedCategoryId, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()} `,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result.status == 200) {
            const newCategories = categories.filter(
              (category) => category.id !== selectedCategoryId
            );
            setCategories(newCategories);
            toast.success(result.message);
          } else {
            console.error("Something Went Wrong");
          }
        });
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setShowModal(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between mt-5 pb-3">
          <h4 className="h4 pb-0 mb-0">Categories</h4>
          <Link to="/admin/categories/create" className="link btn btn-primary">
            Create
          </Link>
        </div>
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="card shadow">
            <div className="card-body p-4">
              {loader == true && <SkeletonTable />}
              {loader == false && categories.length == 0 && (
                <NoState text="Categories not found" />
              )}
              {categories && categories.length > 0 && (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th width="50">Id</th>
                      <th>Name</th>
                      <th width="100">Status</th>
                      <th width="100">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories &&
                      categories.map((category,index) => (
                        <>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{category.name}</td>
                            <td>
                              {category.status == 1 ? (
                                <span className="badge text-bg-success">
                                  Active
                                </span>
                              ) : (
                                <span className="badge text-bg-danger">
                                  Unactive
                                </span>
                              )}
                            </td>
                            <td>
                              <Link
                                to={`/admin/categories/edit/${category.id}`}
                                className="link primary-text"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </Link>
                              <Link
                                onClick={() => {
                                  setSelectedCategoryId(category.id);
                                  setShowModal(true);
                                }}
                                className="link ms-2 text-danger"
                              >
                                <i className="bi bi-trash"></i>
                              </Link>
                            </td>
                          </tr>
                        </>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
                <Modal
                    button="Delete"
                    color="btn-danger"
                    onConfirm={deleteCategory}
                    onCancel={() => setShowModal(false)}
                />
            )}
    </div>
  );
};

export default ShowCategory;
