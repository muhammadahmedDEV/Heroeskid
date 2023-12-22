// MAIN MODULES
import React, { useState, useEffect } from "react";
import { Form, Input, Row, Col, Select, Button, Modal, Space } from "antd";
import Compressor from "compressorjs";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "recompose";
import moment from "moment";
import Geocode from "react-geocode";
import Swal from "sweetalert2";

// COMPONENTS
import OrgPersonalProfile from "./orgPersonal";
import OrganizationalInfo from "./organizationalInfo";
import ContactPerson from "./orgContactPerson";
import Wrapper from "../../pages/JoinProfessionalPage/styles";
import avatar from "../../assets/icons/avatar.png";

// TYPES
import { State } from "../../reducers";

// SERVISES
import {
  addCityList,
  addDisorderList,
  addDiagnoses,
  getOrgFromId,
} from "../../actions";
import { setLoginUser } from "../../routines/main";
import {
  getFbData,
  base_URL,
  updateUserData,
  writeUserData,
  updateFiltersData,
  updateCompleteUserData,
  getCity,
  updateCityData,
} from "../../servises/firebase";
import {
  setItemToLocalStorage,
  getItemToLocalStorage,
  removeItemFromLocalStorage,
  clearItemToLocalStorage,
} from "../../servises/localStorage";

//STYLES
import "../JoinProfessionalForm/styles.scss";

interface ComponentProps {
  history: History;
  authenticationId?: any;
  [key: string]: any;
  user: any;
  cityList: string[];
  disorderList: string[];
  diagnoses: any[];
}

