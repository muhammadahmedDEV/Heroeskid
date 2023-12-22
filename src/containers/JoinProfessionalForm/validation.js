import * as Yup from "yup";

const url = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
const hours = /^((?:[01]\d:[0-5][0-9]|2[0-3]:[0-5][0-9])(?:\s?)-(?:\s?)(?:[01]\d:[0-5][0-9]|2[0-3]:[0-5][0-9])(?:\s?,\s?)?)+$/;
const num = /^[0-9]+$/;
const email = /^\S+@\S+\.\S+$/;
const whitespace = /.*[^ ].*/;
const phoneNumber = /^[0-9]+(-[0-9]+)+$/;

const validation = Yup.object().shape({
  first_name: Yup.string()
    .matches(whitespace, {
      message: "Not Valid",
    })
    .required("Required"),

  last_name: Yup.string()
    .matches(whitespace, {
      message: "Not Valid",
    })
    .required("Required"),

  address: Yup.string()
    .matches(whitespace, {
      message: "Not Valid",
    })
    .required("Required"),
  postal_code: Yup.string()
    .matches(whitespace, {
      message: "Not Valid",
    })
    .required("Required"),

  email: Yup.string()
    .matches(email, {
      message: "Must be a valid email address",
    })
    .matches(whitespace, {
      message: "Not Valid",
    })
    .required("Required"),

  exp: Yup.string()
    .matches(whitespace, {
      message: "Not Valid",
    })
    .matches(num, {
      message: "Enter valid number of years",
    })
    .required("Required"),

  avatar: Yup.mixed().required("Required"),

  site: Yup.string()
    .matches(url, {
      message: "Enter Valid Website URL",
      excludeEmptyString: true,
    })
    .matches(whitespace, {
      message: "Not Valid",
    })
    .required("Required"),

  bio: Yup.string()
    .matches(whitespace, {
      message: "Not Valid",
    })
    // .test("len", "Must be less than 2000 characters", val => val.length < 2000)
    .required("Required"),

  prof_statement: Yup.string()
    .matches(whitespace, {
      message: "Not Valid",
    })
    .required("Required"),

  working_hours: Yup.string()
    .required("Required")
    .matches(whitespace, {
      message: "Not Valid",
    })
    .matches(hours, {
      message: "00:00-00:00",
    }),

  work_place: Yup.string()
    .matches(whitespace, {
      message: "Not Valid",
    })
    .required("Required"),

  specialities: Yup.array().required("Required"),

  phone: Yup.string()
    .matches(whitespace, {
      message: "Not Valid",
    })
    .matches(phoneNumber, {
      message: "Not Valid",
    })
    .required("Required"),

  education_background: Yup.string()
    .matches(whitespace, {
      message: "Not Valid",
    })
    .required("Required"),

  // pictures: Yup.array().required("Required"),
  picture1: Yup.string().required("Required"),
  picture2: Yup.string().required("Required"),

  prof_title: Yup.string()
    .matches(whitespace, {
      message: "Not Valid",
    })
    .required("Required"),
  city: Yup.string().required("Required"),
  country: Yup.string().required("Required"),

  working_days: Yup.array().required("Required"),
  terms_accepted: Yup.boolean()
    .oneOf([true], "Must Accept Terms and Conditions")
    .required("Required"),
});

export default validation;
