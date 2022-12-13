import { Stack } from "@fluentui/react";
import React, { useContext } from "react";
import Drag from "../Components/Drag";
import NoteContext from "../Context/NoteContext";

interface person {
  name: string;
  class: string;
}

const Aboutus = () => {
  const a: any = useContext(NoteContext);
  return (
    <Stack>
      Hello ABout
      <Drag />
      {a.name}
    </Stack>
  );
};
export default Aboutus;
