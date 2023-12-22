import React from 'react'

// CONTAINERS
import Terms from '../../components/LegalDoc/Terms'
import Header from '../../containers/Header'
import Footer from '../../containers/Footer'

// STYLES
import './styles.scss'
const bc: string = 'privacy-policy_page'

export default function TermsOfUse() {
  return (
    <div className={bc}>
      <Header />
      <Terms />
      <Footer />
    </div>
  )
}
