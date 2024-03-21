const validateRequests = (data) => {
  const retData = { isValid: true, errors: {} };

  if (data?.client?.length < 1) {
    retData.isValid = false;
    retData.errors.client = "Client Name is Required";
  }

  if (data?.project?.length < 1) {
    retData.isValid = false;
    retData.errors.project = "Project is Required";
  }

  if (data?.subject?.length < 1) {
    retData.isValid = false;
    retData.errors.subject = "Subject is Required";
  }

  return retData;
};

export { validateRequests };
