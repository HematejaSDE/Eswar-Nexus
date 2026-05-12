import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Users, Shield, GraduationCap, FileText, 
  PlayCircle, MapPin, Mail, Phone, ChevronRight, BookOpen, Monitor
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const latestNews = [
    "3-DAY WORKSHOP IN MATPLOTLIB, NUMPY, PANDAS (14-10-25 TO 18-10-25)",
    "PROJECT EXPO (15-09-25) - ENGINEER's DAY",
    "NATIONAL INNOVATION DAY CELEBRATION (NATIONAL LEVEL IDEA HACKATHON)",
    "HACKATHON (13th, 14th September 2025)"
  ];

  const companies = ['SUTHERLAND', 'STS', 'WIPRO', 'INFOSYS', 'CAPGEMINI', 'TCS', 'ACCENTURE', 'COGNIZANT'];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 scroll-smooth pt-32">
      
      {/* 1. HERO SECTION (Full Width & Spacious) */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 w-full mb-8">
        <div className="w-full h-[400px] md:h-[600px] rounded-3xl relative overflow-hidden shadow-2xl">
          {/* Light Theme Placeholder for Library Image */}
          <div className="absolute inset-0 bg-blue-900" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent flex items-end p-8 md:p-16">
            <div className="max-w-3xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-tight"
              >
                Empowering Next-Gen <br/> Engineers.
              </motion.h1>
              <p className="text-blue-100 font-medium text-lg md:text-xl max-w-2xl leading-relaxed">
                State-of-the-art infrastructure, expert faculty, and an AI-driven digital campus experience at Eswar College of Engineering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER & LATEST NEWS ROW (Uncluttered) */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 w-full mb-24">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Ticker */}
          <div className="flex-1 bg-white shadow-md rounded-2xl overflow-hidden flex items-center px-6 py-4 border border-gray-100">
            <span className="text-sm font-black text-red-600 uppercase tracking-widest shrink-0 mr-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" /> Updates
            </span>
            <div className="overflow-hidden flex-1 relative h-6">
              <motion.div 
                animate={{ x: ["100%", "-100%"] }}
                transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                className="absolute whitespace-nowrap text-sm text-gray-700 font-bold"
              >
                ** Mega Job Mela 29-10-25 ** We are proud to announce that we have signed MOU with KYNDRYL INDIA to drive impactful technical workshops. ** Admissions Open for 2025-26 Academic Year **
              </motion.div>
            </div>
          </div>

          {/* Latest News Highlights */}
          <div className="bg-white shadow-md rounded-2xl px-6 py-4 border border-gray-100 flex items-center gap-4 overflow-x-auto whitespace-nowrap hide-scrollbar">
            <span className="text-sm font-black text-blue-900 uppercase tracking-widest shrink-0 border-r border-gray-200 pr-4">
              Latest News
            </span>
            {latestNews.slice(0, 2).map((news, i) => (
              <span key={i} className="text-sm text-gray-600 font-semibold hover:text-blue-600 cursor-pointer transition-colors px-4 border-r border-gray-100 last:border-0">
                {news}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. PROGRAM CARDS GRID (Spacious, Clean, White) */}
      <section id="departments" className="max-w-[1400px] mx-auto px-4 sm:px-6 w-full mb-32">
        <div className="text-center mb-16">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-3">Academic Excellence</h2>
          <h3 className="text-4xl md:text-5xl font-black text-gray-900">Our Programmes</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full border border-gray-100">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors">
               <Monitor className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">Departments</h3>
            <p className="text-base text-gray-600 font-medium leading-relaxed mb-10 flex-1">
              At ESWAR, we believe that core engineering disciplines are as important as the interdisciplinary branches of engineering. Explore our diverse B.Tech offerings.
            </p>
            <button className="px-6 py-3 rounded-xl bg-green-50 text-green-700 font-black uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all self-start shadow-sm">
              Read More
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full border border-gray-100">
            <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-8 group-hover:bg-green-600 group-hover:text-white transition-colors">
               <Users className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">UG Programme</h3>
            <p className="text-base text-gray-600 font-medium leading-relaxed mb-10 flex-1">
              The department's excellent infrastructure houses several well-equipped laboratories and instruments that enable advanced, hands-on learning.
            </p>
            <button className="px-6 py-3 rounded-xl bg-green-50 text-green-700 font-black uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all self-start shadow-sm">
              Read More
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full border border-gray-100">
            <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-8 group-hover:bg-purple-600 group-hover:text-white transition-colors">
               <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">PG Programme</h3>
            <p className="text-base text-gray-600 font-medium leading-relaxed mb-10 flex-1">
              The programme is conducted by well-qualified learned faculty as well as experts invited from reputed institutions and industries.
            </p>
            <button className="px-6 py-3 rounded-xl bg-green-50 text-green-700 font-black uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all self-start shadow-sm">
              Read More
            </button>
          </div>
        </div>
      </section>

      {/* 3. ACTION BAR (Clean White) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full mb-32">
        <div className="bg-white shadow-xl shadow-gray-200/50 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100 border border-gray-100">
          
          <div className="flex-1 flex flex-col items-center justify-center gap-3 py-6 md:py-2 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform text-blue-600">
              <Users className="w-7 h-7" />
            </div>
            <div className="text-center mt-2">
              <h4 className="text-base font-black text-gray-900 uppercase tracking-wide">Faculty Recruitment</h4>
              <p className="text-sm text-gray-500 font-medium mt-1">We employ only the best</p>
            </div>
          </div>

          <Link to="/login" target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center justify-center gap-3 py-6 md:py-2 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center group-hover:scale-110 transition-transform text-green-600">
              <FileText className="w-7 h-7" />
            </div>
            <div className="text-center mt-2">
              <h4 className="text-base font-black text-gray-900 uppercase tracking-wide">Results Login</h4>
              <p className="text-sm text-gray-500 font-medium mt-1">Access application results</p>
            </div>
          </Link>

          <div className="flex-1 flex flex-col items-center justify-center gap-3 py-6 md:py-2 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center group-hover:scale-110 transition-transform text-red-500">
              <Shield className="w-7 h-7" />
            </div>
            <div className="text-center mt-2">
              <h4 className="text-base font-black text-gray-900 uppercase tracking-wide">Anti Ragging</h4>
              <p className="text-sm text-gray-500 font-medium mt-1">Our College is ragging free</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. ABOUT, ANNOUNCEMENTS, VIDEOS (Spacious 2-Column Layout) */}
      <section id="about" className="max-w-[1400px] mx-auto px-4 sm:px-6 w-full mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: About & Text */}
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-8 border-b-4 border-blue-600 pb-4 inline-block">About Eswar</h2>
              <div className="w-full h-64 rounded-3xl bg-blue-100 mb-8 overflow-hidden relative shadow-lg">
                <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" alt="Graduation" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
              </div>
              <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8 text-justify">
                ESWAR COLLEGE OF ENGINEERING has established with a motive to nurture world-class engineering graduates who can contribute to the growth of the nation with their unique skills. The college administration believes that a nation will move forward when Science & Technology flourishes in that nation and eradicates social evils through their wisdom. Fulfilling this valuable need, Shaik Dada Saheb charitable Trust has established Eswar College of Engineering in the year 2008.
              </p>
              <button className="px-8 py-4 rounded-xl bg-green-600 text-white font-black uppercase tracking-widest hover:bg-green-700 transition-all shadow-lg shadow-green-200">
                Read More
              </button>
            </div>
          </div>

          {/* Right Column: Media & Flyers */}
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-8 border-b-4 border-red-500 pb-4 inline-block">Announcements</h2>
              <div className="bg-blue-900 rounded-[2rem] p-8 relative overflow-hidden shadow-2xl flex flex-col items-center text-center h-[400px] justify-center">
                {/* Abstract Flyer Background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-700 via-blue-900 to-black opacity-80" />
                
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
                    <Monitor className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-black text-white uppercase tracking-widest mb-2">Engineer's Day</h4>
                  <h5 className="text-5xl font-black text-blue-400 mb-8 drop-shadow-lg">Project Expo</h5>
                  <div className="px-8 py-3 rounded-full bg-white text-blue-900 font-black text-2xl mb-8 shadow-lg">15-09-2025</div>
                  <p className="text-base text-blue-100 font-medium max-w-sm mx-auto">Join us for the grand showcase of student innovation.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-6">Video Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Video 1 */}
                <div className="group relative rounded-2xl overflow-hidden shadow-lg aspect-video bg-gray-200 cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop" alt="Event" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-white drop-shadow-md" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                     <p className="text-white font-bold text-sm">Azadi Ka Amrut Mahotsav 75 years</p>
                  </div>
                </div>

                {/* Video 2 */}
                <div className="group relative rounded-2xl overflow-hidden shadow-lg aspect-video bg-gray-200 cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop" alt="Campus" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-white drop-shadow-md" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                     <p className="text-white font-bold text-sm">Eswar College Video Advt 2021</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. PLACEMENT MARQUEE (Clean & Bright) */}
      <section id="placements" className="py-20 border-y border-gray-200 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 text-center mb-12">
           <h3 className="text-3xl font-black text-gray-900 tracking-tight">Our Top Recruiters</h3>
           <p className="text-gray-500 font-medium mt-2">Hundreds of students placed globally.</p>
        </div>
        <div className="flex whitespace-nowrap overflow-hidden items-center relative">
          {/* Fading Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
          
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            className="flex items-center gap-24 px-12"
          >
            {[...companies, ...companies].map((company, i) => (
              <span key={i} className="text-3xl font-black text-gray-300 hover:text-blue-600 transition-colors cursor-pointer tracking-widest uppercase">
                {company}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. OFFICIAL MEGA FOOTER (Dark to Ground the Design) */}
      <footer className="pt-24 pb-12 bg-slate-900 text-slate-300">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Departments */}
            <div>
              <h4 className="text-white text-lg font-black mb-6 tracking-wide border-b border-slate-700 pb-3">Departments</h4>
              <ul className="space-y-4 text-sm font-semibold">
                {['Civil Engineering', 'Electronics & Communication', 'Electrical & Electronics', 'Mechanical Engineering', 'Computer Science', 'Automobile Engineering'].map(item => (
                  <li key={item} className="flex items-center gap-2 group">
                     <ChevronRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
                     <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programmes */}
            <div>
              <h4 className="text-white text-lg font-black mb-6 tracking-wide border-b border-slate-700 pb-3">Programmes</h4>
              <ul className="space-y-4 text-sm font-semibold">
                {['UG Programmes', 'PG Programmes', 'Fee Structure', 'Exam Cell', 'Results Portal'].map(item => (
                  <li key={item} className="flex items-center gap-2 group">
                     <ChevronRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
                     <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white text-lg font-black mb-6 tracking-wide border-b border-slate-700 pb-3">Quick Links</h4>
              <ul className="space-y-4 text-sm font-semibold">
                {['Mandatory Disclosures', 'Quality Assurance (IQAC)', 'Terms & Conditions', 'Privacy Policy', 'Media Gallery', 'Careers'].map(item => (
                  <li key={item} className="flex items-center gap-2 group">
                     <ChevronRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
                     <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get In Touch */}
            <div>
              <h4 className="text-white text-lg font-black mb-6 tracking-wide border-b border-slate-700 pb-3">Get In Touch</h4>
              <div className="space-y-5">
                <div className="flex items-start gap-4 text-sm font-semibold">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-blue-400" />
                  </div>
                  <p>Kesanupalli Village, Narasaraopet –<br/>522 601, Guntur Dist. A.P.</p>
                </div>
                <div className="flex items-center gap-4 text-sm font-semibold">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>principal@eswarcollegeofengg.org</p>
                    <p>eswarcollegeofengg@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm font-semibold">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-blue-400" />
                  </div>
                  <p>9885878652, 9963634414</p>
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm font-semibold text-slate-500">
              &copy; {new Date().getFullYear()} Eswar College of Engineering. All Rights Reserved.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 transition-colors cursor-pointer flex items-center justify-center">
                 <span className="font-bold text-white text-xs">FB</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 transition-colors cursor-pointer flex items-center justify-center">
                 <span className="font-bold text-white text-xs">IN</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-red-600 transition-colors cursor-pointer flex items-center justify-center">
                 <span className="font-bold text-white text-xs">YT</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
