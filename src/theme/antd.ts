import { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#5B2EFF",
    borderRadius: 3,
    fontFamily: "var(--font-baiJamjuree), var(--font-hindSiliguri)",
  },
  components: {
    Collapse: {
      contentBg: "#fff",
      headerBg: "#fff",
    },
    Checkbox: {
      colorBorder: "gray",
    },
    Rate: {
      starSize: 13,
      starColor: "#FF8A00",
    },
  },
};

export { theme };
