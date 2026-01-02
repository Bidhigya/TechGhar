import React, { useState } from 'react'
import Sidebar from '../../common/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { adminToken, apiUrl } from '../../common/Http';
import { toast } from 'react-toastify';

const EditBrands = () => {
    const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const params=useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async()=>{
           const res= await fetch(apiUrl+'/brands/'+params.id,{
                            method:'GET',
                            headers:{
                             'Content-type':'application/json',
                             'Accept':'application/json',
                             'Authorization':`Bearer ${adminToken()} `
                            },
                          
        
                        }).then(res=>res.json())
                        .then(result=>{
                            
                           console.log(result);
                            if(result.status==200){
                
                              
                                reset({
                                    name:result.data.name,
                                    status:result.data.status,
                                })
        
                            }
                            else{
                                console.error('Something Went Wrong');
                            }
                        })
    }
  });

  const saveBrand = async (data) => {
    setDisable(true);
    console.log(data);

    const res = await fetch(apiUrl + `/brands/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()} `,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setDisable(false);
        console.log(result);
        if (result.status == 200) {
          toast.success(result.message);
          navigate("/admin/brands");
        } else {
          console.error("Something Went Wrong");
        }
      });
  };
  return (
    <div className="container">
    <div className="row">
      <div className="d-flex justify-content-between mt-5 pb-3">
      <h4 className="h4 pb-0 mb-0">Brands / Edit</h4>
      <Link to='/admin/brands' className="link btn btn-primary">Back</Link>
      </div>
      <div className="col-md-3">
        <Sidebar />
      </div>
      <div className="col-md-9">
      
        <form onSubmit={handleSubmit(saveBrand)}>
                <div className="card shadow">
                  <div className="card-body p-4">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Name
                      </label>
                      <input
                        {...register("name", {
                          required: "The name field is required",
                        })}
                        type="text"
                        className={`form-control ${
                          errors.name && "is-invalid"
                        }`}
                        placeholder="Brand Name"
                      />
                      {errors.name && (
                        <p className="invalid-feedback">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Status
                      </label>
                      <select
                        {...register("status", {
                          required: "Please select a status",
                        })}
                        className={`form-control ${
                          errors.status && "is-invalid"
                        }`}
                      >
                        <option value="">Select status</option>
                        <option value="1">Active</option>
                        <option value="0">Unactive</option>
                      </select>
                      {errors.status && (
                        <p className="invalid-feedback">
                          {errors.status?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <button disabled={disable} className="btn btn-primary mt-3">
                  Update
                </button>
              </form>
       
      </div>
    </div>
  </div>
  )
}

export default EditBrands