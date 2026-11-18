
import {
  House,
  Flower2,
  TrendingUp,
  Signpost,
  Droplets,
  UserCheck,
  MapPin,
  Headset,
  ArrowRight
} from "lucide-react";

import { SiteHeader, SiteFooter } from "./PublicProperties";
import "./services.css";

const services = [
  {
    icon: House,
    number: "01",
    title: "Farmland Sales",
    description:
      "Explore quality farmland properties in peaceful locations for investment and agricultural purposes."
  },
  {
    icon: Flower2,
    number: "02",
    title: "Agricultural Land",
    description:
      "Find suitable agricultural land with fertile surroundings for farming, cultivation, and future development."
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Property Investment",
    description:
      "Invest in valuable farmland and create opportunities for long-term growth and a secure future."
  },
  {
    icon: Signpost,
    number: "04",
    title: "Road Access Plots",
    description:
      "Discover farmland properties with convenient road access for easy travel and property management."
  },
  {
    icon: Droplets,
    number: "05",
    title: "Water Facility Lands",
    description:
      "Choose selected properties with suitable water facilities to support farming and land development."
  },
  {
    icon: UserCheck,
    number: "06",
    title: "Property Guidance",
    description:
      "Get trusted guidance to help you choose the right farmland for your needs and investment goals."
  },
  {
    icon: MapPin,
    number: "07",
    title: "Site Visit Assistance",
    description:
      "Visit and explore available farmland properties with assistance from our experienced team."
  },
  {
    icon: Headset,
    number: "08",
    title: "Customer Support",
    description:
      "We provide friendly support throughout your farmland property journey."
  }
];

export default function Services() {
  return (
    <div className="vf-public vf-services-page">

      <SiteHeader />

      <main>

        {/* Services Heading */}
        <section className="contact-banner vf-page-title">
          <div className="vf-page-title-inner">
            <h1>Our Services</h1>
            <div className="vf-breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <span>Services</span>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="vf-services-section about-description">
          <div className="vf-services-container">

            <div className="vf-services-heading">
              <span className="vf-services-kicker">
                WHAT WE OFFER
              </span>

              <h2>
                Complete Farmland Property Solutions
              </h2>

              <p>
                Discover reliable farmland property services designed
                to help you find the right land, make confident
                investment decisions, and build a better future.
              </p>
            </div>

            <div className="vf-services-grid">

              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <article
                    className="vf-service-card"
                    key={service.number}
                  >

                    <div className="vf-service-card-top">
                      <span className="vf-service-number">
                        {service.number}
                      </span>

                      <div className="vf-service-icon">
                        <Icon size={30} strokeWidth={1.7} />
                      </div>
                    </div>

                    <h3>{service.title}</h3>

                    <p>{service.description}</p>

                    <div className="vf-service-card-line" />

                  </article>
                );
              })}

            </div>

          </div>
        </section>

        {/* Contact CTA */}
        <section className="vf-home-cta">
          <h2>Let's Find Your Dream Farmland</h2>
          <p>
            Contact Viswa Farmland Properties and let us help you explore
            available farmland opportunities.
          </p>
          <a
            href="https://wa.me/919150102491"
            target="_blank"
            rel="noreferrer"
          >
            Chat with Us on WhatsApp <ArrowRight size={17} />
          </a>
        </section>

      </main>

      <SiteFooter />

    </div>
  );
}
