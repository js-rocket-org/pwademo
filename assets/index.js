import { u as useNavigate, j as jsxRuntimeExports, A as APP_VERSION, p as pwaInstallPrompt } from "./mainapp.js";
import { A as AppButton } from "./AppButton.js";
import "./common.js";
const logo = "/pwademo/assets/logo.svg";
const styles = {
  app: {
    textAlign: "center",
    fontFamily: "sans-serif"
  },
  header: {
    backgroundColor: "#282c34",
    minHeight: "50vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white"
  },
  logo_rotate_inline: `@keyframes logo-rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }`,
  logo: {
    height: 64,
    animation: "logo-rotate infinite 5s linear"
  },
  page_text: {
    fontSize: 16
  }
};
const SplitComponent = function App() {
  const navigate = useNavigate();
  const onInstallPWA = () => {
    pwaInstallPrompt();
  };
  const onNavigate = () => {
    navigate({
      to: "/home"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.app, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: styles.logo_rotate_inline }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, style: styles.logo, alt: "logo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.page_text, children: "ReactJS PWA demo with web workers and other goodies" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppButton, { onClick: onNavigate, children: "Start App" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: `Version: ${APP_VERSION}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppButton, { onClick: onInstallPWA, children: "Install App" })
  ] });
};
export {
  SplitComponent as component
};
