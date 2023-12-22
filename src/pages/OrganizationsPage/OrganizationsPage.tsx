// MAIN MODULES
import React, { Component, createRef, useEffect, useState } from "react";
import { connect } from "react-redux";

// COMPONENTS
import Tile from "../../components/OrgTile/OrgTile";
import Button from "../../components/Buttons";
import { getButtonRed } from "../../components/Buttons/style";
import { Row, Col } from "antd";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// STYLES
import "./styles.scss";

// TYPES
import { State } from "../../reducers";


// ACTIONS
import {
  addOrgList,
  setScrollPosition,
  setCarouselPosition,
} from "../../actions";

// SERVISES
import { getFbData, get20RecordsOrganization, base_URL } from "../../servises/firebase";
import userList from "../../reducers/userList";
import { CircularProgress } from "@material-ui/core";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";

const bc: string = "users_page";

interface ComponentProps {
  orgList: any[];
  addOrgList: any;
  setScrollPosition: any;
  scrollPosition: any;
  setCarouselPosition: any;
  carouselPosition: any;
}

const responsive = {
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
let body: any;

const OrganizationsPage = (props: ComponentProps) => {

  const [cursor, setCursor] = useState(null)
  const [width, setWidth] = useState(window.innerWidth)
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState("")
  const [orgsList, setOrgsList] = useState([])
  const [activeSlide, setActiveSlide] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [orgLength, setOrgLength] = useState([])
  const classes = getButtonRed("35px", "220px", '#39a2cf', '14px');
  let carousel: any = createRef();

  useEffect(()=>{
  //   window.addEventListener("resize", () =>
  //   setWidth(window.innerWidth)
  // );
  // if (props.orgList.length === 0) {
  //   setLoader(true);
  // }
  // const triggerOrg = props.addOrgList;
  // getFbData("organizations")
  //   .then((querySnapshot) => {
  //     const org: any = [];
  //     querySnapshot.forEach((doc: any) => {
  //       const newDoc: any = doc.data();
  //       org.push(newDoc);
  //     });
  //     triggerOrg(org);
  //     const approvedOrgs: any = [];
  //     org.map((item: any) => {
  //       if (item.approved) {
  //         approvedOrgs.push(item);
  //       }
  //     });
  //     const sortedOrgs =
  //       approvedOrgs &&
  //       approvedOrgs.sort((a: any, b: any) => {
  //         const textA = a.first_name && a.first_name.toUpperCase();
  //         const textB = b.first_name && b.first_name.toUpperCase();
  //         return textA < textB ? -1 : textA > textB ? 1 : 0;
  //       });
  //     setOrgsList(sortedOrgs);
  //     if (props.orgList.length > 0) {
  //       setLoader(false );
  //     }
  //   })
  //   .catch((e) => {
  //     setError(e);
  //   });

  // const orgs: any = [];
  // this.props.orgList.map((item: any) => {
  //   if (item.approved) {
  //     orgs.push(item);
  //   }
  // });
  // const sortedOrgs =
  //   orgs &&
  //   orgs.sort((a: any, b: any) => {
  //     const textA = a.first_name && a.first_name.toUpperCase();
  //     const textB = b.first_name && b.first_name.toUpperCase();
  //     return textA < textB ? -1 : textA > textB ? 1 : 0;
  //   });
  // this.setState({ orgsList: sortedOrgs });

   fetch(`${base_URL}/GetIdandName`)  // complete list cities, org, prof
      .then(response => response.json())
      .then(data => {
        if (data) {
          // organization ids list => data[0]
          setOrgLength(data[0])
        }
      })
  setTimeout(() => {
    const container = document.querySelector("#root>div:first-child");
    container.scrollTo({
      left: 0,
      top: props.scrollPosition,
      behavior: "smooth",
    });
    props.setScrollPosition(0);
  }, 1000);
  setTimeout(() => {
    if (carousel) {
      carousel.goToSlide(props.carouselPosition);
      props.setCarouselPosition(0);
    }
  }, 2200);
  },[])
  // const getDataFromFirebase = () => {
  //   const triggerOrg = props.addOrgList;
  //   setLoader(true);
  //   get20RecordsOrganization({
  //     cursor: cursor
  //   })
  //     .then((querySnapshot) => {
  //       const org: any = [];
  //       querySnapshot.forEach((doc: any) => {
  //         const newDoc: any = doc.data();
  //         org.push(newDoc);
  //       });
  //       triggerOrg([...orgsList, ...org]);
  //       // const approvedOrgs: any = [];
  //       // org.map((item: any) => {
  //       //   if (item.approved) {
  //       //     approvedOrgs.push(item);
  //       //   }
  //       // });
  //       // const sortedOrgs =
  //       //   approvedOrgs &&
  //       //   approvedOrgs.sort((a: any, b: any) => {
  //       //     const textA = a.first_name && a.first_name.toUpperCase();
  //       //     const textB = b.first_name && b.first_name.toUpperCase();
  //       //     return textA < textB ? -1 : textA > textB ? 1 : 0;
  //       //   });
  //       setOrgsList([...orgsList, ...org]);
  //       const lastOrg = org[org.length - 1]
  //       setCursor(lastOrg)
  //       setLoader(false);
  //     })
  //     .catch((error) => {
  //       console.log(error.message)
  //     })
  // }
  const getDataFromFirebase = async () => {
    const triggerOrg = props.addOrgList;
    setLoader(true);
  await get20RecordsOrganization({
      cursor: cursor
    })
      .then((querySnapshot) => {
        const org: any = [];
        querySnapshot.forEach((doc: any) => {
          const newDoc: any = doc.data();
          org.push(newDoc);
        });
        triggerOrg([...props.orgList, ...org]);
        const lastOrg = org[org.length - 1]
        setCursor(lastOrg)
        setLoader(false);
      })
      .catch((error) => {
        console.log(error.message)
      })
  }
  useEffect(()=>{
    // console.log(props.orgList.length ,'props.orgList.length ----------------ppppapapapapa',orgLength.length)
    // if( props.orgList.length < orgLength.length - 1){
    getDataFromFirebase();
    window.addEventListener("resize", () =>
    setWidth(window.innerWidth)
  );
    // }
  },[pageNumber])

  const nextPage = () => {
    setPageNumber(pageNumber + 1)
  }
  const breakpoint = 600;

    return <div className={bc}>
      <Header />
      <div className={`${bc}__header`}>
        <div className={`${bc}__header__top_text`}>
          Recently Added Organizations
          </div>
      </div>
      {
          <div ref={(ref) => (body = ref)}>
            <div className={`${bc}__body`}>
              <Row
                className="visible_md"
                style={{ width: "100%" }}
                justify="center"
                gutter={[20, 20]}
              >
                {props.orgList.map(
                  (
                    {
                      name,
                      city,
                      works_with,
                      org_type,
                      avatar,
                      id,
                      approved,
                      video,
                      wait_time
                    }: any,
                    index: number
                  ) => {
                    return approved ? (
                      <Col
                      >
                        <Tile
                          key={`${id}${name}`}
                          fullName={name}
                          orgType={org_type}
                          status={works_with}
                          location={city}
                          avatar={avatar}
                          id={id}
                          index={index}
                          video={video}
                          workSchedule={wait_time}
                        />
                      </Col>
                    ) : null;
                  }
                )}
              </Row>
              <Carousel
                className="visible_sm"
                responsive={responsive}
                ref={(el) => (carousel = el)}
              >
                {props.orgList.map(
                  (
                    {
                      name,
                      works_with,
                      org_type,
                      city,
                      avatar,
                      id,
                      approved,
                      video,
                      wait_time,
                    }: any,
                    index: number
                  ) => {
                    return (
                      approved && (
                        <Tile
                          key={`${id}${name}`}
                          fullName={name}
                          orgType={org_type}
                          status={works_with}
                          location={city}
                          avatar={avatar}
                          id={id}
                          index={index}
                          video={video}
                          workSchedule={wait_time}
                        />
                      )
                    );
                  }
                )}
              </Carousel>
              {
            loader ? (
              <div className={`${bc}__loader`}>
                <CircularProgress />
              </div>
            ) 
              : props.orgList.length == 0 || props.orgList.length < orgLength.length - 1 ?
              <div className={`${bc}__body_button`}>
                <Button
                  onClick={nextPage}
                  title='View More Organizations'
                  variant="contained"
                  styles={classes.root}
                />
              </div>:""
          }
            </div>
          </div>
      }
      <Footer />
    </div>
    // );
  
}

const mapStateToProps = (state: State) => ({
  ...state.orgList,
  ...state.app,
  ...state.app.scrollPosition,
});
const mapDispatchToProps = {
  addOrgList,
  setScrollPosition,
  setCarouselPosition,
};
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsPage);
