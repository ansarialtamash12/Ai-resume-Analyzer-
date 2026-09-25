import Navabr from "../components/Navabr";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Stats from "../components/Stats";

const Dashboard = () => {
  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-hidden">
        <img
          src="/images/laptop.webp"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10">
          <Navabr />
          <HeroSection />
          <HowItWorks />
          <Features />
          <Stats />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
