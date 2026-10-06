import * as Yup from "yup";

export const roleValidationSchema =
  Yup.object({
    role_name: Yup.string()
      .trim()
      .required("Role name is required")
      .min(
        3,
        "Role name must contain at least 3 characters"
      )
      .max(
        30,
        "Role name cannot exceed 30 characters"
      )
      .matches(
        /^[a-zA-Z][a-zA-Z\s_-]*$/,
        "Use only letters, spaces, hyphens or underscores"
      ),
  });