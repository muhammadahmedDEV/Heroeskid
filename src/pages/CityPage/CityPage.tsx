// MAIN MODULES
import React, { Component } from "react";
import { connect } from "react-redux";

// COMPONENTS
import CityTile from "../../components/CityTile";
import { History } from "history";

// STYLES
import "./styles.scss";

// TYPES
import { State } from "../../reducers";

// ACTIONS
import { addUserList } from "../../actions";

// SERVISES
import { getFbData } from "../../servises/firebase";
import Footer from "../../containers/Footer";
import Header from "../../containers/Header";

const bc: string = "city_page";

interface ComponentProps {
  cityList: any[];
  addUserList: any;
  history: History;
}
interface ComponentState {
  error: string;
}

class CityPage extends Component<ComponentProps, ComponentState> {
  state: ComponentState = {
    error: "",
  };
  componentDidMount() {
    const triggerUser = this.props.addUserList;
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
  }
  render() {
    return (
      <div className={bc}>
        <Header />
        <div className={`${bc}__header`}>
          <div className={`${bc}__header__top_text`}>Recently Added Cities</div>
        </div>
        <div>
          <div className={`${bc}__body`}>
            {this.props.cityList.map(
              (
                { cityName, url, like, specialty, disabled }: any,
                index: number
              ) => {
                return (
                  <div className={`${bc}__body__block`} key={index}>
                    <CityTile
                      key={index}
                      cityName={cityName}
                      url={url}
                      like={like}
                      specialty={specialty}
                      disabled={disabled}
                      history={this.props.history}
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({ ...state.router, ...state.app });
const mapDispatchToProps = { addUserList };
export default connect(mapStateToProps, mapDispatchToProps)(CityPage);
