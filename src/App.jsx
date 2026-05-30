import Experience from "./Experience/Experience.jsx";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.jsx";
import SectionPanel from "./components/SectionPanel/SectionPanel.jsx";
import SectionNav from "./components/SectionNav/SectionNav.jsx";

export default function App() {
  return (
    <>
      <LoadingScreen />
      <Experience />
      <SectionNav />
      <SectionPanel />
    </>
  );
}
