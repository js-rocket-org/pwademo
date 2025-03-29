import { j as jsxRuntimeExports } from "./mainapp.js";
import { r as remove_ios_look } from "./common.js";
const AppButton = (props) => {
  const type = props.type ?? "button";
  const allStyle = { ...styles.common_button_styles, ...props.style };
  const allProps = { ...props, type, style: allStyle };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { ...allProps, children: props.children });
};
const styles = {
  common_button_styles: {
    ...remove_ios_look,
    paddingTop: 8,
    paddingBottom: 8
  }
};
export {
  AppButton as A
};
