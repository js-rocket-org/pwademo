import { r as reactExports, j as jsxRuntimeExports } from "./mainapp.js";
import { L as LayoutHBF, N as NavBar, H as Header, a as HEADER_HEIGHT } from "./Header.js";
import { A as AppButton } from "./AppButton.js";
import "./common.js";
const IconMic = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M12%2014c1.66%200%202.99-1.34%202.99-3L15%205c0-1.66-1.34-3-3-3S9%203.34%209%205v6c0%201.66%201.34%203%203%203zm5.3-3c0%203-2.54%205.1-5.3%205.1S6.7%2014%206.7%2011H5c0%203.41%202.72%206.23%206%206.72V21h2v-3.28c3.28-.48%206-3.3%206-6.72h-1.7z'/%3e%3c/svg%3e";
const IconMicOff = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M19%2011h-1.7c0%20.74-.16%201.43-.43%202.05l1.23%201.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9%203.34%209%205v.18l5.98%205.99zM4.27%203%203%204.27l6.01%206.01V11c0%201.66%201.33%203%202.99%203%20.22%200%20.44-.03.65-.08l1.66%201.66c-.71.33-1.5.52-2.31.52-2.76%200-5.3-2.1-5.3-5.1H5c0%203.41%202.72%206.23%206%206.72V21h2v-3.28c.91-.13%201.77-.45%202.54-.9L19.73%2021%2021%2019.73%204.27%203z'/%3e%3c/svg%3e";
const IconContentCopy = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M16%201H4c-1.1%200-2%20.9-2%202v14h2V3h12V1zm3%204H8c-1.1%200-2%20.9-2%202v14c0%201.1.9%202%202%202h11c1.1%200%202-.9%202-2V7c0-1.1-.9-2-2-2zm0%2016H8V7h11v14z'/%3e%3c/svg%3e";
const IconKeyboardDoubleDownArrow = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M18%206.41%2016.59%205%2012%209.58%207.41%205%206%206.41l6%206z'/%3e%3cpath%20d='m18%2013-1.41-1.41L12%2016.17l-4.59-4.58L6%2013l6%206z'/%3e%3c/svg%3e";
let recognition;
const isSpeechRecogSupported = () => "webkitSpeechRecognition" in window;
const startSpeechRecog = (onTranscribed, setIsRecording) => {
  const SpeechRecogn = webkitSpeechRecognition;
  recognition = new SpeechRecogn();
  recognition.continuous = true;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  const processResult = (event) => {
    const transcript = event.results[0][0].transcript;
    setIsRecording(false);
    onTranscribed(transcript);
  };
  recognition.onresult = processResult;
  recognition.onerror = (event) => {
    console.log(event.error);
  };
  recognition.onstart = () => {
  };
  recognition.onspeechend = () => {
    recognition.stop();
  };
  recognition.start();
};
const stopSpeechRecog = () => {
  recognition.stop();
};
const styles = {
  page_body: {
    paddingLeft: 20,
    paddingRight: 20,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  transcribed_box: {
    flex: 0,
    width: "80%",
    height: "50%",
    minHeight: 80,
    border: "1px solid black",
    marginBottom: 10
  },
  text_buffer_box: {
    flex: 0,
    width: "80%",
    height: "50%",
    minHeight: 150,
    border: "1px solid black",
    marginTop: 10
  },
  spacer: {
    flex: 1
  },
  action_container: {
    width: "100%",
    flex: 0,
    display: "flex",
    justifyContent: "space-between"
  },
  action_button: {
    width: 90
  },
  page_text: {
    fontSize: 18
  },
  page_text_error: {
    fontSize: 18,
    color: "red"
  },
  status_flash: {
    width: "100%",
    height: HEADER_HEIGHT - 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "orange"
  }
};
const SplitComponent = function RouteComponent() {
  const [isRecording, setIsRecording] = reactExports.useState(false);
  const [isSupported, setIsSupported] = reactExports.useState(false);
  const [statusMessage, setStatusMessage] = reactExports.useState("");
  const onTranscribed = (transcript) => {
    const speechResult = document.getElementById("transcribed");
    speechResult.value = transcript;
  };
  const stopRecord = () => {
    setIsRecording(false);
    stopSpeechRecog();
  };
  const startRecord = () => {
    setIsRecording(true);
    startSpeechRecog(onTranscribed, setIsRecording);
  };
  const onClickAddSentence = () => {
    const speechResult = document.getElementById("transcribed");
    const textBuffer = document.getElementById("text_buffer");
    textBuffer.value += ` ${speechResult.value}.`;
  };
  const onClickCopy = () => {
    const textBuffer = document.getElementById("text_buffer");
    navigator.clipboard.writeText(textBuffer.value);
    setStatusMessage("Copied to clipboard!");
    setTimeout(() => {
      setStatusMessage("");
    }, 3e3);
  };
  const onClickDictate = () => {
    if (isRecording) stopRecord();
    else startRecord();
  };
  reactExports.useEffect(() => {
    if (isSpeechRecogSupported()) {
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, []);
  const StatusFlash = (message) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.status_flash, children: message });
  if (!isSupported) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutHBF, { header: /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}), footer: /* @__PURE__ */ jsxRuntimeExports.jsx(NavBar, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.page_body, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.page_text_error, children: "Speech recognition is not supported on your device" }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutHBF, { header: /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { middle: statusMessage ? StatusFlash(statusMessage) : null }), footer: /* @__PURE__ */ jsxRuntimeExports.jsx(NavBar, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.page_body, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.page_text, children: "Tap microphone below, then speak to fill the box below" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "transcribed", style: styles.transcribed_box }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppButton, { style: styles.action_button, onClick: onClickAddSentence, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: IconKeyboardDoubleDownArrow }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "text_buffer", style: styles.text_buffer_box }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.spacer }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.action_container, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AppButton, { style: styles.action_button, onClick: onClickDictate, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: isRecording ? IconMicOff : IconMic }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AppButton, { style: styles.action_button, onClick: onClickCopy, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: IconContentCopy }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {})
  ] }) });
};
export {
  SplitComponent as component
};
