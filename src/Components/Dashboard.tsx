import {
  FontIcon,
  IStackItemTokens,
  IStackStyles,
  IStackTokens,
  mergeStyleSets,
  Stack,
  StackItem,
} from "@fluentui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const infoTokens: IStackTokens = { childrenGap: 50 };
const infoStyles: IStackStyles = {
  root: {
    width: "100%",
  },
};
const classNames = mergeStyleSets({
  success: { color: "green" },
  error: { color: "red" },
});
const cardTokens: IStackItemTokens = {
  padding: 10,
};
const thisMonthStyle = {
  fontSize: "small",
};
const cardAmountChangeStyle = {
  display: "flex",
  alignItems: "center",
};
interface card {
  heading: string;
  cardAmount: string | number;
  cardAmountChange: string | number;
}

const Dashboard = () => {
  const [dash, setDash] = useState<any>({
    revenue: 0,
    revenuePct: 0,
    loss: 0,
    lossPct: 0,
    profit: 0,
    profitPct: 0,
  });

  useEffect(() => {
    const getDashboard = async () => {
      try {
        const resp = await axios.get("https://localhost:7086/api/Dashboard");
        setDash(resp.data);
        console.log(resp.data);
      } catch (err) {
        console.error(err);
      }
    };
    getDashboard();
  }, []);

  const cardItems: card[] = [
    {
      heading: "Sales",
      cardAmount: dash.revenue,
      cardAmountChange: dash.revenuePct,
    },
    {
      heading: "Expenses",
      cardAmount: dash.loss,
      cardAmountChange: dash.lossPct,
    },
    {
      heading: "Profit",
      cardAmount: dash.profit,
      cardAmountChange: dash.profitPct,
    },
  ];

  const mappedItems = cardItems.map((item) => {
    return (
      <StackItem
        tokens={cardTokens}
        style={{ border: "1px solid gray", borderRadius: "5px", width: "20%" }}
      >
        <Stack horizontalAlign="center">
          <h2 style={{ textAlign: "center" }}>
            {item.heading}
            <div style={thisMonthStyle}>(this month)</div>
          </h2>
          <p>&pound;{item.cardAmount}</p>
          <p style={cardAmountChangeStyle}>
            {item.cardAmountChange > 0 ? (
              <FontIcon
                aria-label="Compass"
                iconName="StockUp"
                className={classNames.success}
              />
            ) : (
              <FontIcon
                aria-label="Compass"
                iconName="StockDown"
                className={classNames.error}
              />
            )}
            <span style={{ paddingLeft: "5px" }}>
              {Math.abs(Number(item.cardAmountChange))}%
            </span>
          </p>
        </Stack>
      </StackItem>
    );
  });

  return (
    <>
      <h1>Dashboard</h1>
      <Stack
        horizontal
        tokens={infoTokens}
        horizontalAlign="start"
        verticalAlign="center"
        styles={infoStyles}
      >
        {mappedItems}
      </Stack>
    </>
  );
};

export default Dashboard;
