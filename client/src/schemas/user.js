import * as yup from "yup";

const passwordRules = /^[a-zA-Z0-9\\-]{7,16}$/;
export const schemauser = yup.object().shape({
  completeName: yup
    .string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  email: yup.string().email("Please enter a valid Email").required("Required"),
  password: yup
    .string()
    .matches(passwordRules, "Must have at least 8 digits and maximum of 16")
    .required("Required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
  tel: yup.number().min(5, "Too Short!").required("Required"),
  city: yup.string(),
});
