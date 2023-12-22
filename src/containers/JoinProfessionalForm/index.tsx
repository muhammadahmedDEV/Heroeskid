// MAIN MODULES
import {
  CircularProgress,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Field, Formik } from "formik";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "recompose";
import Compressor from "compressorjs";
import Swal from "sweetalert2";

// COMPONENTS
import { History } from "history";
import UserAvatar from "../../components/Avatar/Avatar";
import Error from "./Error";
import ValidationSchema from "./validation";

// STYLES
import "./styles.scss";

// TYPES
import { State } from "../../reducers";

// SERVISES
import {
  getUserFromId,
  addCityList,
  addDisorderList,
  addDiagnoses,
} from "../../actions";
import { setLoginUser } from "../../routines/main";
import {
  getFbData,
  updateUserData,
  writeUserData,
  updateFiltersData,
} from "../../servises/firebase";
import { setItemToLocalStorage } from "../../servises/localStorage";
const filter = createFilterOptions();
interface ComponentProps {
  history: History;
  authenticationId?: any;
  [key: string]: any;
  user: any;
  cityList: string[];
  disorderList: string[];
  diagnoses: any[];
}
interface User {
  first_name: string;
  last_name: string;
  email: string;
  exp: number;
  avatar: string;
  working_hours: string;
  address: string;
  site: string;
  bio: string;
  prof_statement: string;
  specialities: string[];
  education_background: string[];
  work_place: string[];
  appointmentAccommodations: string;
  phone: string;
  working_days: string[];
  pictures: string[];
  city: string;
  postal_code: string;
  treatment_approaches: string[];
  authId: string;
  prof_title: string;
  country: string;
  terms_accepted: string;
  picture1: string;
  picture2: string;
  dr_needed: string;
  province: string;
}
interface JoinProfessionalFormState {
  newUserId: string;
  specialities: any[];
  diagnoses: any[];
  professions: any[];
  cities: any[];
  education_background: any[];
  work_place: any[];
  treatment_approaches: any[];
  loader: boolean;
  errorMessage: string;
  error: string;
  province: string;
  new_city: any[];
  disabled1: boolean;
  disabled2: boolean;
}
const bc = "join-professional";
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const appointment = ["Office/Clinic", "In School Visits", "In Home", "Online", "Phone"];

function Checkbox(props: any) {
  return (
    <Field name={props.name}>
      {({ field, form }: any) => (
        <label>
          <input
            type="checkbox"
            {...props}
            checked={field.value.includes(props.value)}
            onChange={() => {
              if (field.value.includes(props.value)) {
                const nextValue = field.value.filter(
                  (value: string) => value !== props.value
                );
                form.setFieldValue(props.name, nextValue);
              } else {
                const nextValue = field.value.concat(props.value);
                form.setFieldValue(props.name, nextValue);
              }
            }}
          />
          {props.value}
        </label>
      )}
    </Field>
  );
}
class JoinProfessionalForm extends Component<
  ComponentProps,
  JoinProfessionalFormState
