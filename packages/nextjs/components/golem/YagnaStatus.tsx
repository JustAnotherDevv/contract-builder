// import React, { useRef, useState } from "react";
// import { useYagna } from "@golem-sdk/react";

// function YagnaStatus() {
//   const { isConnected, setYagnaOptions } = useYagna();
//   const inputRef = useRef(null);
//   if (isConnected) {
//     return <span>Connected to Yagna!</span>;
//   }
//   return (
//     <div>
//       <div>Enter your app key to connect to Yagna</div>
//       <input ref={inputRef} />
//       <button onClick={() => setYagnaOptions({ apiKey: inputRef.current.value })}>Set app key</button>
//     </div>
//   );
// }
