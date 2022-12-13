import { Stack, StackItem } from "@fluentui/react";
import { FluentTable } from "../Components/FluentTable";
import { Keytips } from "../Components/Keytips";

export const Leaves = () => {
  return (
    <>
      <Stack>
        <StackItem>
          <Keytips />
        </StackItem>
        <StackItem>
          <FluentTable />
        </StackItem>
      </Stack>
    </>
  );
};
