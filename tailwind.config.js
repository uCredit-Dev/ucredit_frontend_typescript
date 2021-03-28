module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        year: "320px",
        courselist: "1400px",
        courebars: "301px",
      },
      height: {
        courebars: "1100px",
      },
      margin: {
        content: "140px",
      },
      backgroundColor: {
        gray: {
          semester: "#D4D4D4",
          year: "#DEDEDE",
          courselist: "#ECECEC",
          coursebars: "E9E9E9",
        },
        green: {
          selectplan: "#63D2B8",
        }
      },
      borderColor: {
        gray: {
          semester: "#BEBEBE",
          year: "#D4D4D4",
        },
      },
      fontSize: {
        myplan: [
          "2.25rem",
          {
            lineHeight: "2.625rem",
          },
        ],
        infocard: [
          "1.125rem",
          {
            lineHeight: "1.313rem",
          },
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
