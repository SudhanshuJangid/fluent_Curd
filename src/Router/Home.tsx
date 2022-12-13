import { Stack, StackItem } from "@fluentui/react";
import ModalTable from "../Components/ModalTable";

export const Home = () => {
  return (
    <>
      <Stack>
        <StackItem>
          Hello Home
          <ModalTable />
        </StackItem>
      </Stack>
    </>
  );
};
