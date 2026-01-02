import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { adminToken, apiUrl } from "../../common/Http";
import SkeletonTable from "../../common/Loader/SkeletonTable";
import NoState from "../../common/NoState";
import SkeletonTable2 from "../../common/Loader/SkeletonTable2";
import Modal from "./Modal";
import { toast } from "react-toastify";

const ShowProduct = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const id = 1;
  const fetchProducts = async () => {
    setLoader(true);
    const res = fetch(apiUrl + "/products", {
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
          setProducts(result.data);
          setLoader(false);
        } else {
          console.error("Something Went Wrong");
        }
      });
  };

  const deleteProduct = async () => {
    try {
      const res = await fetch(apiUrl + "/products/" + selectedProductId, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${adminToken()} `,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result.status == 200) {
            const newProducts = products.filter(
              (prod) => prod.id !== selectedProductId
            );
            setProducts(newProducts);
            toast.success(result.message);
          } else {
            toast.error(result.message);
          }
        });
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setShowModal(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="container mb-3">
      <div className="row">
        <div className="d-flex justify-content-between mt-5 pb-3">
          <h4 className="h4 pb-0 mb-0">Products</h4>
          <Link to="/admin/products/create" className="link btn btn-primary">
            Create
          </Link>
        </div>
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="card shadow">
            <div className="card-body p-4">
              {loader == true && <SkeletonTable2 />}
              {loader == false && products.length == 0 && (
                <NoState text="Products not found" />
              )}
              {products && products.length > 0 && (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      {/* <th>SKU</th> */}
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      products.map((product, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {product.image_url === "" ? (
                                <img src="https://placehold.co/600x400" />
                              ) : (
                                <img
                                  src={product.image_url}
                                  width={50}
                                  alt={product.title}
                                />
                              )}
                            </td>
                            <td>{product.title}</td>
                            <td>Rs.{product.price}</td>
                            <td>{product.qty}</td>
                            {/* <td>{product.sku}</td> */}
                            <td>
                              {product.status == 1 ? (
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
                                to={`/admin/products/edit/${product.id}`}
                                className="link primary-text"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </Link>
                              <Link
                                onClick={() => {
                                  setSelectedProductId(product.id);
                                  setShowModal(true);
                                }}
                                className="link ms-2 text-danger"
                              >
                                <i className="bi bi-trash"></i>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
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
          onConfirm={deleteProduct}
          onCancel={() => setShowModal(false)}
          text="Are you sure you want delete this product here?"
        />
      )}
      
    </div>
  );
};

export default ShowProduct;
