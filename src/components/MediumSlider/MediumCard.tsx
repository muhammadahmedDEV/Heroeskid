import React from "react";
import { Card, Avatar } from "antd";
import ShortenText from "../../utils/ShortenText";
import ToText from "../../utils/Totext";

import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import "./styles.scss";

const bc = "medium-card";
const MediumCard = (props: any) => {
  const date = new Date(props.pubDate.replace(" ", "T"));
  const dateString = date.toString();
  const dateParts = dateString.substr(4, 11);
  const publishDate = dateParts.substr(0, 6) + ", " + dateParts.substr(6);
  return (
    <a href={props.link} target="__blank" className={bc}>
      <Card
        className={`${bc}__card`}
        hoverable
        // style={{ maxWidth: 300 }}
        cover={
          <img
            alt="example"
            src={`${props.thumbnail}`}
            className={`${bc}__thumbnail`}
            loading='lazy'
          />
        }
      >
        <Meta
          avatar={<Avatar src={`${props.avatar}`} />}
          title={ShortenText(props.title, 0, 50)}
          description={ShortenText(ToText(props.content), 0, 80) + "..."}
        />
        <div className={`${bc}__info`}>
          <div>
            <UserOutlined style={{ margin: "0 10px" }} />{" "}
            <b className={`${bc}__info__author`}>{props.author}</b>
          </div>
          <div>
            <CalendarOutlined style={{ margin: "0 10px" }} />{" "}
            <b className={`${bc}__info__date`}>{publishDate}</b>
          </div>
        </div>
      </Card>
    </a>
  );
};

export default MediumCard;
