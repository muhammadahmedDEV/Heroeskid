// MAIN MODULES
import React, { useState } from 'react'
import cn from 'classnames'

// COMPONENTS
import Button from '../Buttons'
import Modal from '../Modal'
import WorkListForm from '../../containers/WorkListForm'

// STYLES
import './styles.scss'
import { getButtonBlue } from '../Buttons/style'
// ICON

interface ComponentProps {
  title: string
  content: any
  border?: boolean
  isAuthorize?: boolean
  temporaryUserId : any
}

const bc: string = 'work-list'

const WorkList = ({ title, content, border, isAuthorize, temporaryUserId }: ComponentProps) => {
  const classes = getButtonBlue('24px', '72px', 'white', false)
  const [isOpen, setVal] = useState(false)
  const triggerModal = (): void => { setVal(!isOpen) }
  return (
    <div className={title == "Average Waiting Time" ? ""  : cn(bc, border && 'border')}>
      {isOpen && <Modal><WorkListForm onCancel={triggerModal} /></Modal>}
      {isAuthorize
        ? <div className={cn(isAuthorize && 'button-block-wt')}>
          <Button title={'Edit'} styles={classes.root} onClick={triggerModal} />
        </div>
        : null}
     {/* {content == "7MNup7DH16pfhD4B49SR" && title == "Serving The Following Areas" ? "": */}
     
     {temporaryUserId == "7MNup7DH16pfhD4B49SR" && title == "Serving The Following Areas" ? ""  :
    //  temporaryUserId == "7MNup7DH16pfhD4B49SR" &&
      title == "Average Waiting Time" ? ""  :
      <div className={`${bc}__title-block`}>
          <div className={`${bc}__title-block__article-text`}>{title}</div>
      </div>}
      {/* // } */}
      <div className={`${bc}__content-block`}>
      {Array.isArray(content) ?
          content.map((item: string, index: number) => {
            if (item && item !== ' ' && item !== "Specific") {
              return temporaryUserId == "7MNup7DH16pfhD4B49SR" && title == "Serving The Following Areas" ? ""  : <div key={index} className={`${bc}__list`}><div className={`${bc}__list__dot`} />{item}</div>
            } else return null
          }) :
          title === 'Fund Raising'
          ? <a href={content} target= {'_blank'}> {content}</a>
          : <div>{
            // temporaryUserId == "7MNup7DH16pfhD4B49SR" &&
           title == "Average Waiting Time" ? "": content}</div>
        }
      </div>
    </div>
  )

}

export default WorkList