> {
  state: JoinProfessionalFormState = {
    newUserId: "",
    specialities: [],
    work_place: [],
    education_background: [],
    loader: false,
    errorMessage: "",
    error: "",
    province: "Ontario",
    treatment_approaches: [],
    disabled1: true,
    disabled2: true,
    diagnoses: [],
    professions: [],
    cities: [],
    new_city: [],
  };
  user: User = {
    first_name: "",
    last_name: "",
    email: "",
    exp: 0,
    avatar: "",
    working_hours: "",
    address: "",
    site: "",
    bio: "",
    prof_statement: "",
    specialities: [],
    education_background: [],
    work_place: [],
    appointmentAccommodations: "",
    phone: "",
    working_days: [],
    pictures: [],
    city: "",
    postal_code: "",
    treatment_approaches: [],
    authId: "",
    prof_title: "",
    country: "Canada",
    terms_accepted: "",
    picture1: "",
    picture2: "",
    dr_needed: "",
    province: "",
  };
  componentDidMount = () => {
    // console.log(this.props.cityList.length, 'City List')
    this.handleDiagSorting();
    // if (this.props.cityList.length === 0) {
    getFbData("cities")
      .then(async (querySnapshot) => {
        const cities: any = [];
        querySnapshot.forEach((doc: any) => {
          cities.push(doc.data());
        });
        // triggerCities(users)
        await this.props.addCity(cities);
        setItemToLocalStorage("cities", cities);
      })
      .catch((e) => {
        // Error stored in  state
        this.setState({ error: e });
      });

    // }
  };

  sortDays = (weekDays: string[], list: string[]) => {
    const dayOfWeek = 6;
    const sortedList = list.slice(dayOfWeek).concat(list.slice(0, dayOfWeek));
    return weekDays.sort((a, b) => {
      if (sortedList.indexOf(a) > sortedList.indexOf(b)) return 1;
      if (sortedList.indexOf(a) < sortedList.indexOf(b)) return -1;
      return 0;
    });
  };

  submitUserData = async (
    ref: string,
    value: any,
    resetForm: any,
    event: any,
    errors: any,
    isSubmitting: any
  ) => {
    event.preventDefault();
    this.setState({ loader: true });
    value.working_days = this.sortDays([...value.working_days], daysOfWeek);
    value.work_place = this.sortDays([...value.work_place], appointment);
    value.authId = this.props.authenticationId;
    value.pictures = [value.picture1, value.picture2];
    const newCity = this.state.cities.filter(
      (item) => item.name === value.city
    );
    const newProfession = this.state.professions.filter(
      (item) => item.type === value.prof_title
    );
    const newSpecialities = value.specialities.filter((item: any) => {
      return !this.state.diagnoses.some((item2: any) => item === item2.name);
    });
    if (!newCity.length && value.city !== "") {
      await updateFiltersData("cities", { name: value.city }).then(
        async (res) => {
          await updateUserData("cities", res.id);
          await getFbData("cities")
            .then((querySnapshot) => {
              const cities: any = [];
              querySnapshot.forEach((doc: any) => {
                cities.push(doc.data());
              });
              this.props.addCity(cities);
              setItemToLocalStorage("cities", cities);
            })
            .catch((e) => {
              // Error stored in  state
              this.setState({ error: e });
            });
        }
      );
    }
    if (!newProfession.length && value.prof_title !== "") {
      updateFiltersData("specialities", { type: value.prof_title }).then(
        async (res) => {
          await updateUserData("specialities", res.id);
          await getFbData("specialities")
            .then((querySnapshot) => {
              const profs: any = [];
              querySnapshot.forEach((doc: any) => {
                profs.push(doc.data());
              });
              this.props.addProfession(profs);
              setItemToLocalStorage("specialities", profs);
            })
            .catch((e) => {
              // Error stored in  state
              this.setState({ error: e });
            });
        }
      );
    }
    if (newSpecialities.length) {
      {
        (await newSpecialities) &&
          newSpecialities.map(async (item: any) => {
            await updateFiltersData("diagnoses", { name: item }).then(
              async (res) => {
                await updateUserData("diagnoses", res.id);
              }
            );
          });
        await getFbData("diagnoses")
          .then((querySnapshot) => {
            const spec: any = [];
            querySnapshot.forEach((doc: any) => {
              spec.push(doc.data());
            });
            this.props.addSpecialities(spec);
            setItemToLocalStorage("diagnoses", spec);
          })
          .catch((e) => {
            // Error stored in  state
            this.setState({ error: e });
          });
      }
    }

    const { picture1, picture2, ...rest } = value;
    await writeUserData(ref, rest)
      .then((response: any) => {
        updateUserData(ref, response.id).then(async () => {
          this.getUserData();
        });
      })
      .catch((error: any) => {
        console.log("User Not Saved error:" + error.message);
        Swal.fire({
          title: "Error!",
          text: "Profile is not saved, please contact administrator.",
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          this.setState({ loader: false });
        });
      });
  };
 getUserData = () => {
    getFbData("users")
      .then((querySnapshot) => {
        const users: any = [];
        querySnapshot.forEach((doc: any) => {
          const newDoc: any = doc.data();
          users.push(newDoc);
        });
        const id: string = this.props.user.uid;
        users.filter(async (item: any) => {
          if (item.authId === id) {
            this.setState(() => ({ newUserId: item.id }));
            await this.props.addUser(item);
            return true;
          }
          return undefined;
        });
        this.props.getUser(this.state.newUserId);
      })
      .catch((e) => {
        this.setState({ error: e });
      });
  };
  addSpecField = (): any => {
    this.setState({ specialities: [...this.state.specialities, ""] });
  };
  addWorkField = (): any => {
    this.setState({ work_place: [...this.state.work_place, ""] });
  };
  addEduField = (): any => {
    this.setState({
      education_background: [...this.state.education_background, ""],
    });
  };
  addTreatmentField = (): any => {
    this.setState({
      treatment_approaches: [...this.state.treatment_approaches, ""],
    });
  };
  ImageHandler = (event: any, target: any, index: number): any => {
    const maxDimention = 500;
    let quality = 1;
    if (event.target.files[0].size > 15016800) {
      quality = 0.005;
    } else if (event.target.files[0].size > 13016800) {
      quality = 0.1;
    } else if (
      event.target.files[0].size > 5016800 &&
      event.target.files[0].size < 13016800
    ) {
      quality = 0.2;
    } else if (
      event.target.files[0].size > 1016800 &&
      event.target.files[0].size < 5016800
    ) {
      quality = 0.3;
    } else {
      quality = 0.4;
    }
    if (event.target.files[0]) {
      const file = event.target.files[0];
      // tslint:disable-next-line: no-unused-expression
      new Compressor(file, {
        quality,
        success(result) {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const reader = new FileReader();
          reader.onload = (fileLoadedEvent: any) => {
            const img = new Image();
            img.onload = () => {
              const largerDimention = Math.max(img.width, img.height);
              let factor = 1;
              if (largerDimention > maxDimention) {
                factor = largerDimention / maxDimention;
              }
              const width = img.width / factor;
              const height = img.height / factor;
              canvas.width = width;
              canvas.height = height;
              ctx.drawImage(img, 0, 0, width, height);
              const src = canvas.toDataURL("image/jpeg", 0.7);
              index === 1 ? (target.picture1 = src) : (target.picture2 = src);
            };
            img.src = fileLoadedEvent.target.result;
          };
          reader.readAsDataURL(result);
        },
        error(err) {
          console.log(err.message);
        },
      });
    }
  };
  handleSpecialities = (data: any, values: any) => {
    if (data !== null && data !== "") {
      values.specialities = data;
    } else {
      values.specialities = [];
    }
  };
  handleProfession = (data: any, values: any) => {
    if (data !== null && data !== "") {
      values.prof_title = data;
      this.setState({
        disabled1: false,
      });
    } else {
      values.prof_title = "";
      this.setState({
        disabled1: true,
      });
    }
  };
  handleCity = (data: any, values: any) => {
    if (data !== null && data !== "") {
      values.city = data;
      this.setState({
        disabled1: false,
      });
    } else {
      values.city = "";
      this.setState({
        disabled1: true,
      });
    }
  };
  firstImageSelectedHandler = async (event: any, values: any): Promise<any> => {
    if (event.target.files[0]) {
      if (
        event.target.files[0].type === "image/jpeg" ||
        event.target.files[0].type === "image/png"
      ) {
        await this.ImageHandler(event, values, 1);
        this.setState({ disabled1: false });
      } else {
        event.target.value = "";
        Swal.fire({
          title: "Not an image",
          text: "Select JPG, PNG or JPEG image",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } else {
      this.setState({ disabled1: true });
      values.picture1 = "";
    }
  };
  secondImageSelectedHandler = async (
    event: any,
    values: any
  ): Promise<any> => {
    if (event.target.files[0]) {
      if (
        event.target.files[0].type === "image/jpeg" ||
        event.target.files[0].type === "image/png"
      ) {
        await this.ImageHandler(event, values, 2);
        this.setState({ disabled2: false });
      } else {
        event.target.value = "";
        Swal.fire({
          title: "Not an image",
          text: "Select JPG, PNG or JPEG image",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } else {
      this.setState({ disabled2: true });
      values.picture2 = "";
    }
  };
  closeModal = () => {
    this.setState({ loader: false });
  };

  handleDiagSorting = () => {
    const sortedDiagnoses =
      this.props.diagnoses &&
      this.props.diagnoses.sort(function(a: any, b: any) {
        const textA = a.name && a.name.toUpperCase();
        const textB = b.name && b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    const sortedProfessions =
      this.props.disorderList &&
      this.props.disorderList.sort(function(a: any, b: any) {
        const textA = a.type.toUpperCase();
        const textB = b.type.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    const sortedCities =
      this.props.cityList &&
      this.props.cityList.sort(function(a: any, b: any) {
        const textA = a.name.toUpperCase();
        const textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    this.setState({
      diagnoses: sortedDiagnoses,
      professions: sortedProfessions,
      cities: sortedCities,
    });
  };
  render() {
    return (
      <div className={`${bc} ${bc}__middle-container`}>
        {this.state.loader ? (
          <div className={`${bc}__loader`}>
            {" "}
            <CircularProgress />
          </div>
        ) : (
          <Formik
            enableReinitialize={true}
            initialValues={this.user}
            validationSchema={ValidationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
              handleSubmit,
              setFieldValue,
              resetForm,
              isValid,
              dirty,
            }) => (
              <form onSubmit={handleSubmit}>
                <h3>Personal Information</h3>

                <div className="input-row">
                  {/* <UserAvatar
                    preview={values.avatar}
                    setFieldValue={setFieldValue}
                  /> */}
                  <Error touched={touched.avatar} message={errors.avatar} />
                </div>

                <div className="input-row">
                  <Field
                    placeholder="First Name"
                    name="first_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.first_name ? values.first_name : ""}
                    className={
                      touched.first_name && errors.first_name
                        ? `${bc}__middle-container__has__error`
                        : `${bc}__middle-container__input`
                    }
                  />
                  <Error
                    touched={touched.first_name}
                    message={errors.first_name}
                  />
                </div>

                <div className="input-row">
                  <Field
                    placeholder="Last Name"
                    name="last_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.last_name ? values.last_name : ""}
                    className={
                      touched.last_name && errors.last_name
                        ? `${bc}__middle-container__has__error`
                        : `${bc}__middle-container__input`
                    }
                  />
                  <Error
                    touched={touched.last_name}
                    message={errors.last_name}
                  />
                </div>

                <div className="input-row">
                  <Field
                    placeholder="Personal email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email ? values.email : ""}
                    className={
                      touched.email && errors.email
                        ? `${bc}__middle-container__has__error`
                        : `${bc}__middle-container__input`
                    }
                  />
                  <Error touched={touched.email} message={errors.email} />
                </div>
                <div className="input-row">
                  <Field
                    placeholder="Street name"
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address ? values.address : ""}
                    className={
                      touched.address && errors.address
                        ? `${bc}__middle-container__has__error`
                        : `${bc}__middle-container__input`
                    }
                  />
                  <Error touched={touched.address} message={errors.address} />
                </div>

                <div className="input-row">
                  <Field
                    placeholder="Phone Number"
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone ? values.phone : ""}
                    className={
                      touched.phone && errors.phone
                        ? `${bc}__middle-container__has__error`
                        : `${bc}__middle-container__input`
                    }
                  />
                  <Error touched={touched.phone} message={errors.phone} />
                </div>
                <Grid container={true} spacing={2}>
                  <Grid item={true}>
                    <div className="input-row">
                      <Select
                        name="country"
                        labelId="demo-simple-select-readonly-label"
                        id="demo-simple-select-readonly"
                        value={values.country ? values.country : ""}
                        onChange={handleChange}
                        className={
                          touched.country && errors.country
                            ? `${bc}__middle-container__has__error`
                            : `${bc}__middle-container__input`
                        }
                      >
                        <MenuItem value="Canada">Canada</MenuItem>
                      </Select>
                      <Error
                        touched={touched.country}
                        message={errors.country}
                      />
                    </div>
                  </Grid>
                  <Grid item={true}>
                    <div className="input-row">
                      <Select
                        name="province"
                        labelId="demo-simple-select-readonly-label"
                        id="demo-simple-select-readonly"
                        value={this.state.province ? this.state.province : ""}
                        onChange={handleChange}
                        className={
                          touched.country && errors.country
                            ? `${bc}__middle-container__has__error`
                            : `${bc}__middle-container__input`
                        }
                      >
                        <MenuItem value="Ontario">Ontario</MenuItem>
                      </Select>
                      <Error
                        touched={touched.country}
                        message={errors.country}
                      />
                    </div>
                  </Grid>

                  <Grid item={true}>
                    <div className="input-row">
                      <Autocomplete
                        id="tags-filled"
                        style={{ height: "100%", width: "155px" }}
                        options={this.state.cities.map((option) => option.name)}
                        freeSolo
                        onChange={(e: any, data: any) =>
                          this.handleCity(data, values)
                        }
                        filterOptions={(options: any, params: any) => {
                          const filtered = filter(options, params);

                          if (params.inputValue !== "") {
                            filtered.push(params.inputValue);
                            values.city = params.inputValue;
                          }

                          return filtered;
                        }}
                        onBlur={handleBlur}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              variant="outlined"
                              label={option}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            style={{ height: "100%" }}
                            value={values.city ? values.city : []}
                            onBlur={handleBlur}
                            className={
                              touched.city && errors.city
                                ? `${bc}__middle-container__has__error`
                                : `${bc}__middle-container__input`
                            }
                            name="city"
                            {...params}
                            variant="outlined"
                            placeholder="Select City"
                          />
                        )}
                      />

                      <Error touched={touched.city} message={errors.city} />
                    </div>
                  </Grid>
                </Grid>

                <div className="input-row">
                  <Field
                    placeholder="Postal code"
                    name="postal_code"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.postal_code ? values.postal_code : ""}
                    className={
                      touched.postal_code && errors.postal_code
                        ? `${bc}__middle-container__has__error`
                        : `${bc}__middle-container__input`
                    }
                  />
                  <Error
                    touched={touched.postal_code}
                    message={errors.postal_code}
                  />
                </div>

                <div className="input-row">
                  <Field
                    component="textarea"
                    placeholder="Message to Caregivers - no more than 500 words"
                    name="bio"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bio ? values.bio : ""}
                    className={
                      touched.bio && errors.bio
                        ? `${bc}__middle-container__has__error`
                        : `${bc}__middle-container__multi_input`
                    }
                  />
                  <Error touched={touched.bio} message={errors.bio} />
                </div>

                <h3>Educational Information</h3>

                <Grid container={true}>
                  <Grid item={true} md={8}>
                    <Field
                      placeholder="Degree Completed, School, Year completed"
                      name="education_background[0]"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={
                        values.education_background &&
                        values.education_background[0]
                          ? values.education_background[0]
                          : ""
                      }
                      className={
                        touched.education_background &&
                        errors.education_background
                          ? `${bc}__middle-container__has__error`
                          : `${bc}__middle-container__input`
                      }
                    />
                    <Error
                      touched={touched.education_background}
                      message={errors.education_background}
                    />
                    {this.state.education_background.map((edu, index) => (
                      <div key={index + 1}>
                        <Field
                          placeholder="Click + button to add multiple"
                          name={`education_background[${index + 1}]`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={
                            values.education_background[index + 1]
                              ? values.education_background[index + 1]
                              : ""
                          }
                          className={`${bc}__middle-container__input`}
                        />
                        <div className="margin-bottom" />
                      </div>
                    ))}
                    <button
                      className="add-button"
                      type="button"
                      onClick={() => this.addEduField()}
                    >
                      <AddCircleOutlineIcon />
                    </button>
                    <div className="margin-top" />
                  </Grid>
                </Grid>

                <h3>Professional Information</h3>
                <div className="input-row">
                  <FormLabel>Professional Title</FormLabel>
                  <div className="margin-bottom" />
                  <Autocomplete
                    id="tags-filled"
                    style={{ height: "100%" }}
                    options={this.state.professions.map(
                      (option) => option.type
                    )}
                    freeSolo
                    filterOptions={(options: any, params: any) => {
                      const filtered = filter(options, params);

                      if (params.inputValue !== "") {
                        filtered.push(params.inputValue);
                        values.prof_title = params.inputValue;
                      }

                      return filtered;
                    }}
                    onChange={(e: any, data: any) =>
                      this.handleProfession(data, values)
                    }
                    onBlur={handleBlur}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        style={{ height: "100%" }}
                        value={values.prof_title ? values.prof_title : ""}
                        onBlur={handleBlur}
                        className={
                          touched.prof_title && errors.prof_title
                            ? `${bc}__middle-container__has__error`
                            : `${bc}__middle-container__input`
                        }
                        name="prof_title"
                        {...params}
                        variant="outlined"
                        placeholder=" Occupational Therapist, Pediatrician, Psychotherapist"
                      />
                    )}
                  />
                  <Error
                    touched={touched.prof_title}
                    message={errors.prof_title}
                  />
                </div>
                <div className="input-row">
                  <div className="input-row">
                    <Field
                      placeholder="Website"
                      name="site"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.site ? values.site : ""}
                      className={
                        touched.site && errors.site
                          ? `${bc}__middle-container__has__error`
                          : `${bc}__middle-container__input`
                      }
                    />
                    <Error touched={touched.site} message={errors.site} />
                  </div>
                </div>

                <div className="input-row">
                  <Field
                    placeholder="Experience in years"
                    name="exp"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.exp ? values.exp : ""}
                    className={
                      touched.exp && errors.exp
                        ? `${bc}__middle-container__has__error`
                        : `${bc}__middle-container__input`
                    }
                  />
                  <Error touched={touched.exp} message={errors.exp} />
                </div>

                <div className="input-row">
                  <Field
                    placeholder="Working Hours i.e. 07:00 - 11:00"
                    name="working_hours"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.working_hours ? values.working_hours : ""}
                    className={
                      touched.working_hours && errors.working_hours
                        ? `${bc}__middle-container__has__error`
                        : `${bc}__middle-container__input`
                    }
                  />
                  <Error
                    touched={touched.working_hours}
                    message={errors.working_hours}
                  />
                </div>

                <div className="input-row">
                  <div className="input-row">
                    <Field
                      component="textarea"
                      placeholder="Professional Statement - no more than 500 words"
                      name="prof_statement"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.prof_statement ? values.prof_statement : ""}
                      className={
                        touched.prof_statement && errors.prof_statement
                          ? `${bc}__middle-container__has__error`
                          : `${bc}__middle-container__multi_input`
                      }
                    />
                    <Error
                      touched={touched.prof_statement}
                      message={errors.prof_statement}
                    />
                  </div>
                </div>

                <div className="margin-bottom input-row">
                  <FormLabel>Specialities</FormLabel>
                  <div className="margin-top" />

                  <Autocomplete
                    multiple
                    id="tags-filled"
                    style={{ height: "100%" }}
                    options={this.state.diagnoses.map((option) => option.name)}
                    freeSolo
                    onChange={(e, data) =>
                      this.handleSpecialities(data, values)
                    }
                    onBlur={handleBlur}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        style={{ height: "100%" }}
                        value={values.specialities ? values.specialities : []}
                        onBlur={handleBlur}
                        className={
                          touched.specialities && errors.specialities
                            ? `${bc}__middle-container__has__error`
                            : `${bc}__middle-container__input`
                        }
                        name="specialities"
                        {...params}
                        variant="outlined"
                        placeholder="ADHD, Family Mediation, Cerebral Palsy"
                      />
                    )}
                  />

                  <Error
                    touched={touched.specialities}
                    message={errors.specialities}
                  />
                  <div className="margin-bottom" />
                </div>
                <div className="input-row">
                  <FormLabel>Appointments Available</FormLabel>
                  <div className="margin-top" />
                  <Checkbox name="work_place" value="Office/Clinic" />
                  <Checkbox name="work_place" value="In School Visits" />
                  <Checkbox name="work_place" value="In Home" />
                  <Checkbox name="work_place" value="Online" />
                  <Checkbox name="work_place" value="Phone" />
                  <Error
                    touched={touched.work_place}
                    message={errors.work_place}
                  />
                </div>

                <Grid container={true}>
                  <Grid item={true} md={8}>
                    <FormLabel>Treatment Approaches (Optional)</FormLabel>
                    <div className="margin-bottom" />
                    <Field
                      placeholder="Click + button to add multiple"
                      name="treatment_approaches[0]"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={
                        values.treatment_approaches &&
                        values.treatment_approaches[0]
                          ? values.treatment_approaches[0]
                          : ""
                      }
                      className={
                        touched.treatment_approaches &&
                        errors.treatment_approaches
                          ? `${bc}__middle-container__has__error`
                          : `${bc}__middle-container__input`
                      }
                    />
                    <Error
                      touched={touched.treatment_approaches}
                      message={errors.treatment_approaches}
                    />
                    {this.state.treatment_approaches.map((edu, index) => (
                      <div key={index + 1}>
                        <Field
                          placeholder="Click + button to add multiple"
                          name={`treatment_approaches[${index + 1}]`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={
                            values.treatment_approaches[index + 1]
                              ? values.treatment_approaches[index + 1]
                              : ""
                          }
                          className={`${bc}__middle-container__input`}
                        />
                        <div className="margin-bottom" />
                      </div>
                    ))}
                    <button
                      className="add-button"
                      type="button"
                      onClick={() => this.addTreatmentField()}
                    >
                      <AddCircleOutlineIcon />
                    </button>
                    <div className="margin-top" />
                  </Grid>
                </Grid>

                <div className="input-row">
                  <FormLabel>Office Pictures - Select 2 pictures</FormLabel>
                  <div className="margin-top" />
                  <input
                    placeholder="Office Pictures"
                    type="file"
                    accept="image/x-png,image/jpeg"
                    name="picture1"
                    onChange={(e: any) =>
                      this.firstImageSelectedHandler(e, values)
                    }
                    onBlur={handleBlur}
                    className={
                      touched.picture1 && errors.picture1
                        ? `${bc}__middle-container__has__error`
                        : `${bc}__middle-container__input`
                    }
                  />
                  <Error touched={touched.picture1} message={errors.picture1} />

                  <input
                    placeholder="Office Pictures"
                    type="file"
                    accept="image/x-png,image/jpeg"
                    name="picture2"
                    onChange={(e: any) =>
                      this.secondImageSelectedHandler(e, values)
                    }
                    onBlur={handleBlur}
                    className={
                      touched.picture2 && errors.picture2
                        ? `${bc}__middle-container__has__error`
                        : `${bc}__middle-container__input`
                    }
                  />
                  <Error touched={touched.picture2} message={errors.picture2} />
                </div>

                <div className="input-row">
                  <FormLabel>Working Days</FormLabel>
                  <div className="margin-top" />
                  <Checkbox name="working_days" value="Sunday" />
                  <Checkbox name="working_days" value="Monday" />
                  <Checkbox name="working_days" value="Tuesday" />
                  <Checkbox name="working_days" value="Wednesday" />
                  <Checkbox name="working_days" value="Thursday" />
                  <Checkbox name="working_days" value="Friday" />
                  <Checkbox name="working_days" value="Saturday" />
                  <Error
                    touched={touched.working_days}
                    message={errors.working_days}
                  />
                </div>
                <div className="input-row">
                  <div className="terms-and-conditions">
                    <input
                      type="checkbox"
                      name="dr_needed"
                      value={values.dr_needed}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Doctor Referral Needed?
                  </div>
                </div>

                <div className="input-row">
                  <div className="terms-and-conditions">
                    <input
                      type="checkbox"
                      name="terms_accepted"
                      value={values.terms_accepted}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Accept{" "}
                    <a href="/terms-of-use" target="_blank">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy-policy" target="_blank">
                      Privacy Policy
                    </a>
                    <Error
                      touched={touched.terms_accepted}
                      message={errors.terms_accepted}
                    />
                  </div>
                </div>

                <div className="input-row">
                  <button
                    className="submit-button"
                    type="submit"
                    disabled={
                      !(isValid && dirty) ||
                      this.state.disabled1 ||
                      this.state.disabled2
                    }
                    onClick={(e) => {
                      this.submitUserData(
                        "/users",
                        values,
                        resetForm,
                        e,
                        errors,
                        isSubmitting
                      );
                    }}
                  >
                    Submit{" "}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state: State) => ({
  ...state.app.user,
  ...state.app.cityList,
  ...state.app.disorderList,
  ...state.app.diagnoses,
  ...state.app,
});
const mapDispatchToProps = (dispatch: any) => ({
  addCity: (cityList: any) => dispatch(addCityList(cityList)),
  addProfession: (profList: any) => dispatch(addDisorderList(profList)),
  addSpecialities: (specialitiesList: any) =>
    dispatch(addDiagnoses(specialitiesList)),
  getUser: (id: string) => dispatch(getUserFromId(id)),
  addUser: (user: any) => dispatch(setLoginUser(user)),
});
export default compose<ComponentProps, any>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(JoinProfessionalForm);
