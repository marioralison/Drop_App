/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        vert : "#C9D856",
        blackPrimary : "#131001",
      },
      fontFamily: {
        "syne-regular": ["Syne-Regular"],
        "syne-bold": ["Syne-Bold"],
        "syne-semiBold": ["Syne-SemiBold"],
        "lato-regular": ["Lato-Regular"],
        "lato-bold": ["Lato-Bold"]
      },
    },
  },
  plugins: [],
}