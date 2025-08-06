module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60a5fa', // blue-400
          DEFAULT: '#2563eb', // blue-600
          dark: '#1e40af', // blue-800
        },
        grayish: {
          light: '#f3f4f6', // gray-100
          DEFAULT: '#64748b', // slate-500
          dark: '#1e293b', // slate-800
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(90deg, #60a5fa 0%, #2563eb 100%)',
        'card-gradient': 'linear-gradient(135deg, #f3f4f6 0%, #e0e7ef 100%)',
        'hero-gradient-dark': 'linear-gradient(90deg, #1e293b 0%, #2563eb 100%)',
        'card-gradient-dark': 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      },
    },
  },
  plugins: [],
}; 