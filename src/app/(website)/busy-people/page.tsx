import CoachHero from "@/components/cards/Hero/CoachHero";
import React from "react";
import Health from "@/public/images/Health-Co.png";
import Receive from "@/public/images/Health-Co.png";
import Target from "@/public/images/Health-Co.png";
import WellnessConsultationCard from "@/components/cards/Hero/CoachOverview";

function page() {
  return (
    <div className="">
      <CoachHero
        title="Clarity Health Audit"
        subtitle="1:1 Foundational Session – 60 mins"
        buttonText="Find A Coach"
        backgroundImage={Health}
        titleColor="" // Will use default styling from component
        subtitleColor="" // Will use default styling from component
        buttonColor="" // Will use default styling from component
      />

      <div className="">
        <WellnessConsultationCard
        overviewTitle="Overview:"
        overviewDescription="Transform your health one small, strategic habit at a time. Using neuroscience-based methods and “habit stacking” frameworks, this 3-session coaching track helps you build realistic, lasting routines around movement, food, sleep, and stress—even with a full schedule."
        overviewImage={Health.src}
        receiveImage={Receive.src} // Add this
        targetImage={Target.src} // Add this
        receiveTitle="What You'll Receive:"
        receiveItems={[
          "Comprehensive meal planning",
          "Weekly check-ins",
          "Recipe recommendations",
          "Nutrition education resources",
          "Progress tracking and feedback",
        ]}
        whoTitle="Who It's For:"
        whoDescription="First-time clients or anyone seeking clarity, direction, and practical next steps toward better energy, digestion, sleep, or mood."
        ctaText="Book Session"
        ctaColor="bg-blue-500 hover:bg-blue-600"
        backgroundColor="bg-[#F9FBFC]"
        cardBackgrounds={{
          analysis: "bg-gradient-to-br from-orange-100 to-orange-300",
          target: "bg-gradient-to-br from-pink-100 to-pink-300",
        }}
      />
      </div>
    </div>
  );
}

export default page;
