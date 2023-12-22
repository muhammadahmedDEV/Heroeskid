// MAIN MODULES
import React, { useState } from 'react'
import cn from 'classnames'
import Modal from '../Modal'
import WorkListForm from '../../containers/WorkListForm'

// COMPONENTS
import Button from '../Buttons'

// STYLES
import './styles.scss'
import { getButtonBlue } from '../Buttons/style'
// ICON
import hands from '../../assets/icons/hands.svg'
import oval from '../../assets/icons/oval.svg'

interface ComponentProps {
  isAuthorize?: boolean
}

const bc: string = 'accept-tile'

const AcceptTile = ({ isAuthorize }: ComponentProps) => {
  const classes = getButtonBlue('24px', '72px', 'white', false)
  const [isOpen, setVal] = useState(false)
  const triggerModal = (): void => { setVal(!isOpen) }
  return (
    <div className={bc}>
      {isOpen && <Modal><WorkListForm onCancel={triggerModal} /></Modal>}
      {isAuthorize
        ? <div className={cn(isAuthorize && 'button-block')}>
          <Button title={'Edit'} styles={classes.root} onClick={triggerModal} />
        </div>
        : null}
      <div className={`${bc}__title-block`}>
        <div >
          <div className={`${bc}__logo-block`}>
            <img className={`${bc}__logo-block__logo`} src={hands} alt='' />
            <img className={`${bc}__logo-block__logo`} src={oval} alt='' />
            <div className={`${bc}__logo-block__article-text`}>{'Accepting clients through Doctor Referral'}</div>
          </div>
        </div>
      </div>
      {/* <div className={`${bc}__content-block`}>
        {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'}
      </div> */}
    </div>
  )

}

export default AcceptTile
