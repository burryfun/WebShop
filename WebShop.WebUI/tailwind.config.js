/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '360px',
      'sm': '480px',
      'md': '768px',
      'lg': '976px',
    },
    colors: {
      dark: '#2b6777',
      white: '#ffffff',
      light: '#f2f2f2',
      blue: '#2b6777',
      emerald: '#059669',
      teal: '#f0fdfa',
      black: '#000000',
      green: '#52ab98',
      green_200: '#bbf7d0',
      gray_100: '#F3F4F6',
      gray_300: '#D1D5DB',
      gray_500: '#6B7280',
      red: '#dc2626',
      
    }
  },
  plugins: [],
}

// #2b6777 #c8d8e4 #ffffff #f2f2f2 #52ab98