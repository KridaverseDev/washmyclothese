"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Phone, MessageSquare, MapPin, Clock, ChevronUp, Menu, X, Facebook, Instagram, Mail, Twitter, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import logo from "@/assets/app_logo.jpeg"
import image from "@/assets/image.png"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navItems = ["home", "about", "services", "location", "contact"]
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
      {/* Navigation Bar */}
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

      <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-400 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.3 }}
            className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-blue-300 blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              className="md:w-1/2 mb-8 md:mb-0"
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Premium{" "}
                <motion.span
                  className="text-blue-600 inline-block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  Laundry
                </motion.span>{" "}
                Made Simple
              </motion.h1>

              <motion.p
                className="text-lg text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                At <strong>WashMyClothes</strong>, we make laundry effortless. Fresh, clean, and perfectly folded—because your time is precious.
              </motion.p>


              <motion.div
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:+918712326333"
                  className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-blue-200"
                >
                  <Phone size={20} />
                  <span>Call Now</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/+918712326333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-green-200"
                >
                  <MessageSquare size={20} />
                  <span>WhatsApp</span>
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                delay: 0.3
              }}
              className="md:w-1/2 relative"
            >
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative z-10"
              >
                <Image
                  src={image}
                  alt="WashMyClothes"
                  width={600}
                  height={500}
                  className="rounded-lg shadow-2xl"
                />
              </motion.div>


              <motion.div
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rounded-lg z-0"
              />
              <motion.div
                initial={{ opacity: 0, rotate: 10 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-50 rounded-lg z-0"
              />
            </motion.div>

          </div>

          {/* Floating bubbles */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              transition: {
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }
            }}
            className="absolute bottom-10 left-1/4 w-8 h-8 rounded-full border-2 border-blue-200 opacity-50"
          />
          <motion.div
            animate={{
              y: [0, -20, 0],
              transition: {
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 1
              }
            }}
            className="absolute top-20 right-1/4 w-6 h-6 rounded-full border-2 border-blue-300 opacity-40"
          />
        </div>
      </section>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed left-1/3 transform -translate-x-1/2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow-lg z-50 text-center"
      >
        <div className="flex flex-row items-center">
          <div className="mb-1">
            🎉 First-Time Customers Get a Flat 25% Discount! 🎉
          </div>
          <button
            onClick={handleClaimNow}
            className="bg-white text-blue-600 px-3 py-2 rounded-md font-bold hover:bg-blue-100 transition-colors duration-200"
          >
            Claim Now
          </button>
        </div>
      </motion.div>
      {/* About Section with Enhanced Animations */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Wash & Fold",
                price: "From ₹150/lb",
                description:
                  "Convenient and affordable wash & fold service for your everyday laundry. Fresh, clean, and ready to wear.",
                image: "/images/wash-fold.jpg",
                color: "blue"
              },
              {
                title: "Wash & Steam Iron",
                price: "From ₹300/item",
                description:
                  "Get your clothes professionally washed and steam ironed for a crisp, wrinkle-free finish.",
                image: "/images/wash-steam-iron.jpg",
                color: "green"
              },
              {
                title: "Premium Laundry",
                price: "From ₹400/lb",
                description:
                  "Special care for your delicate fabrics with premium detergents and expert handling.",
                image: "/images/premium-laundry.jpg",
                color: "purple"
              },
              {
                title: "Express Laundry",
                price: "Additional  ₹100",
                description:
                  "Need your laundry done fast? Our express service guarantees same-day delivery.",
                image: "/images/express-laundry.jpg",
                color: "yellow"
              },
              {
                title: "Dry Cleaning",
                price: "From  ₹100/item",
                description:
                  "Professional dry cleaning to keep your delicate garments looking brand new.",
                image: "/images/dry-cleaning.jpg",
                color: "red"
              },
              {
                title: "Steam Press",
                price: "From  ₹250/item",
                description:
                  "Give your clothes a polished look with our high-quality steam press service.",
                image: "/images/steam-press.jpg",
                color: "indigo"
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 70
                }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg group"
              >
                <div className="relative overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-48 overflow-hidden"
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </motion.div>

                  <motion.div
                    className={`absolute top-4 right-4 px-2 py-1 bg-${service.color}-100 text-${service.color}-800 text-xs font-bold rounded`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    POPULAR
                  </motion.div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-blue-600 font-medium mb-3">{service.price}</p>
                  <p className="text-gray-600">{service.description}</p>

                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`https://wa.me/+918712326333?text=I'm%20interested%20in%20the%20${encodeURIComponent(
                      service.title
                    )}%20service%20from%20WashMyClothes`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-5 inline-flex items-center text-${service.color}-600 font-medium`}
                  >
                    Book Now
                    <svg
                      className="w-4 h-4 ml-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <motion.div
              className="inline-block bg-blue-50 border border-blue-200 rounded-lg p-8"
              whileHover={{
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                y: -5
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-4xl mb-4"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2
                }}
                viewport={{ once: true }}
              >
                🎁
              </motion.div>

              <motion.h3
                className="text-2xl font-semibold text-gray-800 mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Special Offer
              </motion.h3>

              <motion.p
                className="text-gray-600 mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                New customers get 20% off their first order! Use code{" "}
                <motion.span
                  className="font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  WASHCLOTHES25
                </motion.span>{" "}
                when you visit.
              </motion.p>

              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:+1234567890"
                  className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-blue-200"
                >
                  <Phone size={20} />
                  <span>Book your First order</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Location Section with Enhanced Animations */}
      <section id="location" className="py-16 bg-gray-50 relative overflow-hidden">
        {/* Background pattern */}
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
              Our Location
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
              Conveniently located in the heart of the city. Drop by or schedule a pickup!
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
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
                className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-blue-500"
                whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                transition={{ duration: 0.3 }}
              >
                <motion.h3
                  className="text-2xl font-semibold text-gray-800 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Visit Us
                </motion.h3>

                <motion.div
                  className="flex items-start space-x-4 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Our Address</h4>
                    <p className="text-gray-600">
                      Phase 4, Near DLF Rd, APHB Colony
                      <br />
                      Indira Nagar , Gachibowli
                      <br />
                      Hyderabad, Telangana 500032
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Working Hours</h4>
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Monday - Friday:</span> 7:00 AM - 8:00 PM
                    </p>
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Saturday:</span> 8:00 AM - 6:00 PM
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Sunday:</span> 10:00 AM - 4:00 PM
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex space-x-4 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="tel:+91871236333"
                    className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors shadow-md"
                  >
                    <Phone size={18} />
                    <span>Call Us</span>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://maps.app.goo.gl/wed8GEyp1khPVWvt9?g_st=awb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 py-3 px-6 rounded-lg transition-colors shadow-md"
                  >
                    <MapPin size={18} />
                    <span>Get Directions</span>
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>

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
              {/* Map container with animated elements */}
              <motion.div
                className="h-96 rounded-lg overflow-hidden shadow-2xl relative"
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Store Location Map"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"

                />




                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                    delay: 0.5
                  }}
                  viewport={{ once: true }}
                  animate={{
                    y: [0, -15, 0],
                    transition: {
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                      delay: 1
                    }
                  }}
                >
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                    <MapPin size={20} />
                  </div>
                  <div className="w-4 h-4 bg-blue-600 rotate-45 absolute -bottom-1 left-1/2 transform -translate-x-1/2" />
                </motion.div>

                {/* Ripple effect */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-blue-500"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: 2.5,
                    opacity: 0,
                    transition: {
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeOut"
                    }
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-16 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-70 z-0" />

        {/* Decorative elements */}
        <motion.div
          className="absolute top-0 right-0 opacity-10 z-0"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <svg width="400" height="400" viewBox="0 0 200 200">
            <path fill="none" stroke="#3B82F6" strokeWidth="1.5"
              d="M 0,50 C 50,0 50,100 100,50 C 150,0 150,100 200,50 C 250,0 250,100 300,50 
           M 0,70 C 50,20 50,120 100,70 C 150,20 150,120 200,70 C 250,20 250,120 300,70"
            />
          </svg>
        </motion.div>

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
              What Our Customers Say
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
              Don't just take our word for it. Here's what our satisfied customers have to say.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Regular Customer",
                text: "I've been using Fresh Laundry for over 2 years and I'm always impressed with the quality. My clothes come back perfectly clean and neatly folded every time!",
                image: "/placeholder.svg?height=100&width=100",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "Business Owner",
                text: "As a restaurant owner, having clean tablecloths and napkins is crucial. Fresh Laundry delivers consistent quality and their pickup service saves me valuable time.",
                image: "/placeholder.svg?height=100&width=100",
                rating: 5
              },
              {
                name: "Emily Rodriguez",
                role: "Busy Parent",
                text: "With three kids, laundry used to take up my entire weekend. Now I use Fresh Laundry's subscription service and it's been a game-changer for our family.",
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
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
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
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              <span>Read more reviews on Google</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Contact Section with Enhanced Animations */}
      <section id="contact" className="py-16 bg-gray-900 text-white relative overflow-hidden">
        {/* Background pattern */}
        <motion.div
          className="absolute inset-0 opacity-10 z-0"
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

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Contact Us
            </motion.h2>

            <motion.div
              className="w-20 h-1 bg-blue-500 mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />

            <motion.p
              className="max-w-3xl mx-auto text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Have questions? Reach out to us and we'll get back to you as soon as possible.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                className="bg-white rounded-lg overflow-hidden shadow-2xl text-gray-800"
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a message</h3>

                  <form>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="John Doe"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="john@example.com"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      className="mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="How can we help you?"
                      />
                    </motion.div>

                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                        placeholder="Tell us what you need..."
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-colors shadow-md font-medium"
                      >
                        Send Message
                      </motion.button>
                    </motion.div>
                  </form>
                </div>
              </motion.div>
            </motion.div>

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
                className="bg-gray-800 p-8 rounded-lg shadow-xl h-full"
                whileHover={{
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.h3
                  className="text-2xl font-semibold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Get in Touch
                </motion.h3>

                <div className="space-y-6">
                  <motion.div
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-10 h-10 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center text-blue-400 flex-shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-300 mb-1">Phone</h4>
                      <p className="text-gray-300">
                        <a href="tel:+918712326333" className="hover:text-blue-300 transition-colors">+1 (234) 567-890</a>
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-10 h-10 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center text-blue-400 flex-shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-300 mb-1">Email</h4>
                      <p className="text-gray-300">
                        <a href="mailto:washmyclotheshyd@gmail.com" className="hover:text-blue-300 transition-colors">
                          washmyclotheshyd@gmail.com
                        </a>
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-10 h-10 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center text-blue-400 flex-shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-300 mb-1">Location</h4>
                      <p className="text-gray-300">
                        Phase 4, Near DLF Rd, APHB Colony
                        <br />
                        Indira Nagar, Gachibowli
                        <br />
                        Hyderabad, Telangana 500032
                      </p>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-medium text-blue-300 mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    {[
                      { icon: <Facebook size={20} />, url: "https://facebook.com" },
                      { icon: <Instagram size={20} />, url: "https://instagram.com" },
                      { icon: <Twitter size={20} />, url: "https://twitter.com" },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        whileHover={{ scale: 1.2, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">WashMyClothes</h3>
              <p className="text-gray-400 mb-4">
                We are committed to providing the best laundry service in town. Our team is dedicated to ensuring your clothes are cleaned and cared for with the utmost attention.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: <Facebook size={18} />, url: "https://facebook.com" },
                  { icon: <Instagram size={18} />, url: "https://instagram.com" },
                  { icon: <Twitter size={18} />, url: "https://twitter.com" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { name: "Home", url: "#home" },
                  { name: "About Us", url: "#about" },
                  { name: "Services", url: "#services" },
                  { name: "Location", url: "#location" },
                  { name: "Contact", url: "#contact" },
                ].map((link, index) => (
                  <li key={index}>
                    <motion.a
                      whileHover={{ x: 2 }}
                      href={link.url}
                      className="text-gray-400 hover:text-blue-300 transition-colors flex items-center"
                    >
                      <ChevronRight size={14} className="mr-1" />
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Our Services</h3>
              <ul className="space-y-2">
                {[
                  { name: "Wash & Fold", url: "#services" },
                  { name: "Dry Cleaning", url: "#services" },
                  { name: "Express Service", url: "#services" },
                  { name: "Ironing", url: "#services" },
                  { name: "Stain Removal", url: "#services" },
                ].map((service, index) => (
                  <li key={index}>
                    <motion.a
                      whileHover={{ x: 2 }}
                      href={service.url}
                      className="text-gray-400 hover:text-blue-300 transition-colors flex items-center"
                    >
                      <ChevronRight size={14} className="mr-1" />
                      {service.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Working Hours</h3>
              <ul className="space-y-3">
                <li className="flex justify-between text-gray-400">
                  <span>Monday - Friday:</span>
                  <span>7:00 AM - 8:00 PM</span>
                </li>
                <li className="flex justify-between text-gray-400">
                  <span>Saturday:</span>
                  <span>8:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between text-gray-400">
                  <span>Sunday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </li>
              </ul>
              <div className="mt-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:+918712363333"
                  className="flex items-center text-blue-300 hover:text-blue-200 transition-colors"
                >
                  <Phone size={16} className="mr-2" />
                  <span>+1 (234) 567-890</span>
                </motion.a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 mt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} WashMyClothes. All rights reserved.
              </p>
              <div className="flex space-x-4 text-sm text-gray-500">
                <a href="#" className="hover:text-blue-300 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-blue-300 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-blue-300 transition-colors">Cookie Policy</a>
              </div>
            </div>
            <div className="text-center text-gray-500 text-sm mt-4">
              Designed & Developed by{" "}
              <a href="https://kridaverse.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                Kridaverse Pvt Ltd
              </a>
            </div>
          </div>

        </div>
      </footer>
    </main>
  )
}


