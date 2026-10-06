import * as Yup from "yup";

export const addUserSchema = Yup.object({
  full_name: Yup.string()
    .trim()
    .required("Full name is required"),

  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  mobile: Yup.string()
    .matches(
      /^[6-9][0-9]{9}$/,
      "Enter valid 10 digit mobile number"
    )
    .required("Mobile number is required"),

  password: Yup.string()
    .min(8, "Minimum 8 characters required")
    .required("Password is required"),

  department_id: Yup.string()
    .required("Please select a department"),
});

export const editUserSchema = Yup.object({
  full_name: Yup.string()
    .trim()
    .required("Full name is required"),

  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  department_id: Yup.string()
    .required("Please select a department"),

  status: Yup.string()
    .required("Status is required"),
});

export const roleSchema = Yup.object({
  role_id: Yup.string()
    .required("Please select a role"),
});