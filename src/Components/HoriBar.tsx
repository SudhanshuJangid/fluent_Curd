import * as React from "react";
import {
  Stack,
  IStackStyles,
  IStackTokens,
  StackItem,
} from "@fluentui/react/lib/Stack";
import { DefaultPalette } from "@fluentui/react/lib/Styling";
import { IImageProps, Image, ImageFit } from "@fluentui/react/lib/Image";
import log from "../Images/logo.jpg";
import { IconButton } from "@fluentui/react/lib/Button";

const MyIconButton = () => (
  <IconButton
    iconProps={{ iconName: "SchoolDataSyncLogo" }}
    title="Add"
    ariaLabel="Add"
  />
);
// Styles definition
const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.themeTertiary,
    minWidth: "100",
  },
};
// Tokens definition
const containerStackTokens: IStackTokens = { childrenGap: 5 };
const imageProps: Partial<IImageProps> = {
  imageFit: ImageFit.centerContain,
  width: 198,
  height: 50,
  styles: (props) => ({
    root: {
      border: "1px solid " + props.theme.palette.neutralSecondary,
      background: DefaultPalette.white,
    },
  }),
};

export const HoriBar: React.FunctionComponent = () => {
  return (
    <>
      <Stack
        horizontal
        horizontalAlign="space-between"
        styles={stackStyles}
        tokens={containerStackTokens}
      >
        <StackItem>
          <Image {...imageProps} src={log} alt="" />
        </StackItem>
        <StackItem>
          <MyIconButton />
        </StackItem>
      </Stack>
    </>
  );
};
