"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Phone, MessageSquare, MapPin, Clock, ChevronUp, PlayCircle, Menu, X, Facebook, Instagram, Mail, Twitter, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import logo from "@/assets/app_logo.jpeg"
import image from "@/assets/image.png"
import PricingSection from "./componets/pricing"
export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navItems = ["home", "about", "services", "location", "faq", "contact"]
  const [selectedService, setSelectedService] = useState("All Services");
  const [openFAQ, setOpenFAQ] = useState(null);
  const currentYear = new Date().getFullYear();

  // Toggle function for FAQ items
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // FAQ data
  const faqItems = [
    {
      question: "How does your pickup and delivery service work?",
      answer: "Our pickup and delivery service is simple and convenient. Schedule a pickup through our app, website, or by calling us. We'll collect your laundry at the scheduled time, process it according to your preferences, and deliver it back to you fresh and clean at the time you specify.",
      icon: "🚚",
      color: "blue"
    },
    {
      question: "What's your turnaround time?",
      answer: "Our standard turnaround time is 24-48 hours, depending on the service. We also offer express services with same-day or next-day delivery for an additional fee. When scheduling your pickup, you can select your preferred delivery time.",
      icon: "⏱️",
      color: "green"
    },
    {
      question: "Do you use eco-friendly products?",
      answer: "Yes, we're committed to environmental sustainability. We use eco-friendly, biodegradable detergents and cleaning solutions that are gentle on your clothes and the planet, while still providing exceptional cleaning results.",
      icon: "🌱",
      color: "emerald"
    },
    {
      question: "How do you handle delicate garments?",
      answer: "Delicate garments receive special attention and care. We inspect each item, sort them appropriately, and use gentle cleaning methods according to the care label instructions. For particularly delicate items, we recommend our specialized dry cleaning service.",
      icon: "👔",
      color: "purple"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit and debit cards, UPI payments, cash on delivery, and online bank transfers. You can also set up automatic payments through our app for regular customers.",
      icon: "💳",
      color: "amber"
    },
    {
      question: "How do I report a concern with my order?",
      answer: "Customer satisfaction is our priority. If you have any concerns, please contact us within 48 hours of delivery. You can call our customer service line, use the 'Report an Issue' feature in our app, or send us an email, and our team will promptly address your concern.",
      icon: "🛎️",
      color: "rose"
    }
  ];
  // Offer data for each service type
  const serviceOffers = {
    "All Services": {
      title: "New Customer Discount",
      subtitle: "Valid for first-time customers only",
      description: "Enjoy <span class=\"font-bold text-blue-600\">25% off</span> on your first order! Our premium cleaning services ensure your clothes look fresh and pristine every time.",
      code: "WASHCLOTHES25",
      benefits: ["Free pickup & delivery", "24-hour turnaround"],
      cta: "I'd like to use my WASHCLOTHES25 discount on my first order",
      gradient: "from-blue-600 to-blue-800",
    },
    "Wash & Fold": {
      title: "Wash & Fold Special",
      subtitle: "Perfect for everyday laundry",
      description: "Get <span class=\"font-bold text-blue-600\">30% off</span> on Wash & Fold services for orders over 5kg! We'll take care of sorting, washing, and perfectly folding your items.",
      code: "WASHFOLD30",
      benefits: ["Fabric softener included", "Sorted by color & fabric type"],
      cta: "I'd like to use my WASHFOLD30 discount for Wash & Fold service",
      gradient: "from-blue-500 to-blue-700",
    },
    "Dry Cleaning": {
      title: "Premium Dry Cleaning",
      subtitle: "For your delicate garments",
      description: "Receive <span class=\"font-bold text-purple-600\">20% off</span> on all dry cleaning services! Ideal for suits, dresses, and delicate fabrics that require special care.",
      code: "DRYCLEAN20",
      benefits: ["Stain treatment included", "Garment inspection report"],
      cta: "I'd like to use my DRYCLEAN20 discount for Dry Cleaning",
      gradient: "from-purple-500 to-purple-700",
    },
    "Ironing": {
      title: "Professional Ironing",
      subtitle: "Crisp, wrinkle-free finish",
      description: "Save <span class=\"font-bold text-green-600\">15% off</span> on our premium ironing services! Get that perfect pressed look for your office wear and formal attire.",
      code: "IRONPRO15",
      benefits: ["Hanger or folded options", "Same-day service available"],
      cta: "I'd like to use my IRONPRO15 discount for Ironing service",
      gradient: "from-green-500 to-green-700",
    },
    "Shoe Cleaning": {
      title: "Shoe Cleaning Bundle",
      subtitle: "Revitalize your footwear",
      description: "Book our <span class=\"font-bold text-orange-600\">shoe cleaning service</span> and get a free shoe protection spray worth ₹250! Restore the look of your favorite shoes.",
      code: "SHOECLEAN",
      benefits: ["Deep stain removal", "Protection spray included"],
      cta: "I'd like to use my SHOECLEAN discount for Shoe Cleaning",
      gradient: "from-orange-500 to-orange-700",
    },
  };
  const [toastVisible, setToastVisible] = useState(true);

  // Get the currently selected offer data
  const currentOffer = serviceOffers[selectedService];
  const handleClaimNow = () => {
    const phoneNumber = "+918712326333"; // Replace with your phone number

    const message = "I'd like to claim my 25% discount!";

    // Create WhatsApp URL with encoded message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = [...navItems].reverse();
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - (window.innerHeight / 3)) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  const navbarVariants = {
    transparent: {
      backgroundColor: "rgba(255, 255, 255, 0)",
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
      height: "80px"
    },
    solid: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      height: "70px"
    }
  }

  const logoVariants = {
    large: { scale: 1 },
    small: { scale: 0.9 }
  }

  const menuItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.05,
      color: "#2563EB",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }

  const mobileMenuVariants = {
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        when: "beforeChildren",
        staggerChildren: 0.1,
        staggerDirection: 1
      }
    }
  }

  const mobileMenuItemVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 }
  }

  const underlinerVariants = {
    initial: { width: 0 },
    active: { width: "100%" }
  }

  return (
    <main className="min-h-screen bg-white">

      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center"
        initial="transparent"
        animate={isScrolled ? "solid" : "transparent"}
        variants={navbarVariants}
        transition={{ duration: 0.4 }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div
            variants={logoVariants}
            animate={isScrolled ? "small" : "large"}
            transition={{ duration: 0.4 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative overflow-hidden rounded-full">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Image
                    src={logo}
                    alt="WashMyClothes"
                    width={isScrolled ? 38 : 45}
                    height={isScrolled ? 38 : 45}
                    className="rounded-full shadow-sm"
                  />
                </motion.div>
              </div>
              <motion.span
                className="font-bold text-xl text-blue-600"
                whileHover={{
                  textShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
                  transition: { duration: 0.2 }
                }}
              >
                WashMyClothes
              </motion.span>
            </Link>
          </motion.div>

          <div className="hidden md:flex space-x-10">
            {navItems.map((item, i) => (
              <motion.div
                key={item}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={menuItemVariants}
                className="relative"
              >
                <motion.button
                  onClick={() => scrollToSection(item)}
                  className={`text-sm font-medium capitalize py-2 px-1 ${activeSection === item ? "text-blue-600" : "text-gray-700"
                    }`}
                  whileHover="hover"
                >
                  {item}
                  <motion.div
                    className="h-0.5 bg-blue-600 absolute bottom-0 left-0"
                    initial="initial"
                    animate={activeSection === item ? "active" : "initial"}
                    variants={underlinerVariants}
                    transition={{ duration: 0.3, type: "spring", stiffness: 500 }}
                  />
                </motion.button>
              </motion.div>
            ))}
            <motion.a
              href="https://wa.me/+918712326333"
              className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg font-semibold text-sm hover:bg-blue-700 transition duration-300 ease-in-out"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Now
            </motion.a>
          </div>

          <motion.button
            className="md:hidden relative z-50"
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-blue-600"
                >
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-700"
                >
                  <Menu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 w-72 h-full bg-white shadow-xl z-40 flex flex-col items-start p-10 pt-24"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-blue-50 opacity-30 z-0" />

              <div className="w-full relative z-10 space-y-2">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item}
                    variants={mobileMenuItemVariants}
                    className="w-full"
                    custom={i}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <button
                      onClick={() => scrollToSection(item)}
                      className={`py-3 px-4 text-lg font-medium capitalize w-full text-left flex items-center space-x-2 rounded-md ${activeSection === item
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      <motion.span
                        animate={{
                          x: activeSection === item ? 5 : 0,
                          transition: { type: "spring", stiffness: 300 }
                        }}
                      >
                        {item}
                      </motion.span>

                      {activeSection === item && (
                        <motion.div
                          layoutId="activeMobileIndicator"
                          className="w-1 h-5 bg-blue-600 rounded-full"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Add Action Buttons for Mobile */}
              <motion.div
                className="w-full relative z-10 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="space-y-3">
                  <motion.a
                    href="https://wa.me/+918712326333"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md font-semibold text-base w-full flex items-center justify-center space-x-2 hover:bg-blue-700 transition duration-300 ease-in-out"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageSquare size={18} />
                    <span>Book Now</span>
                  </motion.a>

                  <div className="grid grid-cols-2 gap-3">
                    <motion.a
                      href="https://wa.me/+918712326333"
                      className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-md font-medium text-sm flex items-center justify-center space-x-2 hover:bg-green-600 transition duration-300 ease-in-out"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MessageSquare size={16} />
                      <span>WhatsApp</span>
                    </motion.a>

                    <motion.a
                      href="tel:+918712326333"
                      className="bg-gray-700 text-white px-4 py-3 rounded-lg shadow-md font-medium text-sm flex items-center justify-center space-x-2 hover:bg-gray-800 transition duration-300 ease-in-out"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Phone size={16} />
                      <span>Call Now</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-10 left-0 right-0 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center text-blue-600 space-x-1 px-4 py-2 rounded-full bg-blue-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronUp size={16} />
                  <span className="text-sm font-medium">Close Menu</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>


      <section id="home" className="min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden relative">
        {/* Enhanced Background with Layered Gradients */}
        <div className="absolute inset-0 z-0">
          {/* Background gradient base */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50 to-white opacity-70"></div>

          {/* Animated background elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 2 }}
            className="absolute top-20 left-10 w-60 h-60 rounded-full bg-blue-400 blur-[100px]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-300 blur-[120px]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute top-40 right-40 w-48 h-48 rounded-full bg-green-200 blur-[80px]"
          />

          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto">
            {/* Left Content - Enhanced with Better Typography and Animations */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 70,
                damping: 20
              }}
              className="md:w-1/2 mb-12 md:mb-0 md:pr-8"
            >
              {/* Main Heading with Enhanced Animation */}
              <div className="mb-8">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "40%" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-1 bg-blue-500 mb-6 rounded-full"
                />

                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-4 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  Premium{" "}
                  <motion.span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 inline-block relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.5,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    Laundry
                    <motion.div
                      className="absolute -bottom-2 left-0 h-3 w-full bg-blue-200 -z-10 rounded-lg"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                    />
                  </motion.span>{" "}
                  <br className="hidden md:block" />
                  Made <span className="relative inline-block">
                    Simple
                    <motion.svg
                      className="absolute -bottom-2 left-0 w-full"
                      height="6"
                      viewBox="0 0 100 6"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 1.1 }}
                    >
                      <path
                        d="M 0 3 Q 25 6 50 3 Q 75 0 100 3"
                        stroke="#BFDBFE"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </motion.svg>
                  </span>
                </motion.h1>
              </div>

              {/* Enhanced Description with Animated Character Reveal */}
              <motion.p
                className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                At <motion.span
                  className="font-bold text-blue-600"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 }}
                >WashMyClothes</motion.span>, we make laundry effortless. Fresh, clean, and perfectly folded—because your time is precious.
              </motion.p>

              {/* Call to Action Buttons with Enhanced Animation */}
              <motion.div
                className="flex flex-col sm:flex-row items-center gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                {/* Primary CTA - Book Now */}
                <motion.a
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  href="https://wa.me/+918712326333"
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 px-7 rounded-full font-medium text-base shadow-lg hover:shadow-blue-500/30"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Book Now</span>
                </motion.a>

                {/* Secondary CTA - Google Play */}
                <motion.a
                  whileHover={{ scale: 1.03, backgroundColor: "#111" }}
                  whileTap={{ scale: 0.98 }}
                  href="#download"
                  className="flex items-center space-x-3 bg-gray-900 hover:bg-black text-white py-3 px-6 rounded-full transition-all shadow-md hover:shadow-gray-400/20"
                >
                  <PlayCircle size={24} className="text-green-400" />
                  <div className="flex flex-col">
                    <span className="text-xs">GET IT ON</span>
                    <span className="font-bold text-sm">Google Play</span>
                  </div>
                </motion.a>
              </motion.div>

              {/* Enhanced Features Overview with Hover Effects */}
              <motion.div
                className="grid grid-cols-2 gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                {[
                  { label: "Pickup & Delivery", color: "blue", icon: "📦" },
                  { label: "Eco-Friendly", color: "green", icon: "🌱" },
                  { label: "24hr Turnaround", color: "purple", icon: "⏱️" },
                  { label: "Premium Quality", color: "amber", icon: "✨" }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    className={`flex items-center gap-3 p-3 rounded-lg hover:bg-${feature.color}-50 transition-colors duration-300 border border-transparent hover:border-${feature.color}-200 group`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className={`w-10 h-10 rounded-full bg-${feature.color}-100 flex items-center justify-center text-lg shadow-sm group-hover:bg-${feature.color}-200 transition-colors duration-300`}>
                      {feature.icon}
                    </div>
                    <span className="font-medium">{feature.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Enhanced Image Section with Advanced Animations */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 70,
                damping: 20,
                delay: 0.4
              }}
              className="md:w-1/2 relative"
            >
              {/* Main image with enhanced container and effects */}
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="relative z-10 overflow-hidden rounded-2xl shadow-2xl"
                >
                  {/* Animated background shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-white via-blue-200 to-white opacity-30 z-10"
                    animate={{
                      x: ["0%", "100%", "0%"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "linear"
                    }}
                  />

                  <Image
                    src={image}
                    alt="WashMyClothes"
                    width={600}
                    height={500}
                    className="rounded-2xl transition-transform hover:scale-105 duration-700 z-0"
                  />

                  {/* Enhanced overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent" />

                  {/* Enhanced badge with 3D effect */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 10, y: 20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
                    className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-xl border border-blue-100"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-gray-800">Top Rated Service</span>
                    </div>
                  </motion.div>

                  {/* Floating Stats */}
                  <motion.div
                    initial={{ opacity: 0, x: -30, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.8, type: "spring" }}
                    className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-blue-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="text-xl">⭐</div>
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-500">Customer Rating</div>
                        <div className="font-bold text-blue-600">4.9/5.0</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Enhanced decorative elements */}
              <motion.div
                initial={{ opacity: 0, rotate: -15, x: 20 }}
                animate={{ opacity: 0.7, rotate: 0, x: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-tr from-blue-100 to-blue-50 rounded-lg z-0"
              />
              <motion.div
                initial={{ opacity: 0, rotate: 15, x: -20 }}
                animate={{ opacity: 0.7, rotate: 0, x: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute -bottom-8 -left-8 w-28 h-28 bg-gradient-to-bl from-blue-50 to-white rounded-lg z-0"
              />

              {/* Animated dots pattern */}
              <div className="absolute right-4 bottom-20 z-0 opacity-30">
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(9)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-blue-500 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Redesigned Floating Action Buttons with Better Shadow and Effects */}
        <div className="fixed bottom-6 right-6 z-50 block">
          <div className="group relative">
            {/* WhatsApp button */}
            <a
              href="https://wa.me/+918712326333"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-28 right-0 w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white flex items-center justify-center shadow-lg 
                opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
              aria-label="Contact on WhatsApp"
            >
              <div className="absolute inset-0 rounded-full bg-white opacity-30 hover:opacity-0 transition-opacity duration-300"></div>
              <MessageSquare size={20} />

              {/* Enhanced label */}
              <span className="absolute right-14 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100 shadow-lg">
                WhatsApp
              </span>
            </a>

            {/* Phone button */}
            <a
              href="tel:+918712326333"
              className="absolute bottom-14 right-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg 
                opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
              aria-label="Call now"
            >
              <div className="absolute inset-0 rounded-full bg-white opacity-30 hover:opacity-0 transition-opacity duration-300"></div>
              <Phone size={20} />

              {/* Enhanced label */}
              <span className="absolute right-14 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100 shadow-lg">
                Call Now
              </span>
            </a>

            {/* Main floating button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              {/* Enhanced pulse animation effect */}
              <span className="absolute w-full h-full rounded-full bg-blue-600 animate-ping opacity-20"></span>

              <button
                className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white flex items-center justify-center shadow-xl hover:shadow-blue-500/30 hover:shadow-lg transition-all relative z-20 border-2 border-blue-400 border-opacity-20"
                aria-label="Contact options"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Promotional Toast Notification */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: -100, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -100, x: "-50%" }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full md:w-auto"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-4 rounded-xl shadow-2xl border border-blue-400 overflow-hidden relative">
              {/* Background animation effect */}
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear"
                }}
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 10%, transparent 10%)",
                  backgroundSize: "20px 20px"
                }}
              />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
                {/* Discount message with animated emoji */}
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{
                      rotate: [0, 10, 0, -10, 0],
                      scale: [1, 1.2, 1, 1.2, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                    className="text-2xl"
                  >
                    🎉
                  </motion.div>
                  <div className="font-medium">
                    First-Time Customers Get a <span className="font-bold text-yellow-300">Flat 25% Discount!</span>
                  </div>
                  <motion.div
                    animate={{
                      rotate: [0, -10, 0, 10, 0],
                      scale: [1, 1.2, 1, 1.2, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      delay: 0.5
                    }}
                    className="text-2xl"
                  >
                    🎉
                  </motion.div>
                </div>


                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClaimNow}
                  className="bg-white text-blue-700 px-5 py-2.5 rounded-lg font-bold hover:bg-blue-50 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center gap-1"
                >
                  <span>Claim Now</span>
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>

                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setToastVisible(false)}
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="black">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <section id="about" className="py-16 bg-gray-50 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-300 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-blue-400 blur-3xl" />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              About WashMyClothes
            </motion.h2>

            <motion.div
              className="w-20 h-1 bg-blue-600 mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />

            <motion.p
              className="max-w-3xl mx-auto text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              At WashMyClothes, we believe that laundry should be effortless. Our professional cleaning services ensure
              that your garments are fresh, spotless, and perfectly folded—every time. With our state-of-the-art equipment
              and eco-friendly detergents, we take care of your laundry so you can focus on what truly matters.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Superior Cleaning",
                description:
                  "We use advanced washing techniques and premium detergents to give your clothes a fresh, long-lasting clean.",
                icon: "🧼",
                color: "blue-50"
              },
              {
                title: "Speed & Convenience",
                description: "Enjoy same-day or next-day service options. We ensure quick, efficient, and hassle-free laundry care.",
                icon: "⏳",
                color: "yellow-50"
              },
              {
                title: "Eco-Conscious Care",
                description:
                  "Our eco-friendly detergents and water-saving methods help us care for your clothes while protecting the planet.",
                icon: "🌍",
                color: "green-50"
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                }}
                className={`bg-white p-6 rounded-lg shadow-md transition-all duration-300 border-t-4 border-blue-500 bg-gradient-to-b from-${item.color} to-white`}
              >
                <motion.div
                  className="text-4xl mb-4 transform transition-transform"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  {item.icon}
                </motion.div>

                <motion.h3
                  className="text-xl font-semibold text-gray-800 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {item.title}
                </motion.h3>

                <motion.p
                  className="text-gray-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section id="services" className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <svg className="absolute top-0 left-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M0,0 L100,0 L100,100 L0,100 Z"
              fill="url(#serviceGradient)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
            />
            <defs>
              <linearGradient id="serviceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#60A5FA" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Our Services
            </motion.h2>

            <motion.div
              className="w-20 h-1 bg-blue-600 mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />

            <motion.p
              className="max-w-3xl mx-auto text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              We offer a comprehensive range of laundry services to meet all your needs.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
            {[
              {
                title: "Wash & Fold",
                price: "From ₹60/kg",
                description:
                  "Convenient and affordable wash & fold service for your everyday laundry. Fresh, clean, and neatly folded.",
                image: "/images/wash-fold.jpg",
                icon: "🧺",
                color: "blue",
                gradient: "from-blue-500 to-blue-600"
              },
              {
                title: "Wash & Steam Iron",
                price: "From ₹99/item",
                description:
                  "Professional wash and steam iron service for a crisp, wrinkle-free finish, perfect for office wear and special occasions.",
                image: "/images/wash-steam-iron.jpg",
                icon: "👔",
                color: "green",
                gradient: "from-green-500 to-green-600"
              },
              {
                title: "Dry Cleaning",
                price: "From ₹60/item",
                description:
                  "Expert dry cleaning service to maintain the quality and longevity of your delicate and high-end fabrics.",
                image: "/images/dry-cleaning.jpg",
                icon: "✨",
                color: "purple",
                gradient: "from-purple-500 to-purple-600"
              },
              {
                title: "Shoe Cleaning",
                price: "From ₹350/pair",
                description:
                  "Restore the look of your favorite shoes with deep cleaning, stain removal, and expert care.",
                image: "/images/shoe-cleaning.jpg",
                icon: "👟",
                color: "orange",
                gradient: "from-orange-500 to-orange-600"
              },
              {
                title: "Curtain Cleaning",
                price: "From ₹8/- Sqft (Single Layer)",
                description:
                  "Freshen up your home with our professional curtain cleaning service, removing dust, stains, and odors.",
                image: "/images/curtain-cleaning.jpg",
                icon: "🪟",
                color: "amber",
                gradient: "from-amber-500 to-amber-600"
              },
              {
                title: "Curtain Cleaning",
                price: "From ₹15/- Sqft (Double Layer)",
                description:
                  "Freshen up your home with our professional curtain cleaning service, removing dust, stains, and odors.",
                image: "/images/curtain-cleaning.jpg",
                icon: "🪟",
                color: "amber",
                gradient: "from-amber-500 to-amber-600"
              },
              {
                title: "Carpet Cleaning",
                price: "From ₹45/- Sqft",
                description:
                  "Deep cleaning and stain removal for carpets to keep your space fresh, hygienic, and allergen-free.",
                image: "/images/carpet-cleaning.jpg",
                icon: "🧶",
                color: "indigo",
                gradient: "from-indigo-500 to-indigo-600"
              },
              {
                title: "Toy Cleaning",
                price: "From ₹250/item",
                description:
                  "Sanitize and refresh your child's toys with our specialized cleaning service, ensuring hygiene and safety.",
                image: "/images/toy-cleaning.jpg",
                icon: "🧸",
                color: "pink",
                gradient: "from-pink-500 to-pink-600"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 70
                }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white rounded-xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                {/* Service Image Container with Overlay */}
                <div className="relative overflow-hidden h-56">
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.7 }
                    }}
                    className="absolute inset-0 transition-transform duration-700 ease-in-out"
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300`}></div>
                  </motion.div>

                  {/* Service Icon */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.4, type: "spring" }}
                    viewport={{ once: true }}
                    className="absolute top-4 left-4 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10"
                  >
                    <span className="text-2xl">{service.icon}</span>
                  </motion.div>

                  {/* Popular Badge */}
                  <motion.div
                    className={`absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r ${service.gradient} text-white text-xs font-bold rounded-full shadow-md`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    POPULAR
                  </motion.div>

                  {/* Price Tag */}
                  <motion.div
                    className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md text-sm font-semibold z-10"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {service.price}
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-6 relative">
                  {/* Decorative Line */}
                  <motion.div
                    className={`h-0.5 w-12 bg-${service.color}-500 mb-4`}
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                  />

                  <motion.h3
                    className="text-xl font-bold text-gray-800 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {service.title}
                  </motion.h3>

                  <motion.p
                    className="text-gray-600 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {service.description}
                  </motion.p>

                  {/* Book Now Button */}
                  <motion.div
                    className="mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.a
                      whileHover={{
                        scale: 1.03,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.97 }}
                      href={`https://wa.me/+918712326333?text=I'm%20interested%20in%20the%20${encodeURIComponent(
                        service.title
                      )}%20service%20from%20WashMyClothes`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r ${service.gradient} text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300`}
                    >
                      <span>Book Now</span>
                      <svg
                        className="w-5 h-5 ml-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Enhanced Special Offer Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
            viewport={{ once: true }}
            className="mt-20 mb-16 text-center px-4"
          >
            {/* Outer container with decorative elements */}
            <div className="relative max-w-4xl mx-auto">
              {/* Decorative background elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="absolute -top-10 -left-10 w-20 h-20 bg-blue-100 rounded-full z-0 hidden md:block"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -right-8 w-16 h-16 bg-blue-50 rounded-full z-0 hidden md:block"
              />

              {/* Main offer card */}
              <motion.div
                className="relative bg-gradient-to-br from-white to-blue-50 border border-blue-200 rounded-2xl p-8 md:p-10 shadow-xl z-10"
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
                  y: -5,
                  transition: { duration: 0.4 }
                }}
                transition={{ duration: 0.4 }}
              >
                {/* Gift box ribbon decoration */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg z-20">
                  <div className="absolute top-0 left-0 w-full h-full rounded-full bg-red-400 animate-pulse opacity-30"></div>
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.4
                    }}
                    viewport={{ once: true }}
                    className="text-3xl"
                  >
                    🎁
                  </motion.div>
                </div>

                {/* Offer header with animated underline */}
                <div className="relative inline-block mb-6">
                  <motion.h3
                    className="text-3xl font-bold text-gray-800 mb-2"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    Exclusive Special Offers
                  </motion.h3>
                  <motion.div
                    className="h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    viewport={{ once: true }}
                  />
                </div>

                {/* Service-specific offers tabs */}
                <motion.div
                  className="flex flex-wrap justify-center gap-2 mb-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {Object.keys(serviceOffers).map((service) => (
                    <motion.button
                      key={service}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setSelectedService(service)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedService === service
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                        }`}
                    >
                      {service}
                    </motion.button>
                  ))}
                </motion.div>

                {/* Main offer content - AnimatePresence for smooth transitions between offers */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedService}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl p-6 shadow-inner border border-blue-100 mb-8"
                  >
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      {/* Left side - offer details */}
                      <div className="flex-1 text-left">
                        <div className="mb-4">
                          <h4 className="text-xl font-bold text-gray-800 mb-1">{currentOffer.title}</h4>
                          <p className="text-gray-500 text-sm">{currentOffer.subtitle}</p>
                        </div>

                        <p className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: currentOffer.description }} />

                        <div className="flex flex-col sm:flex-row gap-3 mb-2">
                          {currentOffer.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-2 text-green-600">
                              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right side - promo code */}
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-sm font-medium text-gray-500 mb-2">Use Promo Code:</div>
                        <motion.div
                          className={`bg-gradient-to-r ${currentOffer.gradient} text-white px-6 py-4 rounded-lg font-bold text-xl tracking-wider shadow-lg`}
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.4)",
                            transition: { duration: 0.3 }
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {currentOffer.code}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Action buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row justify-center gap-4"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                    whileTap={{ scale: 0.97 }}
                    href={`https://wa.me/+918712326333?text=${encodeURIComponent(currentOffer.cta)}`}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg shadow-md font-medium"
                  >
                    <MessageSquare size={18} />
                    <span>Book via WhatsApp</span>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href="tel:+918712326333"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-lg shadow-md font-medium"
                  >
                    <Phone size={18} />
                    <span>Call to Book Now</span>
                  </motion.a>
                </motion.div>

                {/* Expiration notification */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  viewport={{ once: true }}
                  className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Limited time offer. Expires soon!</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* service pricing */}
      <PricingSection />
      <section id="faq" className="py-20 md:py-24 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M0,0 L100,0 L100,100 L0,100 Z"
              fill="url(#faqGradient)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
            />
            <defs>
              <linearGradient id="faqGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#60A5FA" />
              </linearGradient>
            </defs>
          </svg>

          {/* Decorative circles */}
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-300 opacity-10 blur-3xl"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-400 opacity-10 blur-3xl"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section header with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="relative inline-block">
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Frequently Asked Questions
              </motion.h2>
              <motion.div
                className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                initial={{ width: "0%", left: "50%" }}
                whileInView={{ width: "100%", left: "0%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </div>

            <motion.p
              className="max-w-3xl mx-auto text-gray-600 text-lg mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Find answers to commonly asked questions about our premium laundry services.
              Still have questions? Feel free to contact us anytime.
            </motion.p>
          </motion.div>

          {/* Enhanced FAQ items with better animations and visual design */}
          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 50
                }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <motion.div
                  className={`bg-white border-l-4 border-${faq.color}-500 rounded-xl shadow-lg overflow-hidden transition-all duration-300`}
                  whileHover={{
                    scale: 1.01,
                    boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    borderLeftWidth: "6px"
                  }}
                  animate={{
                    boxShadow: openFAQ === index
                      ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                      : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Question header with icon */}
                  <div
                    onClick={() => toggleFAQ(index)}
                    className="flex justify-between items-center p-6 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full bg-${faq.color}-100 flex items-center justify-center flex-shrink-0`}>
                        <span className="text-xl">{faq.icon}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">{faq.question}</h3>
                    </div>
                    <motion.div
                      animate={{
                        rotate: openFAQ === index ? 45 : 0,
                        color: openFAQ === index ? `var(--color-${faq.color}-500)` : 'var(--color-gray-400)'
                      }}
                      transition={{ duration: 0.3 }}
                      className={`text-${openFAQ === index ? `${faq.color}-500` : 'gray-400'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Answer with AnimatePresence for smooth height animation */}
                  <AnimatePresence>
                    {openFAQ === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className={`px-6 pb-6 pt-0 text-gray-600 border-t border-gray-100 bg-gradient-to-br from-white to-${faq.color}-50`}>
                          <p className="leading-relaxed">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced help block with better visual design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <motion.div
              className="inline-block bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden"
              whileHover={{
                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.35)",
                y: -5
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 right-0 bottom-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-20 bg-white blur-2xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-blue-300 blur-3xl"></div>
              </div>

              <div className="relative z-10">
                <motion.div
                  className="w-16 h-16 rounded-full bg-white mx-auto mb-4 flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.8
                  }}
                  viewport={{ once: true }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>

                <motion.h3
                  className="text-2xl font-bold mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  Still Have Questions?
                </motion.h3>

                <motion.p
                  className="text-blue-100 mb-8 max-w-md mx-auto"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  viewport={{ once: true }}
                >
                  Our customer support team is always ready to help you with any questions or concerns you might have about our services.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row justify-center gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="tel:+918712326333"
                    className="flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-lg transition-colors shadow-md font-medium"
                  >
                    <Phone size={18} />
                    <span>Call Us</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://wa.me/+918712326333"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg transition-colors shadow-md font-medium"
                  >
                    <MessageSquare size={18} />
                    <span>WhatsApp</span>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section id="location" className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-blue-50">
        {/* Enhanced background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated map pattern */}
          <motion.div
            className="absolute inset-0 bg-blue-50 opacity-50 z-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-blue-200 opacity-20 blur-3xl"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          />
          <motion.div
            className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-indigo-200 opacity-20 blur-3xl"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Enhanced section header with animated underline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block relative">
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Find Us Easily
              </motion.h2>
              <motion.div
                className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                initial={{ width: "0%", left: "50%" }}
                whileInView={{ width: "100%", left: "0%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </div>

            <motion.p
              className="max-w-3xl mx-auto text-gray-600 text-lg mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Conveniently located in the heart of the city. Drop by or schedule a pickup!
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
            {/* Left content - Enhanced info card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 50
              }}
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border-l-4 border-blue-500 relative overflow-hidden"
                whileHover={{
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -6px rgba(0, 0, 0, 0.1)",
                  y: -5
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Decorative corner shape */}
                <div className="absolute top-0 right-0 w-32 h-32">
                  <div className="absolute top-0 right-0 w-full h-full bg-blue-50 rounded-bl-full opacity-50"></div>
                </div>

                {/* Heading with animated reveal */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative mb-8"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Visit Our Store</h3>
                  </div>
                  <div className="h-0.5 w-20 bg-blue-100 mt-1"></div>
                </motion.div>

                {/* Address info with icons */}
                <motion.div
                  className="flex items-start gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-md">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2 text-lg">Our Address</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Washmyclothes, opposite BR Hi-Tech Theatre,<br />
                      Sri Sai Nagar, Madhapur,<br />
                      Hyderabad, Telangana 500032
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.02, color: "#2563EB" }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center gap-1 text-blue-600 font-medium mt-2 cursor-pointer"
                    >
                      <span>View on map</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Hours info with icons */}
                <motion.div
                  className="flex items-start gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-md">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2 text-lg">Working Hours</h4>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                      <p className="text-gray-600 font-medium">Monday - Friday:</p>
                      <p className="text-gray-600">7:00 AM - 8:00 PM</p>
                      <p className="text-gray-600 font-medium">Saturday:</p>
                      <p className="text-gray-600">8:00 AM - 6:00 PM</p>
                      <p className="text-gray-600 font-medium">Sunday:</p>
                      <p className="text-gray-600">10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </motion.div>

                {/* Action buttons with enhanced styling */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 mt-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)" }}
                    whileTap={{ scale: 0.97 }}
                    href="tel:+918712326333"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 px-6 rounded-lg transition-all shadow-lg font-medium"
                  >
                    <Phone size={18} className="text-blue-200" />
                    <span>Call Us Now</span>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.03, backgroundColor: "#f8fafc" }}
                    whileTap={{ scale: 0.97 }}
                    href="https://maps.app.goo.gl/wed8GEyp1khPVWvt9?g_st=awb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 py-3.5 px-6 rounded-lg transition-all shadow-md font-medium hover:border-blue-200"
                  >
                    <MapPin size={18} className="text-blue-600" />
                    <span>Get Directions</span>
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right content - Enhanced map with effects */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 50,
                delay: 0.2
              }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Floating pin and location marker */}
              <motion.div
                className="h-[450px] rounded-2xl overflow-hidden shadow-2xl relative"
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  scale: 1.01
                }}
                transition={{ duration: 0.5 }}
              >
                {/* Decorative top and bottom bars */}
                <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-500 to-blue-600 z-10"></div>
                <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-600 to-blue-500 z-10"></div>

                {/* Map frame with subtle border */}
                <div className="absolute inset-0 border-2 border-white/20 rounded-2xl z-10 pointer-events-none"></div>

                {/* Map iframe */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.0107677021556!2d78.38837509999999!3d17.443161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb914b4be113d9%3A0x5578f49033479147!2sWash%20my%20clothes!5e1!3m2!1sen!2sin!4v1743264678964!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  style={{ border: 0, width: '100%', height: '100%' }}
                  allowFullScreen=""
                  loading="lazy"
                  className="relative z-0"
                />

                {/* Animated location marker */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                    delay: 0.8
                  }}
                  viewport={{ once: true }}
                  animate={{
                    y: [0, -10, 0],
                    transition: {
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                      delay: 1
                    }
                  }}
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white shadow-lg">
                      <MapPin size={24} className="mb-1" />
                    </div>
                    <div className="w-4 h-4 bg-blue-600 rotate-45 absolute -bottom-1 left-1/3 transform -translate-x-1/2 shadow-md" />
                  </div>

                  {/* Popup label */}
                  <div className="absolute top-0 left-6 transform -translate-y-full mt-[-10px] opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap">
                      <span className="font-medium text-sm">WashMyClothes</span>
                    </div>
                  </div>
                </motion.div>

                {/* Animated pulse effect */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{
                    scale: [1, 2.5, 1],
                    opacity: [0.8, 0, 0.8],
                    transition: {
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeOut",
                      repeatDelay: 0.5
                    }
                  }}
                >
                  <div className="w-8 h-8 rounded-full border-2 border-blue-500 opacity-80"></div>
                </motion.div>

                {/* Second pulse with delay */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{
                    scale: [1, 2.5, 1],
                    opacity: [0.6, 0, 0.6],
                    transition: {
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeOut",
                      delay: 1.5,
                      repeatDelay: 0.5
                    }
                  }}
                >
                  <div className="w-8 h-8 rounded-full border-2 border-blue-400 opacity-60"></div>
                </motion.div>
              </motion.div>

              {/* Map controls overlay */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                viewport={{ once: true }}
                className="absolute bottom-6 right-6 z-20 flex gap-2"
              >
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://maps.app.goo.gl/wed8GEyp1khPVWvt9?g_st=awb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-blue-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                  </svg>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://maps.app.goo.gl/wed8GEyp1khPVWvt9?g_st=awb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-blue-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 opacity-70 z-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 opacity-70 z-0" />

        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 right-0 opacity-10 z-0"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 0.1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <svg width="500" height="500" viewBox="0 0 200 200">
              <path fill="none" stroke="#3B82F6" strokeWidth="1.5"
                d="M 0,50 C 50,0 50,100 100,50 C 150,0 150,100 200,50 C 250,0 250,100 300,50 
             M 0,70 C 50,20 50,120 100,70 C 150,20 150,120 200,70 C 250,20 250,120 300,70"
              />
            </svg>
          </motion.div>

          {/* Decorative quotes symbol */}
          <motion.div
            className="absolute top-20 left-10 text-blue-100 opacity-20"
            initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
            whileInView={{ scale: 1, opacity: 0.2, rotate: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Enhanced section header with animated underline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block relative">
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Customer Testimonials
              </motion.h2>
              <motion.div
                className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                initial={{ width: "0%", left: "50%" }}
                whileInView={{ width: "100%", left: "0%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </div>

            <motion.p
              className="max-w-3xl mx-auto text-gray-600 text-lg mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Don't just take our word for it. See what our satisfied customers have to say about our services.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Regular Customer",
                text: "Wash My Clothes Laundry exceeded all my expectations! Their service is fast, efficient, and incredibly reliable. My clothes came back fresh, spotless, and perfectly folded, feeling as good as new. The staff is professional, friendly, and always willing to accommodate special requests. I was especially impressed with their attention to detail — stains I thought were permanent vanished completely. The pricing is fair, and the turnaround time is exceptional. It’s clear they prioritize customer satisfaction. If you’re looking for a hassle-free, high-quality laundry service, Wash My Clothes Laundry is the best choice. Highly recommended for busy professionals and families alike!",
                image: "/placeholder.svg?height=100&width=100",
                rating: 4
              },
              {
                name: "Akandi Hari Prasad",
                role: "Business Owner",
                text: "WashMyClothes is a top-notch laundry service that makes life so much easier. Their pickup and delivery are always on time, and the clothes come back spotless and neatly folded. The pricing is reasonable for the excellent quality and convenience they provide. Their customer service is friendly and responsive, ensuring a seamless experience. If you want hassle-free laundry with great results, WashMyClothes is highly recommended!As a restaurant owner, having clean tablecloths and napkins is crucial. Fresh Laundry delivers consistent quality and their pickup service saves me valuable time.",
                image: "/placeholder.svg?height=100&width=100",
                rating: 4.5
              },
              {
                name: "Emily Rodriguez",
                role: "Busy Parent",
                text: "Awesome dry cleaning . I have never seen before other laundry please try it. Never miss a wash and iron , dry cleaning and shoe cleaning.",
                image: "/placeholder.svg?height=100&width=100",
                rating: 4
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 50
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500 relative"
              >
                {/* Quote icon */}
                <motion.div
                  className="absolute -top-4 -left-4 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2 + index * 0.1
                  }}
                  viewport={{ once: true }}
                >
                  <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </motion.div>

                <motion.div
                  className="flex items-center mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >

                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  </div>
                </motion.div>

                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.p
                  className="text-gray-600 italic"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  "{testimonial.text}"
                </motion.p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              href="https://www.google.com/maps/place/Wash+my+clothes/@17.443161,78.3858002,831m/data=!3m1!1e3!4m8!3m7!1s0x3bcb914b4be113d9:0x5578f49033479147!8m2!3d17.443161!4d78.3883751!9m1!1b1!16s%2Fg%2F11vddqtyzn?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3Ds"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-medium rounded-full shadow-md border border-blue-100 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              <span>Read More Reviews on Google</span>
              <svg className="w-5 h-5 ml-2 animate-pulse-slow" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.a>
          </motion.div>

        </div>
      </section>

      <section id="contact" className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        {/* Enhanced background elements */}
        <div className="absolute inset-0 z-0">
          {/* Animated grid pattern */}
          <motion.div
            className="absolute inset-0 opacity-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            <svg width="100%" height="100%">
              <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="#3B82F6"></circle>
              </pattern>
              <rect width="100%" height="100%" fill="url(#pattern-circles)"></rect>
            </svg>
          </motion.div>

          {/* Gradient orbs */}
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600 opacity-10 blur-[100px]"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 0.1, x: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          />
          <motion.div
            className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-blue-400 opacity-10 blur-[100px]"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 0.1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Enhanced section header with animated underline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block relative">
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Get In Touch
              </motion.h2>
              <motion.div
                className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                initial={{ width: "0%", left: "50%" }}
                whileInView={{ width: "100%", left: "0%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </div>

            <motion.p
              className="max-w-3xl mx-auto text-gray-300 text-lg mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Have questions? Reach out to us and we'll get back to you as soon as possible.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Contact Form with Enhanced UI */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 50
              }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-2xl opacity-30 rounded-2xl transform -rotate-6"></div>
              <motion.div
                className="bg-white rounded-2xl overflow-hidden shadow-2xl text-gray-800 relative z-10"
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600 w-full"></div>
                <div className="p-8 md:p-10">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-8"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">Send us a message</h3>
                      <p className="text-gray-500">We'll respond within 24 hours</p>
                    </div>
                  </motion.div>

                  <form>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="name"
                            className="w-full pl-10 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50"
                            placeholder="John Doe"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                          </div>
                          <input
                            type="email"
                            id="email"
                            className="w-full pl-10 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50"
                            placeholder="john@example.com"
                          />
                        </div>
                      </motion.div>
                    </div>

                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="subject"
                          className="w-full pl-10 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50"
                          placeholder="How can we help you?"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Message
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <textarea
                          id="message"
                          rows={5}
                          className="w-full pl-10 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none bg-gray-50"
                          placeholder="Tell us what you need..."
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      viewport={{ once: true }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-lg transition-all shadow-md font-medium"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                          </svg>
                          <span>Send Message</span>
                        </div>
                      </motion.button>
                    </motion.div>
                  </form>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Info Box with Enhanced UI */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 50,
                delay: 0.2
              }}
              viewport={{ once: true }}
              className="flex flex-col h-full"
            >
              <motion.div
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-10 rounded-2xl shadow-2xl h-full relative overflow-hidden"
                whileHover={{
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="1" fill="#3B82F6" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dots)" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-8"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Contact Information</h3>
                      <p className="text-blue-300">We're here to help you</p>
                    </div>
                  </motion.div>

                  <div className="space-y-8">
                    {/* Phone info */}
                    <motion.div
                      className="flex items-start gap-5"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                        <Phone size={22} />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-300 mb-1 text-lg">Phone</h4>
                        <motion.a
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                          href="tel:+918712326333"
                          className="text-white text-lg hover:text-blue-300 transition-colors flex items-center gap-2 group"
                        >
                          +91 87123 26333
                          <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </motion.a>
                        <p className="text-gray-400 text-sm mt-1">Available 7:00 AM - 8:00 PM</p>
                      </div>
                    </motion.div>

                    {/* Email info */}
                    <motion.div
                      className="flex items-start gap-5"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 bg-opacity-20 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                        <Mail size={22} />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-300 mb-1 text-lg">Email</h4>
                        <motion.a
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                          href="mailto:washmyclotheshyd@gmail.com"
                          className="text-white text-lg hover:text-blue-300 transition-colors flex items-center gap-2 group"
                        >
                          washmyclotheshyd@gmail.com
                          <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </motion.a>
                        <p className="text-gray-400 text-sm mt-1">We'll respond within 24 hours</p>
                      </div>
                    </motion.div>

                    {/* Location info */}
                    <motion.div
                      className="flex items-start gap-5"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 bg-opacity-20 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                        <MapPin size={22} />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-300 mb-1 text-lg">Location</h4>
                        <p className="text-white text-lg">
                          Washmyclothes, Madhapur
                        </p>
                        <p className="text-gray-300 mt-1 leading-relaxed">
                          Opposite BR Hi-Tech Theatre,<br />
                          Sri Sai Nagar, Madhapur,<br />
                          Hyderabad, Telangana 500032
                        </p>
                        <motion.a
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                          href="https://maps.app.goo.gl/wed8GEyp1khPVWvt9?g_st=awb"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-300 mt-2 gap-2 group"
                        >
                          View on Google Maps
                          <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </motion.a>
                      </div>
                    </motion.div>
                  </div>

                  {/* Social Media Links */}
                  <motion.div
                    className="mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="font-medium text-blue-300 mb-5 text-lg">Connect With Us</h4>
                    <div className="flex gap-4">
                      {[
                        { icon: <Facebook size={20} />, url: "https://www.facebook.com/Washmyclothes.co.in/", color: "from-blue-500 to-blue-600" },
                        { icon: <Instagram size={20} />, url: "https://www.instagram.com/wash_my_clothes?utm_source=qr&igsh=MWt3NXJ2OTE1a2x6bA==", color: "from-purple-500 to-pink-500" },
                        { icon: <Twitter size={20} />, url: "https://twitter.com", color: "from-blue-400 to-blue-500" },
                        { icon: <Mail size={20} />, url: "mailto:washmyclotheshyd@gmail.com", color: "from-red-500 to-red-600" },
                      ].map((social, index) => (
                        <motion.a
                          key={index}
                          whileHover={{ y: -5, scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-12 h-12 bg-gradient-to-br ${social.color} rounded-lg flex items-center justify-center text-white shadow-lg transition-all duration-300`}
                        >
                          {social.icon}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-blue-500 opacity-20 rounded-full blur-2xl"></div>
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-purple-500 opacity-10 rounded-full blur-xl"></div>
              </motion.div>
            </motion.div>
          </div>

          {/* Google Map Integration Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
            className="mt-16 max-w-6xl mx-auto"
          >
            <div className="bg-gray-800 p-5 rounded-2xl overflow-hidden shadow-2xl">
              <div className="mb-6 px-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="w-full max-w-md mx-auto bg-gray-700 rounded-full px-4 py-1 flex items-center">
                    <svg className="w-4 h-4 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-300">https://maps.google.com/?q=WashMyClothes</span>
                  </div>
                </div>
              </div>
              <div className="h-[400px] rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.0107677021556!2d78.38837509999999!3d17.443161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb914b4be113d9%3A0x5578f49033479147!2sWash%20my%20clothes!5e1!3m2!1sen!2sin!4v1743264678964!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="relative z-0"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white pt-20 pb-8">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute bottom-0 left-0 right-0 w-full opacity-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <motion.path
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              fill="rgba(59, 130, 246, 0.2)"
              fillOpacity="1"
              d="M0,128L48,117.3C96,107,192,85,288,96C384,107,480,149,576,144C672,139,768,85,864,74.7C960,64,1056,96,1152,117.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></motion.path>
          </svg>

          {/* Animated dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className="absolute top-0 left-0 right-0 bottom-0">
              <div className="h-full w-full bg-[radial-gradient(rgba(59,130,246,0.3)_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Footer top section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            {/* About company section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6 gap-3">
                {/* Logo */}
                <motion.div
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-white text-xl font-bold">W</span>
                </motion.div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  WashMyClothes
                </h3>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-400 mb-6 leading-relaxed"
              >
                We are committed to providing the best laundry service in town. Our team is dedicated to ensuring your clothes are cleaned and cared for with the utmost attention.
              </motion.p>

              {/* Social media icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex space-x-3"
              >
                {[
                  { icon: <Facebook size={18} />, url: "https://www.facebook.com/Washmyclothes.co.in/", color: "from-blue-500 to-blue-600" },
                  { icon: <Instagram size={18} />, url: "https://www.instagram.com/wash_my_clothes?utm_source=qr&igsh=MWt3NXJ2OTE1a2x6bA==", color: "from-pink-500 to-purple-500" },
                  { icon: <Twitter size={18} />, url: "https://twitter.com", color: "from-blue-400 to-blue-500" },
                  { icon: <Mail size={18} />, url: "mailto:washmyclotheshyd@gmail.com", color: "from-red-500 to-red-600" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gradient-to-br ${social.color} rounded-lg flex items-center justify-center text-white shadow-lg transition-all duration-300`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Quick Links column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6 relative inline-flex items-center">
                <span className="mr-2">Quick Links</span>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full"
                />
              </h3>

              <ul className="space-y-3">
                {[
                  { name: "Home", url: "#home" },
                  { name: "About Us", url: "#about" },
                  { name: "Services", url: "#services" },
                  { name: "Location", url: "#location" },
                  { name: "FAQ", url: "#faq" },
                  { name: "Contact", url: "#contact" },
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
                    viewport={{ once: true }}
                  >
                    <motion.a
                      whileHover={{ x: 5, color: "#3B82F6" }}
                      transition={{ duration: 0.2 }}
                      href={link.url}
                      className="text-gray-400 hover:text-blue-300 transition-colors flex items-center group"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      {link.name}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6 relative inline-flex items-center">
                <span className="mr-2">Our Services</span>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full"
                />
              </h3>

              <ul className="space-y-3">
                {[
                  { name: "Wash & Fold", url: "#services", icon: "🧺" },
                  { name: "Dry Cleaning", url: "#services", icon: "✨" },
                  { name: "Express Service", url: "#services", icon: "⚡" },
                  { name: "Ironing", url: "#services", icon: "👔" },
                  { name: "Stain Removal", url: "#services", icon: "🧴" },
                  { name: "Shoe Cleaning", url: "#services", icon: "👟" },
                ].map((service, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
                    viewport={{ once: true }}
                  >
                    <motion.a
                      whileHover={{ x: 5, color: "#3B82F6" }}
                      transition={{ duration: 0.2 }}
                      href={service.url}
                      className="text-gray-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                    >
                      <span className="text-xs opacity-70">{service.icon}</span>
                      {service.name}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Working Hours column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6 relative inline-flex items-center">
                <span className="mr-2">Working Hours</span>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full"
                />
              </h3>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-gray-800 bg-opacity-50 rounded-xl p-4 backdrop-blur-sm border border-gray-700"
              >
                <ul className="space-y-3">
                  {[
                    { day: "Monday - Friday", hours: "7:00 AM - 8:00 PM", highlight: true },
                    { day: "Saturday", hours: "8:00 AM - 6:00 PM" },
                    { day: "Sunday", hours: "10:00 AM - 4:00 PM" },
                  ].map((schedule, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index + 0.5 }}
                      viewport={{ once: true }}
                      className={`flex justify-between text-gray-400 py-1 border-b border-gray-700 last:border-0 ${schedule.highlight ? "text-blue-300" : ""
                        }`}
                    >
                      <span className="font-medium">{schedule.day}:</span>
                      <span>{schedule.hours}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="mt-4 pt-3 border-t border-gray-700"
                >
                  <motion.a
                    whileHover={{ scale: 1.03, x: 3 }}
                    whileTap={{ scale: 0.97 }}
                    href="tel:+918712326333"
                    className="flex items-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-lg shadow-md font-medium text-sm w-full justify-center gap-2 transition-all"
                  >
                    <Phone size={16} />
                    <span>Call us: +91 8712326333</span>
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Newsletter subscription */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-16"
          >
            <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-2xl p-6 backdrop-blur-sm border border-blue-800/30 shadow-lg">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white mb-2">Get Exclusive Offers</h4>
                  <p className="text-gray-300 text-sm">Subscribe to our newsletter and get 10% off your first laundry order!</p>
                </div>
                <div className="w-full md:w-auto flex-1">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1"
                    />
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg shadow-md font-medium whitespace-nowrap"
                    >
                      Subscribe
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 mb-8"
          />

          {/* Footer bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 text-gray-500 text-sm"
            >
              <div className="flex items-center gap-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="font-medium">WashMyClothes</span>
              </div>
              <span>&copy; {currentYear} All rights reserved.</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex gap-6 text-sm text-gray-500"
            >
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                <motion.a
                  key={index}
                  whileHover={{ color: "#3B82F6" }}
                  transition={{ duration: 0.2 }}
                  href="#"
                  className="hover:text-blue-300 transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Credits */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center text-gray-500 text-sm mt-8"
          >
            Designed & Developed by{" "}
            <a
              href="https://kridaverse.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-400 to-blue-300 hover:from-blue-300 hover:to-blue-200 bg-clip-text text-transparent transition-all font-medium"
            >
              Kridaverse Pvt Ltd
            </a>
          </motion.div>

          {/* Scroll to top button */}
          <motion.button
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white shadow-lg group z-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transform transition-transform group-hover:-translate-y-1 duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        </div>
      </footer>
    </main>
  )
}


