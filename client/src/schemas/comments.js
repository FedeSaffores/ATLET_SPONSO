import * as yup from "yup";

export const validComment = yup.object().shape({
  eventName: yup
    .string()
    .min(2, "To Short!")
    .max(20, "To Long!")
    .required("Required"),
  texto: yup
    .string()
    .min(10, "To short")
    .max(500, "The text Can only be 500 Characters")
    .required("Required"),
  /*   selectDate: yup
    .date()
    .min(new Date(), { messege: "No puede ser anterior a la fecha actual" })
    .required("Required"), */
});
