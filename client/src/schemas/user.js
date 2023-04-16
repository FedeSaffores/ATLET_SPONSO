import * as yup from "yup";

const passwordRules = /^[a-zA-Z0-9\\-]{7,16}$/;
export const schemauser = yup.object().shape({
  name: yup
    .string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  lastname: yup
    .string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  email: yup.string().email("Plase enter a valid Email").required("Required"),
  password: yup
    .string()
    .matches(passwordRules, {
      message: "Must have at least 8 digits and maximum of 16",
    })
    .required("Required"),
  tel: yup
    .number()
    .min(5, "Too Short!")
    //.max(20, "Too Long!")
    .required("Required"),
});
