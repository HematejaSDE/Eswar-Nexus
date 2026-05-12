import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Download, 
  CheckCircle2, 
  History, 
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

const transactionHistory = [
  {
    id: "TXN-892341",
    date: "Aug 15, 2025",
    amount: "₹30,000",
    status: "Success",
    type: "Tuition Fee - Sem 5",
    method: "UPI"
  },
  {
    id: "TXN-891022",
    date: "Feb 10, 2025",
    amount: "₹45,000",
    status: "Success",
    type: "Tuition Fee - Sem 4",
    method: "Net Banking"
  },
  {
    id: "TXN-789012",
    date: "Aug 12, 2024",
    amount: "₹45,000",
    status: "Success",
    type: "Tuition Fee - Sem 3",
    method: "Credit Card"
  }
];

const Payments = () => {
  const [payAmount, setPayAmount] = useState('15000');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Auto-hide success message after a few seconds
      setTimeout(() => setPaymentSuccess(false), 5000);
    }, 2000);
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
          Fee Management
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-textMuted mt-2 text-sm font-medium"
        >
          Semester fee breakdown and secure payments.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Column: Analytics & History */}
        <div className="xl:col-span-7 space-y-8">
          
          {/* Fee Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-[2rem] p-6"
            >
              <p className="text-xs font-bold text-textMuted uppercase tracking-widest mb-2">Semester Fee</p>
              <h4 className="text-3xl font-bold text-white tracking-tight">₹45,000</h4>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card border-green-500/20 rounded-[2rem] p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 blur-[20px]" />
              <p className="text-xs font-bold text-textMuted uppercase tracking-widest mb-2">Total Paid</p>
              <h4 className="text-3xl font-bold text-green-400 tracking-tight">₹30,000</h4>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel border-red-500/30 rounded-[2rem] p-6 relative overflow-hidden bg-red-500/5"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/20 blur-[20px]" />
              <p className="text-xs font-bold text-red-300 uppercase tracking-widest mb-2 flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5" /> Due Amount
              </p>
              <h4 className="text-3xl font-bold text-red-400 tracking-tight">₹15,000</h4>
            </motion.div>
          </div>

          {/* Transaction History */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-[2rem] p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <History className="w-5 h-5 text-primary" /> Transaction History
              </h3>
              <button className="text-xs font-bold uppercase tracking-widest text-textMuted hover:text-white transition-colors flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" /> Statement
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="pb-4 text-xs font-bold text-textMuted uppercase tracking-widest font-normal">Transaction ID</th>
                    <th className="pb-4 text-xs font-bold text-textMuted uppercase tracking-widest font-normal">Date</th>
                    <th className="pb-4 text-xs font-bold text-textMuted uppercase tracking-widest font-normal">Amount</th>
                    <th className="pb-4 text-xs font-bold text-textMuted uppercase tracking-widest font-normal">Status</th>
                    <th className="pb-4 text-xs font-bold text-textMuted uppercase tracking-widest font-normal text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {transactionHistory.map((txn, i) => (
                    <tr key={txn.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="py-4">
                        <p className="text-sm font-bold text-white">{txn.id}</p>
                        <p className="text-xs text-textMuted font-medium">{txn.type}</p>
                      </td>
                      <td className="py-4 text-sm font-medium text-textMuted">{txn.date}</td>
                      <td className="py-4 text-sm font-bold text-white">{txn.amount}</td>
                      <td className="py-4">
                        <span className="px-2.5 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-md text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" /> {txn.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors opacity-50 group-hover:opacity-100">
                          <Download className="w-4 h-4 text-white" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Payment Gateway Mock */}
        <div className="xl:col-span-5">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="sticky top-6"
          >
            <div className="bg-gradient-to-br from-surfaceLight to-surface border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl">
              {/* Payment Success Overlay */}
              <AnimatePresence>
                {paymentSuccess && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-surface/90 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center"
                  >
                    <motion.div 
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", damping: 15 }}
                      className="w-20 h-20 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center mb-6"
                    >
                      <CheckCircle2 className="w-10 h-10 text-green-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Payment Successful</h3>
                    <p className="text-sm text-textMuted font-medium mb-8">
                      Your payment of ₹{payAmount} has been processed successfully. Transaction ID: TXN-{Math.floor(Math.random() * 900000) + 100000}.
                    </p>
                    <button 
                      onClick={() => setPaymentSuccess(false)}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold text-white transition-colors"
                    >
                      Download Receipt
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Secure Checkout</h3>
              </div>

              <div className="bg-black/20 rounded-2xl p-6 mb-8 border border-white/5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-textMuted font-bold uppercase tracking-widest">Payable Amount</span>
                  <Building2 className="w-5 h-5 text-textMuted" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">₹</span>
                  <span className="text-5xl font-bold text-white tracking-tighter">15,000</span>
                  <span className="text-sm text-textMuted font-medium ml-2">.00</span>
                </div>
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-textMuted uppercase tracking-widest ml-1">Custom Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted font-bold">₹</span>
                    <input 
                      type="number" 
                      value={payAmount}
                      onChange={(e) => setPayAmount(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-10 pr-4 text-white font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
                  <p className="text-[11px] text-accent font-medium leading-relaxed">
                    Payments are secured with 256-bit AES encryption. Nexus does not store your card details.
                  </p>
                </div>

                <button 
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-primary hover:bg-blue-600 rounded-2xl text-sm font-bold text-white shadow-glow-sm transition-all flex items-center justify-center gap-2 group"
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Pay Securely <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
              
              <div className="flex justify-center gap-4 mt-6 opacity-50">
                <div className="w-10 h-6 bg-white/20 rounded"></div>
                <div className="w-10 h-6 bg-white/20 rounded"></div>
                <div className="w-10 h-6 bg-white/20 rounded"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
