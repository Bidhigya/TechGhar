import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { adminToken, apiUrl } from "../../common/Http";

import NoState from "../../common/NoState";
import ModalBrand from "./ModalBrand";
import { toast } from "react-toastify";
import SkeletonTable from "../../common/Loader/SkeletonTable";

const ShowBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const id = 1;
  const fetchBrands = async () => {
    setLoader(true);
    const res = fetch(apiUrl + "/brands", {
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
          console.log(result);

          setBrands(result.data);
          setLoader(false);
        } else {
          console.error("Something Went Wrong");
        }
      });
  };
  const deleteBrand = async () => {
    try {
      const res = await fetch(apiUrl + "/brands/" + selectedBrandId, {
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
            const newBrands = brands.filter(
              (brand) => brand.id !== selectedBrandId
            );
            setBrands(newBrands);
            toast.success(result.message);
          } else {
            console.error("Something Went Wrong");
          }
        });
    } catch (error) {
      console.error("Error deleting brand:", error);
    } finally {
      setShowModal(false);
    }
  };
  useEffect(() => {
    fetchBrands();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between mt-5 pb-3">
          <h4 className="h4 pb-0 mb-0">Brands</h4>
          <Link to="/admin/brands/create" className="link btn btn-primary">
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
              {loader == false && brands.length == 0 && (
                <NoState text="Brands not found" />
              )}

              {brands && brands.length > 0 && (
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
                    {brands &&
                      brands.map((brand, index) => (
                        <>
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{brand.name}</td>
                            <td>
                              {brand.status == 1 ? (
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
                                to={`/admin/brands/edit/${brand.id}`}
                                className="link primary-text"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </Link>
                              <Link
                                onClick={() => {
                                  setSelectedBrandId(brand.id);
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
                <ModalBrand
                    button="Delete"
                    color="btn-danger"
                    onConfirm={deleteBrand}
                    onCancel={() => setShowModal(false)}
                />
            )}
       
    </div>
  );
};

export default ShowBrands;
