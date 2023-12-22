// MAIN MODULES
import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
// COMPONENTS
import List from "../../components/List";

// STYLES
import "./styles.scss";

// ICON
import close from "../../assets/icons/white_close.png";
import reset from "../../assets/icons/reset.png";

// ACTIONS
import { deleteCurrent } from "../../actions";

// TYPES
import { State } from "../../reducers";

interface ComponentProps {
  onChange: () => void;
  cityList: any;
  list: any;
  disorderList: any;
  languages: any;
  diagnoses: any;
}

const bc: string = "advanced-filter";

const gender: any = {
  group: "Gender",
  options: ["Male", "Female"],
};
// TO DO ADD DISTANCE FOR NEXT MVP
// const distance: any = {
//   group: 'Distance ',
//   options: ['Less than 10km',
// 'Less than 20km','Less than 30km',
// 'Less than 40km','Less than 50km',
// 'Less than 60km','Less than 70km',
// 'Less than 80km',
// 'Less than 90km',
// 'Over 90km']
// }

const objectCreate = (name: string, condition: string, obj: any): any => {
  const arrName: string[] = [];
  const currObj = {};
  obj.forEach((item: any) => {
    const a: string = item[`${condition}`];
    arrName.push(a);
  });
  currObj["group"] = `${name}`;
  currObj["options"] = arrName;
  return currObj;
};
const AdvancedFilter = ({
  onChange,
  cityList,
  list,
  disorderList,
  languages,
  diagnoses,
}: ComponentProps) => {
  const [isOpen, setOpenView] = useState("");
  const [filterList, setFilter] = useState([]);
  const dispatch = useDispatch();
  const checkGroup = (group: string): void => {
    if (group === isOpen) {
      setOpenView("");
      return;
    }
    setOpenView(group);
  };
  const clearFilter = (): void => {
    dispatch(deleteCurrent("all"));
  };
  useEffect(() => {
    clearFilter()
  }, [])
  const sortedDiagnoses = diagnoses.sort(function(a: any, b: any) {
    const textA = a.name && a.name.toUpperCase();
    const textB = b.name && b.name.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  const sortedCities = cityList.sort(function(a: any, b: any) {
    const textA = a.name && a.name.toUpperCase();
    const textB = b.name && b.name.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  const sortedProfessions = disorderList.sort(function(a: any, b: any) {
    const textA = a.type && a.type.toUpperCase();
    const textB = b.type && b.type.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });

  const sortedLanguages = languages.sort(function(a: any, b: any) {
    const textA = a.name && a.name.toUpperCase();
    const textB = b.name && b.name.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  useEffect(() => {
    const city: any = objectCreate("City", "name", sortedCities);
    const lang: any = objectCreate("Languages", "name", sortedLanguages);
    const disorder: any = objectCreate(
      "Diagnosis/Concerns",
      "name",
      sortedDiagnoses
    );
    const proffType: any = objectCreate(
      "Profession Type",
      "type",
      sortedProfessions
    );
    const fullFilterList: any = [city, disorder, proffType, lang];
    setFilter(fullFilterList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);
  return (
    <div className={bc}>
      <div className={`${bc}__head`}>
        <img
          className={`${bc}__head__close`}
          src={close}
          onClick={onChange}
          alt=""
        />
        <div onClick={clearFilter} className={`${bc} `}>
          <img src={reset} alt="" />
          <span>RESET</span>
        </div>
      </div>
      <div className={`${bc}__text`}>Find a Pediatric Professional</div>
      <div className={`${bc}__checked-container`}>
        {filterList.map(({ group, options }: any) => {
          return (
            <List
              key={group}
              group={group}
              options={options}
              showOptions={isOpen}
              onChange={checkGroup}
            />
          );
        })}
      </div>
    </div>
  );
};
const mapStateToProps = (state: State) => ({ ...state.userList, ...state.app });
export default connect(mapStateToProps)(AdvancedFilter);
