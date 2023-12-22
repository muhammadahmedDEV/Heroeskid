// MAIN MODULES
import React, { useEffect, useState } from "react";
import { compose } from "recompose";
import { withRouter, RouteComponentProps } from "react-router";
import { connect, useDispatch } from "react-redux";
import { Col, Form, Row, Select, Divider } from "antd";

// COMPONENTS
import Autosuggest from "../../components/Autosuggest";

// STYLES
// import "./styles.scss";
import './styles.scss'

// ACTIONS
import { addFilterList, openFilterBar, deleteCurrent } from "../../actions";

// ICON
import { State } from "../../reducers";
import reset from "../../assets/icons/ehk-clearbutton.png";
import locIcon from "../../assets/icons/location.png";
import pracIcon from "../../assets/icons/practice.png";
import langIcon from "../../assets/icons/language.png";
import specIcon from "../../assets/icons/specialist.png";
import { getItemToLocalStorage, setItemToLocalStorage } from "../../servises/localStorage";
import { base_URL, getFbData } from "../../servises/firebase";

// TYPES

interface ComponentProps extends RouteComponentProps {
  addFilterList: (a: any) => void;
  deleteCurrent: (a: string) => void;
  openFilterBar: (a: string) => void;
  diagnoses: any;
  disorderList: any;
  list: any;
  languages: any;
  cityList: any;
  orgList: any;

}
interface IUser {
  option: string;
  group: string;
}
const { Option } = Select;
const bc: string = "search-page-filter";