const NonProfitForm = (props: any) => {
  const [draftData, setDraftData] = useState(
    getItemToLocalStorage("nonPofitData")
  );
  const handleAddresses = () => {
    let unique: string[];
    const listAddresses = props.userData
      ? props?.userData?.address?.filter(
        (i: any) => i !== undefined && i.trim() !== ""
      )
      : draftData?.address?.filter(
        (i: any) => i !== undefined && i !== null && i.trim() !== ""
      );
    const addressArr = [...listAddresses];
    unique = addressArr.filter((a, b) => addressArr.indexOf(a) === b);

    return [...unique];
    // return unique;
  };
  const handleAffiliations = () => {
    let unique: string[];
    const listAff = draftData
      ? draftData.affiliations.filter(
        (i: any) => i !== undefined && i.trim() !== ""
      )
      : props.userData?.affiliations.filter(
        (i: any) => i !== undefined && i.trim() !== ""
      );
    const affArr = [...listAff];
    unique = affArr.filter((a, b) => affArr.indexOf(a) === b);
    return [...unique];
  };
  const handleAwards = () => {
    let unique: string[];
    const listAwards = draftData
      ? draftData.awards.filter(
        (i: any) => i !== undefined && i.trim() !== ""
      )
      : props.userData.awards.filter(
        (i: any) => i !== undefined && i.trim() !== ""
      );
    const affArr = [...listAwards];
    unique = affArr.filter((a, b) => affArr.indexOf(a) === b);
    return [...unique];
  };
  const handleTestimonials = () => {
    let unique: string[];
    const listTestimonial = draftData
      ? draftData.testimonials.filter(
        (i: any) => i !== undefined && i.trim() !== ""
      )
      : props.userData.testimonials.filter(
        (i: any) => i !== undefined && i.trim() !== ""
      );
    const affArr = [...listTestimonial];
    unique = affArr.filter((a, b) => affArr.indexOf(a) === b);
    return [...unique];
  };

  const handleWorkingHours = (working_days: any[]) => {
    return working_days.reduce((allDays, currDay) => {
      allDays[`${currDay.name}_start_time`] =
        currDay.start_time && moment(currDay.start_time, "h:mm A");
      allDays[`${currDay.name}_end_time`] =
        currDay.end_time && moment(currDay.end_time, "h:mm A");
      return allDays;
    }, {});
  };
  const INITIAL_STATE = draftData
    ? {
      // avatar: draftData?.avatar || avatar,
      avatar: draftData?.avatar || null,
      name: draftData?.name ?? "",
      tagline: draftData?.tagline ?? "",
      insurance: draftData?.insurance ?? "",
      major_insurance: draftData?.major_insurance ?? "",
      sub_group: draftData?.sub_group ?? "",
      org_type: draftData?.org_type ?? "",
      email: draftData?.email ?? "",
      confirm: draftData?.email ?? "",
      phone: draftData?.phone ?? "",
      email_public: draftData?.email_public ?? "",
      address: draftData?.address?.length ? draftData.address[0] : "",
      addresses:
        draftData?.address?.length && draftData?.address[1]
          ? draftData.address[1]
          : "",
      // addresses: draftData?.address?.length ? draftData.address[0] : "",
      // address: draftData?.address && handleAddresses(),
      city: draftData?.city ?? "",
      country: draftData?.country || "",
      languages: draftData?.languages || [],
      province: draftData?.province ?? "",
      postal_code: draftData?.postal_code ?? "",
      // contact_avatar: draftData?.contact_avatar || avatar,
      contact_avatar: draftData?.contact_avatar || null,
      contact_first_name: draftData?.contact_first_name ?? "",
      contact_last_name: draftData?.contact_last_name ?? "",
      contact_email: draftData?.contact_email ?? "",
      contact_phone: draftData?.contact_phone ?? "",
      contact_extension: draftData?.contact_extension ?? "",
      contact_job_title: draftData?.contact_job_title ?? "",
      about: draftData?.about ?? "",
      prof_statement: draftData?.prof_statement ?? "",
      twitter: draftData?.twitter ?? "",
      multiple_loc: draftData?.multiple_loc ?? "",
      services: draftData?.services ?? [],
      otherServices: draftData?.otherServices ?? [],
      wait_time:
        (draftData?.wait_time &&
          draftData.wait_time.substr(0, draftData.wait_time.indexOf(" "))) ||
        "",
      wait_time_unit:
        (draftData?.wait_time_unit &&
          draftData.wait_time_unit.trim()) ||
        "",
      site: draftData?.site ?? "",
      fund_link: draftData?.fund_link ?? "",
      video: draftData?.video ?? "",
      need_volunteer: draftData?.need_volunteer ?? "",
      awards: draftData?.awards?.length ? draftData.awards[0] : "",
      award_list: draftData?.awards && handleAwards(),
      testimonials: draftData?.testimonials?.length
        ? draftData.testimonials[0]
        : "",
      testimonials_list: draftData?.testimonials && handleTestimonials(),
      affiliations: draftData?.affiliations?.length
        ? draftData.affiliations[0]
        : "",
      affiliations_list: draftData?.affiliations && handleAffiliations(),
      specialities: draftData?.specialities || [],
      prof_types: draftData?.prof_types || [],
      geo_areas: draftData?.geo_areas || [],
      pictures: draftData?.pictures ?? "",
      banner: draftData?.banner ?? "",
      working_days: draftData?.working_days ?? "",
      ...(draftData?.working_hours &&
        handleWorkingHours(draftData.working_hours)),
      works_with: draftData?.works_with ?? "",
      id: draftData?.id ?? "",
      authId: draftData?.authId ?? "",
      terms_accepted: draftData?.terms_accepted || false,
      approved: draftData?.approved || false,
      findUs: draftData?.findUs ?? "",
      findUsOther: draftData?.findUsOther ?? "",
      lat: draftData?.lat ?? "",
      lng: draftData?.lng ?? "",
      dr_needed: draftData?.dr_needed,
    }
    : {
      // avatar: props?.userData?.avatar || avatar,
      avatar: props?.userData?.avatar || null,
      name: props?.userData?.name ?? "",
      tagline: props?.userData?.tagline ?? "",
      insurance: props?.userData?.insurance ?? "",
      major_insurance: props?.userData?.major_insurance ?? "",
      sub_group: props?.userData?.sub_group ?? "",
      org_type: props?.userData?.org_type ?? "",
      email: props?.userData?.email ?? "",
      confirm: props?.userData?.email ?? "",
      phone: props?.userData?.phone ?? "",
      email_public: props?.userData?.email_public ?? "",
      address: props?.userData?.address?.length
        ? props.userData.address[0]
        : "",
      addresses:
        props?.userData?.address?.length && props?.userData?.address[1]
          ? props.userData.address[1]
          : "",
      // addresses: props?.userData?.address?.length
      //   ? props.userData.address[0]
      //   : "",
      // address: props.userData && props.userData.address && handleAddresses(),
      city: props?.userData?.city ?? "",
      country: props?.userData?.country || "",
      languages: props?.userData?.languages || [],
      province: props?.userData?.province ?? "",
      postal_code: props?.userData?.postal_code ?? "",
      // contact_avatar: props?.userData?.contact_avatar || avatar,
      contact_avatar: props?.userData?.contact_avatar || null,
      contact_first_name: props?.userData?.contact_first_name ?? "",
      contact_last_name: props?.userData?.contact_last_name ?? "",
      contact_email: props?.userData?.contact_email ?? "",
      contact_phone: props?.userData?.contact_phone ?? "",
      contact_extension: props?.userData?.contact_extension ?? "",
      contact_job_title: props?.userData?.contact_job_title ?? "",
      about: props?.userData?.about ?? "",
      prof_statement: props?.userData?.prof_statement ?? "",
      twitter: props?.userData?.twitter ?? "",
      multiple_loc: props?.userData?.multiple_loc ?? "",
      services: props?.userData?.services ?? [],
      otherServices: props?.userData?.otherServices ?? [],
      wait_time:
        (props?.userData?.wait_time &&
          props.userData.wait_time.substr(
            0,
            props.userData.wait_time.indexOf(" ")
          )) ||
        "",
      wait_time_unit:
        (props?.userData?.wait_time_unit &&
          props.userData.wait_time_unit.trim()) ||
        "",
      site: props?.userData?.site ?? "",
      fund_link: props?.userData?.fund_link ?? "",
      video: props?.userData?.video ?? "",
      need_volunteer: props?.userData?.need_volunteer ?? "",
      awards: props?.userData?.awards?.length ? props.userData.awards[0] : "",
      award_list: props?.userData?.awards && handleAwards(),
      testimonials: props?.userData?.testimonials?.length
        ? props.userData.testimonials[0]
        : "",
      testimonials_list:
        props?.userData?.testimonials && handleTestimonials(),
      affiliations: props?.userData?.affiliations?.length
        ? props.userData.affiliations[0]
        : "",
      affiliations_list:
        props?.userData?.affiliations && handleAffiliations(),
      specialities: props?.userData?.specialities || [],
      prof_types: props?.userData?.prof_types || [],
      geo_areas: props?.userData?.geo_areas || [],
      pictures: props?.userData?.pictures ?? "",
      banner: props?.userData?.banner ?? "",
      working_days: props?.userData?.working_days ?? "",
      ...(props?.userData?.working_hours &&
        handleWorkingHours(props.userData.working_hours)),
      works_with: props?.userData?.works_with ?? "",
      id: props?.userData?.id ?? "",
      authId: props?.userData?.authId ?? "",
      terms_accepted: props?.userData?.terms_accepted || false,
      approved: props?.userData?.approved || false,
      findUs: props?.userData?.findUs ?? "",
      findUsOther: props?.userData?.findUsOther ?? "",
      lat: props?.userData?.lat ?? "",
      lng: props?.userData?.lng ?? "",
      dr_needed: props?.userData?.dr_needed,
    };

  const [error, setError] = useState("");
  const [fileList, setFileList] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [picturesList, setPicturesList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [draftLoader, setDraftLoader] = useState(false);
  const [diagnoses, setDiagnoses] = useState([]);
  const [languages, setLangauages] = useState([]);
  const [cities, setCities] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [profName, setProfName] = useState("");
  const [newUserId, setNewUserId] = useState("");

  const [latitudeState, setLatitudeState] = useState("");
  const [longitudeState, setLongitudeState] = useState("");
  const [addressState, setAddressState] = useState([]);
  const [testimonialState, setTestimonialState] = useState([]);
  const [affiliationState, setAffiliationState] = useState([]);
  const [awardState, setAwardState] = useState([]);
  const [workingHoursState, setWorkingHoursState] = useState([]);
  const [waitTimeState, setWaitTimeState] = useState('');

  const [pageNumber, setPageNumber] = useState(1);
  const [draft, setDraft] = useState(INITIAL_STATE);
  const [form] = Form.useForm();
  const { getFieldValue } = form;
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const onNameChange = (event: any) => {
    setProfName(event.target.value);
  };

  const addNewProf = async () => {
    const profExist = professions.filter(
      (item) => item.type.trim().toUpperCase() === profName.trim().toUpperCase()
    );
    if (!profExist.length && profName.trim() !== "") {
      updateFiltersData("specialities", { type: profName.trim() }).then(
        async (res) => {
          await updateUserData("specialities", res.id);
          await getFbData("specialities")
            .then((querySnapshot) => {
              const profs: any = [];
              if (querySnapshot.docs.length > 0) {
                querySnapshot.forEach((doc: any) => {
                  profs.push(doc.data());
                });
                props.addProfession(profs);
              } // setItemToLocalStorage("specialities", profs);
            })
            .catch((e) => {
              // Error stored in  state
              setError(e);
            });
        }
      );

      const newItem = [...professions, { type: profName }];
      setProfessions(newItem);
      setProfName("");
    } else {
      setProfessions(professions);
      setProfName("");
    }
  };
  const handleDiagSorting = async () => {
    const diagList = getItemToLocalStorage("diagComplete");
    const langList = getItemToLocalStorage("langComplete");
    const specList = getItemToLocalStorage("specComplete");
    const citiesList = getItemToLocalStorage("cities");
    if (diagList) {
      const sortedDiagnoses =
        diagList &&
        diagList.sort(function (a: any, b: any) {
          const textA = a.name && a.name.toUpperCase();
          const textB = b.name && b.name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
      setDiagnoses(sortedDiagnoses);
    }
    if (langList) {
      const sortedLanguages =
        langList &&
        langList.sort(function (a: any, b: any) {
          const textA = a.name && a.name.toUpperCase();
          const textB = b.name && b.name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
      setLangauages(sortedLanguages);
    }
    if (specList) {
      const sortedProfessions =
        specList &&
        specList.sort(function (a: any, b: any) {
          const textA = a.type && a.type.toUpperCase();
          const textB = b.type && b.type.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
      setProfessions(sortedProfessions);
    }
    if (citiesList) {
      const sortedCities =
        citiesList &&
        citiesList.sort(function (a: any, b: any) {
          const textA = a.name && a.name.toUpperCase();
          const textB = b.name && b.name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
      setCities(sortedCities);
    }
    else {
      await fetch(`${base_URL}/GetSuggestionList`) // complete list of spec, lang, diag
        .then(response => response.json())
        .then(data => {
          if (data) {
            // lang => data[0]
            const sortedLanguages =
              data[0] &&
              data[0].sort(function (a: any, b: any) {
                const textA = a.name && a.name.toUpperCase();
                const textB = b.name && b.name.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
              });
            setItemToLocalStorage("langComplete", sortedLanguages);
            setLangauages(sortedLanguages);

            // diag => data[1]
            const sortedDiagnoses =
              data[1] &&
              data[1].sort(function (a: any, b: any) {
                const textA = a.name && a.name.toUpperCase();
                const textB = b.name && b.name.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
              });
            setItemToLocalStorage("diagComplete", sortedDiagnoses);
            setDiagnoses(sortedDiagnoses);

            // specialities  => data[2]
            const sortedSpecialities =
              data[2] &&
              data[2].sort(function (a: any, b: any) {
                const textA = a.type && a.type.toUpperCase();
                const textB = b.type && b.type.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
              });
            setItemToLocalStorage("specComplete", sortedSpecialities);
            setProfessions(sortedSpecialities);
          }
        })
        await fetch(`${base_URL}/GetIdandName`)  // complete list cities, org, prof
        .then(response => response.json())
        .then(data => {
          if (data) {
            // organization ids list => data[0]
            setItemToLocalStorage("orgIds", data[0]);

            // cities ids list => data[1]
            const sortedCities =
              data[1] &&
              data[1].sort(function (a: any, b: any) {
                const textA = a.name && a.name.toUpperCase();
                const textB = b.name && b.name.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
              });
            // triggerCities(sortedCities);
            setItemToLocalStorage("cities", sortedCities);
            setCities(sortedCities);

            // professionals (users) ids list => data[2]
            setItemToLocalStorage("usersIds", data[2]);
          }
        })
    }
  };

  useEffect(() => {
    // Set Geolocation parameters
    Geocode.setApiKey("AIzaSyC-FOnAJk_Hr5aErac_4nd7lcfwjsZUFqk");
    Geocode.setLanguage("en");
    Geocode.enableDebug();
    handleDiagSorting();
    if (props.userData) {
      const list = props?.userData?.pictures?.map((item: any, index: any) => {
        const data = {
          url: item,
          uid: item + index,
          name: "Office image " + (index + 1),
          status: "done",
        };
        return data;
      });
      list ? setFileList(list) : setFileList([]);
      props?.userData?.pictures
        ? setPicturesList(props.userData.pictures)
        : setPicturesList([]);
    }
    if (draftData) {
      const list = draftData?.pictures?.map((item: any, index: any) => {
        const data = {
          url: item,
          uid: item + index,
          name: "Office image " + (index + 1),
          status: "done",
        };
        return data;
      });
      list ? setFileList(list) : setFileList([]);
      draftData?.pictures
        ? setPicturesList(draftData.pictures)
        : setPicturesList([]);
    }


  }, []);

  const ImageHandler = (event: any, index: number): any => {
    const maxDimention = 500;
    let quality = 1;
    if (event.file.size > 15016800) {
      quality = 0.005;
    } else if (event.file.size > 13016800) {
      quality = 0.1;
    } else if (event.file.size > 5016800 && event.file.size < 13016800) {
      quality = 0.2;
    } else if (event.file.size > 1016800 && event.file.size < 5016800) {
      quality = 0.3;
    } else {
      quality = 0.4;
    }

    if (event.file) {
      const file = event.file;
      // tslint:disable-next-line: no-unused-expression
      new Compressor(file, {
        quality,
        success(result) {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const reader = new FileReader();
          reader.onload = (fileLoadedEvent: any) => {
            const img = new Image();
            img.onload = async () => {
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

              setImgUrl(src);
              setPicturesList([...picturesList, src]);

              form.setFieldsValue({ pictures: picturesList });
              // index === 1 ? form.setFieldsValue({ picture1: src }) : form.setFieldsValue({ picture2: src })
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
  const firstImageSelectedHandler = async (event: any): Promise<any> => {
    if (event.file) {
      if (event.file.size) {
        if (event.file.size < 5416800) {
          if (
            event.file.type === "image/jpeg" ||
            event.file.type === "image/png"
          ) {
            // await ImageHandler(event, 1);
            const maxDimention = 500;
            let quality = 1;
            if (event.file.size > 15016800) {
              quality = 0.005;
            } else if (event.file.size > 13016800) {
              quality = 0.1;
            } else if (
              event.file.size > 5016800 &&
              event.file.size < 13016800
            ) {
              quality = 0.2;
            } else if (event.file.size > 1016800 && event.file.size < 5016800) {
              quality = 0.3;
            } else {
              quality = 0.4;
            }

            const file = event.file;
            // tslint:disable-next-line: no-unused-expression
            new Compressor(file, {
              quality,
              success(result) {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                const reader = new FileReader();
                reader.onload = (fileLoadedEvent: any) => {
                  const img = new Image();
                  img.onload = async () => {
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
                    setFileList([
                      { ...event.file, url: src },
                      ...fileList.splice(-5),
                    ]);
                    setImgUrl(src);
                    let completeList = [src, ...picturesList.splice(-5)];
                    setPicturesList(completeList);

                    form.setFieldsValue({ pictures: completeList });
                    // index === 1 ? form.setFieldsValue({ picture1: src }) : form.setFieldsValue({ picture2: src })
                  };
                  img.src = fileLoadedEvent.target.result;
                };
                reader.readAsDataURL(result);
              },
              error(err) {
                console.log(err.message);
              },
            });
          } else {
            // setFileList(fileList);
          }
        } else {
          Swal.fire({
            title: "Maximum size exceeded",
            text: "Please select image of maximum 5 MB",
            icon: "info",
            confirmButtonText: "Ok",
          });
        }
      }
    } else {
      form.setFieldsValue({ pictures: picturesList });
    }
  };

  // const closeModal = () => {
  //   setLoader(false);
  // };

  const handleRemove = (e: any) => {
    const index = fileList.findIndex((item) => item.uid == e.uid);
    const newList = [...fileList];
    newList.splice(index, 1);
    setFileList(newList);
    const files = [...picturesList];

    files.splice(index, 1);
    setPicturesList(files);
    if (!files.length) {
      form.setFieldsValue({ pictures: [] });
    }
  };
  const getUserData = () => {
    getFbData("organizations")
      .then(async (querySnapshot) => {
        const nonProfit: any = [];
        querySnapshot.forEach((doc: any) => {
          const newDoc: any = doc.data();
          nonProfit.push(newDoc);
        });
        const id: string = props.user.uid;

        nonProfit.filter(async (item: any) => {
          if (item.authId === id) {
            setNewUserId(item.id);
            await props.addUser(item);
            await props.getOrg(item.id);
            return true;
          }
          return undefined;
        });
      })
      .catch((e) => {
        setError(e);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    const errors =
      errorInfo.errorFields &&
      errorInfo.errorFields.map((item: any) => item.errors[0]);
    const errMsgs = errors && errors.map((item: any) => <div>{item}</div>);
    if (errorInfo && errorInfo.errorFields.length) {
      Modal.error({
        title: "Required fields are missing",
        content: (
          <Row style={{ display: "flex", flexFlow: "wrap" }}>
            {errMsgs &&
              errMsgs.map((item: any) => (
                <Col span={24}>
                  <li style={{ color: "red" }}>{item.props.children}</li>
                </Col>
              ))}
          </Row>
        ),
      });
    }
  };
  const decreasePageNumber = () => {
    if (pageNumber === 1) {
      return;
    } else {
      setPageNumber(pageNumber - 1);
    }
    const container = document.querySelector("#root>div:first-child");
    container.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  };

  const increasePageNumber = () => {
    if (pageNumber === 2) {
      return;
    } else {
      setPageNumber(pageNumber + 1);
    }
    const container = document.querySelector("#root>div:first-child");
    container.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  };
  const setWorkingHours = (values: any) => {
    const workHours = daysOfWeek.map((day) => {
      const start_time = values[`${day}_start_time`]
        ? moment(values[`${day}_start_time`]).format("h:mm A")
        : "";
      const end_time = values[`${day}_end_time`]
        ? moment(values[`${day}_end_time`]).format("h:mm A")
        : "";
      return { name: day, start_time, end_time };
    });
    setWorkingHoursState(workHours)
    return workHours;
  };
  const saveDraft = async (formValues: any) => {
    setDraftLoader(true);
    // formValues = form.getFieldsValue();
    formValues = form.getFieldsValue(); // Get new values from form

    const data = Object.assign(draft, formValues); // save values from each form into draft to submit at once
    let latitude: any = "";
    let longitude: any = "";
    let uniqueAddresses: string[] = []; // make single array for address
    if (pageNumber == 1) {
      setWaitTimeState(`${formValues.wait_time} ${formValues.wait_time_unit}`)
      if (data.address) {
        const fullAddress = `${data.address} ${data.addresses}`;
        const cleanAddress =
          fullAddress
            ?.split(" ")
            .join("+")
            .replace(",", "") +
          "+" +
          data.city?.trim() +
          "+" +
          data.country?.trim();
        await Geocode.fromAddress(cleanAddress).then((response: any) => {
          latitude = response.results[0].geometry.location.lat;
          setLatitudeState(response.results[0].geometry.location.lat)
          longitude = response.results[0].geometry.location.lng;
          setLongitudeState(response.results[0].geometry.location.lng)
        });
      }

      if (formValues.addresses) {
        //if address 2 is added
        uniqueAddresses = [formValues.address, formValues.addresses]; // concat address1 and address2
        setAddressState([formValues.address, formValues.addresses])
      } else {
        uniqueAddresses = [formValues.address]
        setAddressState([formValues.address])
      }
    }
    const {
      Monday_start_time,
      Monday_end_time,
      Tuesday_start_time,
      Tuesday_end_time,
      Wednesday_start_time,
      Wednesday_end_time,
      Thursday_start_time,
      Thursday_end_time,
      Friday_start_time,
      Friday_end_time,
      Saturday_start_time,
      Saturday_end_time,
      Sunday_start_time,
      Sunday_end_time,
      affiliations_list,
      award_list,
      testimonials_list,
      addresses,
      ...rest
    } = data; // Remove unwanted fields from data
    let uniqueTestimonials: string[] = []; // Make single array for awards
    let uniqueAffiliation: string[] = []; // Make single array for affiliations
    let uniqueAwards: string[] = []; // Make single array for awards
    if (pageNumber == 1) {

      if (formValues.affiliations_list) {
        const listAff = formValues.affiliations_list.filter(
          (i: any) => i !== undefined && i.trim() !== ""
        );

        const arrayAff = [formValues.affiliations, ...listAff];
        uniqueAffiliation = arrayAff.filter((a, b) => arrayAff.indexOf(a) === b);
        setAffiliationState(arrayAff.filter((a, b) => arrayAff.indexOf(a) === b))
      }


      if (formValues.award_list) {
        const listAff = formValues.award_list.filter(
          (i: any) => i !== undefined && i.trim() !== ""
        );
        const arrayAff = [formValues.awards, ...listAff];
        uniqueAwards = arrayAff.filter((a, b) => arrayAff.indexOf(a) === b);
        setAwardState(arrayAff.filter((a, b) => arrayAff.indexOf(a) === b))
      }


      if (formValues.testimonials_list) {
        const listTest = formValues.testimonials_list.filter(
          (i: any) => i !== undefined && i.trim() !== ""
        );
        const arrayTest = [formValues.testimonials, ...listTest];
        uniqueTestimonials = arrayTest.filter(
          (a, b) => arrayTest.indexOf(a) === b
        );
        setTestimonialState(arrayTest.filter(
          (a, b) => arrayTest.indexOf(a) === b
        ))
      }
    }
    const payload: any = {
      ...rest,
      authId: props.authenticationId,
      pictures: picturesList?.slice(-6),
      // treatment_approaches: values.treatment_approaches
      //   ? [...values.treatment_approaches]
      //   : [],
      address: pageNumber == 1 ? uniqueAddresses : addressState,
      affiliations: pageNumber == 1 ? uniqueAffiliation : affiliationState,
      working_hours: pageNumber == 1 ? setWorkingHours(formValues) : workingHoursState,
      awards: pageNumber == 1 ? uniqueAwards : awardState,
      testimonials: pageNumber == 1 ? uniqueTestimonials : testimonialState,
      id: "",
      email_public: formValues.email_public ? formValues.email_public : false,
      wait_time: pageNumber == 1 ? `${formValues.wait_time} ${formValues.wait_time_unit}` : waitTimeState,
      lat: pageNumber == 1 ? latitude : latitudeState,
      lng: pageNumber == 1 ? longitude : longitudeState,
    };

    setDraft(payload); // set draft to keep data in single object
    setItemToLocalStorage("nonPofitData", payload); // set data to local storage
    setTimeout(() => {
      setDraftLoader(false);
    }, 1000);
  };

  const handleSubmit = async (ref: any, values: any) => {
    // TODO
    // Embed stripeId
    // Manage contact array
    // image delete
    // TODO Ends
    if (pageNumber == 2) {
      saveDraft(values);
      if (pageNumber < 2) {
        increasePageNumber();
        return;
      }
      setLoader(true);
      if (props.userData && props.userData.id) {
        const id = props.userData.id;
        // Remove confirm email from data
        const { confirm, ...user }: any = draft;
        await updateCompleteUserData(ref, id, {
          ...user,
          id,
        }).then(async (response) => {
          await props.addUser({ ...draft, id });
          await props.getOrg(id);
          setLoader(false);
        });

        if (draft.city !== props.userData.city) {
          const newCity = await getCity({
            table: "cities",
            name: draft.city,
          });

          newCity.forEach(async (doc: any) => {
            const newDoc: any = doc.data();
            const memberCount = newDoc.member_count ? newDoc.member_count : 0;
            await updateCityData("cities", newDoc.id, {
              member_count: memberCount + 1,
            });
          });
          const oldCity = await getCity({
            table: "cities",
            name: props.userData.city,
          });
          oldCity.forEach(async (doc: any) => {
            const newDoc: any = doc.data();
            const memberCount = newDoc.member_count ? newDoc.member_count : 1;
            await updateCityData("cities", newDoc.id, {
              member_count: memberCount - 1,
            });
          });
        }
      } else {
        // const user: any = { ...payload, approved: false };
        const user: any = { ...draft, approved: false };
        // Remove Confirm email from data
        const { confirm, ...userData } = user;
        await writeUserData(ref, userData).then((response: any) => {
          updateUserData(ref, response.id).then(async () => {
            getUserData();
            setLoader(false);
          });
        });
      }

      // Clear local storage
      const local = getItemToLocalStorage("nonPofitData");
      if (local !== null) {
        removeItemFromLocalStorage("nonPofitData");
        clearItemToLocalStorage();
      }
      return
    }
    else {
      let loc = values.services.includes("Specific")
      if (loc == true && values.otherServices.length == 0) {
        Swal.fire({
          title: "Error!",
          text: "Please add location of service",
          icon: "error",
          confirmButtonText: "Ok",
        })

      }
      else {
        saveDraft(values);
        if (pageNumber < 2) {
          increasePageNumber();
          return;
        }
        setLoader(true);
        // const newSpecialities =
        //   draft.specialities &&
        //   draft.specialities.filter((item: any) => {
        //     let isMatch: boolean = false;
        //     isMatch = !diagnoses.some((val: any) => {
        //       return (
        //         item && item.trim().toUpperCase() === val.name.trim().toUpperCase()
        //       );
        //     });
        //     return isMatch;
        //   });

        // if (newSpecialities.length) {
        //   {
        //     (await newSpecialities) &&
        //       newSpecialities.map(async (item: any) => {
        //         await updateFiltersData("diagnoses", { name: item }).then(
        //           async (res) => {
        //             await updateUserData("diagnoses", res.id);
        //           }
        //         );
        //       });
        //   }
        // }
        if (props.userData && props.userData.id) {
          const id = props.userData.id;
          // Remove confirm email from data
          const { confirm, ...user }: any = draft;
          await updateCompleteUserData(ref, id, {
            ...user,
            id,
          }).then(async (response) => {
            await props.addUser({ ...draft, id });
            await props.getOrg(id);
            setLoader(false);
          });

          if (draft.city !== props.userData.city) {
            const newCity = await getCity({
              table: "cities",
              name: draft.city,
            });

            newCity.forEach(async (doc: any) => {
              const newDoc: any = doc.data();
              const memberCount = newDoc.member_count ? newDoc.member_count : 0;
              await updateCityData("cities", newDoc.id, {
                member_count: memberCount + 1,
              });
            });
            const oldCity = await getCity({
              table: "cities",
              name: props.userData.city,
            });
            oldCity.forEach(async (doc: any) => {
              const newDoc: any = doc.data();
              const memberCount = newDoc.member_count ? newDoc.member_count : 1;
              await updateCityData("cities", newDoc.id, {
                member_count: memberCount - 1,
              });
            });
          }
        } else {
          // const user: any = { ...payload, approved: false };
          const user: any = { ...draft, approved: false };
          // Remove Confirm email from data
          const { confirm, ...userData } = user;
          await writeUserData(ref, userData).then((response: any) => {
            updateUserData(ref, response.id).then(async () => {
              getUserData();
              setLoader(false);
            });
          });
        }

        // Clear local storage
        const local = getItemToLocalStorage("nonPofitData");
        if (local !== null) {
          removeItemFromLocalStorage("nonPofitData");
          clearItemToLocalStorage();
        }
      }
    }
  };
  return (
    <Wrapper>
      <div className="content">
        <Col span={24}>
          <h1 className="title_nonprofit">Set Up Your Organization Profile</h1>
          <p style={{ margin: "auto 2rem", maxWidth: "800px" }}>
            Thank you for joining Everyday Heroes Kids (EHK).  Most of the
            fields in this form are optional so that organizations can customize
            profiles to best fit their needs. Once reviewed and published,
            caregivers and professionals searching for support in the areas you
            serve will be presented with your profile along with other profiles
            that match their search. Our goal at EHK is to present all available
            professional services and resources that might be helpful; both the
            services caregivers and professionals are searching for and also the
            ones they didn’t know existed, encouraging earlier intervention for
            better outcomes.
            <br />
            <br />
            Welcome to the EHK community! Please contact us at
            <b> info@ehkidshealth.com</b> with any feedback or if you need
            support creating your profile page.
          </p>
        </Col>
        <Form
          form={form}
          hideRequiredMark
          onFinishFailed={onFinishFailed}
          onFinish={(values) => handleSubmit("/organizations", values)}
          // initialValues={INITIAL_STATE}
          initialValues={draft}
        >
          {pageNumber === 1 && (
            <>
              <fieldset>
                <legend>Organization Profile</legend>
                <OrgPersonalProfile
                  cities={cities}
                  form={form}
                  addCity={props.addCity}
                  firstImageSelectedHandler={firstImageSelectedHandler}
                  banner={draftData?.banner || props?.userData?.banner}
                  languages={languages}
                  handleRemove={handleRemove}
                  fileList={fileList}
                />
                <OrganizationalInfo
                  form={form}
                  diagnoses={diagnoses}
                  professionalTitle={professions}
                  daysOfWeek={daysOfWeek}
                  cities={cities}
                  addCity={props.addCity}
                />
              </fieldset>
            </>
          )}
          {pageNumber === 2 && (
            <fieldset>
              <legend>Organization Contact</legend>
              <ContactPerson form={form} />
            </fieldset>
          )}
          <Space size={"large"} className="d-block">
            <div className="button-panel">
              {pageNumber > 1 && (
                <Col sm={4} md={4} xl={4} xxl={4}>
                  <Form.Item>
                    <Button
                      className="btn-submit_draft"
                      type="primary"
                      htmlType="button"
                      size="large"
                      // loading={loader}
                      //   onClick={props.saveDraft}
                      onClick={decreasePageNumber}
                    >
                      Back
                    </Button>
                  </Form.Item>
                </Col>
              )}
              <Col sm={12} md={12} xl={4} xxl={4}>
                <Form.Item>
                  <Button
                    className="btn-submit"
                    type="primary"
                    onClick={saveDraft}
                    size="large"
                    loading={draftLoader}
                  >
                    Save Draft
                  </Button>
                </Form.Item>
              </Col>
              {pageNumber <= 1 && (
                <Col sm={12} md={12} xl={4} xxl={4}>
                  <Form.Item>
                    <Button
                      className="btn-submit"
                      type="primary"
                      htmlType="submit"
                      size="large"
                      loading={loader}
                      // onClick={increasePageNumber}
                      key="next"
                    >
                      Next
                    </Button>
                  </Form.Item>
                </Col>
              )}
              {pageNumber === 2 && (
                <Col sm={12} md={12} xl={4} xxl={4}>
                  <Form.Item>
                    {/* <h1>{pageNumber}</h1> */}
                    <Button
                      className="btn-submit"
                      type="primary"
                      htmlType="submit"
                      size="large"
                      loading={loader}
                      key="submit"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              )}
            </div>
          </Space>
        </Form>
      </div>
    </Wrapper>
  );
};

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
  getOrg: (id: string) => dispatch(getOrgFromId(id)),
  addUser: (user: any) => dispatch(setLoginUser(user)),
});
export default compose<ComponentProps, any>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(NonProfitForm);
