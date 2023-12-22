// MAIN MODULES
import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
// COMPONENTS
import UserLogo from "../../components/UserLogo";
import Button from "../../components/Buttons";
import YouTube from "../../components/YouTube";
import ArticleTile from "../../components/ArticleTile";
import WorkList from "../../components/WorkList";
import AcceptTile from "../../components/AcceptTile";
import MediaForm from "../../containers/MediaForm";
import Lightbox from "../../components/Lightbox";
import RecommendationForm from "../../components/RecommendationForm/RecommendationForm";
import { Modal } from "antd";
// ACTIONS
import { addUserList, addCurrentUser /*, getUserFromId*/ } from "../../actions";
// TYPES
import { State } from "../../reducers";
// STYLES
import "./styles.scss";
import { getButtonRed, getButtonBlue } from "../../components/Buttons/style";
import { color } from "../../constants/color";
// SERVISES
import { History, Location } from "history";
import {
  getFbData,
  getUserData,
  setCurrentUser,
  updateCompleteUserData,
  logEventToAnalytics,
} from "../../servises/firebase";
import Swal from "sweetalert2";
import MapComponent from "../../components/Map/Map";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
const bc: string = "user_page";
interface ComponentProps {
  user: any;
  currentUser: any;
  addUserList: any;
  addCurrentUser: any;
  history: History;
  location: Location;
  loginUser: any;
}
const UserPage = ({
  user,
  currentUser,
  location,
  addUserList,
  addCurrentUser,
  history,
  loginUser,
}: ComponentProps) => {
  const classes = getButtonRed("35px", "200px", color.AQUA_BLUE);
  const classesEdit = getButtonBlue("24px", "72px", "white", false);
  const [isOpen, setVal] = useState(false);
  const [isOpenLightbox, setValOpenLightBox] = useState(false);
  const [temporaryUser, setUser] = useState(currentUser ? currentUser : '');
  const [newUser, setNewUser] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const triggerModal = (): void => {
    setVal(!isOpen);
  };

  useEffect(() => {
    const user_id = history.location.pathname.split("/");
    const id = user_id[2];
    getUserData({
      table: "users",
      id: id ? id : "",
    })
      .then(async (querySnapshot) => {
        querySnapshot.forEach((doc: any) => {
          const newDoc: any = doc.data();
          addCurrentUser(newDoc);
          setUser(newDoc)
        });
      })
      .catch((e) => console.log(e));

    const table = 'users'
    // if (user && user.uid) {
    if (loginUser && loginUser.id === id) {
      setUser(loginUser);
    } else if (currentUser) {
      setUser(currentUser);
    } else {
      setCurrentUser({ id, table, dispatch })
      setUser(currentUser);
    }
    // } else {
    //   history.push('/login')
    // }
  }, [
    location,
    addUserList,
    addCurrentUser,
    currentUser,
    history,
    user,
    getUserData,
    getFbData,
  ]);
  const acceptUser = async (): Promise<void> => {

    temporaryUser.approved = true;
    const payload = { ...temporaryUser, approved: true };
    await updateCompleteUserData("users", temporaryUser.id, payload);
    Swal.fire({
      title: "Sucess!",
      text: "Profile is approved.",
      icon: "success",
      confirmButtonText: "Ok",
    }).then(() => {
      window.location.reload();
    });
  };
  const isAuth = user && user.email === currentUser ? currentUser && currentUser.email : "";
  let articleList: any = [];
  let rightArticlInfo: any = [];
  let videoReff: string = "";
  let buttonsConfig: any = [];
  // useEffect(() => {
  //   const user_id = history.location.pathname.split("/");
  //   const id = user_id[2];
  // getUserData({
  //   table: "users",
  //   id,
  // })
  // .then(async (querySnapshot) => {
  //     querySnapshot.forEach((doc: any) => {
  //       const newDoc: any = doc.data();
  //       addCurrentUser(newDoc);
  //     });
  //   })
  // .catch((e) => console.log(e));
  // getFbData("users")
  //   .then(async (querySnapshot) => {
  //     const users: any = [];
  //     querySnapshot.forEach((doc: any) => {
  //       const newDoc: any = doc.data();
  //       users.push(newDoc);
  //     });
  //     const user_id = history.location.pathname.split("/");
  //     const id = user_id[2];

  //     users.filter(async (item: any) => {
  //       if (item.authId === id) {
  //         setNewUser(item);
  //         return true;
  //       }
  //       return undefined;
  //     });
  //   })
  //   .catch((e) => {
  //     console.log(e.message);
  //   });
  // }, []);

  if (temporaryUser) {
    videoReff = temporaryUser.video;
    const public_email = temporaryUser.email_public;
    articleList = [
      {
        title: `About ${temporaryUser.first_name} ${temporaryUser.last_name}`,
        content: temporaryUser.bio,
      },
      {
        title: "Professional Statement to Caregivers",
        content: temporaryUser.prof_statement,
      },
    ];
    buttonsConfig = public_email
      ? [
        {
          title: "Show Maps",
          onClick: (): void => {
            setModalVisible(true);
            // console.log("");
          },
          styles: `${bc + "__buttons-block__button"}`,
        },
        {
          title: "Email",
          onClick: (): void => {
            const email: string = temporaryUser.email;
            window.open(
              `mailto:${email}?subject=Hi! I found you on Everyday Heroes Kids`
            );
            logEventToAnalytics("contact_via_email", {
              profName:
                temporaryUser.first_name +
                " " +
                temporaryUser.last_name,
              profEmail: temporaryUser.email,
            });
          },
          styles: `${bc + "__buttons-block__button"}`,
        },
      ]
      : [
        {
          title: "Show Maps",
          onClick: (): void => {
            // console.log("");
            setModalVisible(true);
          },
          styles: `${bc + "__buttons-block__button"}`,
        },
      ];
    rightArticlInfo = [
      {
        title: "Treatment Approaches",
        content: temporaryUser.treatment_approaches,
      },
      {
        title: "Education",
        content: temporaryUser.education_background,
      },

      {
        title: "License Number",
        content: temporaryUser.licensure,
      },

      {
        title: "College",
        content: temporaryUser.college,
      },
      {
        title: "Appointments Available",
        content: temporaryUser.work_place,
      },
      {
        title: "Languages",
        content: temporaryUser.languages,
      },
      {
        title: "Phone",
        content: temporaryUser.phone,
      },


      {
        title: "Working Days",
        content: temporaryUser.working_days,
      },
      {
        title: "Diagnosis/Concerns",
        content: temporaryUser.specialities,
      },
      {
        title: "Service Locations",
        content: temporaryUser.otherServices
          ? [...temporaryUser.otherServices, ...temporaryUser.services]
          : temporaryUser.services,
      },
    ];
  }

  const toggleLightBox = (): void => {
    setValOpenLightBox(!isOpenLightbox);
  };
  const onClickEdit = (currentUser: any, history: any) => {
    history.push("/join-our-professionals", {
      flag: true,
    });
    addCurrentUser(currentUser);
  };
  const uid = user && user.uid;
  const authId = temporaryUser && temporaryUser.authId;
  const authUser = uid === authId;

  // const isAdmin = uid === "2spOC1RAUmOkCMQAoBMbVTGpU3S2"; //App-3
  const isAdmin = uid === "Ho0lS5EetDhN1FP3JNGOtvAkEFp2"; //Live db admin account
  // const isAdmin = uid === "12Zqw3uqh8YemfaFg5LKvWG3rzy2"; //User db dummy account
  const renderComponent =
    temporaryUser && temporaryUser.id ? (
      <div className={bc}>
        <Header />
        {isOpen && (
          <Modal>
            <MediaForm onCancel={triggerModal} />
          </Modal>
        )}
        <Modal
          // title="20px to Top"
          style={{ top: 20, width: "100%" }}
          visible={modalVisible}
          onOk={() => setModalVisible(false)}
          onCancel={() => setModalVisible(false)}
        >
          <MapComponent
            // googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            // loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            lat={temporaryUser.lat}
            lng={temporaryUser.lng}
          />
        </Modal>
        <UserLogo isAuthorize={isAuth} currentUser={temporaryUser} />
        <Lightbox
          photoList={temporaryUser && temporaryUser.pictures}
          isOpenLightbox={isOpenLightbox}
          setValOpenLightBox={setValOpenLightBox}
        />
        <div className={`${bc}__body`}>
          <div className={`${bc}__body__buttons-block`}>
            {buttonsConfig.map(
              ({ title, onClick, styles, icon }: any, index: number) => {
                return (
                  <Button
                    key={index}
                    title={title}
                    onClick={onClick}
                    icon={icon}
                    styles={classes.root}
                  />
                );
              }
            )}
            {authUser ? (
              <Button
                title={"Edit Profile"}
                onClick={() => onClickEdit(currentUser, history)}
                styles={classes.root}
              />
            ) : null}
            {isAdmin && temporaryUser.approved === false ? (
              <Button
                title={"Accept"}
                styles={classes.root}
                onClick={acceptUser}
              />
            ) : null}
            {authUser ? (
              <RecommendationForm
                recommendedBy={`${temporaryUser.first_name} ${temporaryUser.last_name}`}
              />
            ) : null}
          </div>
          <div className={`${bc}__body__main-block`}>
            <div className={`${bc}__body__main-block__left-block`}>
              {temporaryUser?.dr_needed === 'true' ? (
                <AcceptTile isAuthorize={isAuth} />
              ) : null}
              {articleList.map(({ title, content }: any, index: number) => {
                if (Array.isArray(content)) {
                  return content.length && content[0] !== '' &&
                    <ArticleTile
                      key={index}
                      title={title}
                      content={content}
                    // isAuthorize={isAuth}
                    />
                } else {
                  return <ArticleTile
                    key={index}
                    title={title}
                    content={content}
                  // isAuthorize={isAuth}
                  />
                }
              })}
            </div>
            <div className={`${bc}__body__main-block__right-block`}>
              {isAuth ? (
                <div className={"edit-block-main"}>
                  <div className={"edit-block-body"}>
                    <Button
                      title={"Edit"}
                      styles={classesEdit.root}
                      onClick={triggerModal}
                    />
                  </div>
                </div>
              ) : null}

              <div>
                <YouTube width={100} height={250} url={videoReff} />
                <div
                  className={`${bc}__body${temporaryUser && temporaryUser.pictures.length === 4
                    ? "__images-block"
                    : "__images-block-with-margin"
                    }`}
                >
                  {temporaryUser &&
                    temporaryUser.pictures.map(
                      (item: string, index: number) => {
                        return (
                          <img
                            src={item}
                            onClick={toggleLightBox}
                            key={index}
                            className={`${bc}__body${temporaryUser &&
                              temporaryUser.pictures.length === 4
                              ? "__images-block"
                              : "__images-block-with-margin"
                              }__images`}
                            alt=""
                          />
                        );
                      }
                    )}
                </div>
              </div>
              <div
                className={`${bc}__body__main-block__right-block__work-content border`}
              >
                {rightArticlInfo.map(({ title, content }: any, index: number) => {
                  if (Array.isArray(content)) {
                    // if values are array
                    return content.length && content[0] !== '' ?
                      <WorkList
                      temporaryUserId={temporaryUser && temporaryUser.id}
                        title={title}
                        content={content}
                        key={index}
                        border={index + 1 !== rightArticlInfo.length}
                      // isAuthorize={isAuth}
                      /> : null
                  } else {
                    return content !== '' ? <WorkList
                    temporaryUserId={temporaryUser && temporaryUser.id}
                      title={title}
                      content={content}
                      key={index}
                      border={index + 1 !== rightArticlInfo.length}
                    // isAuthorize={isAuth}
                    /> : null
                  }
                }
                )}
              </div>
              {
                <div>
                  <div className={`${bc}__title-block`}>
                    <p
                      // style={{ fontWeight: "bold" }}
                      className={`${bc}__title-block__article-text `}>

                      {temporaryUser.insurance === '' && temporaryUser.major_insurance === ''
                        ? null
                        : temporaryUser.major_insurance === 'yes'
                          ? 'We accept most major Insurance'
                          : temporaryUser.insurance === 'yes' && (temporaryUser.major_insurance === 'no' || temporaryUser.major_insurance === '')
                            ? "We accept Insurance"
                            : "Please Note: We do not accept Insurance"
                      }

                    </p>
                  </div>
                </div>
              }

            </div>
          </div>
        </div>
        <Footer />
      </div>
    ) : (
      <div className={`${bc}__loader`}>
        <CircularProgress />
      </div>
    );
  return renderComponent;
};
const mapStateToProps = (state: State) => ({
  ...state.currentUser,
  ...state.router,
  ...state.app,
  ...state.app.loginUser,
});
const mapDispatchToProps = { addUserList, addCurrentUser };
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
