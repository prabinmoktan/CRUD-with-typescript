import * as Yup from "yup"


export const validationSchema = Yup.object({
    name: Yup
      .string()
     .min(2, "at least 2 words")
      .required("name is required"),
    phoneNumber: Yup
      .number()
      .min(7, "phone number should be of 7 digits")
      .required("Phone Number is required"),
  });