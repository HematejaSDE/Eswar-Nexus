import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Hexagon, 
  Briefcase, 
  CheckCircle2, 
  XCircle, 
  UploadCloud, 
  FileText, 
  Star,
  Building,
  MapPin,
  DollarSign,
  Calendar,
  ArrowRight
} from 'lucide-react';

const companies = [
  {
    name: "TCS",
    role: "Ninja / Digital",
    package: "3.3 - 7.0 LPA",
    location: "Pan India",
    deadline: "May 20, 2026",
    eligible: true,
    logo: "bg-purple-500",
    tags: ["Java", "Python", "Aptitude"]
  },
  {
    name: "Infosys",
    role: "System Engineer",
    package: "3.6 - 5.0 LPA",
    location: "Bangalore / Pune",
    deadline: "May 15, 2026",
    eligible: true,
    logo: "bg-blue-500",
    tags: ["Java", "Python", "SQL"]
  },
  {
    name: "Accenture",
    role: "Advanced App Engineering",
    package: "4.5 - 6.5 LPA",
    location: "Hyderabad",
    deadline: "May 22, 2026",
    eligible: true,
    logo: "bg-zinc-100 text-black",
    tags: ["Full Stack", "Agile"]
  },
  {
    name: "Cognizant",
    role: "GenC",
    package: "4.0 LPA",
    location: "Chennai",
    deadline: "June 05, 2026",
    eligible: true,
    logo: "bg-green-600",
    tags: ["SQL", "Testing", "Java"]
  },
  {
    name: "Wipro",
    role: "Project Engineer",
    package: "3.5 LPA",
    location: "Bangalore",
    deadline: "June 10, 2026",
    eligible: false,
    reason: "Backlog constraint",
    logo: "bg-red-500",
    tags: ["C++", "DSA"]
  },
  {
    name: "Tech Mahindra",
    role: "Software Engineer",
    package: "3.25 LPA",
    location: "Hyderabad",
    deadline: "June 15, 2026",
    eligible: true,
    logo: "bg-orange-500",
    tags: ["Networking", "OS"]
  }
];

const Placements = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [resumeScore, setResumeScore] = useState(null);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate ATS scanning
    setTimeout(() => {
      setIsUploading(false);
      setResumeScore({
        atsScore: 88,
        skillMatch: 92,
        readability: "Excellent",
        feedback: "Strong highlight of web development projects. Consider adding more DSA metrics."
      });
    }, 2500);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-semibold text-text tracking-tight"
        >
          Career & Placements
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-textMuted mt-2 text-sm font-medium"
        >
          Your placement eligibility and recruitment drives.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Column: Eligibility & Companies */}
        <div className="xl:col-span-8 space-y-8">
          
          {/* Eligibility Engine Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[60px] pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Eligibility Engine</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
              <div className="bg-green-500/5 border border-green-500/10 rounded-2xl p-5">
                <h4 className="text-xs font-bold text-green-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Cleared Drives
                </h4>
                <ul className="space-y-3">
                  {companies.filter(c => c.eligible).map(c => (
                    <li key={c.name} className="text-sm font-medium text-white flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-green-400 before:rounded-full">
                      {c.name} <span className="text-textMuted text-xs font-normal">({c.package})</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-5">
                <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Not Eligible
                </h4>
                <ul className="space-y-3">
                  {companies.filter(c => !c.eligible).map(c => (
                    <li key={c.name} className="text-sm font-medium text-white flex flex-col">
                      <span className="flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-red-400 before:rounded-full">
                        {c.name}
                      </span>
                      <span className="text-textMuted text-xs font-normal mt-1 ml-3.5 border-l-2 border-red-500/20 pl-2">
                        {c.reason}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Company Cards Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Active Recruitment Drives</h3>
              <button className="text-primary text-sm font-bold hover:text-white transition-colors">View All</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {companies.map((company, index) => (
                <motion.div 
                  key={company.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                  className="glass-card rounded-[2rem] p-6 group hover:border-white/20 transition-all cursor-pointer relative overflow-hidden"
                >
                  {!company.eligible && (
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm font-bold border border-red-500/30 backdrop-blur-md flex items-center gap-2">
                        <XCircle className="w-4 h-4" /> Requirements not met
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl ${company.logo} shadow-glow-sm`}>
                      {company.name.charAt(0)}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      company.eligible ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-surfaceLight text-textMuted'
                    }`}>
                      {company.eligible ? 'Eligible' : 'Locked'}
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-bold text-white mb-1">{company.name}</h4>
                  <p className="text-sm font-medium text-primary mb-4">{company.role}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-xs text-textMuted font-medium">
                      <DollarSign className="w-3.5 h-3.5" /> {company.package}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-textMuted font-medium">
                      <MapPin className="w-3.5 h-3.5" /> {company.location}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-textMuted font-medium">
                      <Calendar className="w-3.5 h-3.5" /> Apply by {company.deadline}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {company.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-white/5 rounded-md text-[10px] font-bold text-textMuted uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Resume UI */}
        <div className="xl:col-span-4">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="sticky top-6 space-y-6"
          >
            {/* Resume Score Card */}
            <div className="glass-panel border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[50px] pointer-events-none" />
              
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" /> ATS Resume Score
              </h3>

              {!resumeScore ? (
                <div 
                  onClick={handleUpload}
                  className="border-2 border-dashed border-white/10 rounded-[2rem] p-8 text-center cursor-pointer hover:bg-white/5 hover:border-primary/50 transition-all group"
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <p className="text-sm font-bold text-primary tracking-widest uppercase animate-pulse">Scanning...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <UploadCloud className="w-8 h-8 text-textMuted group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Upload Resume</p>
                        <p className="text-xs font-medium text-textMuted mt-1">PDF or DOCX (Max 2MB)</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="flex items-end justify-between border-b border-white/10 pb-6">
                    <div>
                      <p className="text-xs font-bold text-textMuted uppercase tracking-widest mb-1">ATS Score</p>
                      <h4 className="text-5xl font-bold text-white">{resumeScore.atsScore}<span className="text-xl text-textMuted">/100</span></h4>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                      <Star className="w-6 h-6 text-green-400 fill-green-400" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-textMuted">Skill Match</span>
                      <span className="text-sm font-bold text-white">{resumeScore.skillMatch}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${resumeScore.skillMatch}%` }} />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-textMuted">Readability</span>
                      <span className="text-sm font-bold text-accent">{resumeScore.readability}</span>
                    </div>
                  </div>

                  <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mt-4">
                    <p className="text-xs text-primary font-bold uppercase tracking-widest mb-2">AI Feedback</p>
                    <p className="text-sm text-white font-medium leading-relaxed">
                      {resumeScore.feedback}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => setResumeScore(null)}
                    className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white transition-colors uppercase tracking-widest"
                  >
                    Upload New Version
                  </button>
                </motion.div>
              )}
            </div>

            {/* Preparation Stats */}
            <div className="glass-card rounded-[2rem] p-6">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest text-textMuted">Placement Readiness</h3>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-5xl font-bold text-white">78%</span>
                <span className="text-sm text-textMuted font-medium mb-1">Score</span>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-textMuted uppercase tracking-widest mb-3">Needs Improvement</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-md text-xs font-bold flex items-center gap-1">
                      <XCircle className="w-3 h-3" /> Aptitude
                    </span>
                    <span className="px-2.5 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-md text-xs font-bold flex items-center gap-1">
                      <XCircle className="w-3 h-3" /> DSA
                    </span>
                    <span className="px-2.5 py-1.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-md text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Communication Skills
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Placements;
