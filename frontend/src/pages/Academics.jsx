import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Download, 
  TrendingUp, 
  Award,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const gpaData = [
  { semester: 'Sem 1', gpa: 8.5 },
  { semester: 'Sem 2', gpa: 8.2 },
  { semester: 'Sem 3', gpa: 8.8 },
  { semester: 'Sem 4', gpa: 8.9 },
  { semester: 'Sem 5', gpa: 9.1 },
];

const currentSemMarks = [
  { code: "CS501", subject: "Database Management Systems", credits: 4, internal: 35, external: 55, total: 90, grade: "S" },
  { code: "CS502", subject: "Operating Systems", credits: 4, internal: 32, external: 48, total: 80, grade: "A" },
  { code: "CS503", subject: "Computer Networks", credits: 3, internal: 28, external: 50, total: 78, grade: "A" },
  { code: "CS504", subject: "Artificial Intelligence", credits: 3, internal: 38, external: 58, total: 96, grade: "S" },
  { code: "CS505", subject: "Compiler Design", credits: 3, internal: 30, external: 45, total: 75, grade: "B" },
  { code: "CS506", subject: "DBMS Lab", credits: 1.5, internal: 38, external: 55, total: 93, grade: "S" },
];

const Academics = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-semibold text-text tracking-tight"
        >
          Academic Results
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-textMuted mt-2 text-sm font-medium"
        >
          Track your academic performance and download memos.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Column: Marks Memo */}
        <div className="xl:col-span-8 space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-[2rem] p-8 overflow-hidden relative"
          >
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" /> Semester 5 Results
                </h3>
                <p className="text-sm text-textMuted font-medium mt-1">B.Tech CSE (AI & ML) (2025 Batch)</p>
              </div>
              
              <button className="px-5 py-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-xl text-primary text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 w-fit">
                <Download className="w-4 h-4" /> Download Memo
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02]">
                    <th className="py-4 pl-4 text-xs font-bold text-textMuted uppercase tracking-widest rounded-tl-xl">Code</th>
                    <th className="py-4 text-xs font-bold text-textMuted uppercase tracking-widest">Subject Name</th>
                    <th className="py-4 text-xs font-bold text-textMuted uppercase tracking-widest text-center">Credits</th>
                    <th className="py-4 text-xs font-bold text-textMuted uppercase tracking-widest text-center">INT</th>
                    <th className="py-4 text-xs font-bold text-textMuted uppercase tracking-widest text-center">EXT</th>
                    <th className="py-4 text-xs font-bold text-textMuted uppercase tracking-widest text-center">Total</th>
                    <th className="py-4 pr-4 text-xs font-bold text-textMuted uppercase tracking-widest text-center rounded-tr-xl">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {currentSemMarks.map((mark, i) => (
                    <tr key={mark.code} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 pl-4 text-sm font-bold text-textMuted">{mark.code}</td>
                      <td className="py-4 text-sm font-bold text-white">{mark.subject}</td>
                      <td className="py-4 text-sm font-medium text-textMuted text-center">{mark.credits}</td>
                      <td className="py-4 text-sm font-medium text-textMuted text-center">{mark.internal}</td>
                      <td className="py-4 text-sm font-medium text-textMuted text-center">{mark.external}</td>
                      <td className="py-4 text-sm font-bold text-white text-center">{mark.total}</td>
                      <td className="py-4 pr-4 text-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold border ${
                          mark.grade === 'S' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                          mark.grade === 'A' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                          'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                        }`}>
                          {mark.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* SGPA Banner */}
            <div className="mt-8 bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">Regulation: R20 | Credits Earned: 21</p>
                  <p className="text-sm text-white font-medium">Semester IV Results</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-textMuted font-bold uppercase tracking-widest mb-1">CGPA</p>
                <div className="text-4xl font-bold text-white tracking-tighter">
                  8.42
                </div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Right Column: Performance Analytics */}
        <div className="xl:col-span-4">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="sticky top-6 space-y-6"
          >
            {/* GPA Graph */}
            <div className="glass-panel border-white/10 rounded-[2.5rem] p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" /> GPA Trajectory
                </h3>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-textMuted">Overall: 8.9</span>
              </div>
              
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={gpaData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorGpaLinearAcademics" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5E5CE6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#5E5CE6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis dataKey="semester" stroke="#666" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} domain={[7, 10]} dx={-10} />
                    <Tooltip 
                      cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                      contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px' }}
                      itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}
                    />
                    <Area type="monotone" dataKey="gpa" stroke="#5E5CE6" strokeWidth={3} fillOpacity={1} fill="url(#colorGpaLinearAcademics)" activeDot={{ r: 6, fill: '#5E5CE6', stroke: '#000', strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Past Semesters List */}
            <div className="glass-card rounded-[2rem] p-6">
              <h3 className="text-sm font-bold text-textMuted uppercase tracking-widest mb-6">Past Semesters</h3>
              <div className="space-y-3">
                {[
                  { sem: "Semester 4", date: "Dec 2024", gpa: "8.90" },
                  { sem: "Semester 3", date: "May 2024", gpa: "8.80" },
                  { sem: "Semester 2", date: "Dec 2023", gpa: "8.20" },
                  { sem: "Semester 1", date: "May 2023", gpa: "8.50" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-2xl cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/30 transition-colors">
                        <Calendar className="w-4 h-4 text-textMuted group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{s.sem}</p>
                        <p className="text-xs text-textMuted font-medium">{s.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-white">{s.gpa}</span>
                      <ChevronRight className="w-4 h-4 text-textMuted group-hover:text-white transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Academics;
