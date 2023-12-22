// MAIN MODULES
import React, { useState, useEffect } from "react";
import ServicePopUp from '../../components/ServicePopUp/ServicePopUp';

import {
  Form,
  Input,
  Row,
  Col,
  Select,
  Button,
  Checkbox,
  Upload,
  Divider,
  Radio,
  TimePicker,
  Modal,
  Space,
} from "antd";
import moment from "moment";
import Compressor from "compressorjs";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "recompose";
import {
  PlusCircleOutlined,
  PlusOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import PersonalProfile from "./personal";
import EducationalInfo from "./educationalInfo";
import Wrapper from "../../pages/JoinProfessionalPage/styles";
import avatar from "../../assets/team/avatar.jpg";
import Geocode from "react-geocode";
// TYPES
import { State } from "../../reducers";

// SERVISES
import {
  getUserFromId,
  addCityList,
  addDisorderList,
  addDiagnoses,
  addLanguages,
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

// STYLES
import "./styles.scss";
const { Option } = Select;
const { TextArea } = Input;
interface ComponentProps {
  history: History;
  authenticationId?: any;
  [key: string]: any;
  user: any;
  cityList: string[];
  disorderList: string[];
  diagnoses: any[];
  languages: any[];
  list: any[];
}

const ProfileForm = (props: any) => {
  const serviceOptions = [
    { label: 'In Home', value: 'In home', description: 'Select if you offer services in home', checked: false },
    { label: 'In School', value: 'In school', description: 'Select if you offer services in school', checked: false },
    { label: 'Online/Apps', value: 'Online', description: 'Select if you offer services online or via a mobile application', checked: false },
    // { label: 'By Phone', value: 'Phone', description: 'Select if you offer services online or via a mobile application', checked: false },
    // { label: 'Online/Apps', value: 'Online', description: 'Select if you offer services at specific locations', checked: false },
    { label: 'At Specific Locations', value: 'Specific', description: 'Select if you offer services at specific locations', checked: false }
  ];
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
  const [treatmentInputValue, setTreatmentInputValue] = useState("");
  const [newUserId, setNewUserId] = useState("");
  const [draftData, setDraftData] = useState(getItemToLocalStorage("formData"));
  const [otherField, enableOtherField] = useState(
    props?.userData?.findUsOther || draftData?.findUsOther ? false : true
  );

  const [form] = Form.useForm();
  const { getFieldsValue, getFieldValue, setFieldsValue } = form;
  const [specificService, setSpecificService] = useState(false);
  const [updateSevices, setUpdateSevices] = useState(true);
  const [servicesCheck, setServiceCheck] = useState(serviceOptions);
  const [openPopup, setOpenPopup] = useState(false);
  const [locations, setLocations] = useState([]);
  const [updateNow, setUpdateNow] = useState(true);
  const updateCheckbox = () => {
    setUpdateNow(!updateNow)
  }
  const showPopup = () => {
    //  setPopUp(!popUp);
    setOpenPopup(true);
  };
  const handlePrivacyTile = (): any => {
    setOpenPopup(false);
  };
  const addLocation = (location: string) => {

    setLocations([...locations, location]);
    setFieldsValue({ otherServices: [...locations, location] });
  };
  const removeLocation = (idx: number) => {
    const newLocation = locations.filter((item: any, sidx: any) => sidx !== idx)
    setLocations(newLocation);
    setFieldsValue({ otherServices: newLocation });
  };
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const appointment = [
    "Office/Clinic",
    "In School Visits",
    "In Home",
    "Online",
    "Phone"
  ];
  const howDidYouFind = [
    "Google search",
    "Word of mouth referral",
    "Social media",
    "Press",
    "One of our pediatric partners",
    "Other",
  ];
  const onChangeServices = (service: any) => {
    setUpdateSevices(!updateSevices)
    service.checked = !service.checked;
    if (service.value == 'Specific') {
      // setSpecificService(service.checked);
      setSpecificService(!specificService);
    }
  };
  const onNameChange = (event: any) => {
    setProfName(event.target.value);
  };

  const setOtherFieldValue = (event: any) => {
    if (event === "Other") {
      enableOtherField(false);
    } else {
      enableOtherField(true);
    }
  };

  // Lat Lng updated in DB
  // const updateLatLng = (): any => {
  //   console.log(props.list, "list");
  //   props.list
  //     ? props.list.map((item: any) => {
  //         // let tempLat: any;
  //         // let tempLng: any;
  //         let address = item.address.split(" ").join("+");
  //         address = address.replace(",", "");
  //         address =
  //           address + "+" + item.city.trim() + "+" + item.country.trim();
  //         // console.log(address, "address");
  //         Geocode.fromAddress(address).then((response: any) => {
  //           const { lat, lng } = response.results[0].geometry.location;

  //           // console.log(lat, lng, "latlng");

  //           const payload = { ...item, lat, lng };
  //           // console.log(item.id, payload, "payload");
  //           updateCompleteUserData("/users", item.id, payload);
  //         });
  //         console.log(userLat, userLng, "success");
  //       })
  //     : console.log("list not available");
  // };
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
              querySnapshot.forEach((doc: any) => {
                profs.push(doc.data());
              });
              props.addProfession(profs);
              // setItemToLocalStorage("specialities", profs);
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
    // Geocode.setRegion("on");
    Geocode.enableDebug();
    handleDiagSorting();
    if (props.userData) {
      const list =
        props.userData &&
        props.userData.pictures &&
        props.userData.pictures.map((item: any, index: any) => {
          const data = {
            url: item,
            uid: item + index,
            name: "Office image " + (index + 1),
            status: "done",
          };
          return data;
        });
      setSpecificService(props.userData.services ? props.userData.services.includes("Specific") : false)
      setLocations(props.userData.otherServices)
      setFileList(list);
      setPicturesList(props.userData.pictures);
    }
    if (draftData) {
      const list =
        draftData &&
        draftData.pictures &&
        draftData.pictures.map((item: any, index: any) => {
          const data = {
            url: item,
            uid: item + index,
            name: "Office image " + (index + 1),
            status: "done",
          };
          return data;
        });
      setSpecificService(draftData.services ? draftData.services.includes("Specific") : false)
      setLocations(draftData.otherServices)
      setFileList(list);
      setPicturesList(draftData.pictures);
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
          if (event.file.type === "image/jpeg" || event.file.type === "image/png") {
            // await ImageHandler(event, 1);
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
                    setFileList([{ ...event.file, url: src }, ...fileList.splice(-1)]);
                    setImgUrl(src);
                    let completeList = [src, ...picturesList.splice(-1)];
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

  const closeModal = () => {
    setLoader(false);
  };

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
    getFbData("users")
      .then(async (querySnapshot) => {
        const users: any = [];
        querySnapshot.forEach((doc: any) => {
          const newDoc: any = doc.data();
          users.push(newDoc);
        });
        const id: string = props.user.uid;

        users.filter(async (item: any) => {
          if (item.authId === id) {
            setNewUserId(item.id);
            await props.addUser(item);
            await props.getUser(item.id);
            return true;
          }
          return undefined;
        });
      })
      .catch((e) => {
        setError(e);
      });
  };

  const sortDays = (weekDays: string[], list: string[]) => {
    const dayOfWeek = 6;
    const sortedList = list.slice(dayOfWeek).concat(list.slice(0, dayOfWeek));
    return weekDays.sort((a, b) => {
      if (sortedList.indexOf(a) > sortedList.indexOf(b)) return 1;
      if (sortedList.indexOf(a) < sortedList.indexOf(b)) return -1;
      return 0;
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

  const handleSubmit = async (ref: any, values: any) => {
    let loc = values.services.includes("Specific")
    if(loc == true && values.otherServices.length == 0){
      Swal.fire({
        title: "Error!",
        text: "Please add location of service",
        icon: "error",
        confirmButtonText: "Ok",
      })
    
    }
    else{
    let unique: string[];
    let latitude: any;
    let longitude: any;
    if (values.address) {
      const fullAddress = `${values.address} ${values.address2}`
      const cleanAddress = fullAddress?.split(" ")
        .join("+")
        .replace(",", "") +
        "+" +
        values.city.trim() +
        "+" +
        values.country.trim();
      await Geocode.fromAddress(cleanAddress).then((response: any) => {
        latitude = response.results[0].geometry.location.lat;
        longitude = response.results[0].geometry.location.lng;
      }).catch((e)=>{
        Swal.fire({
          title: "Error!",
          text: "Please enter valid address",
          icon: "error",
          confirmButtonText: "Ok",
        })
      });
    }

    setLoader(true);

    if (values.education_background) {
      const listEdus = values.education_background.filter(
        (i: any) => i !== undefined && i.trim() != ""
      );
      const eduArr = [values.education, ...listEdus];
      unique = eduArr.filter((a, b) => eduArr.indexOf(a) == b);
    } else {
      unique = [values.education];
    }


    const { start_time, end_time, ...rest } = values;
    const payload = {
      ...rest,
      working_hours:
        moment(values.start_time).format("h:mm A") +
        " - " +
        moment(values.end_time).format("h:mm A"),
      authId: props.authenticationId,
      pictures: picturesList.slice(-2),
      education_background: unique,

      treatment_approaches: values.treatment_approaches
        ? [...values.treatment_approaches]
        : [],

      working_days: sortDays([...values.working_days], daysOfWeek),
      work_place: sortDays(values.work_place ? [...values.work_place] : [], appointment),
      email_public: values.email_public ? values.email_public : false,
      first_name: values.first_name.trim(),
      last_name: values.last_name.trim(),
      prof_title: values.prof_title.trim(),
      lat: latitude,
      lng: longitude,
    };
    const newSpecialities =
      values.specialities &&
      values.specialities.filter((item: any) => {
        let isMatch: boolean = false;
        isMatch = !diagnoses.some((val: any) => {
          return (
            item && item.trim().toUpperCase() === val.name.trim().toUpperCase()
          );
        });
        return isMatch;
      });
    if (newSpecialities.length) {
      {
        // (await newSpecialities) &&
        //   newSpecialities.map(async (item: any) => {
        //     await updateFiltersData("diagnoses", { name: item }).then(
        //       async (res) => {
        //         await updateUserData("diagnoses", res.id);
        //       }
        //     );
        //   });
        const specList = getItemToLocalStorage("specComplete");
        if (specList) {
          props.addSpecialities(specList);
        }
        else {
          await fetch(`${base_URL}/GetSuggestionList`) // complete list of spec, lang, diag
            .then(response => response.json())
            .then(data => {
              if (data) {
                // specialities  => data[2]
                const sortedSpecialities =
                  data[2] &&
                  data[2].sort(function (a: any, b: any) {
                    const textA = a.type && a.type.toUpperCase();
                    const textB = b.type && b.type.toUpperCase();
                    return textA < textB ? -1 : textA > textB ? 1 : 0;
                  });
                setItemToLocalStorage("specComplete", sortedSpecialities);
                props.addSpecialities(sortedSpecialities);
              }
            })
        }
      }
    }
    const newLanguages =
      values.languages &&
      values.languages.filter((item: any) => {
        let isMatch: boolean = false;
        isMatch = !languages.some((val: any) => {
          return (
            item && item.trim().toUpperCase() === val.name.trim().toUpperCase()
          );
        });
        return isMatch;
      });
    if (newLanguages.length) {
      {
        // (await newLanguages) &&
        //   newLanguages.map(async (item: any) => {
        //     await updateFiltersData("languages", { name: item }).then(
        //       async (res) => {
        //         await updateUserData("languages", res.id);
        //       }
        //     );
        //   });
        const langList = getItemToLocalStorage("langComplete");
        if (langList) {
          props.addLanguages(langList);
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
                props.addLanguages(sortedLanguages);
              }
            })
        }
      }
    }

    if (props.userData && props.userData.id) {
      const id = props.userData.id;
      // Remove confirm email from data
      const { confirm, ...user } = payload;
      await updateCompleteUserData(ref, props.userData.id, { ...user, id })
        .then(async (response) => {
          await props.addUser({ ...payload, id });
          await props.getUser(id);
          // setLoader(false);
        })
        .catch((error: any) => {
          console.log(error.message, 'User is not saved')
          Swal.fire({
            title: "Error!",
            text: "Profile is not saved, please contact administrator.",
            icon: "error",
            confirmButtonText: "Ok",
          }).then(() => {
            setLoader(false);
          });
        });
      if (values.city !== props.userData.city) {
        const newCity = await getCity({
          table: "cities",
          name: values.city,
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
      const user: any = { ...payload, approved: false };
      //Remove Confirm email from data
      const { confirm, ...userData } = user;
      await writeUserData(ref, userData).then((response) => {
        updateUserData(ref, response.id).then(async () => {
          getUserData();
          // setLoader(false);
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
            setLoader(false);
          });
        });
      if (values.city) {
        const querySnapshot = await getCity({
          table: "cities",
          name: values.city,
        });
        querySnapshot.forEach(async (doc: any) => {
          const newDoc: any = doc.data();
          const memberCount = newDoc.member_count ? newDoc.member_count : 0;
          await updateCityData("cities", newDoc.id, {
            member_count: memberCount + 1,
          });
        });
      }
    }


    // Clear local storage
    const local = getItemToLocalStorage("formData");
    if (local !== null) {
      removeItemFromLocalStorage("formData");
      clearItemToLocalStorage();
    }
  }
  };
  const handleEdu = () => {
    const listEdus = props.userData
      ? props.userData &&
      props.userData.education_background &&
      props.userData.education_background.filter(
        (i: any) => i !== undefined && i.trim() !== ""
      )
      : draftData &&
      draftData.education_background &&
      draftData.education_background.filter(
        (i: any) => i !== undefined && i !== null && i.trim() !== ""
      );

    const eduArr = [...listEdus];
    const unique = eduArr.filter((a, b) => eduArr.indexOf(a) === b);
    return unique;
  };

  const handleTreatments = () => {
    let unique: string[];
    const listTreatments = props.userData
      ? props?.userData?.treatment_approaches?.filter(
        (i: any) => i !== undefined && i.trim() !== ""
      )
      : draftData?.treatment_approaches?.filter(
        (i: any) => i !== undefined && i !== null && i.trim() !== ""
      );
    const treatmentArr = [...listTreatments];
    unique = treatmentArr.filter((a, b) => treatmentArr.indexOf(a) === b);
    return unique;
  };
  const saveDraft = () => {
    setDraftLoader(true);
    const formValues = getFieldsValue();
    const { ...rest } = formValues;
    let unique: string[];

    if (formValues && formValues.education_background) {
      const listEdus = formValues.education_background.filter(
        (i: any) => i !== undefined && i.trim() !== ""
      );
      const eduArr = [formValues.education, ...listEdus];
      unique = eduArr.filter((a, b) => eduArr.indexOf(a) === b);
    } else {
      unique = [formValues.education];
    }
    const payload = {
      ...rest,
      working_hours:
        moment(formValues.start_time).format("h:mm A") +
        " - " +
        moment(formValues.end_time).format("h:mm A"),
      authId: props.authenticationId,
      pictures: picturesList.slice(-2),
      education_background: unique,
      treatment_approaches: formValues.treatment_approaches
        ? [...formValues.treatment_approaches]
        : [],
      email_public: formValues.email_public ? formValues.email_public : false,
    };

    setItemToLocalStorage("formData", payload);
    setTimeout(() => {
      setDraftLoader(false);
    }, 1000);
  };

  const hours = props.userData
    ? props.userData &&
    props.userData.working_hours &&
    props.userData.working_hours.split("-")
    : draftData && draftData.working_hours !== undefined
      ? draftData && draftData.working_hours && draftData.working_hours.split("-")
      : null;

  const start_hour =
    (hours && hours[0] === "Invalid date") ||
      (hours && hours[1] === "Invalid date")
      ? ""
      : hours && hours[0] && moment(hours[0].trim(), "h:mm A").format("h:mm A");
  const end_hour =
    (hours && hours[0] === "Invalid date") ||
      (hours && hours[1] === "Invalid date")
      ? ""
      : hours && hours[1] && moment(hours[1].trim(), "h:mm A").format("h:mm A");

  return (
    <Wrapper>
      <div className="content">
        <Form
          form={form}
          hideRequiredMark
          onFinishFailed={onFinishFailed}
          onFinish={(values) => handleSubmit("/users", values)}
          initialValues={
            props.userData
              ? {
                first_name: props.userData && props.userData.first_name,
                last_name: props.userData && props.userData.last_name,
                business_name: props.userData && props.userData.business_name,
                email: props.userData && props.userData.email,
                confirm: props.userData && props.userData.email,
                exp: props.userData && props.userData.exp,
                avatar: (props.userData && props.userData.avatar) || avatar,
                working_hours:
                  props.userData && props.userData.working_hours
                    ? [
                      moment(start_hour, "h:mm A"),
                      moment(end_hour, "h:mm A"),
                    ]
                    : "",
                start_time:
                  props.userData && props.userData.working_hours
                    ? moment(start_hour, "h:mm A")
                    : "",
                end_time:
                  props.userData && props.userData.working_hours
                    ? moment(end_hour, "h:mm A")
                    : "",

                address: props?.userData?.address,
                address2: props?.userData?.address2 ?? '',
                site: props.userData && props.userData.site,
                bio: props.userData && props.userData.bio,
                prof_statement:
                  props.userData && props.userData.prof_statement,
                specialities: props.userData && props.userData.specialities,
                education:
                  props.userData &&
                    props.userData.education_background &&
                    props.userData.education_background.length
                    ? props.userData.education_background[0]
                    : "",
                education_background:
                  props.userData &&
                  props.userData.education_background &&
                  handleEdu(),
                licensure: props?.userData?.licensure ?? '',
                college: props?.userData?.college ?? '',
                work_place: (props?.userData && props?.userData?.work_place) ?? [],
                phone: props.userData && props.userData.phone,
                working_days: (props.userData && props.userData.working_days) ?? [],
                pictures: props.userData && props.userData.pictures,
                city: props.userData && props.userData.city,
                country:
                  (props.userData && props.userData.country) || "Canada",
                province:
                  // (props.userData && props.userData.province) || "Ontario",
                  props.userData && props.userData.province,

                treatment_approaches:
                  props.userData &&
                    props.userData.treatment_approaches &&
                    typeof props.userData.treatment_approaches === "string"
                    ? [props.userData.treatment_approaches]
                    : props.userData && handleTreatments(),
                id: props.userData && props.userData.id,
                authId: props.userData && props.userData.authId,
                prof_title: props.userData && props.userData.prof_title,
                postal_code: props.userData && props.userData.postal_code,
                terms_accepted:
                  (props.userData && props.userData.terms_accepted) || false,
                disclaimer_checked:
                  (props.userData && props.userData.disclaimer_checked) || false,
                dr_needed: props.userData && props.userData.dr_needed,
                insurance: props?.userData?.insurance ?? '',
                major_insurance: props?.userData?.major_insurance ?? '',
                email_public: props.userData && props.userData.email_public,
                languages: props.userData && props.userData.languages,
                approved:
                  (props.userData && props.userData.approved) || false,
                lat: props.userData && props.userData.lat,
                lng: props.userData && props.userData.lng,
                findUs: props.userData && props.userData.findUs,
                // findUsOther: props?.userData?.findUsOther?? '',
                // findUs: props?.userData?.findUs ?? '',
                findUsOther: props?.userData?.findUsOther ?? '',
                services: props?.userData?.services ?? [],
                otherServices: props?.userData?.otherServices ?? [],
              }
              : {
                first_name: draftData && draftData.first_name,
                last_name: draftData && draftData.last_name,
                business_name: draftData && draftData.business_name,
                email: draftData && draftData.email,
                confirm: draftData && draftData.email,
                exp: draftData && draftData.exp,
                avatar: (draftData && draftData.avatar) || avatar,
                working_hours:
                  draftData !== null && draftData !== ""
                    ? draftData && draftData.working_hours
                      ? [
                        moment(start_hour, "h:mm A"),
                        moment(end_hour, "h:mm A"),
                      ]
                      : ""
                    : "",
                start_time:
                  draftData !== null && draftData !== ""
                    ? draftData && draftData.start_time
                      ? moment(start_hour, "h:mm A")
                      : ""
                    : "",
                end_time:
                  draftData !== null && draftData !== ""
                    ? draftData && draftData.end_time
                      ? moment(end_hour, "h:mm A")
                      : ""
                    : "",

                address: draftData && draftData.address,
                address2: draftData?.address2 ?? '',
                site: draftData && draftData.site,
                bio: draftData && draftData.bio,
                prof_statement: draftData && draftData.prof_statement,
                specialities:
                  draftData !== null && draftData !== ""
                    ? draftData && draftData.specialities
                    : [],
                languages:
                  draftData !== null && draftData !== ""
                    ? draftData && draftData.languages
                    : [],
                // education: "",
                education:
                  draftData !== null && draftData !== ""
                    ? draftData &&
                      draftData.education_background &&
                      draftData.education_background.length
                      ? draftData.education_background[0]
                      : ""
                    : "",
                // education_background: [],
                education_background:
                  draftData !== null && draftData !== ""
                    ? draftData &&
                    draftData.education_background &&
                    handleEdu()
                    : [],
                licensure: draftData?.licensure ?? '',
                college: draftData?.college ?? '',
                work_place: (draftData && draftData.work_place) ?? [],
                phone: draftData && draftData.phone,
                working_days: (draftData && draftData.working_days) ?? [],
                pictures: draftData && draftData.pictures,
                city: draftData && draftData.city,
                country: (draftData && draftData.country) || "Canada",
                // province: (draftData && draftData.province) || "Ontario",
                province: draftData && draftData.province,
                // treatment_approaches: [],
                treatment_approaches:
                  draftData !== null && draftData !== ""
                    ? draftData &&
                      draftData.treatment_approaches &&
                      typeof draftData.treatment_approaches === "string"
                      ? [draftData.treatment_approaches]
                      : draftData && handleTreatments()
                    : [],
                id: draftData && draftData.id,
                authId: draftData && draftData.authId,
                prof_title: draftData && draftData.prof_title,
                postal_code: draftData && draftData.postal_code,
                terms_accepted:
                  (draftData && draftData.terms_accepted) || false,
                disclaimer_checked:
                  (draftData?.disclaimer_checked) || false,
                dr_needed: draftData && draftData.dr_needed,
                insurance: draftData?.insurance ?? '',
                major_insurance: draftData?.major_insurance ?? '',
                email_public: draftData && draftData.email_public,
                approved: (draftData && draftData.approved) || false,
                findUs: draftData && draftData.findUs,
                // findUsOther: draftData && draftData.findUsOther,
                // findUs: props?.userData?.findUs ?? '',
                findUsOther: props?.userData?.findUsOther ?? '',
                services: draftData?.services ?? [],
                otherServices: draftData?.otherServices ?? [],

              }
          }
        >
          {/* <Button onClick={updateLatLng}>Update Lat Lng</Button> */}
          <fieldset>
            <legend>Personal Profile</legend>
            <PersonalProfile
              cities={cities}
              form={form}
              addCity={props.addCity}

              draftLoader={draftLoader}
              flag={props.userData ? true : false}
              languages={languages}
            />
          </fieldset>
          <fieldset>
            <legend>Educational Information</legend>
            <EducationalInfo
              form={form}

              draftLoader={draftLoader}
              flag={props.userData ? true : false}
            />
          </fieldset>
          <fieldset>
            <legend>Professional Information</legend>
            <Row gutter={[16, 10]}>
              <Col span={24}>
                <h4>Professional Title</h4>
                <p>
                  If you don’t see the Professional title you are looking for, please contact us at <em>info@ehkidshealth.com</em>
                </p>
                <Form.Item
                  name="prof_title"
                  rules={[
                    {
                      required: true,
                      message: "Please select your Professional title",
                    },
                  ]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Select
                    getPopupContainer={(trigger) => trigger.parentNode}
                    style={{ width: "100%", maxWidth: "760px" }}
                    size="large"
                    placeholder="Occupational Therapist, Pediatrician, Psychotherapist"
                    showSearch
                    className="selector"
                    dropdownRender={(menu) => (
                      <div>
                        {menu}
                      </div>
                    )}
                  >
                    {professions &&
                      professions.map((item: any, index: number) => (
                        <Option value={item.type} key={`${item.id} ${index}`}>
                          {item.type}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="site"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Website",
                    },
                    {
                      pattern: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
                      message: "Must be valid Url. http://www.google.com",
                    },
                  ]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Input size="large" placeholder="Website" maxLength={250} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={10} md={10} xl={10} xxl={10}>
                <Form.Item
                  name="exp"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Experience in years",
                    },
                    () => ({
                      validator(rule, value) {
                        if (!value || value >= 1) {
                          return Promise.resolve();
                        }
                        return Promise.reject("Value must be greater than 1!");
                      },
                    }),
                  ]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Input
                    size="large"
                    placeholder="Experience in years"
                    type="number"
                    min={1}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={7} md={7} xl={7} xxl={7}>
                <Form.Item
                  name="start_time"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your working Hours",
                    },
                  ]}
                >
                  <TimePicker
                    getPopupContainer={(trigger) => trigger}
                    use12Hours
                    format="h:mm A"
                    minuteStep={30}
                    size="large"
                    style={{ width: "100%", maxHeight: "40px" }}
                    placeholder="Working hours Start time"
                    renderExtraFooter={null}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={7} md={7} xl={7} xxl={7}>
                <Form.Item
                  name="end_time"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your working Hours",
                    },
                  ]}
                >
                  <TimePicker
                    getPopupContainer={(trigger) => trigger}
                    use12Hours
                    minuteStep={30}
                    format="h:mm A"
                    size="large"
                    style={{ width: "100%", maxHeight: "40px" }}
                    placeholder="Working hours End time"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <h4>Working Days</h4>
                <Form.Item
                  name="working_days"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your working Hours",
                    },
                  ]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Checkbox.Group style={{ width: "100%", display: "flex" }}>
                    <div style={{ flexGrow: 1 }}>
                      <Checkbox value="Sunday">Sunday</Checkbox>
                      <br />
                      <Checkbox value="Monday">Monday</Checkbox>
                      <br />
                      <Checkbox value="Tuesday">Tuesday</Checkbox>
                      <br />
                      <Checkbox value="Wednesday">Wednesday</Checkbox>
                    </div>
                    <div style={{ flexGrow: 2 }}>
                      <Checkbox value="Thursday">Thursday</Checkbox>
                      <br />
                      <Checkbox value="Friday">Friday</Checkbox>
                      <br />
                      <Checkbox value="Saturday">Saturday</Checkbox>
                      <br />
                    </div>
                  </Checkbox.Group>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="prof_statement"
                  rules={[
                    {
                      required: true,
                      message: "Please enter professional statement",
                    },
                  ]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Please explain in more detail about your education and career."
                  // maxLength={500}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <h4>Diagnosis/Concerns</h4>
                <p>
                  If you don’t see the Diagnosis you are looking for, please contact us at <em>info@ehkidshealth.com</em>
                </p>
                <Form.Item
                  name="specialities"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Diagnosis/Concerns",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (value) {
                          if (value.length > 12) {
                            return Promise.reject(
                              "No more than 12 Diagnosis/Concernss"
                            );
                          } else if (value.length <= 12) {
                            return Promise.resolve();
                          }
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Select
                    size="large"
                    id="specialities-dropdown"
                    getPopupContainer={(trigger) => trigger.parentNode}
                    mode="multiple"
                    style={{ width: "100%", maxWidth: "760px" }}
                    placeholder="ADHD, Family Mediation, Cerebral Palsy"
                    tokenSeparators={[","]}
                    showArrow
                  >
                    {diagnoses &&
                      diagnoses.map((item, index) => (
                        <Option value={item.name} key={`${item.id} ${index}`}>
                          {item.name}
                        </Option>

                      ))}

                  </Select>
                </Form.Item>
              </Col>
              <Col span={24} >
                <h4>About Your Service Locations?*</h4>
                <p>Where are your services offered?</p>
                <Form.Item name='otherServices' style={{ display: 'none' }} >
                  <Input
                    size="large"
                    value={locations}
                  />
                </Form.Item>
                <Form.Item
                  className='mb-10'
                  name="services"
                  rules={[
                    {
                      required: true,
                      message: "Please add service location",
                    },
                  ]}
                  validateTrigger={["onChange", "onBlur"]}>
                  <Checkbox.Group style={{ width: "100%", display: "flex", flexDirection: 'column' }}>
                    <Row gutter={[20, 20]}>
                      {servicesCheck.map((item: any) => {
                        return <Col xs={8} key={item.label}>
                          <Checkbox
                            value={item.value}
                            onClick={() => onChangeServices(item)}>{item.label}</Checkbox>
                          <p>{item.description}</p>
                        </Col>
                      })}
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
                <ServicePopUp
                  addLocation={addLocation}
                  handleClose={handlePrivacyTile}
                  form={form}
                  cities={cities}
                  open={openPopup}
                  addCity={props.addCity} />
                <div className="badge">
                  {specificService ?
                    locations && locations.map((location: string, idx: any) => (
                      <span className='badge-item' key={idx}>
                        {location}
                        <span style={{ cursor: 'pointer' }}
                          onClick={() => removeLocation(idx)} >❌</span>
                      </span>
                    ))
                    : ""
                  }
                </div>
                {specificService
                  ? <Button onClick={showPopup}
                    className="ant-btn-primary"
                    style={{ borderRadius: "5px" }} >Add Location of Service
          </Button>
                  : <Button disabled> Add Location of Service </Button>}
              </Col>
              <Col xs={24} sm={12}>
                <h4> Doctor Referral Needed?</h4>
                <Form.Item
                  name="dr_needed"
                  rules={[
                    {
                      required: true,
                      message: "Doctor referral needed?",
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value="true">Yes</Radio>
                    <br />

                    <Radio value="false">No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>

              <Col span={24}>
                <h4>Treatment Approaches (Optional)</h4>
                <Form.List name="treatment_approaches">
                  {(fields, { add, remove }) => {
                    return (
                      <div>
                        {fields.map((field, index) => (
                          <Form.Item required={false} key={field.key}>
                            <Form.Item
                              {...field}
                              validateTrigger={["onChange", "onBlur"]}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Please enter your treatment approach or delete this field",
                                },
                              ]}
                              noStyle
                            >
                              <Input
                                size="large"
                                placeholder="Treatment Approaches"
                                onChange={(e) => {
                                  e.persist();
                                  setTreatmentInputValue(e.target.value);
                                }}
                                style={{ width: "92%" }}
                              // maxLength={100}
                              />
                            </Form.Item>
                            {fields.length > 0 ? (
                              <CloseCircleOutlined
                                className="dynamic-delete-button"
                                onClick={() => {
                                  remove(field.name);
                                }}
                              />
                            ) : null}
                          </Form.Item>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => {
                              add();
                              setTreatmentInputValue("");
                            }}
                            className="add-btn"
                          >
                            Add Another
                          </Button>
                        </Form.Item>
                      </div>
                    );
                  }}
                </Form.List>
              </Col>

              <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
                <h4> Do you accept insurance?</h4>
                <Form.Item
                  name="insurance"
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Radio.Group>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
                <h4> Do you accept most major insurance plans? </h4>
                <Form.Item
                  name="major_insurance"
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Radio.Group>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={24}>
                <h4 style={{ marginBottom: 20 }}>
                  Office Pictures - Select 2 pictures
                </h4>
                <p style={{ marginTop: "-21px" }}>
                  Suggested images include the outside of your office, inside of
                  your office, and/or company logo.
                </p>
                <Row>
                  <Form.Item
                    name="pictures"
                    rules={[
                      {
                        required: true,
                        message: "Office pictures required!",
                      },
                      () => ({
                        validator(rule, value) {
                          if (
                            fileList &&
                            fileList.length === 1 &&
                            fileList.length < 2
                          ) {
                            return Promise.reject(
                              "Please add your second office picture!"
                            );
                          }

                          return Promise.resolve();
                        },
                      }),
                    ]}
                  // validateTrigger={[ "onBlur"]}
                  >
                    <Col span={24}>
                      <Upload
                        listType="picture"
                        fileList={fileList}
                        onChange={(e) => {
                          firstImageSelectedHandler(e);
                        }}
                        onRemove={(e) => handleRemove(e)}
                        beforeUpload={() => false}
                        {...props}
                        style={{ margin: "20px 0" }}
                      >
                        <Button>Click to Upload</Button>
                      </Upload>
                    </Col>
                  </Form.Item>
                </Row>
              </Col>
              <Col span={24}>
                <h4>How did you find us?</h4>
              </Col>
              <Col xs={24} sm={12} md={12} xl={12} xxl={12}>
                <Form.Item
                  name="findUs"
                  rules={[
                    {
                      required: true,
                      message: "How did you find us?",
                    },
                  ]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Select
                    getPopupContainer={(trigger) => trigger.parentNode}
                    style={{ width: "100%" }}
                    placeholder="How did you find us?"
                    size="large"
                    onChange={(e) => {
                      return setOtherFieldValue(e);
                    }}
                    dropdownRender={(menu) => (
                      <div>
                        {menu}
                        {/* <Divider style={{ margin: "4px 0" }} />
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "nowrap",
                            padding: 8,
                          }}
                        >
                          <Input
                            style={{ flex: "auto" }}
                            value={name}
                            onChange={onNameChange}
                            maxLength={50}
                          />
                          <a
                            style={{
                              flex: "none",
                              padding: "8px",
                              display: "block",
                              cursor: "pointer",
                            }}
                            onClick={addItem}
                          >
                            <PlusOutlined /> Add new City
                          </a>
                        </div> */}
                      </div>
                    )}
                  >
                    {howDidYouFind &&
                      howDidYouFind.map((item: any, index: number) => (
                        <Option value={item} key={`${item} ${index}`}>
                          {item}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} xl={12} xxl={12}>
                <Form.Item
                  name="findUsOther"
                  style={{ display: otherField ? "none" : "block" }}
                  rules={[
                    {
                      required: otherField ? false : true,
                      message: "How did you find us?",
                    },
                  ]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Input
                    size="large"
                    placeholder="Other"
                    maxLength={250}
                    disabled={otherField}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="terms_accepted"
                  className="margin-bottom-0"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject("Please accept the terms and conditions"),
                    },
                  ]}
                >
                  <Checkbox>
                    Accept{" "}
                    <a href="/terms-of-use" target="_blank">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy-policy" target="_blank">
                      {" "}
                      Privacy Policy
                    </a>
                  </Checkbox>
                </Form.Item>

                <Form.Item
                  name="disclaimer_checked"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject("Please accept the statement"),
                    },
                  ]}
                >
                  <Checkbox>
                    <span> I certify that all information I have entered into my Everyday Heroes Kids profile
                    including details on my education, qualifications, contact information and career to be
                    true and I will only connect with clients/patients in regions and in the Diagnosis/Concerns
                    that I am certified to practice. I have joined Everyday Heroes Kids for the sole purpose of
                     connecting with families as an accredited professional.</span>
                  </Checkbox>
                </Form.Item>
              </Col>
              <Space size={"small"}>
                {props.userData ? null : (
                  <Col sm={12} md={12} xl={4} xxl={4}>
                    <Form.Item>
                      <Button
                        className="btn-submit_draft"
                        type="primary"
                        htmlType="button"
                        size="large"
                        onClick={saveDraft}
                        loading={draftLoader}
                      >
                        Save Draft
                      </Button>
                    </Form.Item>
                  </Col>
                )}
                <Col sm={12} md={12} xl={4} xxl={4}>
                  <Form.Item>
                    <Button
                      className="btn-submit"
                      type="primary"
                      htmlType="submit"
                      size="large"
                      loading={loader}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Space>
            </Row>
          </fieldset>
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
  ...state.userList,
});
const mapDispatchToProps = (dispatch: any) => ({
  addCity: (cityList: any) => dispatch(addCityList(cityList)),
  addProfession: (profList: any) => dispatch(addDisorderList(profList)),
  addSpecialities: (specialitiesList: any) =>
    dispatch(addDiagnoses(specialitiesList)),
  getUser: (id: string) => dispatch(getUserFromId(id)),
  addUser: (user: any) => dispatch(setLoginUser(user)),
  addLanguages: (langList: any) => dispatch(addLanguages(langList)),
});
export default compose<ComponentProps, any>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ProfileForm);
