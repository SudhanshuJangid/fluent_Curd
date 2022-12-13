import * as yup from "yup";

export const Schehma = yup.object().shape({
  emplName: yup.string().required("Required").min(4),
  fatherN: yup.string().required("Required"),
  bod: yup.string().required("Required"),
  moblie: yup.number().required("Required").integer(),
  address: yup.string().required("Required"),
  email: yup
    .string()
    .required("Required")
    .email("plz write your e-mail correctly.."),
  // photo: yup
  //   .object()
  //   // .shape({
  //   //   name: yup.string().required(),
  //   // })
  //   .required("File required"),
});
