const doCalc = (data) => {
  let rand = 0;
  for (let i = 0; i < 1e4; i++) {
    rand = Math.floor(Math.random() * 1e4);
  }
  return `The time is: ${(/* @__PURE__ */ new Date()).toISOString()} - ${rand}  - ${data}`;
};
self.onmessage = (event) => {
  const data = event.data;
  if (data.key === "doCalc") {
    const result = doCalc(data.value);
    self.postMessage({ key: "doCalc", value: result });
  }
};
