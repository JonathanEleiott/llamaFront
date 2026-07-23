import { Users, Award, Heart, Leaf } from 'lucide-react';
import './About.css';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every item is crafted with care and attention to detail, as if we were baking for our own family.',
    },
    {
      icon: Leaf,
      title: 'Quality Ingredients',
      description: 'Proudly crafting small-batch baked goods with quality ingredients and homemade goodness.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We believe in building relationships with our customers and giving back to our community.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for perfection in every batch, constantly improving our recipes and techniques.',
    },
  ];

  const team = [
    {
      name: 'Leslie Eleiott',
      role: 'Head Baker & Founder',
      bio: 'With over 20 years of baking experience, Leslie brings traditional techniques from her grandmother combined with modern innovation.',
    },
    {
    name: 'Jonathan Eleiott',
    role: 'Head Pastry Consumer',
    bio: 'Trained extensively at the counter, Jonathan specializes in quality control through enthusiastic sampling. Responsible for approving croissants, danishes, and anything with butter.',
    },
    {
      name: 'Lux Eleiott',
      role: 'Big Helper',
      bio: 'Specializes in applying stickers, taping boxes securely, and carefully mailing cookie packages.',
    },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-title">Our Story</h1>
          <p className="about-subtitle">
            A passion for baking that started in a small kitchen.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>How It All Began</h2>
              <p>
                Llama Treats Bakery was born in 2022 from a simple dream: to create
                a place where the aroma of freshly baked goods fills the air and
                every bite brings joy. What started as a small operation in founder
                Leslie's home kitchen quickly grew as word spread about our
                delicious cookies and fudge.
              </p>
              <p>
                Our name comes from Leslie's favorite animal. The llama, a symbol of hard work
                and endurance in Peruvian culture, perfectly represents our
                dedication to our craft.
              </p>
              <p>
                Today, we operate from our cozy bakery in our home, but our
                philosophy remains the same: use the best ingredients, honor
                traditional techniques, and always bake with love.
              </p>
            </div>
            <img className="image-placeholder" style={{"border-radius":"50px"}}src="./llamaTreats.png" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  <value.icon size={28} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">
            The talented people behind your favorite treats
          </p>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">
                  <span>{member.name.charAt(0)}</span>
                </div>
                <h3 className="team-name">{member.name}</h3>
                <span className="team-role">{member.role}</span>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="about-timeline">
        <div className="container">
          <h2 className="section-title">Our Journey</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2022</div>
              <div className="timeline-content">
                <h3>The Beginning</h3>
                <p>Started baking for friends & family.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2023</div>
              <div className="timeline-content">
                <h3>Relocation</h3>
                <p>Moved from Arizona to South Carolina.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2024</div>
              <div className="timeline-content">
                <h3>Expansion</h3>
                <p>Started producing Cookie Advent Calendars for Christmas.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2025</div>
              <div className="timeline-content">
                <h3>Community Outreach</h3>
                <p>Began the "Share the Cookie" initiative.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2026</div>
              <div className="timeline-content">
                <h3>Growing Strong</h3>
                <p>Launched the Llama Treats Bakery website.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
