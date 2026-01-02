import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/Http";
import { toast } from "react-toastify";
import Modal from "./Modal";

const EditProduct = ({ placeholder }) => {
  const [content, setContent] = useState("");
  const [disable, setDisable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [port, setPort] = useState([]);
  const [portsChecked, setPortsChecked] = useState([]);
  const [productImages, setProductImages] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const fetchCategories = async () => {
    const res = await fetch(apiUrl + "/categories", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    });
    const result = await res.json();
    setCategories(result.data);
  };

  const fetchBrands = async () => {
    const res = await fetch(apiUrl + "/brands", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    });
    const result = await res.json();
    setBrands(result.data);
  };

  const fetchPorts = async () => {
    const res = await fetch(apiUrl + "/ports", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    });
    const result = await res.json();
    setPort(result.data);
  };

  const fetchProduct = async () => {
    const res = await fetch(apiUrl + "/products/" + params.id, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    });
    const result = await res.json();
    if (result.data) {
      setProductImages(result.data.product_images || []);
      setPortsChecked(result.productPorts || []);
      setContent(result.data.description || "");
      reset({
        title: result.data.title,
        category: result.data.category_id,
        brand: result.data.brand_id,
        sku: result.data.sku,
        qty: result.data.qty,
        short_description: result.data.short_description,
        description: result.data.description,
        price: result.data.price,
        compare_price: result.data.compare_price,
        barcode: result.data.barcode,
        status: result.data.status,
        is_featured: result.data.is_featured,
      });
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchPorts();
    fetchProduct();
  }, []);

  const saveProduct = async (data) => {
    setDisable(true);
    const formData = { ...data, description: content, ports: portsChecked };
    const res = await fetch(`${apiUrl}/products/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    setDisable(false);
    if (result.status === 200) {
      toast.success(result.message);
      navigate("/admin/products");
    } else {
      const formErrors = result.message;
      Object.keys(formErrors).forEach((field) => {
        setError(field, { message: formErrors[field][0] });
      });
    }
  };

  const handleDeleteClick = (id) => {
    setImageToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    deleteImage(imageToDelete);
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setImageToDelete(null);
    setShowModal(false);
  };

  const deleteImage = async (id) => {
    const res = await fetch(`${apiUrl}/delete-product-image/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    });
    const result = await res.json();
    if (result.status === 200) {
      setProductImages(productImages.filter((img) => img.id !== id));
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    formData.append("product_id", params.id);
    setDisable(true);

    const res = await fetch(`${apiUrl}/save-product-image`, {
      method: "POST",
      headers: { Authorization: `Bearer ${adminToken()}` },
      body: formData,
    });
    const result = await res.json();
    setDisable(false);
    if (result.status === 200) {
      setProductImages([...productImages, result.data]);
      toast.success("Image added successfully!");
    } else {
      toast.error(result.message?.image?.[0] || "Failed to upload image");
    }
    e.target.value = "";
  };

  const changeImage = async (image) => {
    const res = await fetch(
      `${apiUrl}/change-product-default-image?product_id=${params.id}&image=${image}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      }
    );
    const result = await res.json();
    if (result.status === 200) {
      toast.success(result.message);
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between mt-5 pb-3">
          <h4 className="h4 pb-0 mb-0">Products / Edit</h4>
          <Link to="/admin/products" className="link btn btn-primary">
            Back
          </Link>
        </div>
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <form onSubmit={handleSubmit(saveProduct)}>
            <div className="card shadow">
              <div className="card-body p-4">
                {/* Title */}
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    {...register("title", { required: "The title field is required" })}
                    type="text"
                    className={`form-control ${errors.title && "is-invalid"}`}
                    placeholder="Title Name"
                  />
                  {errors.title && <p className="invalid-feedback">{errors.title.message}</p>}
                </div>

                {/* Category & Brand */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <select
                        {...register("category", { required: "The category field is required" })}
                        className={`form-control ${errors.category && "is-invalid"}`}
                      >
                        <option value="">Select a Category</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                      {errors.category && <p className="invalid-feedback">{errors.category.message}</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Brand</label>
                      <select
                        {...register("brand", { required: "The brand field is required" })}
                        className={`form-control ${errors.brand && "is-invalid"}`}
                      >
                        <option value="">Select a Brand</option>
                        {brands.map((b) => (
                          <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                      </select>
                      {errors.brand && <p className="invalid-feedback">{errors.brand.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Short Description */}
                <div className="mb-3">
                  <label className="form-label">Short Description</label>
                  <textarea
                    {...register("short_description", { required: "The short description field is required" })}
                    className={`form-control ${errors.short_description && "is-invalid"}`}
                    placeholder="Short description"
                    rows={3}
                  ></textarea>
                  {errors.short_description && <p className="invalid-feedback">{errors.short_description.message}</p>}
                </div>

                {/* Description as Textarea */}
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="form-control"
                    placeholder={placeholder || "Description"}
                    rows={6}
                  ></textarea>
                </div>

                {/* Pricing */}
                <h3 className="py-3 border-bottom mb-3">Pricing</h3>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Price</label>
                      <input
                        type="text"
                        {...register("price", { required: "The price field is required" })}
                        className={`form-control ${errors.price && "is-invalid"}`}
                      />
                      {errors.price && <p className="invalid-feedback">{errors.price.message}</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Compare Price</label>
                      <input type="text" {...register("compare_price")} className="form-control" />
                    </div>
                  </div>
                </div>

                {/* Qty & Status */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Qty</label>
                      <input
                        type="text"
                        {...register("qty", { required: "The quantity field is required" })}
                        className={`form-control ${errors.qty && "is-invalid"}`}
                      />
                      {errors.qty && <p className="invalid-feedback">{errors.qty.message}</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        {...register("status", { required: "Please select a status" })}
                        className={`form-control ${errors.status && "is-invalid"}`}
                      >
                        <option value="">Select status</option>
                        <option value="1">Active</option>
                        <option value="0">Unactive</option>
                      </select>
                      {errors.status && <p className="invalid-feedback">{errors.status.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Featured */}
                <div className="mb-3">
                  <label className="form-label">Featured</label>
                  <select
                    {...register("is_featured", { required: "This field is required" })}
                    className={`form-control ${errors.is_featured && "is-invalid"}`}
                  >
                    <option value="">Select status</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  {errors.is_featured && <p className="invalid-feedback">{errors.is_featured.message}</p>}
                </div>

                {/* Ports */}
                <h3 className="py-3 border-bottom mb-3">Colors</h3>
                <div className="mb-3">
                  {port.map((p) => (
                    <div key={p.id} className="form-check-inline ps-2">
                      <input
                        {...register("ports")}
                        type="checkbox"
                        value={p.id}
                        checked={portsChecked.includes(p.id)}
                        onChange={(e) =>
                          e.target.checked
                            ? setPortsChecked([...portsChecked, p.id])
                            : setPortsChecked(portsChecked.filter((id) => id !== p.id))
                        }
                        className="form-check-input"
                        id={`port-${p.id}`}
                      />
                      <label className="form-check-label ps-2" htmlFor={`port-${p.id}`}>
                        {p.name}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Gallery */}
                <h3 className="py-3 border-bottom mb-3">Gallery</h3>
                <div className="mb-3">
                  <input type="file" className="form-control" onChange={handleFile} />
                </div>

                <div className="mb-3">
                  <div className="row">
                    {productImages.map((img) => (
                      <div className="col-md-3" key={img.id}>
                        <div className="card p-1 shadow">
                          <img src={img.image_url} alt="image" className="w-100" />
                          <button
                            type="button"
                            className="btn btn-danger mt-3 w-100"
                            onClick={() => handleDeleteClick(img.id)}
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary mt-3 w-100"
                            onClick={() => changeImage(img.image)}
                          >
                            Set as Default
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {showModal && (
                  <Modal
                    button="Delete"
                    color="btn-danger"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    text="Are you sure you want to delete this image?"
                  />
                )}
              </div>
            </div>

            <button disabled={disable} className="btn btn-primary mt-3 mb-3">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
