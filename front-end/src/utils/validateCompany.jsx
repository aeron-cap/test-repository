const validateCompany = (data) => {
  const retData = { isValid: true, errors: {} };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

  if (data?.name?.length < 1) {
    retData.isValid = false;
    retData.errors.name = "Company Name is Required";
  }

  if (data?.contactPerson?.length < 1) {
    retData.isValid = false;
    retData.errors.contactPerson = "Contact Person is Required";
  }

  if (!emailRegex.test(data?.email)) {
    retData.isValid = false;
    retData.errors.email = "Enter proper format";
  }

  if (data?.address?.length < 1) {
    retData.isValid = false;
    retData.errors.address = "Address is Required";
  }

  if (data?.contactNumber?.length < 1) {
    retData.isValid = false;
    retData.errors.contactNumber = "Contact Number is Required";
  }

  return retData;
};

export { validateCompany };
