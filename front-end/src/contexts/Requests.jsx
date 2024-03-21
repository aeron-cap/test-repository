import { createContext, useEffect, useReducer, useRef, useState } from "react";
import PropTypes from "prop-types";
import mockApi from "../utils/mockApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const initialData = {
  isEditing: false,
  data: {
    client: "",
    request: "",
    subject: "",
    description: "",
  },
  formData: {
    client: "",
    request: "",
    subject: "",
    description: "",
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

export const RequestContext = createContext("default");

const RequestsProvider = ({ id = "add", children }) => {
  const navigate = useNavigate();
  // const [formData, setFormData] = useState(initialData);
  const [state, dispatch] = useReducer(reducer, initialData);
  const fetched = useRef(-1);

  const handleAddRequest = (data) => {
    let method = "POST";
    let endpoint = "/requests";
    if (data?.id > -1) {
      method = "PUT";
      endpoint = `/requests/${data?.id}`;
    }
    const requestData = mockApi(method, endpoint, data);
    const { status = false, data: newData = null } = requestData;
    if (status && !(data?.id > -1)) {
      navigate(`/requests/${newData?.id}`);
      Swal.fire({
        title: "Request Added",
        confirmButtonText: "Ok",
        icon: "success",
      });
      navigate(`/requests/${newData?.id}`);
    } else {
      Swal.fire({
        title: "Request Updated",
        confirmButtonText: "Ok",
        icon: "success",
      });
      dispatch({ type: "FETCHED", data: newData });
    }
    dispatch({ type: "SET_EDIT", isEditing: false });
  };

  const handleDeleteRequest = () => {
    Swal.fire({
      title: "You are about to delete request information",
      confirmButtonText: "Yes",
      confirmButtonColor: "red",
      showCancelButton: "true",
      cancelButtonText: "No",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        mockApi("DELETE", `/requests/${id}`);
        navigate("/requests/");
      } else {
        navigate(`/requests/${id}`);
      }
    });
  };

  const handleCancel = () => {
    dispatch({ type: "SET_EDIT", isEditing: false });
    navigate("/requests");
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
    const requestData = mockApi("GET", `/requests/${id}`);
    const { status = false, data = {} } = requestData;
    if (status) {
      fetched.current = id;
      // setFormData(data);
      dispatch({ type: "FETCHED", data });
    }
  }, [id]);

  return (
    <RequestContext.Provider
      value={{
        id,
        handleAddRequest,
        handleDeleteRequest,
        handleCancel,
        handleResetData,
        ...state,
        dispatch,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

RequestsProvider.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.any,
};

export default RequestsProvider;
