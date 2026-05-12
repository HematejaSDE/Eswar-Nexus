/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F1115', // Soft, deep premium slate instead of harsh black
        surface: '#1A1D24', // Elevated card color
        surfaceLight: '#232730', // Hover states
        primary: '#0066FF', // Friendly, vibrant Apple Blue
        primaryDark: '#0052CC',
        accent: '#5E5CE6', // Apple Indigo
        text: '#F5F5F7', // Apple off-white text
        textMuted: '#A1A1A6', // Apple muted gray
        borderLight: 'rgba(255, 255, 255, 0.08)', // slightly more visible borders for usability
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-subtle': 'radial-gradient(at 0% 0%, rgba(0, 102, 255, 0.08) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(94, 92, 230, 0.08) 0px, transparent 50%)',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(0, 102, 255, 0.15)',
        'glow-md': '0 0 30px rgba(0, 102, 255, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' // Bouncy, friendly interaction
      }
    },
  },
  plugins: [],
}
