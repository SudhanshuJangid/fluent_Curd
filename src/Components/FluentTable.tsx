import * as React from "react";
import { Announced } from "@fluentui/react/lib/Announced";
import { TextField, ITextFieldStyles } from "@fluentui/react/lib/TextField";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn,
} from "@fluentui/react/lib/DetailsList";
import { MarqueeSelection } from "@fluentui/react/lib/MarqueeSelection";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import { Text } from "@fluentui/react/lib/Text";

const exampleChildClass = mergeStyles({
  display: "block",
  marginBottom: "10px",
});

const textFieldStyles: Partial<ITextFieldStyles> = {
  root: { maxWidth: "300px" },
};

export interface IDetailsListBasicExampleItem {
  key: number;
  name: string;
  value: number;
}

export interface IDetailsListBasicExampleState {
  items: IDetailsListBasicExampleItem[];
  selectionDetails: string;
}

export const FluentTable: React.FunctionComponent<
  {} | IDetailsListBasicExampleState
> = () => {
  const _allItems: IDetailsListBasicExampleItem[] = [];
  const [selection, setSelection] = React.useState<any>();
  function _getSelectionDetails(): string {
    const selectionCount = selection ? selection.getSelectedCount() : 0;

    switch (selectionCount) {
      case 0:
        return "No items selected";
      case 1:
        return (
          "1 item selected: " +
          (selection.getSelection()[0] as IDetailsListBasicExampleItem).name
        );
      default:
        return `${selectionCount} items selected`;
    }
  }
  const [state, setState] = React.useState({
    items: _allItems,
    selectionDetails: _getSelectionDetails(),
  });
  React.useEffect(() => {
    const _selection: Selection = new Selection({
      onSelectionChanged: () =>
        setState((prev) => {
          return { ...prev, selectionDetails: _getSelectionDetails() };
        }),
    });
    setSelection(_selection);
    for (let i = 0; i < 200; i++) {
      _allItems.push({
        key: i,
        name: "Item " + i,
        value: i,
      });
    }
    setState((prev) => {
      return { ...prev, items: _allItems };
    });
  }, []);
  const _columns: IColumn[] = [
    {
      key: "column1",
      name: "Name",
      fieldName: "name",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Value",
      fieldName: "value",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
  ];

  // Populate with items for demos.

  const _onFilter = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text: string
  ): void => {
    console.log(text);
    setState((prev) => {
      return {
        ...prev,
        items: text
          ? _allItems.filter((i) => i.name.toLowerCase().indexOf(text) > -1)
          : _allItems,
      };
    });
  };

  const _onItemInvoked = (item: IDetailsListBasicExampleItem): void => {
    alert(`Item invoked: ${item.name}`);
  };
  return (
    <>
      <div className={exampleChildClass}>{state.selectionDetails}</div>
      <Text>
        Note: While focusing a row, pressing enter or double clicking will
        execute onItemInvoked, which in this example will show an alert.
      </Text>
      <Announced message={state.selectionDetails} />
      <TextField
        className={exampleChildClass}
        label="Filter by name:"
        onChange={(e, t) => _onFilter(e, t ?? "")}
        styles={textFieldStyles}
      />
      <Announced
        message={`Number of items after filter applied: ${state.items.length}.`}
      />
      <MarqueeSelection selection={selection}>
        <DetailsList
          items={state.items}
          columns={_columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.justified}
          selection={selection}
          selectionPreservedOnEmptyClick={true}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          checkButtonAriaLabel="select row"
          onItemInvoked={_onItemInvoked}
        />
      </MarqueeSelection>
    </>
  );
};
