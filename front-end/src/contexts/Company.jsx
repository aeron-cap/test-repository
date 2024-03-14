import { createContext, useEffect, useReducer, useRef, useState } from "react";
import PropTypes from "prop-types";
import mockApi from "../utils/mockApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const initialData = {
  isEditing: false,
  data: {
    name: "",
    contactPerson: "",
    email: "",
    address: "",
    contactNumber: "",
  },
  formData: {
    name: "",
    contactPerson: "",
    email: "",
    address: "",
    contactNumber: "",
  },
};

const reducer = (state, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case "FETCHED":
      return { ...state, formData: payload.data, data: payload.data };
    case "RESET_DATA":
      return { ...state, formData: state.data };
    case "SET_EDIT": {
      return { ...state, isEditing: payload.isEditing };
    }

    case "ON_INPUTCHANGE":
      return {
        ...state,
        formData: { ...state.formData, [payload.name]: payload.value },
      };

    default:
      return state;
  }
};

export const CompanyContext = createContext("default");

const CompanyProvider = ({ id = "add", children }) => {
  const navigate = useNavigate();
  // const [formData, setFormData] = useState(initialData);
  const [state, dispatch] = useReducer(reducer, initialData);
  const fetched = useRef(-1);

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
      navigate(`/companies/${newData?.id}`);
    } else {
      Swal.fire({
        title: "Company Updated",
        confirmButtonText: "Ok",
        icon: "success",
      });
      dispatch({ type: "FETCHED", data: newData });
    }
    dispatch({ type: "SET_EDIT", isEditing: false });
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
    dispatch({ type: "SET_EDIT", isEditing: false });
    navigate("/companies");
  };

  const handleResetData = () => {
    dispatch({ type: "RESET_DATA", isEditing: false });
  };

  useEffect(() => {
    // console.log(id);
    if (id === "add") {
      dispatch({ type: "SET_EDIT", isEditing: true });
      return;
    }
    if (fetched.current === id) return;
    const requestData = mockApi("GET", `/companies/${id}`);
    const { status = false, data = {} } = requestData;
    if (status) {
      fetched.current = id;
      // setFormData(data);
      dispatch({ type: "FETCHED", data });
    }
  }, [id]);

  return (
    <CompanyContext.Provider
      value={{
        id,
        handleAddCompany,
        handleDeleteCompany,
        handleCancel,
        handleResetData,
        ...state,
        dispatch,
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
