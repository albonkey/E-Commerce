import React from 'react';
import CallToAction from '../CallToAction/CallToAction';
import Showcase from '../Showcase/Showcase';
import Contact from '../Contact/Contact';
import './HomeScreen.css';

const HomeScreen = () => {
  return(
    <div>
      <CallToAction />
      <Showcase />
      <Contact />
    </div>
  )
}

export default HomeScreen;
