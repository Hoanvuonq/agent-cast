/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-pc': "url('/images/background/bg-mainPC.png')",
      },
    },
    colors: {
      'pixel-green': '#00D084',
        'pixel-white': '#FFFFFF',
    },
  },
  plugins: [],
};
export default config;