import React from 'react';
import { motion } from 'framer-motion';
import { 
  RocketOutlined, 
  SafetyCertificateOutlined, 
  MedicineBoxOutlined, 
  AimOutlined,
  ExperimentOutlined,
  HeartOutlined,
  GlobalOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import Breadcrumbs from '../components/Breadcrumbs';

const services = [
  {
    title: "Pediatric Vaccines",
    description: "Specialized immunization services for infants and children to ensure timely protection against preventable diseases.",
    icon: <SafetyCertificateOutlined className="text-blue-500" />
  },
  {
    title: "Gynaec Products",
    description: "High-quality pharmaceutical products dedicated to women's health and obstetric care.",
    icon: <MedicineBoxOutlined className="text-rose-500" />
  },
  {
    title: "Cancer Products",
    description: "Advanced oncology medications and supportive care products for comprehensive cancer treatment.",
    icon: <AimOutlined className="text-purple-500" />
  },
  {
    title: "Human Immunuglobin",
    description: "Essential immunoglobulin therapies for patients with immune deficiencies and specialized medical needs.",
    icon: <ExperimentOutlined className="text-cyan-500" />
  },
  {
    title: "Anexet (Flumazanil)",
    description: "Specialized clinical products including reversal agents for benzodiazepine-induced sedation.",
    icon: <RocketOutlined className="text-indigo-500" />
  },
  {
    title: "Cardiac Products",
    description: "Comprehensive range of medications and diagnostic aids for heart health and cardiovascular maintenance.",
    icon: <HeartOutlined className="text-red-500" />
  },
  {
    title: "Imported Drugs",
    description: "Access to globally sourced, high-quality international medications for specialized treatments.",
    icon: <GlobalOutlined className="text-emerald-500" />
  },
  {
    title: "Kidney Products",
    description: "Dedicated solutions for renal health, including dialysis support and nephrology medications.",
    icon: <MedicineBoxOutlined className="text-blue-600" />
  },
  {
    title: "Neuro Products",
    description: "Advanced pharmaceutical support for neurological disorders and central nervous system health.",
    icon: <AimOutlined className="text-amber-600" />
  },
  {
    title: "Derma Skin Speciality",
    description: "Expert dermatological products for skin care, therapeutic treatments, and aesthetic health.",
    icon: <HeartOutlined className="text-orange-500" />
  },
  {
    title: "HIV Products",
    description: "Modern antiretroviral medications and supportive care for comprehensive HIV management.",
    icon: <SafetyCertificateOutlined className="text-red-600" />
  },
  {
    title: "Lab Products",
    description: "Precision diagnostic tools and laboratory reagents for accurate medical testing and research.",
    icon: <ExperimentOutlined className="text-slate-600" />
  }
];

const ServicesPage = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 pt-1">
        <Breadcrumbs />
      </div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 py-16 sm:py-24">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-cyan-100/50 blur-3xl" />
        
        <div className="container relative mx-auto px-4 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-blue-600"
          >
            Our Expertise
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl"
          >
            Specialized Healthcare <span className="text-blue-600">Solutions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-slate-600"
          >
            We provide a comprehensive range of high-quality medical products and services tailored to meet the diverse needs of healthcare professionals and patients.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative flex flex-col rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-2xl group-hover:bg-blue-50">
                  {service.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900 group-hover:text-blue-600">
                  {service.title}
                </h3>
                <p className="flex-grow text-slate-600 leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                  <CheckCircleOutlined />
                  <span>Trusted Quality</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-slate-900 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Committed to Medical Excellence</h2>
          <p className="mx-auto max-w-2xl text-slate-400">
            Every product in our catalog undergoes rigorous quality checks to ensure it meets international standards for safety and efficacy.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
