// MAIN MODULES
import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
// COMPONENTS
import ProfileHeader from "../../components/OrgProfileHeader/ProfileHeader";
import Button from "../../components/Buttons";
import YouTube from "../../components/YouTube";
import ArticleTile from "../../components/ArticleTile";
import WorkList from "../../components/WorkList";
import AcceptTile from "../../components/AcceptTile";
import MediaForm from "../../containers/MediaForm";
import Lightbox from "../../components/Lightbox";
import RecommendationForm from "../../components/RecommendationForm/RecommendationForm";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import EventForm from '../../containers/EventsForm/EventForm'
import { Col, Modal, Row } from "antd";
import moment from "moment";
// ACTIONS
import { addCurrentUser /*, getUserFromId*/ } from "../../actions";
// TYPES
import { State } from "../../reducers";
// STYLES
import "./styles.scss";
import { getButtonRed, getButtonBlue } from "../../components/Buttons/style";
import { color } from "../../constants/color";
// SERVISES
import { History, Location } from "history";
import {
  setCurrentUser,
  updateCompleteUserData,
  logEventToAnalytics,
  getFbData,
  getEvent,
  getUserData,
} from "../../servises/firebase";
import Swal from "sweetalert2";
import MapComponent from "../../components/Map/Map";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
import ContactPerson from "../../components/ContactPerson/ContactPerson";
import EventTile from "../../containers/EventTile/EventTile";
const bc: string = "org_page";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 992, min: 600 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
interface ComponentProps {
  user: any;
  currentUser: any;
  addCurrentUser: any;
  history: History;
  location: Location;
  loginUser: any;
}

