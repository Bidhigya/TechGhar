import React from "react";

const SkeletonTable3 = () => {
  return (
    <div className="my-1">
     
      
       
          <table className="table table-hover">
            <thead>
              <tr>
                     <th>#Id</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Payment</th>
                    <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="">
                  <div className="skeleton skeleton-text"></div>
                </td>
                <td className="">
                  <div className="skeleton skeleton-text"></div>
                </td>
                <td>
                  <div className="skeleton skeleton-text3"></div>
                </td>
                <td>
                  <div className="skeleton skeleton-status"></div>
                </td>
                <td>
                  <div className="skeleton skeleton-status"></div>
                </td>
                <td>
                  <div className="skeleton skeleton-status"></div>
                </td>
                <td>
                  <div className="skeleton skeleton-status"></div>
                </td>
             
              </tr>
              <tr>
                <td className="">
                  <div className="skeleton skeleton-text"></div>
                </td>
                <td className="">
                  <div className="skeleton skeleton-text"></div>
                </td>
                <td>
                  <div className="skeleton skeleton-text3"></div>
                </td>
                <td>
                  <div className="skeleton skeleton-status"></div>
                </td>
                <td>
                  <div className="skeleton skeleton-status"></div>
                </td>
                <td>
                  <div className="skeleton skeleton-status"></div>
                </td>
                <td>
                  <div className="skeleton skeleton-status"></div>
                </td>
               
              </tr>
              <tr>
                <td className="">
                  <div className="skeleton skeleton-text"></div>
                </td>
                <td className="">
                  <div className="skeleton skeleton-text"></div>
                </td>
                <td>
                  <div className="skeleton skeleton-text3"></div>
                </td>
                <td>
                  <div className="skeleton skeleton-status"></div>
                </td>
                <td>
                  <div className="skeleton skeleton-status"></div>
                </td>
                <td>
                  <div className="skeleton skeleton-status"></div>
                </td>
                <td>
                  <div className="skeleton skeleton-status"></div>
                </td>
                
              </tr>
            
             
            </tbody>
          </table>
        </div>
     
  );
};

export default SkeletonTable3;
