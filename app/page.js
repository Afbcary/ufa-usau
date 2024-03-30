'use client'
import Navigation from './components/Navigation/Navigation';
import Motivation from './components/Motivation/Motivation';
import Acknowledgements from './components/Acknowledgements/Acknowledgements';
import Methodology from './components/Methodology/Methodology';
import Analysis from './components/Analysis/Analysis';

export default function Home() {
  return (
    <>
      <Navigation />
      <div id="wrapper">
        <Motivation />
        <Analysis />
        <Methodology />
        <Acknowledgements />
      </div>
    </>
  );
}