const UserPage = ({
  user,
  currentUser,
  location,
  addCurrentUser,
  history,
  loginUser,
}: ComponentProps) => {
  const classes = getButtonRed("35px", "200px", color.AQUA_BLUE);
  const greyButton = getButtonRed("35px", "200px", color.GREY);
  const [isOpen, setVal] = useState(false);
  const [isOpenLightbox, setValOpenLightBox] = useState(false);
  const [temporaryUser, setUser] = useState(loginUser ? loginUser : '');
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [visibleDrawer, setVisibleDrawer] = useState(false)
  const [event, setEvent] = useState();
  const [sortedProfTypes, setProfTypes] = useState([]);
  const [sortedSpecialities, setSpecialities] = useState([]);
  const [services, setServices] = useState([])
  const showDrawer = () => {
    setVisibleDrawer(true)
  };
  const onClose = () => {
    setVisibleDrawer(false)
  };
  const triggerModal = (): void => {
    setVal(!isOpen);
  };

  const acceptUser = async (): Promise<void> => {
    temporaryUser.approved = true;
    const payload = { ...temporaryUser, approved: true };
    await updateCompleteUserData("organizations", temporaryUser.id, payload);
    Swal.fire({
      title: "Sucess!",
      text: "Profile is approved.",
      icon: "success",
      confirmButtonText: "Ok",
    }).then(() => {
      window.location.reload();
    });
  };
  const isAuth = user?.email === currentUser?.email ?? null;
  let articleList: any = [];
  let rightArticlInfo: any = [];
  let videoReff: string = "";
  let buttonsConfig: any = [];
  useEffect(() => {
    const user_id = history.location.pathname.split("/");
    const id = user_id[2];
    getUserData({ table: "organizations", id })
      .then(async (querySnapshot) => {
        querySnapshot.forEach((doc: any) => {
          const newDoc: any = doc.data();
          addCurrentUser(newDoc)
          setUser(newDoc);
        });
      })
      .catch((e) => console.log(e));

  }, []);

  useEffect(() => {
    const user_id = history.location.pathname.split("/");
    const id = user_id[2];
    const table = 'organizations'
    const today = new Date()

    if (id) {
      getEvent({ collection: 'events', id })
        .then(querySnapshot => {
          querySnapshot.forEach((doc: any) => {
            let newDoc: any = ''
            newDoc = doc.data();
            if (moment(newDoc.date) > moment(today)) {
              setEvent(newDoc)
            }
          });
        })
    }
    // TODO
    // check if stripe customer is created for this user and payment is done
    // if yes, show this page else, redirect to login
    // at login check if user has paid already
    // if yes, let him login else, redirect to payment creation session
    // TODO Ends
    // if (user && user.uid) {
    if (loginUser && loginUser.id === id) {
      setUser(loginUser);
    } else if (currentUser) {
      setUser(currentUser);
    } else {
      setCurrentUser({ id, table, dispatch });
      setUser(currentUser);
    }
    // } else {
    //   history.push('/login')
    // }

    // if (temporaryUser) {
    //   const profTypes = temporaryUser?.prof_types?.sort( (a: any, b: any) => {
    //     const textA = a.toUpperCase();
    //     const textB = b.toUpperCase();
    //     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    // });
    // const specialities = temporaryUser.specialities.sort( (a: any, b: any) => {
    //     const textA = a.toUpperCase();
    //     const textB = b.toUpperCase();
    //     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    // });
    // setProfTypes(profTypes)
    // setSpecialities(specialities)
    // }
  }, [
    location,
    addCurrentUser,
    currentUser,
    history,
    user,
    getEvent
  ]);
  if (temporaryUser) {
    videoReff = temporaryUser.video ? temporaryUser.video : '';
    const public_email = temporaryUser.email_public;
    articleList = [
      temporaryUser.awards && {
        title: "Awards and Recognitions",
        content: temporaryUser.awards,
      },
      temporaryUser.testimonials && {
        title: "Story and Testimonials",
        content: temporaryUser.testimonials,
      },
      temporaryUser.prof_types && {
        title: "Professional Types",
        content: temporaryUser.prof_types,
        // content: sortedProfTypes ?? temporaryUser.prof_types,
      },
    ];
    buttonsConfig = public_email
      ? [
        {
          title: "Email",
          onClick: (): void => {
            const email: string = temporaryUser.email;
            window.open(
              `mailto:${email}?subject=Hi! I found you on Everyday Heroes Kids`
            );
            logEventToAnalytics("contact_via_email", {
              profName:
                temporaryUser.name,
              profEmail: temporaryUser.email,
            });
          },
          styles: `${bc + "__buttons-block__button"}`,
        },
        {
          title: "Website",
          onClick: (): any => {
            if (temporaryUser?.site?.includes('http')) {
              window.open(temporaryUser.site, '_blank');
            } else {
              window.open(`https://${temporaryUser.site}`, '_blank');
            }
          },
          styles: `${bc + "__buttons-block__button"}`,
        },
      ]
      : [
        {
          title: "Website",
          onClick: (): any => {
            if (temporaryUser?.site?.includes('http')) {
              window.open(temporaryUser.site, '_blank');
            } else {
              window.open(`https://${temporaryUser.site}`, '_blank');
            }
          },
          styles: `${bc + "__buttons-block__button"}`,
        }
      ];
    rightArticlInfo = [
      {
        title: "Fund Raising",
        content: temporaryUser.fund_link,
      },
      {
        title: "Type of Organization",
        content: temporaryUser.org_type,
      },
      {
        title: "Affiliations",
        content: temporaryUser.affiliations,
      },
      {
        title: "Average Waiting Time",
        content: temporaryUser.wait_time,
      },
      {
        title: "Languages",
        content: temporaryUser.languages,
      },
      {
        title: "Serving The Following Areas",
        content: temporaryUser.geo_areas,
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
    history.push("/join-our-organizations", {
      flag: true,
    });
    addCurrentUser(currentUser);
  };
  const uid = user && user.uid;
  const authId = temporaryUser && temporaryUser.authId;
  const authUser = uid === authId;

  // const isAdmin = uid === "2spOC1RAUmOkCMQAoBMbVTGpU3S2"; //App-3
  const isAdmin = uid === "Ho0lS5EetDhN1FP3JNGOtvAkEFp2"; // User db admin account
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
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            lat={temporaryUser.lat}
            lng={temporaryUser.lng}
          />
        </Modal>
        <ProfileHeader
          // isAuthorize={isAuth}
          currentUser={temporaryUser} />
        <Lightbox
          photoList={temporaryUser && temporaryUser.pictures}
          isOpenLightbox={isOpenLightbox}
          setValOpenLightBox={setValOpenLightBox}
        />
        <div className={`${bc}__body`}>
          <div className={`${bc}__body__buttons-block`}>
            {
              temporaryUser.lng && temporaryUser.lat &&
              <Button
                title={"Show Maps"}
                onClick={() => setModalVisible(true)}
                styles={classes.root}
                variant="contained"
              />
            }
            {buttonsConfig.map(
              ({ title, onClick, styles, icon }: any, index: number) => {
                return (
                  <Button
                    key={index}
                    title={title}
                    onClick={onClick}
                    icon={icon}
                    styles={classes.root}
                    variant="contained"
                  />
                );
              }
            )}
            {isAdmin && temporaryUser.approved === false ? (
              <Button
                title={"Accept"}
                styles={classes.root}
                onClick={acceptUser}
                variant="contained"
              />
            ) : null}
            {authUser ? (
              <>
                <RecommendationForm
                  recommendedBy={`${temporaryUser.name}`}
                  profileType='org'
                />
                <Button
                  title={"Edit Profile"}
                  onClick={() => onClickEdit(currentUser, history)}
                  styles={classes.root}
                  variant="contained"
                />
                <Button
                  title='Highlight Event'
                  styles={greyButton.root}
                  onClick={showDrawer}
                  variant="contained"
                />
              </>
            ) : null}
          </div>
          <div className={`${bc}__body__main-block`}>
            <div className={`${bc}__body__main-block__left-block`}>
              {visibleDrawer && <EventForm
                user={temporaryUser}
                onClose={onClose}
                showDrawer={showDrawer}
                visibleDrawer={visibleDrawer} />}
              {temporaryUser.dr_needed === 'true' ? (
                <AcceptTile
                // isAuthorize={isAuth}
                />
              ) : null}
              {temporaryUser.about &&
                <ArticleTile
                  title={'About'}
                  content={temporaryUser.about}
                //  isAuthorize={isAuth}
                />
              }
              {
                event && <EventTile event={event} />
              }
              {
                <Carousel
                  autoPlay={true}
                  autoPlaySpeed={3000}
                  showDots={true}
                  keyBoardControl={true}
                  infinite={true}
                  responsive={responsive}>

                  {temporaryUser?.pictures?.map(
                    (item: string, index: number) => {
                      return (
                        <div className={`${bc}__body_image_container`} key={index}>
                          <img
                            src={item}
                            onClick={toggleLightBox}
                            key={index}
                            className={`${bc}__body_image_container_img`}
                            alt=""
                          />
                        </div>
                      );
                    }
                  )
                  }
                </Carousel>
              }
              {
                temporaryUser?.prof_statement && <ArticleTile
                  key={temporaryUser.prof_statement}
                  title="Message to Caregivers"
                  content={temporaryUser.prof_statement}
                // isAuthorize={isAuth}
                />
              }
              {
                articleList.map(({ title, content }: any, index: number) => {
                  return Array.isArray(content) && content.length && content[0] !== '' ?
                    (
                      <ArticleTile
                        key={index}
                        title={title}
                        content={content}
                      // isAuthorize={isAuth}
                      />
                    ) : null
                })
              }
            </div>
            <div className={`${bc}__body__main-block__right-block`}>

              <div>
                <ContactPerson currentUser={temporaryUser} />
                <YouTube width={100} height={300} url={videoReff} />
                <div className={`${bc}__body__images-block}`}>
                  <img
                    src={temporaryUser.banner}
                    onClick={toggleLightBox}
                    className={`${bc}__body__images-block__images`}
                    alt=""
                    style={{ paddingTop: '15px' }}
                  />
                </div>
              </div>
              <div
                className={`${bc}__body__main-block__right-block__work-content`}
              >
                {rightArticlInfo.map(({ title, content }: any, index: number) => {
                  if (Array.isArray(content)) {
                    // if values are array
                    return content.length && content[0] !== '' &&
                      <WorkList
                        title={title}
                        content={content}
                        key={index}
                        temporaryUserId={temporaryUser && temporaryUser.id}
                        // border={index + 1 !== rightArticlInfo.length}
                        border={true}
                      // isAuthorize={isAuth}
                      />
                  } else {
                    return content !== '' ? <WorkList
                      title={title}
                      content={content}
                      key={index}
                      temporaryUserId={temporaryUser && temporaryUser.id}
                      // border={index + 1 !== rightArticlInfo.length}
                      border={true}
                    // isAuthorize={isAuth}
                    /> : null
                  }
                }
                )}
                {
                  temporaryUser?.working_days.length ? <div>
                    <div className={`${bc}__title-block`}>
                      <div className={`${bc}__title-block__article-text`}>
                        Days of Operation
                      </div>
                    </div>
                    {
                      temporaryUser?.working_hours?.map((day: any, index: any) => {
                        return (temporaryUser.working_days.includes(day.name)
                          ? <Row gutter={[24, 10]} key={index}>
                            <Col xs={24} sm={16} md={12} xl={8} xxl={8}>
                              <p className={`${bc}__title-block__text`}> {`${day.name}`}</p>
                            </Col>
                            <Col xs={24} sm={8} md={12} xl={16} xxl={16}>
                              <p className={`${bc}__title-block__text`}>{`${day.start_time} - ${day.end_time} `}</p>
                            </Col>
                          </Row>
                          : <Row gutter={[24, 10]} key={index}>
                            <Col xs={24} sm={16} md={12} xl={8} xxl={8}>
                              <p className={`${bc}__title-block__text`}> {`${day.name}`}</p>
                            </Col>
                            <Col xs={24} sm={8} md={12} xl={16} xxl={16}>
                              <p className={`${bc}__title-block__text`}>{`Closed `}</p>
                            </Col>
                          </Row>
                        )
                      })
                    }
                  </div> : null
                }
                {
                  temporaryUser?.specialities && <WorkList
                    title={'Diagnosis/Area of Concern'}
                    content={temporaryUser.specialities}
                    temporaryUserId={temporaryUser && temporaryUser.id}
                    // content={sortedSpecialities ?? temporaryUser.specialities}
                    key={'specialities'}
                    border={true}
                  // isAuthorize={isAuth}
                  />

                }
                {
                  <div>
                    <div className={`${bc}__title-block`}>
                      <p
                        // style={{ fontWeight: "bold" }}
                        className={`${bc}__title-block__article-text`}>
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
        </div>
        <Footer />
      </div>
    ) : (
      <div className={`${bc}__loader`}>
        {" "}
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
const mapDispatchToProps = { addCurrentUser };
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
