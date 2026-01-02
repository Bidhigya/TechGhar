import React from "react";

const SkeletonTable = () => {
  return (
    <div className=" my-1">
     
      
       
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
              <tr>
                <td className="">
                  <div className="skeleton skeleton-text"></div>
                </td>
                <td className="">
                  <div className="skeleton skeleton-text"></div>
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
                  <div className="skeleton skeleton-text"></div>
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
                  <div className="skeleton skeleton-text"></div>
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
                  <div className="skeleton skeleton-text"></div>
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

export default SkeletonTable;
