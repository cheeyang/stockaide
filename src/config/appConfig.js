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
    },
    {
      id: "trade",
      label: "Trade",
      route: "/trade"
    }
  ]
};

export default config;
