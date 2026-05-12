import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  GraduationCap, 
  CreditCard, 
  Activity,
  Building,
  ArrowUpRight,
  UserPlus,
  Radio
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const revenueData = [
  { month: 'Jan', amount: 120000 },
  { month: 'Feb', amount: 150000 },
  { month: 'Mar', amount: 180000 },
  { month: 'Apr', amount: 220000 },
  { month: 'May', amount: 350000 },
  { month: 'Jun', amount: 420000 },
];

const departmentData = [
  { name: 'CSE', value: 400 },
  { name: 'ECE', value: 300 },
  { name: 'EEE', value: 200 },
  { name: 'MECH', value: 150 },
  { name: 'CIVIL', value: 100 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">System Administration</h2>
          <p className="text-textMuted mt-1">Eswar College of Engineering overall metrics.</p>
        </div>
        <div className="flex gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-primary hover:bg-primaryDark text-white rounded-xl font-medium flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            <UserPlus className="w-4 h-4" /> Add User
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Stats and Charts */}
        <div className="xl:col-span-3 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatCard 
              title="Total Students" 
              value="1,150" 
              trend="+45 this year" 
              icon={<GraduationCap className="w-6 h-6 text-primary" />} 
              color="from-primary/20 to-blue-600/5"
              borderColor="border-primary/30"
            />
            <StatCard 
              title="Total Faculty" 
              value="85" 
              trend="+5 this semester" 
              icon={<Users className="w-6 h-6 text-accent" />} 
              color="from-accent/20 to-purple-600/5"
              borderColor="border-accent/30"
            />
            <StatCard 
              title="Fee Collection" 
              value="₹4.2M" 
              trend="85% collected" 
              icon={<CreditCard className="w-6 h-6 text-green-400" />} 
              color="from-green-400/20 to-emerald-600/5"
              borderColor="border-green-400/30"
            />
            <StatCard 
              title="System Health" 
              value="99.9%" 
              trend="All services optimal" 
              icon={<Activity className="w-6 h-6 text-yellow-400" />} 
              color="from-yellow-400/20 to-yellow-600/5"
              borderColor="border-yellow-400/30"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6 relative z-10">
                <h3 className="text-lg font-semibold text-white">Revenue Overview</h3>
              </div>
              <div className="h-[250px] w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#121212', borderColor: '#ffffff20', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                      formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                    />
                    <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
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
              <h3 className="text-lg font-semibold text-white mb-6">Department Distribution</h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#121212', borderColor: '#ffffff20', borderRadius: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {departmentData.map((dept, index) => (
                  <div key={dept.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-xs text-textMuted">{dept.name} ({dept.value})</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Sidebar - Live Campus Pulse */}
        <div className="xl:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card border border-white/10 rounded-2xl p-6 shadow-xl sticky top-6 overflow-hidden h-[calc(100vh-140px)] flex flex-col"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[40px] pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 relative">
                <Radio className="w-5 h-5 text-red-500 relative z-10" />
                <span className="absolute inset-0 rounded-full border border-red-500/50 animate-ping" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Live Campus Pulse</h3>
                <p className="text-xs text-textMuted flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Active Now</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 relative z-10 custom-scrollbar">
              <PulseItem 
                time="Just now" 
                text={<><strong>42 assignments</strong> submitted today</>} 
                color="border-l-primary" 
              />
              <PulseItem 
                time="2 mins ago" 
                text={<><strong>128 students</strong> active now</>} 
                color="border-l-accent" 
              />
              <PulseItem 
                time="15 mins ago" 
                text={<><strong>₹2.4L fees</strong> processed this week</>} 
                color="border-l-green-500" 
              />
              <PulseItem 
                time="1 hour ago" 
                text={<>AI processed <strong>1,248 academic queries</strong></>} 
                color="border-l-primary" 
              />
              <PulseItem 
                time="2 hours ago" 
                text={<><strong>3 new faculty</strong> onboarded successfully</>} 
                color="border-l-yellow-500" 
              />
              <PulseItem 
                time="4 hours ago" 
                text={<>System backup completed successfully</>} 
                color="border-l-green-500" 
              />
              <PulseItem 
                time="Yesterday" 
                text={<><strong>Semester 5 Results</strong> published by Admin</>} 
                color="border-l-accent" 
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const PulseItem = ({ time, text, color }) => (
  <div className={`p-3 bg-surfaceLight/50 rounded-r-xl border-l-2 ${color} border-y border-r border-white/5`}>
    <p className="text-xs text-textMuted mb-1">{time}</p>
    <p className="text-sm text-white">{text}</p>
  </div>
);

const StatCard = ({ title, value, trend, icon, color, borderColor }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`glass-card border ${borderColor} rounded-2xl p-5 shadow-xl relative overflow-hidden group`}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
    <div className="relative z-10 flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-textMuted mb-1">{title}</p>
        <h4 className="text-3xl font-bold text-white mb-2">{value}</h4>
        <p className="text-xs font-medium text-textMuted">
          {trend}
        </p>
      </div>
      <div className={`p-3 rounded-xl bg-surfaceLight/50 backdrop-blur-md border border-white/10 shadow-inner`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

export default AdminDashboard;
