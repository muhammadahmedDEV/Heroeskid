// MAIN MODULES
import React, { Component } from "react";
import { connect } from "react-redux";
// COMPONENTS
import Filters from "../../containers/Filters";
import Banner from "../../containers/Banner";
import UserList from "../../containers/UserList";
// import SearchPageBar from '../../containers/SearchPageBar/SearchPageBar'

// STYLES
import "./styles.scss";

// TYPES
import { State } from "../../reducers";
import { FilterPayload } from "../../models/commonTypes";

// ACTIONS
import {
  addUserList,
  addCityList,
  addDisorderList,
  addDiagnoses,
  addLanguages,
  addOrgList
} from "../../actions";
// SERVISES
import { getFbData } from "../../servises/firebase";
import { setItemToLocalStorage } from "../../servises/localStorage";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
import { Row, Col } from "antd";
import MediumHome from "../../components/MediumSlider/MediumSlider";
import OrgList from "../../containers/OrgList.tsx/OrgList";

import MailingListPopUp from '../../components/MailingListPopUp/MailingListPopUp';
import { setSignedUpNewsLetter } from "../../actions";
import SearchPageFilter from '../../containers/SearchPageFilter/SearchPageFilter';


const bc: string = "search_page";

interface ComponentProps {
  filterView: boolean;
  addUserList: any;
  addOrgList: any;
  addCityList: any;
  addDisorderList: any;
  addDiagnoses: any;
  addLanguages: any;
  filterList: FilterPayload[];

  signedUpNewsLetter: any;
  setSignedUpNewsLetter: any;
}
interface ComponentState {
  error: string;

  signedUpNewsLetter: boolean;
  showNewsLetter: boolean;

}
class SearchPage extends Component<ComponentProps, ComponentState> {
  state: ComponentState = {
    error: "",
    signedUpNewsLetter: true,
    showNewsLetter: false
  };

  handlePrivacyTile = (): any => {
    this.props.setSignedUpNewsLetter(false);
    // toogleTermsAccepted(!this.props.termsAccepted)
    this.setState({ signedUpNewsLetter: false });

  };

  componentDidMount = async () => {
    const triggerUser = this.props.addUserList;
    const triggerOrgs = this.props.addOrgList;
    // const triggerCities = this.props.addCityList;
    // const triggerDisorder = this.props.addDisorderList;
    // const triggerDiagnoses = this.props.addDiagnoses;
    // const triggerLanguages = this.props.addLanguages;
    setTimeout(() => {
      this.setState({ showNewsLetter: true })
    }, 5000)
    // getFbData("cities")
    //   .then((querySnapshot) => {
    //     const users: any = [];
    //     querySnapshot.forEach((doc: any) => {
    //       users.push(doc.data());
    //     });
    //     const sortedCities =
    //       users &&
    //       users.sort(function (a: any, b: any) {
    //         const textA = a.name && a.name.toUpperCase();
    //         const textB = b.name && b.name.toUpperCase();
    //         return textA < textB ? -1 : textA > textB ? 1 : 0;
    //       });
    //     triggerCities(sortedCities);
    //     setItemToLocalStorage("cities", sortedCities);
    //   })
    //   .catch((e) => {
    //     // Error stored in  state
    //     this.setState({ error: e });
    //   });
    // getFbData("diagnoses")
    //   .then((querySnapshot) => {
    //     const diagnose: any = [];
    //     querySnapshot.forEach((doc: any) => {
    //       diagnose.push(doc.data());
    //     });

    //     const sortedDiagnoses =
    //       diagnose &&
    //       diagnose.sort(function (a: any, b: any) {
    //         const textA = a.name && a.name.toUpperCase();
    //         const textB = b.name && b.name.toUpperCase();
    //         return textA < textB ? -1 : textA > textB ? 1 : 0;
    //       });
    //     triggerDiagnoses(sortedDiagnoses);
    //   })
    //   .catch((e) => {
    //     // Error stored in  state
    //     this.setState({ error: e });
    //   });
    // getFbData("specialities")
    //   .then((querySnapshot) => {
    //     const users: any = [];
    //     querySnapshot.forEach((doc: any) => {
    //       const newDoc: any = doc.data();
    //       const transForm: any = [];
    //       if (Array.isArray(newDoc.treats)) {
    //         newDoc.treats.forEach((item: any) => {
    //           item.get().then((res: any) => {
    //             transForm.push(res.data());
    //           });
    //         });
    //       }
    //       newDoc.treats = transForm;
    //       users.push(newDoc);
    //     });
    //     const sortedProfessions =
    //       users &&
    //       users.sort(function (a: any, b: any) {
    //         const textA = a.type && a.type.toUpperCase();
    //         const textB = b.type && b.type.toUpperCase();
    //         return textA < textB ? -1 : textA > textB ? 1 : 0;
    //       });
    //     triggerDisorder(sortedProfessions);
    //   })
    //   .catch((e) => {
    //     // Error stored in  state
    //     this.setState({ error: e });
    //   });
    getFbData("users")
      .then((querySnapshot) => {
        const users: any = [];
        querySnapshot.forEach((doc: any) => {
          const newDoc: any = doc.data();
          users.push(newDoc);
        });
        triggerUser(users);
      })
      .catch((e) => {
        this.setState({ error: e });
      });
    getFbData("organizations")
      .then((querySnapshot) => {
        const orgs: any = [];
        querySnapshot.forEach((doc: any) => {
          const newDoc: any = doc.data();
          orgs.push(newDoc);
        });
        triggerOrgs(orgs);
      })
      .catch((e) => {
        // Error stored in  state
        this.setState({ error: e });
      });
    // getFbData("languages")
    //   .then((querySnapshot) => {
    //     const lang: any = [];
    //     querySnapshot.forEach((doc: any) => {
    //       const newDoc: any = doc.data();
    //       lang.push(newDoc);
    //     });
    //     //languages
    //     const sortedLanguages =
    //       lang &&
    //       lang.sort(function (a: any, b: any) {
    //         const textA = a.name && a.name.toUpperCase();
    //         const textB = b.name && b.name.toUpperCase();
    //         return textA < textB ? -1 : textA > textB ? 1 : 0;
    //       });
    //     triggerLanguages(sortedLanguages);
    //   })
    //   .catch((e) => {
    //     // Error stored in  state
    //     this.setState({ error: e });
    //   });

  }

  render() {
    const { filterView, filterList } = this.props;
    return (
      <div className={bc}>
        <Header />

        {this.state.showNewsLetter &&
          this.props.signedUpNewsLetter ? (
          <MailingListPopUp handleClose={this.handlePrivacyTile}
            open={this.props.signedUpNewsLetter} />
        ) : null}
        <div className={`${bc}__content`}>
          <Row gutter={8}>
            <Col sm={6} md={6} xl={6} xxl={6}>
              <SearchPageFilter />
            </Col>
            {/* <SearchPageBar/> */}
            <Col sm={18} md={18} xl={18} xxl={18}>
              <Filters />
              {filterView || !filterList.length ? <Banner /> : <UserList />}
              {filterView || !filterList.length ? '' : <OrgList />}
            </Col>
            <MediumHome home />
          </Row>
        </div>
        <Footer />
      </div >
    );
  }
}
const mapStateToProps = (state: State) =>
({

  ...state.app,
  ...state.app.signedUpNewsLetter,
})

const mapDispatchToProps = {
  addUserList,
  addOrgList,
  addCityList,
  addDisorderList,
  addDiagnoses,
  setSignedUpNewsLetter,
  addLanguages,

};
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
