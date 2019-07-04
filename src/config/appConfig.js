import { THEMES } from "../constants";

const config = {
  theme: THEMES.LIGHT,
  navbarItems: [
    {
      id: "dashboard",
      label: "Dashboard",
      route: "/dashboard"
    },
    {
      id: "alerts",
      label: "Alerts",
      route: "/alerts"
    }
  ]
};

export default config;
