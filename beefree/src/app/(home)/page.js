import BeefreeSDK from "./components/BeefreeSDK/BeefreeSDK";
import Benefit from "./components/Benefit/Benefit";
import Brand from "./components/Brand/Brand";
import Hero from "./components/Hero/Hero";
import Review from "./components/Review/Review";
import Service from "./components/Service/Service";
import Statistics from "./components/Statistics/Statistics";
import Templates from "./components/Templates/Templates";
import Utils from "./components/Utils/Utils";

export default function Home() {
  return (
    <>
      <Hero />
      <Brand />
      <Review />
      <Statistics />
      <Benefit />
      <Service />
      <Templates />
      <Utils />
      <BeefreeSDK />
    </>
  );
}
