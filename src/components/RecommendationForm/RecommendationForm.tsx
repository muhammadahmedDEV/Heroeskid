import React, { useState } from "react";
import { getButtonRed } from "../Buttons/style";
// COMPONENTS
import Button from "../Buttons";
import { color } from "../../constants/color";
interface ComponentProps {
  recommendedBy: string;
  profileType?: string
}
const RecommendationForm = ({ recommendedBy, profileType }: ComponentProps) => {
  const classes = profileType === 'org' ? getButtonRed("35px", "200px", color.AQUA_BLUE) : getButtonRed("35px", "200px");
  const bc: string = "recommendation-block";
  const emailBody =
    "Hi there – I just signed up for this new pediatric platform, Everyday Heroes Kids and wanted to share it with you. At Everyday Heroes Kids, caregivers select their best-fit pediatric professionals working in the health and education sectors by viewing detailed profiles including their video interviews, saving time, money and stress and delivering timely, compassionate, quality care for children." +
    "%0D%0A" +
    "%0D%0A" +
    "Please have a look! www.ehkidshealth.com";
  const onClick = (): void => {
    // const email: string = temporaryUser["email"];
    window.open(`mailto:?subject=Visit Everyday Heroes Kids&body=${emailBody}`);
  };
  return (
    <div className={`${bc}__body__sharebtn`}>
      <Button
        styles={classes.root}
        variant="contained"
        title={"Refer a Friend"}
        // onClick={trigger}
        onClick={onClick}
      />
    </div>
  );
};
export default RecommendationForm;
