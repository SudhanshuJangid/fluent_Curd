interface col {
  key: string;
  name: string;
  fieldName: string;
  minWidth: number;
  maxWidth: number;
  isResizable: boolean;
}

export const columns: col[] = [
  {
    key: "column1",
    name: "EmplName",
    fieldName: "emplName",
    minWidth: 80,
    maxWidth: 170,
    isResizable: true,
  },
  {
    key: "column2",
    name: "FatherN",
    fieldName: "fatherN",
    minWidth: 80,
    maxWidth: 170,
    isResizable: true,
  },
  {
    key: "column3",
    name: "Bod",
    fieldName: "bod",
    minWidth: 80,
    maxWidth: 170,
    isResizable: true,
  },
  {
    key: "column4",
    name: "Moblie",
    fieldName: "moblie",
    minWidth: 80,
    maxWidth: 170,
    isResizable: true,
  },
  {
    key: "column5",
    name: "Address",
    fieldName: "address",
    minWidth: 80,
    maxWidth: 170,
    isResizable: true,
  },
  {
    key: "column6",
    name: "Email",
    fieldName: "email",
    minWidth: 80,
    maxWidth: 170,
    isResizable: true,
  },
  {
    key: "column7",
    name: "Image",
    fieldName: "photo",
    minWidth: 80,
    maxWidth: 170,
    isResizable: true,
  },
];
