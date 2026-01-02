import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../common/Sidebar';
import { useForm } from 'react-hook-form';
import { adminToken, apiUrl } from '../../common/Http';
import { toast } from 'react-toastify';

const Shipping = () => {
    const [disable, setDisable] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            await fetch(apiUrl + "/get-shipping", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${adminToken()} `,
                },
            })
            .then((res) => res.json())
            .then((result) => {
                if (result.status === 200) {
                    reset({
                        shipping_charge: result.data.shipping_charge,
                    });
                } else {
                    console.error("Something Went Wrong");
                }
            });
        },
    });

    const saveShipping = async (data) => {
        setDisable(true);

        await fetch(apiUrl + '/save-shipping', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${adminToken()} `,
            },
            body: JSON.stringify(data),
        })
        .then((res) => res.json())
        .then((result) => {
            setDisable(false);

            if (result.status === 200) {
                // ✅ global toast in Root.jsx handles this
                toast.success("Shipping fee updated successfully");
            } else {
                toast.error("Something went wrong");
            }
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="d-flex justify-content-between mt-5 pb-3">
                    <h4 className="h4 pb-0 mb-0">Shipping Settings</h4>
                    <Link to="/admin/categories" className="link btn btn-primary">
                        Back
                    </Link>
                </div>

                <div className="col-md-3">
                    <Sidebar />
                </div>

                <div className="col-md-9">
                    <form onSubmit={handleSubmit(saveShipping)}>
                        <div className="card shadow">
                            <div className="card-body p-4">
                                <div className="mb-3">
                                    <label className="form-label">Shipping Charge</label>

                                    <input
                                        type="number"
                                        step="any"
                                        className={`form-control ${errors.shipping_charge ? 'is-invalid' : ''}`}
                                        placeholder="Shipping Charge"
                                        {...register('shipping_charge', {
                                            required: 'Shipping fee must be greater than 0',
                                            valueAsNumber: true,
                                            min: {
                                                value: 1,
                                                message: 'Shipping fee must be greater than 0',
                                            },
                                        })}
                                    />

                                    {/* ❌ Error message in red */}
                                    {errors.shipping_charge && (
                                        <p className="invalid-feedback">
                                            {errors.shipping_charge.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            disabled={disable}
                            className="btn btn-primary mt-3"
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
