// MAIN MODULES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
// import SharedCount from 'sharedcount';

// COMPONENTS
// import Search from "../../containers/Search";
import Search from "../../containers/SearchBar/SearchBar";
import NewProfessionals from "../../containers/NewProfessionals";
import NewOrganizations from "../../containers/NewOrganizations/NewOrganizations";
import Feedback from "../../containers/Feedback";
import AddedCity from "../../containers/AddedCity";
import PartnerLogo from "../../components/PartnerLogo/PartnerLogo";
import PrivacyDialog from "../../components/PrivacyDialog/PrivacyDialog";
import MediumHome from "../../components/MediumSlider/MediumSlider";
import FacebookShareButton from "../../containers/Share/Buttons/FacebookShareButton";
import LogosTile from "../../components/LogosTile/LogosTile";
// ACTIONS
import {
  openFilterBar,
  addUserList,
  addOrgList,
  addCityList,
  addDisorderList,
  addLanguages,
  addDiagnoses,
  setTermsAccepted,
  setSignedUpNewsLetter
} from "../../actions";

// STYLES
import "./styles.scss";

// TYPES
import { State } from "../../reducers";

// SERVISES
import { getFbData, base_URL } from "../../servises/firebase";
import { getItemToLocalStorage, setItemToLocalStorage, removeItemFromLocalStorage } from "../../servises/localStorage";
// import Share from "../../containers/Share/Share";
import FacebookShareCount from "../../containers/Share/Count/FacebookShareCount";
import FacebookIcon from "../../containers/Share/Icon/FacebookIcon";
import TwitterShareButton from "../../containers/Share/Buttons/TwitterShareButton";
import TwitterIcon from "../../containers/Share/Icon/TwitterIcon";
import LinkedinShareButton from "../../containers/Share/Buttons/LinkedInShareButton";
import LinkedinIcon from "../../containers/Share/Icon/LinkedinIcon";
import { loadStripe } from "@stripe/stripe-js";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
// import hero from "../../assets/icons/heros.png";
import { CircularProgress } from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import MindUpLogo from "../../components/MindUpLogo/MindUpLogo";
import KHLF from "../../components/KHLF/KHLF";
import MailingListPopUp from "../../components/MailingListPopUp/MailingListPopUp";
// import shareIcon from "../../assets/icons/share.png";
var SharedCount = require('sharedcount');

interface ComponentProps {
  openFilterBar: any;
  addUserList: any;
  addOrgList: any;
  addCityList: any;
  addDisorderList: any;
  isFilterBarOpen: boolean;
  addLanguages: any;
  cityList: any;
  list: any;
  disorderList: any;
  languages: any;
  termsAccepted: any;
  setTermsAccepted: any;
  addDiagnoses: any;
  diagnoses: any;
  signedUpNewsLetter: any;
  setSignedUpNewsLetter: any;
}
interface ComponentState {
  error: string;
  termsAccepted: boolean;
  avatar: string;
  profileLink: string;
  facebookShareCount: string;
  itemRows: any[];
  listLoad: boolean;
  signedUpNewsLetter: boolean;
  showNewsLetter: boolean;
}

const bc: string = "home_page";

class HomePage extends Component<ComponentProps, ComponentState> {
  state: ComponentState = {
    error: "",
    facebookShareCount: "",
    termsAccepted: false,
    avatar: "",
    profileLink: "",
    itemRows: [],
    listLoad: false,
    signedUpNewsLetter: true,
    showNewsLetter: false
  };
  handleNewsLetterTile = (): any => {
    this.props.setSignedUpNewsLetter(false);
    // toogleTermsAccepted(!this.props.termsAccepted)
    this.setState({ signedUpNewsLetter: false });

  };
  closeTabHandler = ()=>{
    window.addEventListener("beforeunload", (ev) => 
{  
    ev.preventDefault();
    // return ev.returnValue = 
    removeItemFromLocalStorage("termAccept");
});
  }

