import { THEMES } from "../constants";

const config = {
  theme: THEMES.DARK,
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
    },
    {
      id: "scan",
      label: "Scan",
      route: "/scan"
    }
  ]
};

export default config;
