/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "contacts-rgba": "rgb(1, 1, 60)",
      },
    },
    fontFamily: {
      poppins: ["Poppins"],
      dancing: ["Dancing Script"],
      roboto: ["Roboto"],
      montserrat: ["montserrat"],
    },
  },
  plugins: [],
};
