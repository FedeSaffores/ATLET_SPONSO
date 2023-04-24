import * as yup from "yup";

const passwordRules = /^[a-zA-Z0-9\\-]{7,16}$/;
export const schemaSponsor = yup.object().shape({
  description: yup
    .string()
    .min(10, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
