import React, { useState } from 'react'
import Sidebar from '../../common/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { adminToken, apiUrl } from '../../common/Http';

const CreateCategory = () => {
    const [disable,setDisable]=useState(false);
    const navigate=useNavigate();
     const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm();

        const saveCategory=async(data)=>{
            setDisable(true);
            console.log(data);
            

            const res= await fetch(apiUrl+'/categories',{
                        method:'POST',
                        headers:{
                         'Content-type':'application/json',
                         'Accept':'application/json',
                         'Authorization':`Bearer ${adminToken()} `
                        },
                        body:JSON.stringify(data)

                    }).then(res=>res.json())
                    .then(result=>{
                        setDisable(false);
                        console.log(result)
                        if(result.status==200){
            
                          toast.success(result.message);
                          navigate('/admin/categories')

                        }
                        else{
                            console.error('Something Went Wrong');
                        }
                    })

        }
  return (
    <div className="container">
    <div className="row">
      <div className="d-flex justify-content-between mt-5 pb-3">
        <h4 className="h4 pb-0 mb-0"> Categories / Create</h4>
        <Link to='/admin/categories' className="link btn btn-primary">Back</Link>
      </div>
      <div className="col-md-3">
        <Sidebar />
      </div>
      <div className="col-md-9">
        <form onSubmit={handleSubmit(saveCategory)}>

      <div className="card shadow">
        <div className="card-body p-4">
        <div className="mb-3">
            <label htmlFor="" className='form-label'>
                Name
            </label>
            <input 
            {
                ...register('name',{required:'The name field is required'})
            }
            type="text"   className={`form-control ${errors.name && 'is-invalid'}`} placeholder='Category Name' />
              {errors.name && (
                                    <p className="invalid-feedback">{errors.name.message}</p>
                                )}
        </div>
        <div className="mb-3">
            <label htmlFor="" className='form-label'>
              Status
            </label>
            <select 
             {
                ...register('status',{required:'Please select a status'})
            }
             
            className={`form-control ${errors.status && 'is-invalid'}`}>
                <option value="">Select status</option>
                <option value="1">Active</option>
                <option value="0">Unactive</option>

            </select>
            {errors.status && <p className="invalid-feedback">{errors.status?.message}</p>
                               }
        </div>
        </div>
      </div>
      <button disabled={disable} className="btn btn-primary mt-3">Create</button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default CreateCategory