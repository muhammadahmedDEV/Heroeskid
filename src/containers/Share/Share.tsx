// MAIN MODULES
import React from "react";
import Swal from "sweetalert2";

// COMPONENTS
import Button from "../../components/Buttons";

// STYLES
import "./styles.scss";
import { getButtonRed } from "../../components/Buttons/style";

// interface ComponentProps {

// }

const bc: string = "share";

const Share = () => {
  return (
    <div className={bc}>
      <div className={`${bc}__body`}>
        <div className={`${bc}__body__share`}>
          Share your experience with others on Facebook
        </div>
        <div
          className="fb-share-button"
          data-href="https://ehkidshealth.com/"
          data-layout="button_count"
          data-size="large"
        >
          <a
            target="_blank"
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fehkidshealth.com%2F&amp;src=sdkpreparse"
            className="fb-xfbml-parse-ignore"
          >
            Share
          </a>
        </div>
      </div>
    </div>
  );
};

export default Share;
