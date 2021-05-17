export const themes = {
  light: {
    background: {
      body: "#EFF2F5",
      primary: "#fff",
      searchBox: "#cfe0f1",
      opacity: "rgba(255, 255, 255, 0.3)",
    },
    primary: "#0051c3",
    text: {
      primary: "#303030",
      second: "#505050",
      third: "#888",
      searchBox: "#0051c3",
      negative: "#fff",
      remind: "#888",
    },
    boxShadow: {
      primary: "0 0 30px rgba(33, 83, 154, 0.08)",
      second:
        "0 0 30px rgba(33, 83, 154, 0.08), inset 1px 1px 5px rgba(255, 255, 255, 0.3)",
    },
    button: {
      menu: "#fff",
      submit: "#303030",
      modify: "#0051c3",
      modifyBorder: "#ccc",
    },
    loading: {
      border: "rgba(0, 81, 195, 0.3)",
      focus: "#0051c3",
    },
    error: "#cb0000",
  },
  dark: {
    background: {
      body: "#293136",
      primary: "#313B41",
      searchBox: "#9cbfe2",
      opacity: "rgba(207, 224, 241, 0.02)",
    },
    primary: "#82B1FF",
    text: {
      primary: "#F2F2F2",
      second: "#CCC",
      third: "#6d6d6d",
      searchBox: "#293136",
      negative: "#313B41",
      remind: "#aaa",
    },
    boxShadow: {
      primary: "0 0 30px rgba(0, 0, 0, 0.1)",
      second:
        "0 0 10px rgba(0, 0, 0, 0.1), inset 1px 1px 5px rgba(255, 255, 255, 0.03)",
    },
    button: {
      menu: "#fff",
      submit: "#CFE0F1",
      modify: "#999",
    },
    loading: {
      border: "rgba(255, 255, 255, 0.2)",
      focus: "#fff",
    },
    error: "#D04D5A",
  },
};

export default themes;
