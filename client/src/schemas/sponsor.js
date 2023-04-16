import * as yup from "yup";

const passwordRules = /^[a-zA-Z0-9\\-]{7,16}$/;
export const schemaSponsor = yup.object().shape({
  sponsorName: yup
    .string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  /* email: yup.string().email("Plase enter a valid Email").required("Required"), */
  password: yup
    .string()
    .matches(passwordRules, {
      message: "Must have at least 8 digits and maximum of 16",
    })
    .required("Required"),
  description: yup
    .string()
    .min(10, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
