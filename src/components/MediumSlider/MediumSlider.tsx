import React, { useState, useEffect } from "react";
import MediumCard from "./MediumCard";
import { Row, Col } from "antd";
import Button from "../Buttons";
import { getButtonRed } from "../Buttons/style";
import { useHistory } from "react-router";
import { CircularProgress } from "@material-ui/core";

const bc = "blog-slider";
interface ComponentProps {
  home?: boolean;
}
// wrapper for items
const MediumHome = (props: ComponentProps) => {
  const [avatar, setAvatar] = useState("");
  const [profileLink, setProfileLink] = useState("");
  const [itemRows, setItemRows] = useState([]);
  const classes = getButtonRed("35px", "200px");
  const [loader, setLoader] = useState(false);
  const mediumURL =
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@tam-70305";
  const history = useHistory();
  useEffect(() => {
    setLoader(true);
    fetch(mediumURL)
      .then((res) => res.json())
      .then((data) => {
        // create two-dimensional array with 3 elements per inner array
        const tempItemRows: any[] = [];
        const tempAvatar = data.feed.image;
        const tempProfileLink = data.feed.link;
        const res = data.items; //This is an array with the content. No feed, no info about author etc..
        const posts = res.filter((item: any) => item.categories.length > 0);
        setAvatar(tempAvatar);
        setProfileLink(tempProfileLink);

        posts.forEach((item: any, i: any) => {
          item.avatar = data.feed.image; // push avatar inside the json
          item.profileLink = data.feed.link; // push profile link inside the JSON
          const row = Math.floor(i / 3);
          if (!tempItemRows[row]) tempItemRows[row] = [];
          tempItemRows[row].push(item);
        });
        setItemRows(tempItemRows);
      });
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, []);

  const trigger = () => {
    history.push("/blog");
  };
  return loader ? (
    <div className={`${bc}__loader`}>
      <CircularProgress />
    </div>
  ) : props.home ? (
    <div className={bc}>
      <div className={`${bc}__header`}>
        <div className={`${bc}__header__top_text`}>Everyday Heroes Kids Digital</div>
      </div>
      <div className={`${bc}__body`}>
        {itemRows.map((row: any, i: any) => (
          <Row gutter={[16, 24]} key={i}>
            {i === 0
              ? row.map((item: any, j: any) => (
                <Col sm={24} md={8} lg={8} xl={8} xxl={8} key={j}>
                  <MediumCard {...item} />
                </Col>
              ))
              : null}
          </Row>
        ))}
        <div className={`${bc}__button`}>
          <Button
            styles={classes.root}
            variant="contained"
            title={"Read More"}
            onClick={trigger}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className={bc}>
      <h1 className={`${bc}__title`}>Everyday Heroes Kids Digital</h1>
      <div className={`${bc}__container`}>
        {itemRows.map((row: any, i: any) => (
          <Row gutter={[16, 24]} key={i}>
            {row.map((item: any, j: any) => (
              <Col sm={24} md={8} lg={8} xl={8} xxl={8} key={j}>
                <MediumCard {...item} />
              </Col>
            ))}
          </Row>
        ))}
      </div>
    </div>
  );
};

export default MediumHome;
