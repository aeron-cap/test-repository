const validateProject = (data) => {
  const retData = { isValid: true, errors: {} };

  if (data?.name?.length < 1) {
    retData.isValid = false;
    retData.errors.name = "Project Name is Required";
  }

  if (data?.description?.length < 1) {
    retData.isValid = false;
    retData.errors.description = "Description is required.";
  }

  return retData;
};

export { validateProject };
