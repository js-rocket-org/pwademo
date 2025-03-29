import { j as jsxRuntimeExports, u as useNavigate, r as reactExports, A as APP_VERSION } from "./mainapp.js";
import { r as remove_ios_look } from "./common.js";
const LayoutHBF = ({ header, footer, children }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "layout_hbf", style: styles$2.page, children: [
    header,
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$2.pageBody, children }),
    footer
  ] });
};
const styles$2 = {
  page: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    position: "absolute",
    overflow: "none",
    fontFamily: "sans-serif"
  },
  pageBody: {
    flex: "1 0 auto"
  }
};
const HEADER_HEIGHT = 32;
const FOOTER_HEIGHT = 64;
const styles$1 = {
  navbar_container: {
    height: FOOTER_HEIGHT,
    display: "flex",
    flexDirection: "row"
  },
  button: {
    flex: 1,
    // "1 0 auto",
    background: "lightblue",
    border: "solid blue",
    borderLeftWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    height: FOOTER_HEIGHT - 2,
    ...remove_ios_look,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};
const IconHome = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M10%2020v-6h4v6h5v-8h3L12%203%202%2012h3v8z'/%3e%3c/svg%3e";
const IconQRCodeScanner = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M9.5%206.5v3h-3v-3h3M11%205H5v6h6V5zm-1.5%209.5v3h-3v-3h3M11%2013H5v6h6v-6zm6.5-6.5v3h-3v-3h3M19%205h-6v6h6V5zm-6%208h1.5v1.5H13V13zm1.5%201.5H16V16h-1.5v-1.5zM16%2013h1.5v1.5H16V13zm-3%203h1.5v1.5H13V16zm1.5%201.5H16V19h-1.5v-1.5zM16%2016h1.5v1.5H16V16zm1.5-1.5H19V16h-1.5v-1.5zm0%203H19V19h-1.5v-1.5zM22%207h-2V4h-3V2h5v5zm0%2015v-5h-2v3h-3v2h5zM2%2022h5v-2H4v-3H2v5zM2%202v5h2V4h3V2H2z'/%3e%3c/svg%3e";
const IconEmojiEvents = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M19%205h-2V3H7v2H5c-1.1%200-2%20.9-2%202v1c0%202.55%201.92%204.63%204.39%204.94A5.01%205.01%200%200%200%2011%2015.9V19H7v2h10v-2h-4v-3.1a5.01%205.01%200%200%200%203.61-2.96C19.08%2012.63%2021%2010.55%2021%208V7c0-1.1-.9-2-2-2zM5%208V7h2v3.82C5.84%2010.4%205%209.3%205%208zm14%200c0%201.3-.84%202.4-2%202.82V7h2v1z'/%3e%3c/svg%3e";
const IconRecordVoiceOver = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3ccircle%20cx='9'%20cy='9'%20r='4'/%3e%3cpath%20d='M9%2015c-2.67%200-8%201.34-8%204v2h16v-2c0-2.66-5.33-4-8-4zm7.76-9.64-1.68%201.69c.84%201.18.84%202.71%200%203.89l1.68%201.69c2.02-2.02%202.02-5.07%200-7.27zM20.07%202l-1.63%201.63c2.77%203.02%202.77%207.56%200%2010.74L20.07%2016c3.9-3.89%203.91-9.95%200-14z'/%3e%3c/svg%3e";
const IconLabel = ({ icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: icon }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
] });
const NAVBAR_LIST = [
  { key: "/home", value: /* @__PURE__ */ jsxRuntimeExports.jsx(IconLabel, { label: "Home", icon: IconHome }) },
  { key: "/transcribe", value: /* @__PURE__ */ jsxRuntimeExports.jsx(IconLabel, { label: "Transcribe", icon: IconRecordVoiceOver }) },
  { key: "/claim", value: /* @__PURE__ */ jsxRuntimeExports.jsx(IconLabel, { label: "Claim", icon: IconEmojiEvents }) },
  { key: "/scan", value: /* @__PURE__ */ jsxRuntimeExports.jsx(IconLabel, { label: "Scan", icon: IconQRCodeScanner }) }
];
const NavBar = () => {
  const navigate = useNavigate();
  const onClickButton = (url) => {
    navigate({ to: url });
  };
  reactExports.useEffect(() => {
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.navbar_container, children: NAVBAR_LIST.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      style: styles$1.button,
      onClick: () => onClickButton(item.key),
      children: item.value
    },
    index
  )) });
};
const IconWifi = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='m1%209%202%202c4.97-4.97%2013.03-4.97%2018%200l2-2C16.93%202.93%207.08%202.93%201%209zm8%208%203%203%203-3a4.237%204.237%200%200%200-6%200zm-4-4%202%202a7.074%207.074%200%200%201%2010%200l2-2C15.14%209.14%208.87%209.14%205%2013z'/%3e%3c/svg%3e";
const IconWifiOff = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M22.99%209C19.15%205.16%2013.8%203.76%208.84%204.78l2.52%202.52c3.47-.17%206.99%201.05%209.63%203.7l2-2zm-4%204a9.793%209.793%200%200%200-4.49-2.56l3.53%203.53.96-.97zM2%203.05%205.07%206.1C3.6%206.82%202.22%207.78%201%209l1.99%202c1.24-1.24%202.67-2.16%204.2-2.77l2.24%202.24A9.684%209.684%200%200%200%205%2013v.01L6.99%2015a7.042%207.042%200%200%201%204.92-2.06L18.98%2020l1.27-1.26L3.29%201.79%202%203.05zM9%2017l3%203%203-3a4.237%204.237%200%200%200-6%200z'/%3e%3c/svg%3e";
const IconLogout = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='m17%207-1.41%201.41L18.17%2011H8v2h10.17l-2.58%202.58L17%2017l5-5zM4%205h8V3H4c-1.1%200-2%20.9-2%202v14c0%201.1.9%202%202%202h8v-2H4V5z'/%3e%3c/svg%3e";
const Header = ({ middle }) => {
  const [isOnline, setIsOnline] = reactExports.useState(navigator.onLine);
  const navigate = useNavigate();
  const onClickClose = () => {
    navigate({ to: "/" });
  };
  const onlineHandler = () => {
    setIsOnline(true);
  };
  const offlineHandler = () => {
    setIsOnline(false);
  };
  reactExports.useEffect(() => {
    addEventListener("online", onlineHandler);
    addEventListener("offline", offlineHandler);
    return () => {
      removeEventListener("online", onlineHandler);
      removeEventListener("offline", offlineHandler);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.left_section, children: `v${APP_VERSION}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.middle_section, children: middle }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.right_section, children: [
      isOnline ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { style: styles.icon_online, src: IconWifi }) : /* @__PURE__ */ jsxRuntimeExports.jsx("img", { style: styles.icon_offline, src: IconWifiOff }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.close_button, onClick: onClickClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: IconLogout }) })
    ] })
  ] });
};
const section_common = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  margin: 0
};
const styles = {
  header: {
    height: HEADER_HEIGHT,
    color: "black",
    background: "lightblue",
    flex: "0 0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  left_section: {
    ...section_common
  },
  middle_section: {
    ...section_common,
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%"
  },
  right_section: {
    ...section_common
  },
  icon_online: {
    fontSize: HEADER_HEIGHT / 2,
    color: "green"
  },
  icon_offline: {
    fontSize: HEADER_HEIGHT / 2,
    color: "red"
  },
  close_button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: HEADER_HEIGHT / 2,
    color: "black",
    borderLeft: "1px solid blue",
    marginLeft: 20,
    paddingLeft: 20,
    paddingRight: 5
  }
};
export {
  FOOTER_HEIGHT as F,
  Header as H,
  LayoutHBF as L,
  NavBar as N,
  HEADER_HEIGHT as a
};
