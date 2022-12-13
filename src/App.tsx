import React, { useState } from "react";
import {
  Stack,
  IStackTokens,
  IStackStyles,
  initializeIcons,
} from "@fluentui/react";
import "./App.css";
import Sidebar from "./Router/Sidebar";
import { Home } from "./Router/Home";
import Aboutus from "./Router/Aboutus";
import { Routes, Route } from "react-router-dom";
import { HoriBar } from "./Components/HoriBar";
import NoteContext from "./Context/NoteContext";
import { Leaves } from "./Router/Leaves";

initializeIcons();

const stackTokens: IStackTokens = { childrenGap: 20 };
const stackStyles: Partial<IStackStyles> = {
  root: {},
};
const displayStyles = {
  width: "100%",
};
interface person {
  name: string;
  class: string;
}
export const App: React.FunctionComponent = () => {
  const state: person = {
    name: "Harry",
    class: "5b",
  };
  const [myFunc, setMyFunc] = useState(() => {});

  return (
    <>
      <HoriBar />
      <Stack horizontal styles={stackStyles} tokens={stackTokens}>
        <Sidebar />
        <div style={displayStyles}>
          <NoteContext.Provider value={{ state, myFunc, setMyFunc }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Aboutus" element={<Aboutus />} />
              <Route path="/Leaves" element={<Leaves />} />
              {/* <Route path="about" element={<About />} /> */}
            </Routes>
          </NoteContext.Provider>
        </div>
      </Stack>
    </>
  );
};
