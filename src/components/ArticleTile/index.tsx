// MAIN MODULES
import React, { useState } from "react";
import cn from "classnames";

// COMPONENTS
import Button from "../Buttons";
import Modal from "../Modal";
import ArticleForm from "../../containers/ArticleForm";

// STYLES
import "./styles.scss";
import { getButtonBlue } from "../Buttons/style";

// ICON
import starbadge from "../../assets/icons/starbadge.png";

interface ComponentProps {
  title: string;
  content: any;
  isAuthorize?: boolean;
  twitter?: string;
}

const bc: string = "article-tile";

const ArticleTile = ({ title, content, isAuthorize }: ComponentProps) => {
  // const wordLength: number = 1700;
  const classes = getButtonBlue("24px", "72px", "white", false);
  const [isOpen, setVal] = useState(false);
  // const [readMore, setReadMore] = useState(false);
  const triggerModal = (): any => {
    setVal(!isOpen);
  };
  return (
    <div className={bc}>
      {isOpen && (
        <Modal>
          <ArticleForm onCancel={triggerModal} />
        </Modal>
      )}
      {isAuthorize ? (
        <div className={cn(isAuthorize && "button-block")}>
          <Button title={"Edit"} styles={classes.root} onClick={triggerModal} />
        </div>
      ) : null}
      <div className={`${bc}__title-block`}>
        <div>
          <img className={`${bc}__logo-block__logo`} src={starbadge} alt="" />
        </div>
        <div className={`${bc}__title-block__article-text`}>{title}</div>
      </div>
      <div className={`${bc}__content-block`}>
        <div className={`${bc}__content-block__text`}>
        {Array.isArray(content) ?
          content.map((item: string, index: number) => {
            if (item && item !== ' ') {
              return item == "https://www.sickkids.ca/en/directory/?rpp2489=12&s2489=relevance&f2489=Department" ? 
             <div key={index} className={`${bc}__list`}><div className={`${bc}__list__dot`} /> <a href={item} target="_blank">{item}</a></div> :
              <div key={index} className={`${bc}__list`}><div className={`${bc}__list__dot`} />{item}</div>
            } else return null
          }) :
          <div>{content}</div>
        }
        </div>
      </div>
    </div>
  );
};

export default ArticleTile;
