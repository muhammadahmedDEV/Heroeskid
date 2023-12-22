// MAIN MODULES
import React, { useState } from "react";
// COMPONENTS
import Modal from "../Modal";
import HeaderForm from "../../containers/HeaderForm";

// STYLES
import "./styles.scss";
import { getButtonBlue } from "../Buttons/style";

// ICON
import mask_red from "../../assets/icons/badgemask.svg";
import nav_star from "../../assets/icons/nav_star.svg";
import avatar from "../../assets/team/avatar.png";

interface ComponentProps {
  currentUser: any;
  isAuthorize?: boolean;
}

const bc: string = "contact-logo";
const ContactPerson = ({ isAuthorize, currentUser }: ComponentProps) => {
  const classes = getButtonBlue("24px", "72px", "white", false);
  const [isOpen, setVal] = useState(false);
  const triggerModal = (): void => {
    setVal(!isOpen);
  };
  return (
    <div className={bc}>
      {isOpen && (
        <Modal>
          <HeaderForm onCancel={triggerModal} />
        </Modal>
      )}
      <div className={`${bc}__article-text`}>{`Contact our ${currentUser.contact_job_title}`}</div>
      <div className={`${bc}__contact-info`}>
        <div className={`${bc}__logo-block`}>
          <div
            className={`${bc}__logo-block__logo-mask`}
            style={{ position: "relative" }}
          >
            <img
              className={`${bc}__logo-block__logo-mask__logo`}
              src={
                currentUser?.contact_avatar ? currentUser.contact_avatar : avatar
              }
              alt=""
            />
            <img
              className={`${bc}__logo-block__logo-mask__mask`}
              src={mask_red}
              alt=""
            />
            <img
              className={`${bc}__logo-block__logo-mask__star`}
              src={nav_star}
              alt=""
            />
          </div>
        </div>
        <div className={`${bc}__contact-info__text-block`}>
          <p className={`${bc}__contact-info__text-block_name`}>{currentUser?.contact_first_name && currentUser?.contact_last_name
            ? `${currentUser?.contact_first_name} ${currentUser?.contact_last_name}`
            : ''}
          </p>
          <p className={`${bc}__contact-info__text-block_email`}>{currentUser?.contact_email
            ? `${currentUser?.contact_email}`
            : ''}
          </p>
          <p className={`${bc}__contact-info__text-block_name`}>{currentUser?.contact_phone
            ? `${currentUser?.contact_phone}`
            : ''}
          </p>
          <p className={`${bc}__contact-info__text-block_name`}>{currentUser?.contact_extension
            ? `Ext: ${currentUser?.contact_extension}`
            : ''}
          </p>

        </div>
      </div>
    </div>
  );
};
export default ContactPerson;
