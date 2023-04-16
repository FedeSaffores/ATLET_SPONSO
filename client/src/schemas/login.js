import * as yup from "yup";

const passwordRules = /^[a-zA-Z0-9\\-]{7,16}$/;
export const login = yup.object().shape({
  email: yup.string().email("Plase enter a valid Email").required("Required"),
  password: yup
    .string()
    .matches(passwordRules, {
      message: "Must have at least 8 digits and maximum of 16",
    })
    .required("Required"),
});
