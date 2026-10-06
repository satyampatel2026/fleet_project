import * as Yup from "yup";

export const departmentValidationSchema =
  Yup.object({
    department_name: Yup.string()
      .trim()
      .required("Department name is required")
      .min(
        2,
        "Department name must contain at least 2 characters"
      )
      .max(
        50,
        "Department name cannot exceed 50 characters"
      )
      .matches(
        /^[a-zA-Z][a-zA-Z\s&_-]*$/,
        "Use only letters, spaces, &, hyphens or underscores"
      ),
  });