// MAIN MODULES
import React from 'react'

// STYLES
import './styles.scss'

// ICON
import starbadge from '../../assets/icons/starbadge.png'

interface ComponentProps {
  title: string
  content: string
}

const bc: string = 'title-tile'

const TitleTile = ({ title, content }: ComponentProps) => {

  return (
    <div className={bc}>
      <div className={`${bc}__title-block`}>
        <div >
          <img className={`${bc}__logo-block__logo`} src={starbadge} alt='' />
        </div>
        <div className={`${bc}__title-block__article-text`}>{title}</div>
      </div>
      <div className={`${bc}__content-block`}>
        {content}
      </div>
    </div>
  )

}

export default TitleTile
