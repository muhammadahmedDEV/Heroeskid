// MAIN MODULES
import React from "react";
import Autosuggest from "react-autosuggest";
import { connect } from "react-redux";

// STYLES
import "./styles.scss";

// ACTIONS
import { addFilterList } from "../../actions";

import { State } from "../../reducers";
import { compose } from "recompose";
import { getItemToLocalStorage, setItemToLocalStorage } from "../../servises/localStorage";
import { base_URL } from "../../servises/firebase";

export type SuggestionType = { id: string; type: string; treats?: any[] };
type NewValType = { newValue: string; method: string };
type InputChange = { value: string; reason: string };

interface ComponentState {
  value: string;
  suggestions: SuggestionType[];
}
interface ComponentProps extends State {
  addFilterList: (val: SuggestionType) => void;
  disorderList: any;
  diagnoses: any;
  list: any;
  orgList: any
}
interface OwnProps {
  isChange: (newValue: string) => void;
}

// const languages: SuggestionType[] = [
//   {
//     option: 'Autism',
//     group: 'Autism'
//   },
//   {
//     option: 'Autism Spectre Disorder',
//     group: 'Autism Spectre Disorder'
//   },
//   {
//     option: 'Audiologist',
//     group: 'Audiologist'
//   },
//   {
//     option: 'Dentist for Kids',
//     group: 'Dentist for Kids'
//   }
// ]

// const getSuggestions = (value: string) => {
//   const inputValue = value.trim().toLowerCase()
//   const inputLength = inputValue.length

//   return inputLength === 0 ? [] : languages.filter((lang: SuggestionType) =>
//       lang.type.toLowerCase().slice(0, inputLength) === inputValue
//     )
// }
const getSuggestionValue = (suggestion: any) => suggestion;
const renderSuggestion = (suggestion: any) => <div>{suggestion}</div>;

class AutosuggestM extends React.Component<
  ComponentProps & OwnProps,
  ComponentState
> {
  state = {
    value: "",
    suggestions: [] as SuggestionType[],
    filterOption: {},
  };

  onChange = (event: React.ChangeEvent, { newValue, method }: NewValType) => {
    this.setState({
      value: newValue,
    });
    if (newValue.length > 5) {
      this.props.isChange(newValue);
    } else {
      this.props.isChange(newValue);
    }
  };
  getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const suggestionArr: any = [];

    const localLang = getItemToLocalStorage("langComplete");
    const localSpec = getItemToLocalStorage("specComplete");
    const localDiag = getItemToLocalStorage("diagComplete");
    const localCity = getItemToLocalStorage("cities");
    if (localLang && localSpec && localDiag) {
      // setLanguageList(localLang);
      // setSpecialitiesList(localSpec);
      // setDiagnosesList(localDiag);

      localDiag.forEach((element: any) => {
        suggestionArr.push(element.name);
      });
      localSpec.forEach((element: any) => {
        suggestionArr.push(element.type);
      });
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
            // triggerLanguages(sortedLanguages);
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
            setItemToLocalStorage("specComplete", sortedSpecialities);
          }
        })
    }


    this.props.list.forEach((element: any) => {
      if (element && element.approved === true) {
        suggestionArr.push(`${element.first_name} ${element.last_name}`);
      }
      // suggestionArr.push(`${element.last_name}`);
    });
    this.props.orgList.forEach((element: any) => {
      suggestionArr.push(element.name);
    });
    const uniqueSuggestion = suggestionArr.filter((res: string, index: any) => suggestionArr.indexOf(res) === index)
    return inputLength === 0
      ? []
      : uniqueSuggestion.filter((val: string) => {
        return (
          val && val.toLowerCase().includes(inputValue)
        );
      });
  };
  onSuggestionsFetchRequested = ({ value }: InputChange) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search by Professional, Diagnosis or Area of Concern",
      value,
      onChange: this.onChange,
    };
    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
const mapDispatchToProps = { addFilterList };
const mapStateToProps = (state: State) => ({ ...state.app, ...state.userList, ...state.orgList });

export default compose<any, any>(connect(mapStateToProps, mapDispatchToProps))(
  AutosuggestM
);
