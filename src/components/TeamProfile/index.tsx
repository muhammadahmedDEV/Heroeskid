// MAIN MODULES
import React from "react";

// STYLES
import "./styles.scss";

const bc: string = "team-tile";
interface ComponentProps {
  avatar: string;
  name: string;
  designation: string;
  key: number;
  education: string;
}

const teamProfile = ({
  avatar,
  name,
  designation,
  key,
  education,
}: ComponentProps) => {
  return (
    <div className={bc} key={key}>
      <img src={avatar} alt={name} width="225rem" loading='lazy' />
      <p className="name-title"> {name} </p>
      <p className="sub-title"> {designation}</p>
      <p className="edu-title"> {education}</p>
    </div>
  );
};

export default teamProfile;
