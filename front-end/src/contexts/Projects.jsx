import { createContext, useEffect, useReducer, useRef, useState } from "react";
import PropTypes from "prop-types";
import mockApi from "../utils/mockApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const initialData = {
  isEditing: false,
  data: {
    name: "",
    description: "",
    alias: "",
  },
  formData: {
    name: "",
    description: "",
    alias: "",
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

export const ProjectContext = createContext("default");

const ProjectProvider = ({ id = "add", children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialData);
  const fetched = useRef(-1);

  const handleAddProject = (data) => {
    let method = "POST";
    let endpoint = "/projects";
    if (data?.id > -1) {
      method = "PUT";
      endpoint = `/projects/${data?.id}`;
    }
    const requestData = mockApi(method, endpoint, data);
    const { status = false, data: newData = null } = requestData;
    if (status && !(data?.id > -1)) {
      navigate(`/projects/${newData?.id}`);
      Swal.fire({
        title: "Project Added",
        confirmButtonText: "Ok",
        icon: "success",
      });
      navigate(`/projects/${newData?.id}`);
    } else {
      Swal.fire({
        title: "Project Updated",
        confirmButtonText: "Ok",
        icon: "success",
      });
      dispatch({ type: "FETCHED", data: newData });
    }
    dispatch({ type: "SET_EDIT", isEditing: false });
  };

  const handleDeleteProject = () => {
    Swal.fire({
      title: "You are about to delete project information",
      confirmButtonText: "Yes",
      confirmButtonColor: "red",
      showCancelButton: "true",
      cancelButtonText: "No",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        mockApi("DELETE", `/projects/${id}`);
        navigate("/projects/");
      } else {
        navigate(`/projects/${id}`);
      }
    });
  };

  const handleCancel = () => {
    dispatch({ type: "SET_EDIT", isEditing: false });
    navigate("/projects");
  };

  const handleResetData = () => {
    dispatch({ type: "RESET_DATA", isEditing: false });
  };

  useEffect(() => {
    if (id === "add") {
      dispatch({ type: "SET_EDIT", isEditing: true });
      return;
    }
    if (fetched.current === id) return;
    const requestData = mockApi("GET", `/projects/${id}`);
    const { status = false, data = {} } = requestData;
    if (status) {
      fetched.current = id;
      dispatch({ type: "FETCHED", data });
    }
  }, [id]);

  return (
    <ProjectContext.Provider
      value={{
        id,
        handleAddProject,
        handleDeleteProject,
        handleCancel,
        handleResetData,
        ...state,
        dispatch,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

ProjectProvider.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.any,
};

export default ProjectProvider;
