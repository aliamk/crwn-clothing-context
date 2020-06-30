import React from 'react';
import Directory from '../../components/directory/directory.component'

// import './homepage.styles.scss' 
/* REPLACING WITH STYLED-COMPONENTS */
import { HomePageContainer } from './homepage.styles'

// const HomePage = () => (
//   <div className="homePage">
//     <Directory />
//   </div>
// )

const HomePage = () => (
  <HomePageContainer>
    <Directory />
  </HomePageContainer>
)

export default HomePage