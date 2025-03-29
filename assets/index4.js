import { r as reactExports, j as jsxRuntimeExports } from "./mainapp.js";
import { L as LayoutHBF, N as NavBar, H as Header } from "./Header.js";
import "./common.js";
const IconPwa = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3ePWA%3c/title%3e%3cpath%20d='M20.5967%207.482L24%2016.518h-2.5098l-.5816-1.6184h-3.2452l.6933-1.7532h2.0019l-.95-2.6597%201.1881-3.0047zm-8.111%200l1.7722%205.8393L16.75%207.482h2.4154l-3.6433%209.036h-2.3833l-1.6395-5.2366-1.7196%205.2366h-2.377l-1.233-2.1161%201.2144-3.7415%201.342%202.6609%201.9029-5.8393h1.8566zm-8.7453%200c1.0635%200%201.8713.3055%202.4234.9166a2.647%202.647%200%2001.2806.3684l-1.0753%203.3128-.3847%201.1854c-.352.1006-.7533.1509-1.204.1509H2.2928v3.102H0V7.482zm-.5816%201.7532h-.866v2.4276h.8597c.5577%200%20.9406-.1194%201.1485-.3582.1896-.215.2845-.5058.2845-.8724%200-.364-.1079-.6544-.3235-.8714-.2157-.217-.5834-.3256-1.1032-.3256z'/%3e%3c/svg%3e";
var Platforms = /* @__PURE__ */ ((Platforms2) => {
  Platforms2[Platforms2["android"] = 0] = "android";
  Platforms2[Platforms2["ios"] = 1] = "ios";
  Platforms2[Platforms2["linux"] = 2] = "linux";
  Platforms2[Platforms2["other"] = 3] = "other";
  return Platforms2;
})(Platforms || {});
const getPlatform = () => {
  const userAgent = navigator.userAgent || navigator.vendor || globalThis.opera;
  if (/android/i.test(userAgent)) {
    return 0;
  } else if (/iPhone|iPad|iPod|mac os/i.test(userAgent)) {
    return 1;
  } else if (/linux/i.test(userAgent)) {
    return 2;
  } else {
    return 3;
  }
};
const styles = {
  page_body: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  home_icon: {
    width: 100
  },
  home_text: {
    fontSize: 18
  },
  data_list: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  list_text: {
    fontSize: 12
  }
};
const SplitComponent = function RouteComponent() {
  const [battery, setBattery] = reactExports.useState();
  const platform = getPlatform();
  const getScreenSizeInCm = () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const pixelRatio = window.devicePixelRatio || 1;
    const dpi = 96;
    const inchesToCm = 2.54;
    const physicalWidthInCm = screenWidth / dpi / pixelRatio * inchesToCm;
    const physicalHeightInCm = screenHeight / dpi / pixelRatio * inchesToCm;
    return {
      width: physicalWidthInCm.toFixed(2),
      height: physicalHeightInCm.toFixed(2)
    };
  };
  const physicalScreenSize = getScreenSizeInCm();
  const deviceData = (batteryInfo) => [`User agent: ${navigator.userAgent}`, "", `Screen viewport width: ${window.screen.width}`, `Screen viewport height: ${window.screen.height}`, `Screen orientation:  ${window.screen.orientation.type}`, "", `Screen size width: ${physicalScreenSize.width} cm`, `Screen size height: ${physicalScreenSize.height} cm`, `Color depth:  ${window.screen.colorDepth} bits`, `maxTouchPoints: ${navigator.maxTouchPoints}`, "", `Connection Type: ${platform === Platforms.ios ? "unknown" : navigator.connection.effectiveType}`, `Connection speed (DL): ${platform === Platforms.ios ? "unknown" : navigator.connection.downlink} Mbps`, "", `Battery Info: ${batteryInfo}`, "", `Platform: ${navigator.platform}`, "", `cookieEnabled: ${navigator.cookieEnabled}`, "", `language: ${navigator.language}`, `timezone: ${Intl && Intl.DateTimeFormat && Intl.DateTimeFormat().resolvedOptions().timeZone}`];
  reactExports.useEffect(() => {
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutHBF, { header: /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}), footer: /* @__PURE__ */ jsxRuntimeExports.jsx(NavBar, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.page_body, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { style: styles.home_icon, src: IconPwa }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.home_text, children: "Your device has the following characteristics:" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { style: styles.data_list, children: deviceData(battery).map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { style: styles.list_text, children: item }, index)) })
  ] }) });
};
export {
  SplitComponent as component
};
