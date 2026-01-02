import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { adminToken, apiUrl } from "../../common/Http";
import NoState from "../../common/NoState";
import ModalPort from "./ModalPort";
import { toast } from "react-toastify";
import SkeletonTable from "../../common/Loader/SkeletonTable";

const ShowPorts = () => {
  const [ports, setPorts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPortId, setSelectedPortId] = useState(null);

  const fetchPorts = async () => {
    setLoader(true);
    try {
      const res = await fetch(apiUrl + "/ports", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });
      const result = await res.json();

      if (result.status === 200) {
        setPorts(result.data);
      } else {
        toast.error("Failed to load color");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setLoader(false);
    }
  };

  const deletePort = async () => {
    try {
      const res = await fetch(`${apiUrl}/ports/${selectedPortId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });
      const result = await res.json();

      if (result.status === 200) {
        setPorts(ports.filter((port) => port.id !== selectedPortId));
        toast.success(result.message || "Color deleted");
      } else {
        toast.error(result.message || "Delete failed");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setShowModal(false);
      setSelectedPortId(null);
    }
  };

  useEffect(() => {
    fetchPorts();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between mt-5 pb-3">
          <h4 className="h4 pb-0 mb-0">Colors</h4>
          <Link to="/admin/colors/create" className="link btn btn-primary">
            Create
          </Link>
        </div>

        <div className="col-md-3">
          <Sidebar />
        </div>

        <div className="col-md-9">
          <div className="card shadow">
            <div className="card-body p-4">
              {loader && <SkeletonTable />}

              {!loader && ports.length === 0 && <NoState text="No colors found" />}

              {!loader && ports.length > 0 && (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th width="50">#</th>
                      <th>Name</th>
                     
                      <th width="100">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ports.map((port, index) => (
                      <tr key={port.id}>
                        <td>{index + 1}</td>
                        <td>{port.name}</td>
                        
                        <td>
                          <Link
                            to={`/admin/colors/edit/${port.id}`}
                            className="link primary-text me-2"
                          >
                          <i className="bi bi-pencil-square"></i>
                          </Link>
                          <button
                            onClick={() => {
                              setSelectedPortId(port.id);
                              setShowModal(true);
                            }}
                            className="btn btn-link text-danger p-0"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                       
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <ModalPort
          button="Delete"
          color="btn-danger"
          onConfirm={deletePort}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ShowPorts;