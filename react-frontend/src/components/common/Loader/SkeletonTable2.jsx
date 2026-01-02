import React from "react";

const SkeletonTable2 = () => {
  return (
    <div className=" my-1">
     
      
       
          <table className="table table-hover">
            <thead>
              <tr>
              <th>Id</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Qty</th>
                      
                        <th>Status</th>
                        <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="">
                  <div className="skeleton skeleton-text"></div>
                </td>
                <td className="">
                  <div className="skeleton skeleton-text2 p-3"></div>
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
                <td>
                  <div className="skeleton skeleton-status"></div>
                </td>
                <td className="">
                  <div className="d-flex">
                    <div className="skeleton skeleton-action"></div>
                    <div className="skeleton skeleton-action"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="">
                  <div className="skeleton skeleton-text"></div>
                </td>
                <td className="">
                  <div className="skeleton skeleton-text2 p-3 "></div>
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
                <td>
                  <div className="skeleton skeleton-status"></div>
                </td>
                <td className="">
                  <div className="d-flex">
                    <div className="skeleton skeleton-action"></div>
                    <div className="skeleton skeleton-action"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="">
                  <div className="skeleton skeleton-text"></div>
                </td>
                <td className="">
                  <div className="skeleton skeleton-text2 p-3 "></div>
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
                <td>
                  <div className="skeleton skeleton-status"></div>
                </td>
                <td className="">
                  <div className="d-flex">
                    <div className="skeleton skeleton-action"></div>
                    <div className="skeleton skeleton-action"></div>
                  </div>
                </td>
              </tr>
            
             
            </tbody>
          </table>
        </div>
     
  );
};

export default SkeletonTable2;
