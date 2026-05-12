import React from 'react';
import { Hexagon, MessageCircle, Globe, Briefcase, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface/50 border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Hexagon className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold tracking-tight text-white">
                Eswar <span className="text-primary">Nexus</span>
              </span>
            </Link>
            <p className="text-textMuted max-w-sm mb-6 leading-relaxed">
              The next-generation AI-powered Student Management System designed for modern educational institutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-textMuted hover:text-white hover:border-primary/50 transition-all">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-textMuted hover:text-white hover:border-primary/50 transition-all">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-textMuted hover:text-white hover:border-primary/50 transition-all">
                <Briefcase className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-textMuted hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link to="/features" className="text-textMuted hover:text-primary transition-colors text-sm">Features</Link></li>
              <li><Link to="/contact" className="text-textMuted hover:text-primary transition-colors text-sm">Contact</Link></li>
              <li><Link to="/support" className="text-textMuted hover:text-primary transition-colors text-sm">Support Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-textMuted hover:text-primary transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-textMuted hover:text-primary transition-colors text-sm">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-textMuted hover:text-primary transition-colors text-sm">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-textMuted">
            &copy; {new Date().getFullYear()} Eswar College of Engineering. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-textMuted">
            <span>Powered by</span>
            <span className="text-primary font-medium flex items-center gap-1"><Hexagon className="w-4 h-4" /> Eswar Nexus AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
