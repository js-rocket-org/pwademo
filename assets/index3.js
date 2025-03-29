import { r as reactExports, j as jsxRuntimeExports, i as isVisible, g as getDisplayInfo } from "./mainapp.js";
import { L as LayoutHBF, N as NavBar, H as Header, a as HEADER_HEIGHT, F as FOOTER_HEIGHT } from "./Header.js";
import { r as remove_ios_look } from "./common.js";
function WorkerWrapper(options) {
  return new Worker(
    "/pwademo/assets/qrscan.worker-6vcR5_eL.js",
    {
      name: options == null ? void 0 : options.name
    }
  );
}
const ww = new WorkerWrapper();
const qrDecode = async (image) => {
  return await new Promise((resolve) => {
    ww.postMessage({ key: "qrDecode", value: image });
    ww.onmessage = (event) => {
      const data = event.data;
      if (data.key === "qrDecode") resolve(data.value);
    };
    ww.addEventListener("error", (event) => {
      resolve(`ERROR:qrDecode: ${event.message}`);
    });
  });
};
const sleep = (timeMs) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, timeMs);
  });
};
const CONTROL_HEIGHT = 32;
const styles = {
  component: {
    border: "2px solid black",
    padding: 0,
    margin: 0
  },
  video_container: {
    position: "relative"
  },
  control_container: {
    display: "flex",
    flexDirection: "row"
  },
  source_select: {
    width: "80%",
    height: CONTROL_HEIGHT,
    maxHeight: CONTROL_HEIGHT,
    padding: 0,
    paddingLeft: 5,
    margin: 0,
    borderWidth: 1,
    ...remove_ios_look
  },
  start_stop_button: {
    width: "20%",
    height: CONTROL_HEIGHT,
    maxHeight: CONTROL_HEIGHT,
    padding: 0,
    margin: 0,
    marginLeft: 1,
    borderWidth: 1,
    ...remove_ios_look
  },
  video: {
    width: "100%"
  },
  target1: {
    position: "absolute",
    top: "25%",
    left: 0,
    borderTop: "2px dashed red",
    borderBottom: "2px dashed red",
    width: "calc(100% - 4px)",
    height: "50%"
  },
  target2: {
    position: "absolute",
    top: 0,
    left: "25%",
    borderLeft: "2px dashed red",
    borderRight: "2px dashed red",
    width: "50%",
    height: "calc(100% - 4px)"
  }
};
const SCAN_INTERVAL = 1800;
const cameraFaceOptions = ["user", "environment", "left", "right"];
const cameraResolutionOptions = [
  { x: 320, y: 240 }
  // Don't need high resolution for bar code scanning.  lower value scans faster
  // { x: 640, y: 480 },
  // { x: 960, y: 720 },
  // { x: 1280, y: 720 },
  // { x: 1920, y: 1080 },
];
const QRScanner = ({ size, onDetected }) => {
  let timerId = 0;
  const videoSize = size;
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [currentCamera, setCurrentCamera] = reactExports.useState("");
  const [devCameras, setDevCameras] = reactExports.useState([]);
  const cameraLabel2Face = (label) => {
    const labelLower = label.toLowerCase();
    let face = cameraFaceOptions[0];
    if (labelLower.includes("back")) face = cameraFaceOptions[1];
    if (labelLower.includes(cameraFaceOptions[2])) face = cameraFaceOptions[2];
    if (labelLower.includes(cameraFaceOptions[3])) face = cameraFaceOptions[3];
    return face;
  };
  const getCameraPermissions = async (mediaDevices) => {
    try {
      const stream = await mediaDevices.getUserMedia({ video: true });
      const tracks = stream.getTracks();
      for (const track of tracks) track.stop();
    } catch (e) {
      console.error(e.toString());
    }
  };
  const setDefaultCamera = async (allCameras) => {
    const cameraSource = document.getElementById("camera_source");
    const backFacingCameras = allCameras.filter((i) => cameraLabel2Face(i.value) === "environment");
    const newCameraId = backFacingCameras.length > 0 ? backFacingCameras[0].key : allCameras[0].key;
    setCurrentCamera(newCameraId);
    await sleep(250);
    cameraSource.value = newCameraId;
    return newCameraId;
  };
  const getCameraDevices = async () => {
    const cameraList = [];
    const mediaDevices = navigator.mediaDevices;
    await getCameraPermissions(mediaDevices);
    const devices = await mediaDevices.enumerateDevices();
    const videoDevices = devices.filter((device) => device.kind === "videoinput");
    for (const device of videoDevices) {
      const cameraIdName = { key: device.deviceId, value: device.label };
      cameraList.push(cameraIdName);
    }
    setDevCameras(cameraList);
    return cameraList;
  };
  const stopCamera = () => {
    const video = document.getElementById("video");
    const stream = video.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      video.srcObject = null;
    }
    setIsPlaying(false);
  };
  const initCamera = async (cameraId) => {
    const video = document.getElementById("video");
    const defaultResolution = cameraResolutionOptions[0];
    const videoOptions = {
      video: {
        deviceId: cameraId,
        width: { exact: defaultResolution.x },
        height: { exact: defaultResolution.y }
      }
    };
    try {
      const stream = await navigator.mediaDevices.getUserMedia(videoOptions);
      if (stream) video.srcObject = stream;
    } catch (err) {
      console.error("Error accessing camera: ", err);
    }
  };
  const startCamera = (cameraId) => {
    initCamera(cameraId ?? currentCamera);
    setIsPlaying(true);
  };
  const getVideoImageData = () => {
    const video = document.getElementById("video");
    let canvas = document.createElement("canvas");
    if (typeof video.videoWidth !== "number" || video.videoWidth < 1) return null;
    const context = canvas.getContext("2d");
    canvas.display = "none";
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    canvas = null;
    return imageData;
  };
  const scheduledDecode = async () => {
    if (!isVisible(document.getElementById("video"))) return;
    const qrImage = getVideoImageData();
    if (!qrImage) return;
    const code = await qrDecode(qrImage);
    if (code && typeof onDetected === "function") onDetected(code.value, code.key);
  };
  const onChangeCamera = async (e) => {
    if (isPlaying) stopCamera();
    await sleep(100);
    const newCameraId = e.target.value;
    setCurrentCamera(newCameraId);
    startCamera(newCameraId);
  };
  const onClickToggle = () => {
    if (isPlaying) stopCamera();
    else startCamera();
  };
  reactExports.useEffect(() => {
    timerId = 0;
    (async () => {
      const newCameras = await getCameraDevices();
      const newCameraId = await setDefaultCamera(newCameras);
      startCamera(newCameraId);
      timerId = setInterval(scheduledDecode, SCAN_INTERVAL);
    })();
    return () => {
      clearInterval(timerId);
    };
  }, []);
  const buttonColor = isPlaying ? "red" : "green";
  const visibility = isPlaying ? "visible" : "hidden";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: videoSize.width, height: videoSize.height + CONTROL_HEIGHT, ...styles.component }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.control_container, children: [
      devCameras && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          id: "camera_source",
          style: styles.source_select,
          defaultValue: currentCamera,
          onChange: onChangeCamera,
          children: devCameras.map((dev, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: dev.key, children: dev.value }, index))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", style: styles.start_stop_button, onClick: onClickToggle, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: buttonColor }, children: isPlaying ? "■" : "▶" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...videoSize, ...styles.video_container }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("video", { id: "video", autoPlay: true, style: { ...videoSize, ...styles.video } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.target1, visibility } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.target2, visibility } })
    ] })
  ] });
};
const playBeep = (frequency, duration) => {
  return new Promise((resolve) => {
    const audioContext = new (globalThis.AudioContext || globalThis.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.frequency.value = frequency;
    oscillator.type = "sine";
    oscillator.connect(audioContext.destination);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
    resolve(true);
  });
};
const SplitComponent = function RouteComponent() {
  const [code, setCode] = reactExports.useState("");
  const [bgColor, setBgColor] = reactExports.useState("");
  const [qrSize, setQrSize] = reactExports.useState({
    width: 0,
    height: 0,
    depth: 0
  });
  const onScanned = (qrcode, key) => {
    setCode(`${key}: ${qrcode}`);
    playBeep(3136, 0.05);
    setBgColor("red");
    setTimeout(() => {
      setBgColor("white");
    }, 250);
  };
  const onWindowResize = () => {
    const screenSize = getDisplayInfo();
    const isPortrait = screenSize.width < screenSize.height;
    const yLimit = screenSize.height - HEADER_HEIGHT - FOOTER_HEIGHT - 32 - 90;
    const xLimit = screenSize.width - 60;
    const x = isPortrait ? Math.min(xLimit, 420) : Math.min(xLimit, 560);
    const y = isPortrait ? Math.min(yLimit, 560) : Math.min(yLimit, 420);
    setQrSize({
      width: x,
      height: y,
      depth: 0
    });
  };
  reactExports.useEffect(() => {
    addEventListener("resize", onWindowResize);
    onWindowResize();
    return () => {
      removeEventListener("resize", onWindowResize);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutHBF, { header: /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}), footer: /* @__PURE__ */ jsxRuntimeExports.jsx(NavBar, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    padding: 20
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Scanner" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
      background: bgColor
    }, children: code }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("center", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(QRScanner, { size: qrSize, onDetected: onScanned }) })
  ] }) });
};
export {
  SplitComponent as component
};