  componentDidMount = async () => {
    this.closeTabHandler();
    const term = getItemToLocalStorage("termAccept");
    if(!term){
    this.setState({termsAccepted: true})
    }
    if (this.props.isFilterBarOpen) {
      this.props.openFilterBar("/");
    }
  await this.shareCountHandler()
    const triggerUser = this.props.addUserList;
    const triggerOrgs = this.props.addOrgList;
    const localUserList = getItemToLocalStorage("usersList");
    if (localUserList) {
      this.setState({ listLoad: false });
    }
    else {
      this.setState({ listLoad: true });
      
      await fetch(`${base_URL}/GetHomepageData`)  // Home page lists call
        .then(response => response.json())
        .then(data => {
          if (data) {
            // 5 cities => data[0]
            setItemToLocalStorage("citiesList", data[0]);

            // 5 org => data[1]
            setItemToLocalStorage("orgList", data[1]);

            // 5 professionals (users) => data[2]
            setItemToLocalStorage("usersList", data[2]);
          }
        })
      this.setState({ listLoad: false });
    }

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
          setItemToLocalStorage("cities", sortedCities);
          setItemToLocalStorage("usersIds", data[2]);  // set professionals (users) ids list => data[2]
        }
      })
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
        // Error stored in  state
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
  }


  handlePrivacyTile = (): any => {
    this.props.setTermsAccepted(false);
    // toogleTermsAccepted(!this.props.termsAccepted)
    this.setState({ termsAccepted: false });
    setItemToLocalStorage("termAccept", true);
    setTimeout(() => {
      this.setState({ showNewsLetter: true })
    }, 25000)
  };

  shareCountHandler = async () => {
    const sc: any = new SharedCount({ apikey: '6df9cdd55ffb71aca8ee7cfb0e1233be71648159' });
    const result: any = await sc.url('https://ehkidshealth.com/')
   this.setState({ facebookShareCount: result && result.Facebook && result.Facebook.total_count })
  };
  

  stripePromise = loadStripe("pk_test_51Gwo9IIKumCkOv7ZpjrvhsQKdCGmzeKWgL9DFvI0BcxJdPQFBl7QT9xkqpqnd7S21sCnyejpmDdzMYBvDCm5DDKp00QoNQvjFi");

  render() {
    return (
      <div className={bc}>
        {/* <div style={{ display:'flex',justifyContent:"center", alignItems:"center", fontWeight:"bold" }}>
          <ErrorIcon style={{margin: '10px'}} color="error"/> 
          WEBSITE IS UNDER DEVELOPMENT AT THE MOMENT
        </div> */}
        
        <Header />
        
        <Row gutter={16} className={`${bc}__search-block`}>
          <Col span={24}>
            <h1 className={`${bc}__search-block_heading`}>Find Pediatric Support</h1>
          </Col>
          <Col span={12}>
            <p className={`${bc}__search-block_text`}>
            Everyday Heroes Kids connects families to comprehensive profiles of pediatric professionals and organizations in the areas of health, mental health and education.
            </p>
          </Col>
          <Col className="search-center" span={24}><Search /></Col>
        </Row>


        {/* {this.props.termsAccepted ? ( */}
          {/* <PrivacyDialog
            handleClose={this.handlePrivacyTile}
            open={this.state.termsAccepted}
          /> */}
        {/* ) : null} */}
        
        {this.state.showNewsLetter && this.props.signedUpNewsLetter ? (
          <MailingListPopUp handleClose={this.handleNewsLetterTile} open={this.props.signedUpNewsLetter} />
        ) : null}

        {/* <Message /> */}
        {/* <div className="sharethis-inline-share-buttons"></div> */}

        <div className="share-buttons-container">
          <h4>Share to: </h4>
          <div className="Demo__some-network">
            <TwitterShareButton className="Demo__some-network__share-button" hashtags={["EHKids"]} url={"https://ehkidshealth.com/"}
              title={
                "At Everyday Heroes Kids, caregivers select their pediatric professionals working in the health, mental health, and education sectors by viewing comprehensive profiles; saving time, money, and stress and delivering timely, quality care for children."
              }
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>

          <div className="Demo__some-network">
            <LinkedinShareButton url={"https://ehkidshealth.com/"} className="Demo__some-network__share-button"
              summary={
                "At Everyday Heroes Kids, caregivers select their best-fit pediatric professionals working in the health, mental health and education sectors by viewing comprehensive profiles; saving time, money and stress and delivering timely, compassionate, quality care for children."
              }
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>

          <div className="Demo__some-network">
            <div>
              <FacebookShareCount url={"https://ehkidshealth.com/"} className="Demo__some-network__share-count">{(count) => count}</FacebookShareCount>
            </div>

            <FacebookShareButton className="Demo__some-network__share-button" url={"https://ehkidshealth.com/"}
              quote={
                "Check out Everyday Heroes Kids where caregivers select their best-fit pediatric professionals working in the health, mental health and education sectors by viewing comprehensive profiles; saving time, money and stress and delivering timely, compassionate, quality care for children."
              }
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </div>


          {/* <div className="Demo__some-network"> */}
          <h4 className="share-font"> {this.state.facebookShareCount ? `${this.state.facebookShareCount} Shares` : ""}</h4>
          {/* <img src={shareIcon} alt= ""/> */}
          {/* </div> */}

        </div>


        <div className={`${bc}__home-content`}>
          {/* <div className={`${bc}__search-block`}>
            <Search />
          </div> */}

          <Row gutter={8}>
            <Col sm={24} md={24} xl={12} xxl={12} className={`${bc}__slogan`}>
              {/* <br /> */}
              <h2 className={`${bc}__title`}>Meet our Everyday Heroes</h2>
              <Row gutter={24}>
                {/* <Col sm={24} md={6} xl={6} xxl={6}><img src={hero} alt="" /></Col> */}
                <Col sm={24} md={18} xl={18} xxl={18}>
                  <br />
                  Our team is excited to hear your feedback! We encourage
                  professionals to contact us about adding a video to their page
                  so that families can 'meet' their <em>Everyday Heroes </em>
                  online. If you are a pediatric professional or non-profit, we
                  invite you to create a free account. At this time, you must
                  have an online presence for your profile to be approved.
                  <br />
                  <br />
                  Sincerely, the team at Everyday Heroes Kids.
                </Col>
              </Row>
              {/* </div> */}
            </Col>
            <Col sm={24} md={24} xl={12} xxl={12} className={`${bc}__video`}>
              {/* <div className={`${bc}__video`}> */}
              <iframe
                src="https://www.youtube.com/embed/usst0aD9aho?cc_load_policy=1"
                allowFullScreen={true}
                width="100%"
                height="100%"
                frameBorder="0"
              ></iframe>
              {/* </div> */}
            </Col>
          </Row>


          <Row gutter={8}>
            <KHLF/>
          </Row>



          {this.state.listLoad == true ?
            <div className={`${bc}__loader`}>
              <CircularProgress />
            </div> :
            <>
              <NewProfessionals />
              <NewOrganizations />
            </>
          }


          <Feedback />


          {/* {this.state.listLoad == true ?
            <div className={`${bc}__loader`}>
              <CircularProgress />
            </div> :
            <AddedCity />
          } */}



          <MediumHome home />
          <MindUpLogo />
          <PartnerLogo />


          {/* <Share /> */}


          <LogosTile />

          
        </div>
        <Footer />
      </div>
    );
  }
}
const mapDispatchToProps = {
  openFilterBar,
  addUserList,
  addOrgList,
  addCityList,
  addDisorderList,
  addLanguages,
  addDiagnoses,
  setTermsAccepted,
  setSignedUpNewsLetter,
};
const mapStateToProps = (state: State) => ({
  ...state.userList,
  ...state.app,
  ...state.app.termsAccepted,
  ...state.app.signedUpNewsLetter,
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
