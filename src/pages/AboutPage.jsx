import AboutIntroSection   from '../components/about/AboutIntroSection';
import MissionVisionSection from '../components/about/MissionVisionSection';
import TeamSection          from '../components/about/TeamSection';
import OurTeamSection       from '../components/about/OurTeamSection';
import TestimonialsSection  from '../components/sections/home/TestimonialsSection';
import SEO               from '../components/common/SEO';

/**
 * AboutPage — Route: /about
 *
 * Order: Intro → Mission/Vision → Creative Team → Our Team → Testimonials
 */
function AboutPage() {
  return (
    <main aria-label="About LabelAlly Entertainment">
      <SEO
        title="About LabelAlly Entertainment | YouTube & Music Management"
        description="LabelAlly Entertainment Private Limited is a digital music and YouTube management company helping artists, creators and music labels manage YouTube channels, digital rights, monetization and music distribution workflows."
        canonical="/about"
      />
      <AboutIntroSection />
      <MissionVisionSection />
      <TeamSection />
      <OurTeamSection />
      <TestimonialsSection />
    </main>
  );
}

export default AboutPage;
