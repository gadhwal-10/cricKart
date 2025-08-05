import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import '../pageStyles/About.css'; // ✅ Import the CSS

function About() {
  return (
    <>
      <Navbar />
      <PageTitle title="About-Us" />

      <div className="about-container">
        <h1 className="about-heading">About CricKart</h1>

        <p className="about-paragraph">
          Welcome to <strong>CricKart</strong> – your ultimate destination for top-notch cricket equipment. Whether you're a budding cricketer or a seasoned pro, we offer a hand-picked collection of gear to fuel your passion for the game.
        </p>
        <p className="about-paragraph">
          At CricKart, quality and durability are our hallmarks. Every product—from bats, balls, and guards to jerseys and accessories—is crafted with high-grade materials, ensuring peak performance on and off the pitch.
        </p>
        <p className="about-paragraph">
          We partner with trusted manufacturers to deliver only the best gear at affordable prices. Our goal is simple: make premium cricket gear accessible to every player across the country.
        </p>
        <p className="about-paragraph">
          <em>Thank you for trusting CricKart — Where Champions Shop!</em>
        </p>
      </div>

      <Footer />
    </>
  );
}

export default About;
