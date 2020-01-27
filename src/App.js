import React from "react";

import Town from "./Components/Town";

const App = () => {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          zIndex: 1000,
          background: "white",
          width: "100%"
        }}
      >
        <p>NAV BAR</p>
      </div>
      <Town />
    </div>
  );
};

export default App;
