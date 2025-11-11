import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const skills = [
    { name: "React", level: 90, color: "#61DAFB" },
    { name: "TailwindCSS", level: 85, color: "#06B6D4" },
    { name: "Mapbox GL", level: 80, color: "#4264FB" },
    { name: "Leaflet", level: 75, color: "#199900" },
    { name: "JavaScript", level: 95, color: "#F7DF1E" },
    { name: "GIS", level: 80, color: "#7C3AED" },
    { name: "HTML", level: 90, color: "#E34F26" },
    { name: "CSS", level: 85, color: "#1572B6" },
  ];

  const projects = [
       {
      title: "SocialLab",
      description: "AI-powered social media platform with real-time insights, interactive dashboard, and measurable results.",
      link: "https://omarhegazy1995.github.io/SocialLab/",
      image: "/13.png",
      technologies: ["React", "Leaflet", "Socket.io", "Express"],
      github: "https://github.com/OmarHegazy1995/SocialLab"
    },
     
    {
      title: "yummy Restaurant Website",
      description: "Complete website and menu system for a restaurant brand, featuring online ordering, reservation system, and delivery integration.",
      link: "https://omarhegazy1995.github.io/yummy/",
      image: "/6.png",
      technologies: ["React", "JavaScript", "CSS3", "Node.js"],
      github: "https://github.com/OmarHegazy1995//yummy/"
    },

        {
      title: "Employee Data Archive System",
      description: "JavaScript-based system for managing and archiving employee data with secure storage and advanced search.",
      link: "https://omarhegazy1995.github.io/database-employee/",
      image: "/7.png",
      technologies: ["Next.js", "React", "MongoDB", "Node.js", "Tailwind CSS"],
      github: "https://github.com/OmarHegazy1995/database-employee"
    },
  
   
    {
      title: "Interactive GIS Map - Northern Borders Municipality",
      description: "Interactive GIS system built with React and Mapbox for investment land visualization in the Northern Borders region.",
      link: "https://omarhegazy1995.github.io/InteractiveMap",
      image: "/5.png",
      technologies: ["React", "Mapbox GL", "TailwindCSS", "GIS"],
      github: "https://github.com/OmarHegazy1995/InteractiveMap"  
    },
    {
      title: "portfolio Application",
      description: "Advanced web application for task management with team collaboration features and real-time synchronization.",
      link: "https://omarhegazy1995.github.io/portfolio/",
      image: "/8.png",
      technologies: ["HLML5", "CSS3"],
      github: "https://github.com/OmarHegazy1995/portfolio"
    },
   


    //  {
    //   title: "Local Products E-Commerce",
    //   description: "E-commerce platform supporting local products in the Northern Border region with complete shopping cart and payment system.",
    //   link: "https://northern-products.com",
    //   image: "/api/placeholder/400/250",
    //   technologies: ["Next.js", "Stripe", "MongoDB", "Tailwind"],
    //   github: "https://github.com/omarhegazy/local-products-store"
    // },
   
  ];

  // Show only first 3 projects initially, or all if showAllProjects is true
  const displayedProjects = showAllProjects ? projects : projects.slice(0, 3);

  const testimonials = [
    {
      name: "Ahmed Kassab",
      role: "Project Manager",
      content: "Omar delivered an exceptional GIS application that exceeded our expectations. His attention to detail and technical expertise are impressive.",
      avatar: "/2.jpg"
    },
    {
      name: "Ahmed Magdy",
      role: " Media Company Owner",
      content: "The website Omar created for our company has significantly improved our online presence and client engagement.",
      avatar: "/3.png"
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleViewAllProjects = () => {
    setShowAllProjects(true);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300 overflow-x-hidden`}>
      {/* Navigation Bar */}
      <motion.nav 
        className={`fixed w-full z-50 backdrop-blur-md ${
          isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
        } border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        } shadow-lg`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.a 
            href="#home" 
            className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Omar Hegazy
          </motion.a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`font-medium transition-all duration-300 relative ${
                  activeSection === item.toLowerCase() 
                    ? 'text-blue-600' 
                    : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
                whileHover={{ y: -2 }}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <motion.div 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600"
                    layoutId="activeSection"
                  />
                )}
              </motion.a>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <motion.button 
              onClick={toggleTheme}
              className={`p-2 rounded-full backdrop-blur-sm ${
                isDarkMode 
                  ? 'bg-yellow-400/20 text-yellow-300 hover:bg-yellow-400/30' 
                  : 'bg-blue-400/20 text-blue-600 hover:bg-blue-400/30'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </motion.button>
            
            {/* Mobile Menu Button */}
            <motion.button 
              className="md:hidden focus:outline-none"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-6 flex flex-col space-y-1">
                <motion.span 
                  className={`h-0.5 w-full ${isDarkMode ? 'bg-white' : 'bg-gray-800'} transition-transform`}
                  animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
                />
                <motion.span 
                  className={`h-0.5 w-full ${isDarkMode ? 'bg-white' : 'bg-gray-800'} transition-opacity`}
                  animate={{ opacity: isMenuOpen ? 0 : 1 }}
                />
                <motion.span 
                  className={`h-0.5 w-full ${isDarkMode ? 'bg-white' : 'bg-gray-800'} transition-transform`}
                  animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Dropdown Menu */}
        <motion.div 
          className={`md:hidden absolute w-full backdrop-blur-lg ${
            isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'
          } border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} shadow-xl`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0, height: isMenuOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: 'hidden' }}
        >
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`font-medium py-3 transition-all duration-300 ${
                  activeSection === item.toLowerCase() 
                    ? 'text-blue-600 border-l-4 border-blue-600 pl-4' 
                    : isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ x: 5 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* Hero Section with Professional Animated Background */}
      <section className="  inset-0 z-10 w-screen m-a overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900/80 to-purple-900/20">
 <motion.div
        id="home"
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 relative overflow-hidden inset-0 "
        style={{ scale, opacity }}
      >
        {/* Professional Animated Background */}
        <div >
          {/* Main Gradient Background */}
          <div className="absolute " />
          
          {/* Animated Grid System */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
          </div>

          {/* Floating Code Particles */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-blue-300/40 font-mono text-xs"
              initial={{ 
                y: 0, 
                x: 0, 
                opacity: 0,
                scale: 0.8 
              }}
              animate={{
                y: [0, -window.innerHeight * 0.8],
                x: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              {['<div>', '{ }', '() =>', 'import', 'export', 'const', 'let', 'function', 'return', 'className', 'useState', 'useEffect', 'props', 'component', 'map()', 'filter()', '=>', '${ }', 'template', 'string', 'async', 'await', 'try', 'catch', 'finally'][i]}
            </motion.div>
          ))}

          {/* Geometric Shapes */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 border-2 border-blue-400/20 rounded-lg"
            initial={{ rotate: 0, scale: 1 }}
            animate={{
              rotate: [0, 45, 90, 135, 180],
              scale: [1, 1.1, 1, 0.9, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          <motion.div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 border-2 border-purple-400/20 rounded-full"
            initial={{ rotate: 0, scale: 1 }}
            animate={{
              rotate: [0, -45, -90, -135, -180],
              scale: [1, 0.9, 1, 1.1, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              delay: 5
            }}
          />

          {/* Binary Stream */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-green-400/60 font-mono text-sm"
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: [0, window.innerHeight],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 8 + Math.random() * 6,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                }}
              >
                {Math.random() > 0.5 ? '1' : '0'}
              </motion.div>
            ))}
          </div>

          {/* Floating Tech Icons */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute text-2xl ${
                i % 4 === 0 ? 'text-cyan-400/30' : 
                i % 4 === 1 ? 'text-blue-400/30' : 
                i % 4 === 2 ? 'text-purple-400/30' : 'text-green-400/30'
              }`}
              initial={{ y: 0, x: 0, rotate: 0 }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 30 - 15, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 12 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              {['</>', '{ }', '[]', '()', '#', '.', '&', '*', '+', '-', '=', '/', '\\', '|', '~'][i]}
            </motion.div>
          ))}

          {/* Animated Orbs */}
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
            initial={{ x: 0, y: 0, scale: 1 }}
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
            initial={{ x: 0, y: 0, scale: 1 }}
            animate={{
              x: [0, -50, 0],
              y: [0, 60, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />

          <motion.div
            className="absolute top-1/2 left-1/3 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl"
            initial={{ x: 0, y: 0, scale: 1 }}
            animate={{
              x: [0, 40, 0],
              y: [0, -80, 0],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 6
            }}
          />

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-15">
            <motion.path
              d="M 100,100 Q 300,50 500,200 T 900,150"
              stroke="url(#gradient1)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d="M 200,300 Q 400,150 600,350 T 1000,250"
              stroke="url(#gradient2)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>

          {/* Pulse Effect */}
          <motion.div
            className="absolute inset-0 border-2 border-cyan-400/10 rounded-lg m-8"
            initial={{ scale: 1, opacity: 0.3 }}
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          {/* Profile Photo */}
          <motion.div
            className="w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl backdrop-blur-sm bg-white/10"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              delay: 0.5,
              duration: 1 
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(255,255,255,0.3)"
            }}
          >
            <img 
              src="/1.jpg" 
              alt="Omar Hegazy" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Omar Hegazy
          </motion.h1>
          
          <motion.div
            className="text-xl md:text-3xl font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <span className="drop-shadow-lg bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-bold">
              GIS & Front-End Developer
            </span>
          </motion.div>
          
          <motion.p 
            className="mt-4 max-w-2xl mx-auto text-lg text-white/80 backdrop-blur-sm bg-black/30 rounded-2xl p-6 shadow-2xl border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            I build modern web applications that connect GIS data with intuitive and interactive user interfaces. 
            Specializing in creating seamless experiences that bridge the gap between complex spatial data and user-friendly interfaces.
          </motion.p>
          
          <motion.div 
            className="mt-8 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <motion.a
              href="#projects"
              className="bg-white text-gray-900 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-2xl backdrop-blur-sm border border-white/30 font-semibold flex items-center gap-2 hover:shadow-cyan-500/25"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(34, 211, 238, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View My Work</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
            
            <motion.a
              href="#contact"
              className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-full hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300 backdrop-blur-sm font-semibold flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
            <motion.a
  href="/omar-hegazy-resume.pdf"
  className="bg-cyan-500/20 text-cyan-300 px-8 py-4 rounded-full hover:bg-cyan-500/30 transition-all duration-300 backdrop-blur-sm border border-cyan-400/30 font-semibold flex items-center gap-3"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  download
>
  <span>Download CV</span>
  <motion.div
    animate={{ y: [0, -3, 0] }}
    transition={{ repeat: Infinity, duration: 0.8 }}
  >
    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  </motion.div>
</motion.a>
          
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="mt-10 mb-5 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <a href="#about" className="text-2xl text-cyan-400 hover:text-cyan-300 transition-colors backdrop-blur-sm bg-black/30 rounded-full p-3 border border-cyan-400/30">
              ↓
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
      </section>
     

      {/* About Section */}
      <section id="about" className={`py-20 relative z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center text-blue-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
            <motion.div 
              className="md:w-1/3"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-blue-500 mx-auto shadow-2xl">
                <img 
                  src="/1.jpg" 
                  alt="Omar Hegazy" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-2/3"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">Creating Digital Experiences with Spatial Intelligence</h3>
              <p className={`mb-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                I'm a passionate front-end developer with specialized expertise in Geographic Information Systems (GIS). 
                My journey began with web development, and I discovered the power of combining interactive maps with modern web technologies.
              </p>
              <p className={`mb-6 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                With over 5 years of experience, I've worked on various projects ranging from interactive mapping applications 
                to complete web solutions for businesses. I believe in creating applications that are not only functional but 
                also provide exceptional user experiences.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'} shadow-lg`}>
                  <h4 className="font-bold text-blue-600">15+</h4>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Projects Completed</p>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'} shadow-lg`}>
                  <h4 className="font-bold text-blue-600">5+</h4>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Years Experience</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 relative z-10 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center text-blue-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Skills & Technologies
          </motion.h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, i) => (
                <motion.div
                  key={i}
                  className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-blue-600">{skill.level}%</span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <motion.div 
                      className="h-2 rounded-full"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className={`mt-12 p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-4 text-center">My Development Approach</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <span>🚀</span>
                  </div>
                  <h4 className="font-bold mb-2">Performance</h4>
                  <p className={isDarkMode ? 'text-gray-300 text-sm' : 'text-gray-600 text-sm'}>Optimized, fast-loading applications</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <span>🎨</span>
                  </div>
                  <h4 className="font-bold mb-2">Design</h4>
                  <p className={isDarkMode ? 'text-gray-300 text-sm' : 'text-gray-600 text-sm'}>Clean, intuitive user interfaces</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <span>🔧</span>
                  </div>
                  <h4 className="font-bold mb-2">Maintainability</h4>
                  <p className={isDarkMode ? 'text-gray-300 text-sm' : 'text-gray-600 text-sm'}>Clean, scalable code architecture</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 relative z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center text-blue-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {displayedProjects.map((proj, i) => (
              <motion.div
                key={i}
                className={`rounded-xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'} transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{proj.title}</h3>
                  <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{proj.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.technologies.map((tech, idx) => (
                      <span 
                        key={idx}
                        className={`px-3 py-1 text-xs rounded-full ${
                          isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between">
                    <motion.a
                      href={proj.link}
                      className="text-blue-600 font-medium flex items-center"
                      whileHover={{ x: 5 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo →
                    </motion.a>
                    <motion.a
                      href={proj.github}
                      className={`flex items-center ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                      whileHover={{ scale: 1.1 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
          >
            {!showAllProjects && (
              <motion.button
                onClick={handleViewAllProjects}
                className={`inline-flex items-center px-6 py-3 rounded-full font-medium ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Projects
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 relative z-10 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center text-blue-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Client Testimonials
          </motion.h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.role}</p>
                    </div>
                  </div>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>"{testimonial.content}"</p>
                  <div className="flex mt-4 text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 relative z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
  <div className="container mx-auto px-6">
    <motion.h2 
      className="text-3xl font-bold mb-12 text-center text-blue-600"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      Get In Touch
    </motion.h2>
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6">Let's Work Together</h3>
          <p className={`mb-6 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            I'm currently available for freelance work and new opportunities. 
            Whether you have a project in mind or just want to say hello, I'd love to hear from you.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Email</p>
                <a 
                  href="mailto:omarhegazy.dev@gmail.com" 
                  className={`hover:text-blue-600 ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600'}`}
                >
                  omar_hegazy@cic-cairo.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <a 
                  href="tel:+966536382149" 
                  className={`hover:text-blue-600 ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600'}`}
                >
                  +966536382149
                </a>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Location</p>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Arar, Saudi Arabia</p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4 mt-8">
            {/* WhatsApp Icon */}
            <motion.a 
              href="https://wa.me/+966536382149" 
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full ${
                isDarkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-green-600 hover:text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-green-600 hover:text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Contact on WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </motion.a>

            <motion.a 
              href="https://www.linkedin.com/in/omar-hegazy-925807229/" 
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full ${
                isDarkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </motion.a>
            
            <motion.a 
              href="https://github.com/OmarHegazy1995" 
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full ${
                isDarkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-800 hover:text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </motion.a>
            
            <motion.a 
              href="https://x.com/OTregy7359" 
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full ${
                isDarkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-blue-400 hover:text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </motion.a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <form className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 font-medium">Name</label>
              <input 
                type="text" 
                id="name" 
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-600 border-gray-500 text-white' 
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Your Name"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-medium">Email</label>
              <input 
                type="email" 
                id="email" 
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-600 border-gray-500 text-white' 
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="your.email@example.com"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2 font-medium">Message</label>
              <textarea 
                id="message" 
                rows="5"
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-600 border-gray-500 text-white' 
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Your message here..."
              ></textarea>
            </div>
            
            <motion.button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className={`py-8 relative z-10 ${isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-gray-800 text-gray-300'}`}>
        <div className="container mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} Omar Hegazy. All rights reserved.</p>
          <p className="mt-2 text-sm">Built with React & TailwindCSS</p>
        </div>
      </footer>
    </div>
  );
}