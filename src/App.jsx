import Experience from "./Experience/Experience.jsx";
import CountdownRibbon from "./components/CountdownRibbon/CountdownRibbon.jsx";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.jsx";
import SectionPanel from "./components/SectionPanel/SectionPanel.jsx";
import SectionNav from "./components/SectionNav/SectionNav.jsx";
import ZoomSlider from "./components/ZoomSlider/ZoomSlider.jsx";

export default function App() {
  return (
    <>
      <LoadingScreen />
      <Experience />
      <SectionNav />
      <CountdownRibbon />
      <ZoomSlider />
      <SectionPanel />
    </>
  );
}
