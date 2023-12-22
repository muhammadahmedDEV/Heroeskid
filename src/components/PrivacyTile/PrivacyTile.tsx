// MAIN MODULES
import React from 'react'

// STYLES
import './styles.scss'

interface ComponentProps {
  onClick: () => void | undefined
}

const bc: string = 'privacy-tile'

const PrivacyTile = ({ onClick }: ComponentProps) => {
  const triggerAct = (): void => {
    onClick()
  }
  return (
    <div className={bc}>
      <p>I confirm that I have read, consent and agree to this site's <a className={`${bc}__link`}
        href="/privacy-policy"
        target='_blank'>
        Privacy Policy
        </a> and <a className={`${bc}__link`}
          href="/terms-of-use"
          target='_blank'>
          Terms of Use</a>
      </p>
      <button onClick={triggerAct}>Accept</button>
    </div>
  )
}

export default PrivacyTile
