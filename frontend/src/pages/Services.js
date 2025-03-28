import React from 'react';
import Header from '../components/Header';
import ScrollToTop from '../components/ScrollToTop';
import '../styles/services.scss';

const Services = () => {
  const services = [
    {
      category: "GenAI / ML",
      title: "Generative AI / Machine Learning",
      description: "Machine learning and generative AI both learn from data, but their purposes and strategies differ. Machine learning is focused on analyzing data to find patterns and make accurate predictions. GenAI, on the other hand, is focused on creating new data that resembles training data.",
      icon: "fa-brain",
      subServices: [
        {
          title: "GenAI Quickstart",
          description: "Our GenAI Quickstart service is designed to help your organization harness the power of generative AI quickly and effectively.",
          link: "#"
        },
        {
          title: "Generative AI Workshops",
          description: "A 1-2 day workshop to guide you from an initial idea to a detailed GenAI use-case, complete with an implementation plan.",
          link: "#"
        }
      ]
    },
    {
      category: "Cloud",
      title: "Cloud Solutions",
      description: "Powerful & flexible cloud platforms are the foundation for rapid, secure software development at scale. We help enterprises navigate the DevOps and cloud landscape with our experienced and talented engineers.",
      icon: "fa-cloud",
      subServices: [
        {
          title: "Platform Engineering",
          description: "We guide enterprises through the strategy and implementation of a cloud platform, empowering engineers and allowing them to achieve their strategic objectives with confidence.",
          link: "#"
        },
        {
          title: "Cloud Migration",
          description: "We guide organizations through the seamless migration of their workloads, applications, and data to the cloud, empowering them to harness the full potential of cloud.",
          link: "#"
        },
        {
          title: "Application Modernization",
          description: "We guide businesses through the modernization of their legacy applications, empowering them to thrive in the new software and data-driven world.",
          link: "#"
        },
        {
          title: "Software Architecture and Engineering",
          description: "We provide expert architecture and engineering services to help businesses develop cutting-edge software solutions that drive success.",
          link: "#"
        }
      ]
    }
  ];

  return (
    <>
      <ScrollToTop />
      <Header />
      <div className="services_page">
        <div className="services_hero">
          <div className="container">
            <h1>Supporting your Cloud, Data, and AI Journey</h1>
            <p>We offer a variety of services for both enterprises and startups, focused around DevOps and dealing with data</p>
          </div>
        </div>

        <section className="services_section">
          <div className="container">
            {services.map((service, index) => (
              <div key={index} className="service_category">
                <div className="category_header">
                  <i className={`fas ${service.icon}`}></i>
                  <h2>{service.category}</h2>
                </div>
                
                <div className="category_content">
                  <div className="main_service">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <div className="sub_services">
                    {service.subServices.map((subService, subIndex) => (
                      <div key={subIndex} className="sub_service_card">
                        <h4>{subService.title}</h4>
                        <p>{subService.description}</p>
                        <a href={subService.link} className="read_more">
                          Read more about {subService.title}
                          <i className="fas fa-arrow-right"></i>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Services; 