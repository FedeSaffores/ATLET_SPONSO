import * as yup from "yup";

const passwordRules = /^[a-zA-Z0-9\\-]{7,16}$/;
const nameRules = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
const lastNameRules = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
export const basicSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Too Short!")
    .matches(nameRules, { message: "Plase use only words" })
    .required("Required"),
  lastname: yup
    .string()
    .min(2, "Too Short!")
    .matches(lastNameRules, { message: "Plase use only words" })
    .required("Required"),
  /*  email: yup.string().email("Plase enter a valid Email").required("Required"), */
  password: yup
    .string()
    .matches(passwordRules, {
      message: "Must have at least 8 digits and maximum of 16",
    })
    .required("Required"),
  /*   description: yup
    .string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"), */
  /*   quality: yup.string().required("Required"), */
});
