// MAIN MODULES
import React from "react";
import Swal from "sweetalert2";

// COMPONENTS
import Button from "../../components/Buttons";

// STYLES
import "./styles.scss";
import { getButtonRed } from "../../components/Buttons/style";
import { Carousel } from "antd";

import LeftArrow from '../../assets/icons/ehk-leftarrow.svg'
import RightArrow from '../../assets/icons/ehk-rightarrow.svg'
// interface ComponentProps {

// }

const bc: string = "feedback-block";

const Feedback = () => {
  const classes = getButtonRed("35px", "200px");
  const trigger = async (): Promise<void> => {
    const { value: username } = await Swal.fire({
      title: "Tell us your name.",
      input: "text",
      inputPlaceholder: "Full name",
    });
    if (username) {
      //     Swal.fire(`Share Feedback as: ${username}`)
      window.open(
        `mailto:info@ehkidshealth.com?subject=Feedback from ${username}`
      );
    }
  };
  const NextArrow = (props: any) => {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{
          ...style,
          color: '#d12c27',
          fontSize: '15px',
          lineHeight: '1.5715'
        }}
        onClick={onClick}
      >
        <img src={RightArrow} alt="Right Arrow" />
      </div>
    )
  }
  const PrevArrow = (props: any) => {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{
          ...style,
          color: '#d12c27',
          fontSize: '15px',
          lineHeight: '1.5715'
        }}
        onClick={onClick}
      >
        <img src={LeftArrow} alt="Left Arrow" />
      </div>
    )
  }
  const settings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  }
  return (
    <div className={bc}>
      <div className={`${bc}__header`}>
        <div className={`${bc}__header__top_text`}>Community Feedback</div>
      </div>
      <div className={`${bc}__body`}>
        <Carousel autoplay
          arrows={true}
          {...settings}
          adaptiveHeight
          dots={true}
          dotPosition='bottom'
        >
          <div className={`${bc}__body__content`}>
            <div className={`${bc}__body__author`}>
              Pediatric Professional and clinic owner, said:
              </div>
            <div className={`${bc}__body__feedback`}>
              “You are truly doing something that is long overdue.  So far, your project is the best I have ever seen for peds.”
              </div>
          </div>
          <div className={`${bc}__body__content`}>
            <div className={`${bc}__body__author`}>
              Pediatrician, Pediatric Hospital, said:
              </div>
            <div className={`${bc}__body__feedback`}>
              “The problem you are solving is one I face everyday and ehkidshealth absolutely needs to exist.”
              </div>
          </div>
          <div className={`${bc}__body__content`}>
            <div className={`${bc}__body__author`}>
              Principal at Private School, said:
              </div>
            <div className={`${bc}__body__feedback`}>
              “I shared the EHKids info on Instagram through the school's account and one of my parents has
              already accessed the platform and was RAVING about all the great information and resources.
              She was so happy to find a place that provided connections to the support she needs for
              her son.”
              </div>
          </div>
          <div className={`${bc}__body__content`}>
            <div className={`${bc}__body__author`}>
              ER Pediatrician, said:
              </div>
            <div className={`${bc}__body__feedback`}>
              “Your website is extremely useful & people are seeing it.”
              </div>
          </div>
          <div className={`${bc}__body__content`}>
            <div className={`${bc}__body__author`}>
              Clinical Psychologist, said:
              </div>
            <div className={`${bc}__body__feedback`}>
              “This is such a trying time for many, it is great to have a community working together to help!”
              </div>
          </div>
          <div className={`${bc}__body__content`}>
            <div className={`${bc}__body__author`}>
            Pediatric Physiotherapist, said:
              </div>
            <div className={`${bc}__body__feedback`}>
              “Your post is so true, there are so many brilliant therapists out there that I know I have just stumbled across through recommendations from kids and their families that i wouldn't have been able to find with a google search - So I am so glad you are growing this.”
              </div>
          </div>
          <div className={`${bc}__body__content`}>
            <div className={`${bc}__body__author`}>
            Toronto Catholic District School Board Psychology Department, said:
              </div>
            <div className={`${bc}__body__feedback`}>
              “A-MA-ZING Resource! Find a Pediatric Professional & organizations that meet your specific needs in the areas of health, mental health and education.”
              </div>
          </div>
        </Carousel>
        <div className={`${bc}__body__sharebtn`}>
          <Button
            styles={classes.root}
            variant="contained"
            title={"Share Your Feedback"}
            onClick={trigger}
          />
        </div>
      </div>
    </div>
  );
};

export default Feedback;
