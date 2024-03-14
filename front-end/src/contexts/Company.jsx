import { createContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import mockApi from "../utils/mockApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const initialData = {
  name: "",
  contactPerson: "",
  email: "",
  address: "",
  contactNumber: "",
};

export const CompanyContext = createContext("default");

const CompanyProvider = ({ id = "add", children }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);
  const fetched = useRef("add");

  const handleAddCompany = (data) => {
    let method = "POST";
    let endpoint = "/companies";
    if (data?.id > -1) {
      method = "PUT";
      endpoint = `/companies/${data?.id}`;
    }
    const requestData = mockApi(method, endpoint, data);
    const { status = false, data: newData = null } = requestData;
    if (status && !(data?.id > -1)) {
      navigate(`/companies/${newData?.id}`);
      Swal.fire({
        title: "Company Added",
        confirmButtonText: "Ok",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Company Updated",
        confirmButtonText: "Ok",
        icon: "success",
      });
    }
  };

  const handleDeleteCompany = () => {
    Swal.fire({
      title: "You are about to delete comapny information",
      confirmButtonText: "Yes",
      confirmButtonColor: "red",
      showCancelButton: "true",
      cancelButtonText: "No",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        mockApi("DELETE", `/companies/${id}`);
        navigate("/companies/");
      } else {
        navigate(`/companies/${id}`);
      }
    });
  };

  const handleCancel = () => {
    navigate("/companies");
  };

  useEffect(() => {
    // console.log(id);
    if (id === "add") return;
    if (fetched.current === id) return;
    const requestData = mockApi("GET", `/companies/${id}`);
    const { status = false, data = {} } = requestData;
    if (status) {
      fetched.current = id;
      setFormData(data);
    }
  }, [id]);

  return (
    <CompanyContext.Provider
      value={{
        id,
        handleAddCompany,
        handleDeleteCompany,
        handleCancel,
        formData,
        setFormData,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

CompanyProvider.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.any,
};

export default CompanyProvider;