const SearchPageFilter = (props: ComponentProps) => {
  const [form] = Form.useForm();
  const { getFieldValue } = form;
  const [val, setVal] = useState("");
  const [languageList, setLanguageList] = useState([]);
  const [specialitiesList, setSpecialitiesList] = useState([]);
  const [diagnosesList, setDiagnosesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const dispatch = useDispatch();
  const searchResult = (): void => {
    const cityFilter = getFieldValue('cities')
    const profFilter = getFieldValue('prof_title')
    const specFilter = getFieldValue('speciality')
    const langFilter = getFieldValue('languages')
    // props.history.push("/search");
    const profType = [...props.disorderList];
    const specialty = [...props.diagnoses];
    const languages = [...props.languages];
    const name = [...props.list];
    const orgName = [...props.orgList];
    const cities = [...props.cityList];
    const prof = profType.find((item) => {
      return item.type.trim().toUpperCase() === val.trim().toUpperCase();
    });
    const spec = specialty.find((item) => {
      return item.name.trim().toUpperCase() === val.trim().toUpperCase();
    });
    const lang = languages.find((item) => {
      return item.name.trim().toUpperCase() === val.trim().toUpperCase();
    });
    const city = cities.find((item) => {
      return item.name.trim().toUpperCase() === val.trim().toUpperCase();
    });
    const firstName = name.find((item) => {
      return item.first_name.trim().toUpperCase() === val.trim().toUpperCase();
    });
    const lastName = name.find((item) => {
      return item.last_name.trim().toUpperCase() === val.trim().toUpperCase();
    });
    const fullName = name.find((item) => {
      const fname: any = `${item.first_name
        .trim()
        .toUpperCase()} ${item.last_name.trim().toUpperCase()}`;
      return fname === val.trim().toUpperCase();
    });
    const organizationName = orgName?.find((item) => {
      return item?.name?.trim().toUpperCase() === val.trim().toUpperCase();
    });

    if (prof) {
      const res: any = {
        group: "Profession Type",
        option: prof.type,
      };
      props.addFilterList(res);
      if (prof?.treats?.length) {
        prof?.treats?.forEach((elem: any) => {
          const result = { group: 'Specialty', option: elem.name }
          props.addFilterList(result);
        })
      }
    }
    if (profFilter) {
      const res: any = {
        group: "Profession Type",
        option: profFilter,
      };
      props.addFilterList(res);
      if (prof?.treats?.length) {
        prof?.treats?.forEach((elem: any) => {
          const result = { group: 'Specialty', option: elem.name }
          props.addFilterList(result);
        })
      }
    }
    if (spec) {
      const res: any = { group: "Specialty", option: spec.name };
      props.addFilterList(res);
    }
    if (specFilter) {
      const res: any = { group: "Specialty", option: specFilter };
      props.addFilterList(res);
    }
    if (lang) {
      const res: any = { group: "Languages", option: lang.name };
      props.addFilterList(res);
    }
    if (langFilter) {
      const res: any = { group: "Languages", option: langFilter };
      props.addFilterList(res);
    }
    if (city) {
      const res: any = { group: "City", option: city.name };
      props.addFilterList(res);
    }
    if (cityFilter) {
      const res: any = { group: "City", option: cityFilter };
      props.addFilterList(res);
    }
    if (firstName) {
      const res: any = {
        group: "First Name",
        // option: `${firstName.first_name} ${firstName.last_name}`,
        option: `${firstName.first_name}`,
      };
      props.addFilterList(res);
    }
    if (lastName) {
      const res: any = {
        group: "Last Name",
        option: `${lastName.last_name}`,
        // option: `${lastName.first_name} ${lastName.last_name}`,
      };
      props.addFilterList(res);
    }
    if (fullName) {
      const res: any = {
        group: "Full Name",
        option: `${fullName.first_name} ${fullName.last_name}`,
      };
      props.addFilterList(res);
    }
    if (organizationName) {
      const res: any = {
        group: "Org Name",
        option: `${organizationName.name}`,
      };
      props.addFilterList(res);
    }
    if (
      prof === undefined &&
      spec === undefined &&
      firstName === undefined &&
      lastName === undefined &&
      fullName === undefined &&
      city === undefined &&
      lang === undefined &&
      cityFilter === undefined &&
      profFilter === undefined &&
      specFilter === undefined &&
      langFilter === undefined &&
      organizationName === undefined
    ) {
      const res: any = { group: "No Value", option: val };
      props.addFilterList(res);
    }
  };
  useEffect(() => {
    const localLang = getItemToLocalStorage("langComplete");
    const localSpec = getItemToLocalStorage("specComplete");
    const localDiag = getItemToLocalStorage("diagComplete");
    const localCity = getItemToLocalStorage("cities");
    if (localLang && localSpec && localDiag) {
      setLanguageList(localLang);
      setSpecialitiesList(localSpec);
      setDiagnosesList(localDiag);
    }
    else {
       fetch(`${base_URL}/GetSuggestionList`) // complete list of spec, lang, diag
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
            setLanguageList(sortedLanguages);
            setItemToLocalStorage("langComplete", sortedLanguages);

            // diag => data[1]
            const sortedDiagnoses =
              data[1] &&
              data[1].sort(function (a: any, b: any) {
                const textA = a.name && a.name.toUpperCase();
                const textB = b.name && b.name.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
              });
            // triggerDiagnoses(sortedDiagnoses);
            setDiagnosesList(sortedDiagnoses);
            setItemToLocalStorage("diagComplete", sortedDiagnoses);

            // specialities  => data[2]
            const sortedSpecialities =
              data[2] &&
              data[2].sort(function (a: any, b: any) {
                const textA = a.type && a.type.toUpperCase();
                const textB = b.type && b.type.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
              });
            // triggerDisorder(sortedSpecialities);
            setSpecialitiesList(sortedSpecialities);
            setItemToLocalStorage("specComplete", sortedSpecialities);
          }
        })
    }
    if (localCity) {
      setCitiesList(localCity);
    }
    else {
      getFbData("cities")
        .then((querySnapshot) => {
          const cities: any = [];
          querySnapshot.forEach((doc: any) => {
            cities.push(doc.data());
          });

          const sortedCities =
            cities &&
            cities.sort(function (a: any, b: any) {
              const textA = a.name && a.name.toUpperCase();
              const textB = b.name && b.name.toUpperCase();
              return textA < textB ? -1 : textA > textB ? 1 : 0;
            });
          setCitiesList(sortedCities);
          setItemToLocalStorage("cities", sortedCities);
        })
        .catch((e) => {
          // Error stored in  state
          console.log('error', e)
        });
    }
  }, [])
  const clearFilter = (): void => {
    dispatch(deleteCurrent("all"));
    props.history.push("/search");
  };
  const addFilter = (option: string, group: string): any => {
    if (group === "Diagnosis/Concerns") {
      const newFilter: IUser = { option, group: "Specialty" };
      props.addFilterList(newFilter)
    } else {
      const newFilter: IUser = { option, group };
      props.addFilterList(newFilter)
    }
  };
  return (
    <div className={bc}>
      <Form form={form} onFinish={searchResult}>
        {/* <Row gutter={16} className={`${bc}__top-container`}>
                <Col sm={22} md={22} xl={22} xxl={22} >
                 <Form.Item className={`${bc}__top-container__input`} >
                   <Autosuggest isChange={setVal}/>
                 </Form.Item>
                </Col>
                <Col sm={2} md={2} xl={2} xxl={2}>
                 <Form.Item>
                   <button
                     type='submit'
                     onClick={searchResult}
                     className={`${bc}__button`}
                   >
                   </button>
                 </Form.Item>
                </Col>
            </Row> */}
        <Row gutter={8} className={`${bc}__bottom-container`}>
          <Col sm={24} md={24} xl={24} xxl={24} className={`${bc}__text`}>Filter by:</Col>
          <Col sm={24} md={24} xl={24} xxl={24}>
            <Form.Item name='cities'>
              <span>Locations:</span>
              <Row>
                <Col className="back-white" sm={4} md={4} xl={4} xxl={4}><img className="icon-size" src={locIcon} alt=""></img></Col>
                <Col sm={20} md={20} xl={20} xxl={20}>
                  <Select
                    placeholder='Location'
                    onSelect={(e:any, data:any) => {
                      return addFilter(data.value, "City");
                    }}
                    getPopupContainer={(trigger) => trigger.parentNode}
                    style={{
                      width: "100%",
                      // minHeight: "270px",
                      // maxWidth: "770px",
                    }}
                    size="large"
                    showSearch
                    dropdownRender={(menu) => (
                      <div className="dropdown">
                        {menu}
                        <Divider style={{ margin: "8px 0" }} />
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "nowrap",
                            padding: 8,
                            maxWidth: "770px",
                            width: "100%",
                          }}
                        ></div>
                      </div>
                    )}

                  >
                    {citiesList && citiesList.map((item: any, index: any) => (
                      <Option value={item.name} key={`${item.id} ${index}`}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Col sm={24} md={24} xl={24} xxl={24}>

            <Form.Item name='speciality'>
              <span>Diagnosis/Concerns:</span>
              <Row>
                <Col className="back-white" sm={4} md={4} xl={4} xxl={4}><img className="icon-size" src={pracIcon} alt="" ></img></Col>
                <Col sm={20} md={20} xl={20} xxl={20}>
                  <Select
                    placeholder='Diagnosis/Concerns'
                    onSelect={(e:any, data:any) => {
                      return addFilter(data.value, "Diagnosis/Concerns");
                    }}
                    getPopupContainer={(trigger) => trigger.parentNode}
                    style={{
                      width: "100%",
                      // minHeight: "270px",
                      // maxWidth: "770px",
                    }}
                    size="large"
                    showSearch
                    dropdownRender={(menu) => (
                      <div className="dropdown">
                        {menu}
                        <Divider style={{ margin: "8px 0" }} />
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "nowrap",
                            padding: 8,
                            maxWidth: "770px",
                            width: "100%",
                          }}
                        ></div>
                      </div>
                    )}
                  >
                    {diagnosesList && diagnosesList.map((item: any, index: any) => (
                      <Option value={item.name} key={`${item.id} ${index}`}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Col sm={24} md={24} xl={24} xxl={24}>
            <Form.Item name='prof_title'>
              <span>Specialist:</span>
              <Row>
                <Col className="back-white" sm={4} md={4} xl={4} xxl={4}><img className="icon-size" src={specIcon} alt="" ></img></Col>
                <Col sm={20} md={20} xl={20} xxl={20}>
                  <Select
                    placeholder='Profession'
                    onSelect={(e:any, data:any) => {
                      return addFilter(data.value, "Profession Type");
                    }}

                    getPopupContainer={(trigger) => trigger.parentNode}
                    style={{
                      width: "100%",
                      // minHeight: "270px",
                      // maxWidth: "770px",
                    }}
                    size="large"
                    showSearch
                    dropdownRender={(menu) => (
                      <div className="dropdown">
                        {menu}
                        <Divider style={{ margin: "8px 0" }} />
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "nowrap",
                            padding: 8,
                            maxWidth: "770px",
                            width: "100%",
                          }}
                        ></div>
                      </div>
                    )}
                  >
                    {specialitiesList && specialitiesList.map((item: any, index: any) => (
                      <Option value={item.type} key={`${item.id} ${index}`}>
                        {item.type}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Col sm={24} md={24} xl={24} xxl={24}>
            <Form.Item name='languages'>
              <span>Language:</span>
              <Row>
                <Col className="back-white" sm={4} md={4} xl={4} xxl={4}><img className="icon-size" src={langIcon} alt="" ></img></Col>
                <Col sm={20} md={20} xl={20} xxl={20}>
                  <Select
                    placeholder='Languages'
                    onSelect={(e:any, data:any) => {
                      return addFilter(data.value, "Languages");
                    }}

                    getPopupContainer={(trigger) => trigger.parentNode}
                    style={{
                      width: "100%",
                      // minHeight: "270px",
                      // maxWidth: "770px",
                    }}
                    size="large"
                    showSearch
                    dropdownRender={(menu) => (
                      <div className="dropdown">
                        {menu}
                        <Divider style={{ margin: "8px 0" }} />
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "nowrap",
                            padding: 8,
                            maxWidth: "770px",
                            width: "100%",
                          }}
                        ></div>
                      </div>
                    )}
                  >
                    {languageList && languageList.map((item: any, index: any) => (
                      <Option value={item.name} key={`${item.id} ${index}`}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Col sm={24} md={24} xl={24} xxl={24}>
            <Form.Item>
              <div
                onClick={clearFilter}
                className={`reset-padding`}
              >
                <img src={reset} alt="" ></img>
              </div>
            </Form.Item>
          </Col>

        </Row>
      </Form>
    </div>
  );
};

SearchPageFilter.displayName = "Search";
const mapStateToProps = (state: State) => ({
  ...state.userList,
  ...state.orgList,
  ...state.app,
  ...state.app.termsAccepted,
});
const mapDispatchToProps = { addFilterList, deleteCurrent, openFilterBar };

// export default compose<ComponentProps, {}>(withRouter, connect(null, mapDispatchToProps))(Search)
export default compose<ComponentProps, {}>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SearchPageFilter);
