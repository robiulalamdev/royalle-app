/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        screenbg: "#010404",
        primary: "#52C3BE",
      },
      fontFamily: {
        "Lato-Regular": ["Lato-Regular", "sens-serif"],
        "Lato-Bold": ["Lato-Bold", "sens-serif"],
        "Lato-SemiBold": ["Lato-SemiBold", "sens-serif"],
        "Lato-Medium": ["Lato-Medium", "sens-serif"],
        "Archivo-Regular": ["Archivo-Regular", "sens-serif"],
        "Inter-Regular": ["Inter-Regular", "sens-serif"],
        "Inter-Medium": ["Inter-Medium", "sens-serif"],
        "Inter-SemiBold": ["Inter-SemiBold", "sens-serif"],
        "Inter-Bold": ["Inter-Bold", "sens-serif"],
        "Poppins-Regular": ["Poppins-Regular", "sens-serif"],
        "Poppins-Medium": ["Poppins-Medium", "sens-serif"],
        "Poppins-SemiBold": ["Poppins-SemiBold", "sens-serif"],
        "Poppins-Bold": ["Poppins-Bold", "sens-serif"],
      },
    },
  },
  plugins: [],
};
