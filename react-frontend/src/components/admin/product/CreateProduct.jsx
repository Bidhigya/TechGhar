import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/Http";
import { toast, ToastContainer } from "react-toastify";

const CreateProduct = ({ placeholder }) => {
  const [content, setContent] = useState("");
  const [disable, setDisable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [port, setPort] = useState([]);
  const [portsChecked, setPortsChecked] = useState([]);
  const navigate = useNavigate();

  const { register, handleSubmit, setError, formState: { errors } } = useForm();

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

  const saveProduct = async (data) => {
    const formData = { ...data, description: content, gallery: gallery, ports: portsChecked };
    setDisable(true);
    const res = await fetch(apiUrl + "/products", {
      method: "POST",
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

  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    setDisable(true);
    const res = await fetch(apiUrl + "/temp-images", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: formData,
    });
    const result = await res.json();
    if (result.data && result.data.id && result.data.image_url) {
      setGallery([...gallery, result.data.id]);
      setGalleryImages([...galleryImages, result.data.image_url]);
      toast.success(result.message || "Image added successfully!");
    } else if (result.status === 400) {
      toast.error(result.message.image[0]);
    }
    setDisable(false);
    e.target.value = "";
  };

  const deleteImage = (image) => {
    setGalleryImages(galleryImages.filter((img) => img !== image));
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchPorts();
  }, []);

  return (
    <div className="container">
      <ToastContainer />
      <div className="row">
        <div className="d-flex justify-content-between mt-5 pb-3">
          <h4 className="h4 pb-0 mb-0">Products / Create</h4>
          <Link to="/admin/products" className="link btn btn-primary">Back</Link>
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
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>{category.name}</option>
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
                        {brands.map((brand) => (
                          <option key={brand.id} value={brand.id}>{brand.name}</option>
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

                {/* Description (Textarea instead of Editor) */}
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
                        placeholder="Price"
                        className={`form-control ${errors.price && "is-invalid"}`}
                      />
                      {errors.price && <p className="invalid-feedback">{errors.price.message}</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Compare Price</label>
                      <input
                        type="text"
                        {...register("compare_price")}
                        placeholder="Compare Price"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                {/* Qty & Status */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Qty</label>
                      <input
                        type="number"
                        {...register("qty", {
                          required: "The quantity field is required",
                          min: { value: 1, message: "Quantity cannot be negative or zero" },
                        })}
                        placeholder="Qty"
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
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                  {errors.is_featured && <p className="invalid-feedback">{errors.is_featured.message}</p>}
                </div>

                {/* Ports */}
                <h3 className="py-3 border-bottom mb-3">Colors</h3>
                <div className="mb-3">
                  {port.map((portItem, index) => (
                    <div className="form-check-inline ps-2" key={`ports-${index}`}>
                      <input
                        {...register("ports")}
                        checked={portsChecked.includes(portItem.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPortsChecked([...portsChecked, portItem.id]);
                          } else {
                            setPortsChecked(portsChecked.filter((pid) => portItem.id !== pid));
                          }
                        }}
                        type="checkbox"
                        value={portItem.id}
                        id={`port-${portItem.id}`}
                      />
                      <label className="form-check-label ps-2" htmlFor={`port-${portItem.id}`}>
                        {portItem.name}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Gallery */}
                <h3 className="py-3 border-bottom mb-3">Gallery</h3>
                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input type="file" className="form-control" onChange={handleFile} accept="image/*" />
                </div>

                <div className="mb-3">
                  <div className="row">
                    {galleryImages.map((imageUrl, index) => (
                      <div className="col-md-3" key={`image-${index}`}>
                        <div className="card p-1 shadow">
                          <img src={imageUrl} alt="image" className="w-100" />
                          <button className="btn btn-danger mt-3 w-100" onClick={() => deleteImage(imageUrl)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="col-md-3"></div>
                  </div>
                </div>
              </div>
            </div>

            <button disabled={disable} className="btn btn-primary mt-3 mb-3">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
