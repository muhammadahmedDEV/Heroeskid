// MAIN MODULES
import React, { useState } from "react";
import { compose } from "recompose";
import { withRouter, RouteComponentProps } from "react-router";
import { connect } from "react-redux";

// COMPONENTS
import Button from "../../components/Buttons";
import Autosuggest, { SuggestionType } from "../../components/Autosuggest";

// STYLES
import "./styles.scss";
import { getStyles, getButtonRed } from "../../components/Buttons/style";

// ACTIONS
import { addFilterList, openFilterBar, deleteCurrent } from "../../actions";

// ICON
import search from "../../assets/icons/icn_search.png";
import { State } from "../../reducers";
import { listenerCount } from "cluster";

// TYPES

interface ComponentProps extends RouteComponentProps {
  addFilterList: (a: any) => void;
  deleteCurrent: (a: string) => void;
  openFilterBar: (a: string) => void;
  diagnoses: any;
  disorderList: any;
  list: any;
  languages: any;
  orgList: any;
}

const bc: string = "search";

const Search = (props: ComponentProps) => {
  const [val, setVal] = useState("");
  const classes = getStyles(Search);
  const newClasses = getButtonRed("32px", "74px");
  const searchResult = (): void => {
    props.history.push("/search");
    // const res: SuggestionType = { id: val, type: val };
    const profType = [...props.disorderList];
    const specialty = [...props.diagnoses];
    const languages = [...props.languages];
    const name = [...props.list];
    const orgName = [...props.orgList];
    const prof = profType.find((item) => {
      return item.type.trim().toUpperCase() === val.trim().toUpperCase();
    });
    const spec = specialty.find((item) => {
      return item.name.trim().toUpperCase() === val.trim().toUpperCase();
    });
    const lang = languages.find((item) => {
      return item.name.trim().toUpperCase() === val.trim().toUpperCase();
    });
    const firstName = name.find((item) => {
      return item.first_name.trim().toUpperCase() === val.trim().toUpperCase();
    });
    const lastName = name.find((item) => {
      return item.last_name.trim().toUpperCase() === val.trim().toUpperCase();
    });
    const organizationName = orgName.find((item) => {
      return item?.name?.trim().toUpperCase() === val.trim().toUpperCase();
    });
    const fullName = name.find((item) => {
      const fname: any = `${item.first_name
        .trim()
        .toUpperCase()} ${item.last_name.trim().toUpperCase()}`;
      return fname === val.trim().toUpperCase();
    });

    if (prof) {
      const res: any = {
        group: "Profession Type",
        option: prof.type,
      };
      props.addFilterList(res);
    }
    if (spec) {
      const res: any = { group: "Specialty", option: spec.name };
      props.addFilterList(res);
    }
    if (lang) {
      const res: any = { group: "Languages", option: lang.name };
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
      fullName === undefined
    ) {
      const res: any = { group: "No Value", option: val };
      props.addFilterList(res);
    }
  };
  const onSubmit = (): void => {
    props.history.push("/search");
    const res: SuggestionType = { id: val, type: val };
    props.addFilterList(res);
  };
  const advancedOpt = (): void => {
    props.openFilterBar("home");
    props.history.push("/search");
    props.deleteCurrent("all");
  };
  return (
    <form className={bc} onSubmit={searchResult}>
      <div className={`${bc}__middle-container`}>
        <img src={search} alt="" />
        <Autosuggest isChange={setVal} />
        <Button
          title={"Search"}
          variant="contained"
          onClick={searchResult}
          styles={newClasses.root}
          disabled={val === ""}
          alternativeText={"Search"}
        />
      </div>
      <div className={`${bc}__bottom-container`}>
        <Button
          title={"Search Filters"}
          styles={classes.root}
          onClick={advancedOpt}
        />
      </div>
    </form>
  );
};

Search.displayName = "Search";
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
)(Search);
