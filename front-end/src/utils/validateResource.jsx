const validateResource = (data) => {
  const retData = { isValid: true, errors: {} };

  if (data?.firstName?.length < 1) {
    retData.isValid = false;
    retData.errors.firstName = "First Name is Required";
  }

  if (data?.lastName?.length < 1) {
    retData.isValid = false;
    retData.errors.lastName = "Last Name is Required";
  }

  if (!["DEV", "QA", "PM"].includes(data?.type)) {
    retData.isValid = false;
    retData.errors.type = "Type is required.";
  }

  return retData;
};

export { validateResource };
