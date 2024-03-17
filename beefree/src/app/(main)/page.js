import Benefit from "./components/Benefit/Benefit";
import Brand from "./components/Brand/Brand";
import Hero from "./components/Hero/Hero";
import Review from "./components/Review/Review";
import Service from "./components/Service/Service";
import Statistics from "./components/Statistics/Statistics";

export default function Home() {
  return (
    <>
      <Hero />
      <Brand />
      <Review />
      <Statistics />
      <Benefit />
      <Service />
    </>
  );
}
