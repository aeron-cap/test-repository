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

  if (data?.type?.length < 1) {
    retData.isValid = false;
    retData.errors.type = "Resource Type is Required";
  } else {
    if (!["DEV", "QA", "PM"].includes(data?.type)) {
      retData.isValid = false;
      retData.errors.type =
        "Please select a valid Resource Type (PM, QA, or DEV).";
    }
  }

  return retData;
};

export { validateResource };
