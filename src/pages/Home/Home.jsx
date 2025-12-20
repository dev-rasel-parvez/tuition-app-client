import HeroSection from "./HeroSection";
import LatestTuitions from "./LatestTuitions";
import LatestTutors from "./LatestTutors ";
import HowItWorks from "./HowItWorks";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  return (
    <div className="space-y-20">
      <HeroSection />
      <LatestTuitions />
      <LatestTutors />
      <HowItWorks />
      <WhyChooseUs />
    </div>
  );
};

export default Home;
