import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  BookOpen, 
  Calendar, 
  Award,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  QrCode,
  Sparkles,
  X,
  User as UserIcon,
  CheckCircle,
  Activity,
  ArrowRight,
  Hexagon,
  CreditCard
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const gpaData = [
  { semester: 'Sem 1', gpa: 8.5 },
  { semester: 'Sem 2', gpa: 8.2 },
  { semester: 'Sem 3', gpa: 8.8 },
  { semester: 'Sem 4', gpa: 8.9 },
  { semester: 'Sem 5', gpa: 9.1 },
];

const attendanceData = [
  { subject: 'DBMS', percentage: 85 },
  { subject: 'OS', percentage: 92 },
  { subject: 'CN', percentage: 78 },
  { subject: 'AI', percentage: 95 },
];

const StudentDashboard = () => {
  const [showBriefing, setShowBriefing] = useState(true);

  return (
    <div className="space-y-8 relative max-w-7xl mx-auto">
      {/* AI Daily Briefing Modal */}
      <AnimatePresence>
        {showBriefing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-md w-full glass-card rounded-[2rem] p-8 relative overflow-hidden"
            >
              {/* Subtle mesh background for modal */}
              <div className="absolute top-0 right-0 w-full h-full bg-mesh-subtle opacity-30 pointer-events-none" />
              
              <button onClick={() => setShowBriefing(false)} className="absolute top-6 right-6 text-textMuted hover:text-white transition-colors z-10 bg-white/[0.05] p-2 rounded-full hover:bg-white/[0.1]">
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                  <Sparkles className="w-4 h-4 text-accent drop-shadow-glow-sm" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text tracking-tight">Intelligence Brief</h3>
                  <p className="text-xs text-textMuted font-medium tracking-wide uppercase mt-0.5">May 9th, 2026</p>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                <h2 className="text-2xl font-semibold text-white tracking-tight leading-snug">
                  Good Evening, Hemateja. <br/>
                  <span className="text-textMuted text-lg font-normal">Here is your campus pulse.</span>
                </h2>
                
                <div className="flex gap-4 mb-4">
                  <div className="flex-1 bg-surfaceLight/50 p-4 rounded-2xl border border-white/[0.02]">
                    <p className="text-xs font-medium text-textMuted mb-1">Attendance</p>
                    <p className="text-2xl font-semibold text-text tracking-tight">87.5%</p>
                  </div>
                  <div className="flex-1 bg-surfaceLight/50 p-4 rounded-2xl border border-white/[0.02]">
                    <p className="text-xs font-medium text-textMuted mb-1">Pending</p>
                    <p className="text-2xl font-semibold text-text tracking-tight">0 <span className="text-sm font-normal text-textMuted">Tasks</span></p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                  <p className="text-xs font-medium tracking-wide uppercase text-accent mb-3 flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5" /> Upcoming Event
                  </p>
                  <p className="text-sm text-text leading-relaxed font-medium">
                    <span className="text-accent">AI & ML Workshop</span> at Eswar Seminar Hall tomorrow at 10:00 AM. Attendance is highly recommended for your placement readiness.
                  </p>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setShowBriefing(false)}
                  className="w-full py-4 bg-white text-black hover:bg-gray-200 font-semibold rounded-xl transition-colors mt-2 text-sm tracking-wide"
                >
                  Acknowledge & Start
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-4">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold text-text tracking-tight"
          >
            Welcome back, Hemateja.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-textMuted mt-2 text-sm font-medium"
          >
            Academic overview for Semester 6.
          </motion.p>
        </div>
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowBriefing(true)}
          className="px-4 py-2.5 bg-white/[0.03] text-text border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.05] rounded-xl text-sm font-medium flex items-center gap-2 w-fit transition-all"
        >
          <Sparkles className="w-4 h-4 text-accent" /> Intelligence Brief
        </motion.button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Main Left Content */}
        <div className="xl:col-span-8 space-y-8">
          {/* Executive Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard 
              title="Academic Health" 
              value="84" 
              trend="+5 pts" 
              icon={<Activity className="w-4 h-4 text-textMuted" />} 
              positive={true}
              delay={0.1}
            />
            <StatCard 
              title="Cumulative GPA" 
              value="8.9" 
              trend="+0.2" 
              icon={<Award className="w-4 h-4 text-textMuted" />} 
              positive={true}
              delay={0.2}
            />
            <StatCard 
              title="Attendance Target" 
              value="87%" 
              trend="-2.5%" 
              icon={<Calendar className="w-4 h-4 text-textMuted" />} 
              positive={false}
              delay={0.3}
            />
            <StatCard 
              title="Pending Fee" 
              value="₹15k" 
              trend="Due Soon" 
              icon={<CreditCard className="w-4 h-4 text-textMuted" />} 
              positive={false}
              delay={0.4}
            />
          </div>

          {/* Performance Chart - Executive Grade */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-panel rounded-3xl p-8 relative"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-base font-medium text-text">Performance Trajectory</h3>
              <div className="px-3 py-1 bg-white/[0.05] rounded-full text-xs font-medium text-textMuted">GPA</div>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={gpaData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGpaLinear" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0070F3" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#0070F3" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis dataKey="semester" stroke="#666" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#666" fontSize={11} tickLine={false} axisLine={false} domain={[7, 10]} dx={-10} />
                  <Tooltip 
                    cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                    contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', padding: '12px' }}
                    itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}
                  />
                  <Area type="monotone" dataKey="gpa" stroke="#0070F3" strokeWidth={2} fillOpacity={1} fill="url(#colorGpaLinear)" activeDot={{ r: 6, fill: '#0070F3', stroke: '#000', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student Timeline Feed */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="glass-card rounded-[2rem] p-8 flex flex-col min-h-[300px]"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-textMuted">Timeline</span>
              </div>
              
              <div className="flex-1 flex flex-col justify-start relative">
                {/* Timeline Line */}
                <div className="absolute left-3.5 top-2 bottom-4 w-[2px] bg-white/5"></div>
                
                <div className="space-y-6 relative z-10">
                  {[
                    { title: "Mid-2 Timetable Released", time: "2 hours ago", color: "bg-primary" },
                    { title: "Campus Drive Registration Open", time: "Yesterday", color: "bg-green-500" },
                    { title: "NBA Workshop Tomorrow", time: "2 days ago", color: "bg-accent" },
                    { title: "CRT Session at Seminar Hall", time: "Last week", color: "bg-orange-500" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className={`w-7 h-7 rounded-full border-[4px] border-surfaceLight ${item.color} shrink-0 mt-0.5 shadow-glow-sm`} />
                      <div>
                        <p className="text-white font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-textMuted font-medium mt-1">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Attendance Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="glass-card rounded-[2rem] p-8"
            >
              <h3 className="text-lg font-bold text-white mb-8">Subject Attendance</h3>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} stroke="#A1A1A6" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis dataKey="subject" type="category" stroke="#A1A1A6" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.05)'}}
                      contentStyle={{ backgroundColor: '#232730', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', fontWeight: 600 }}
                    />
                    <Bar dataKey="percentage" fill="#0066FF" radius={[0, 8, 8, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Sidebar - Apple Wallet Style Digital ID */}
        <div className="xl:col-span-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "spring" }}
            className="bg-gradient-to-br from-surfaceLight to-surface border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden flex flex-col items-center sticky top-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            {/* Abstract glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent/20 blur-[80px] pointer-events-none" />
            
            <div className="w-full flex justify-between items-start mb-10 relative z-10">
              <div className="flex items-center gap-2">
                <Hexagon className="w-6 h-6 text-primary" />
                <span className="text-base font-bold tracking-tight text-white">Eswar College ID</span>
              </div>
              <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                <p className="text-[11px] text-green-400 uppercase tracking-widest font-bold">Verified</p>
              </div>
            </div>

            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-primary to-accent p-1 mb-6 relative z-10 shadow-glow-sm">
              <div className="w-full h-full rounded-full bg-surfaceLight flex items-center justify-center overflow-hidden">
                <UserIcon className="w-10 h-10 text-white" />
              </div>
            </div>

            <div className="text-center mb-8 relative z-10">
              <h3 className="text-2xl font-bold text-white tracking-tight mb-1">Ponnekanti Hemateja</h3>
              <p className="text-base text-textMuted font-medium">B.Tech CSE (AI & ML)</p>
              <p className="text-xs text-primary mt-2 uppercase tracking-widest font-bold">21BQ1A05XX</p>
            </div>

            <div className="w-full space-y-5 mb-10 relative z-10 bg-black/20 p-6 rounded-3xl border border-white/5">
              <div className="flex justify-between items-end border-b border-white/5 pb-3">
                <span className="text-xs text-textMuted uppercase tracking-wider font-bold">Status</span>
                <span className="text-sm text-white font-bold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
                  Active Student
                </span>
              </div>
              <div className="flex justify-between items-end border-b border-white/5 pb-3">
                <span className="text-xs text-textMuted uppercase tracking-wider font-bold">Valid Thru</span>
                <span className="text-sm text-white font-bold">05 / 2025</span>
              </div>
              <div className="flex justify-between items-end border-b border-white/5 pb-3">
                <span className="text-xs text-textMuted uppercase tracking-wider font-bold">Intelligence</span>
                <span className="text-sm text-accent font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4"/> Level 98
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[2rem] relative z-10 shadow-xl w-3/4 aspect-square flex items-center justify-center hover:scale-105 transition-transform duration-500 cursor-pointer">
              <QrCode className="w-full h-full text-black" strokeWidth={1.5} />
            </div>
            
            <p className="text-xs text-textMuted mt-6 relative z-10 text-center tracking-wide font-medium">
              Scan at any campus terminal.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, icon, positive, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: "spring" }}
    whileHover={{ y: -4, scale: 1.02 }}
    className="glass-card rounded-[2rem] p-8 relative overflow-hidden group transition-all duration-300"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/30 transition-colors">
          {icon}
        </div>
        <div className={`px-3 py-1.5 rounded-full text-xs font-bold border ${positive ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
          {trend}
        </div>
      </div>
      <p className="text-sm font-bold text-textMuted mb-2">{title}</p>
      <h4 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">{value}</h4>
    </div>
  </motion.div>
);

export default StudentDashboard;
