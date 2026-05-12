import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  CheckSquare, 
  TrendingUp,
  FileText,
  AlertTriangle,
  Upload
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const classPerformance = [
  { grade: 'O', count: 12 },
  { grade: 'A+', count: 25 },
  { grade: 'A', count: 35 },
  { grade: 'B+', count: 18 },
  { grade: 'B', count: 8 },
  { grade: 'C', count: 2 },
];

const attendanceTrends = [
  { date: 'Mon', attendance: 92 },
  { date: 'Tue', attendance: 88 },
  { date: 'Wed', attendance: 95 },
  { date: 'Thu', attendance: 85 },
  { date: 'Fri', attendance: 90 },
];

const FacultyDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Faculty Portal</h2>
          <p className="text-textMuted mt-1">Manage your classes and monitor student performance.</p>
        </div>
        <div className="flex gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-surfaceLight hover:bg-surface text-white border border-white/10 rounded-xl font-medium flex items-center gap-2 transition-colors"
          >
            <Upload className="w-4 h-4" /> Upload Material
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-primary hover:bg-primaryDark text-white rounded-xl font-medium flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            <CheckSquare className="w-4 h-4" /> Mark Attendance
          </motion.button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard 
          title="Total Students" 
          value="142" 
          trend="Across 3 subjects" 
          icon={<Users className="w-6 h-6 text-primary" />} 
          color="from-primary/20 to-blue-600/5"
          borderColor="border-primary/30"
        />
        <StatCard 
          title="Avg. Class Attendance" 
          value="89%" 
          trend="+2% this week" 
          icon={<CheckSquare className="w-6 h-6 text-green-400" />} 
          color="from-green-400/20 to-emerald-600/5"
          borderColor="border-green-400/30"
        />
        <StatCard 
          title="Assignments to Grade" 
          value="45" 
          trend="Due in 2 days" 
          icon={<FileText className="w-6 h-6 text-yellow-400" />} 
          color="from-yellow-400/20 to-yellow-600/5"
          borderColor="border-yellow-400/30"
          alert={true}
        />
        <StatCard 
          title="At-Risk Students" 
          value="8" 
          trend="AI Prediction" 
          icon={<AlertTriangle className="w-6 h-6 text-red-400" />} 
          color="from-red-400/20 to-orange-600/5"
          borderColor="border-red-400/30"
          alert={true}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card border border-white/10 rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Grade Distribution</h3>
            <select className="bg-surface border border-white/10 text-white text-sm rounded-lg focus:ring-primary focus:border-primary px-3 py-1.5 outline-none">
              <option>Operating Systems</option>
              <option>DBMS</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="grade" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: '#ffffff05'}}
                  contentStyle={{ backgroundColor: '#121212', borderColor: '#ffffff20', borderRadius: '12px' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Secondary Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card border border-white/10 rounded-2xl p-6 shadow-xl"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Attendance Trends (This Week)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#121212', borderColor: '#ffffff20', borderRadius: '12px' }}
                />
                <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981', strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, icon, color, borderColor, alert }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`glass-card border ${borderColor} rounded-2xl p-5 shadow-xl relative overflow-hidden group`}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
    <div className="relative z-10 flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-textMuted mb-1">{title}</p>
        <h4 className="text-3xl font-bold text-white mb-2">{value}</h4>
        <p className={`text-xs font-medium flex items-center gap-1 ${alert ? 'text-red-400' : 'text-textMuted'}`}>
          {trend}
        </p>
      </div>
      <div className={`p-3 rounded-xl bg-surfaceLight/50 backdrop-blur-md border border-white/10 shadow-inner`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

export default FacultyDashboard;
