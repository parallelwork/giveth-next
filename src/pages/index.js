/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Hero from '../components/home/HeroSection'
import InfoSection from '../components/home/InfoSection'
import UpdatesSection from '../components/home/UpdatesSection'
import HomeTopProjects from '../components/home/HomeTopProjects'
import { usePopup } from '../contextProvider/popupProvider'

const IndexContent = ({ hideInfo, content, location }) => {
  const { triggerPopup } = usePopup()

  React.useEffect(() => {
    if (location?.state?.welcome) {
      triggerPopup('Welcome')
    }
  }, [])

  return (
    <>
      <Hero content={content} />
      <HomeTopProjects />
      {!hideInfo === true ? <InfoSection /> : null}
      <UpdatesSection />
    </>
  )
}

const IndexPage = props => {
  const { data, location } = props
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const content = frontmatter
  const hideInfo = process.env.HIDE_INFO_SECTION
    ? process.env.HIDE_INFO_SECTION
    : false

  return (
    <Layout isHomePage='true'>
      <Seo title='Home' />
      <IndexContent hideInfo={hideInfo} content={content} location={location} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($site: String!) {
    markdownRemark(frontmatter: { slug: { eq: $site } }) {
      html
      frontmatter {
        slug
        mainHead
        headBold
        mainText
        mainButton
        mainButtonText
      }
    }
  }
`
export default IndexPage
