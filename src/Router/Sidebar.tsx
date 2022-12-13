import * as React from "react";
import { Nav, INavStyles, INavLinkGroup } from "@fluentui/react/lib/Nav";
import { useLocation, useNavigate } from "react-router-dom";
import { Stack } from "@fluentui/react/lib/Stack";
import { HoriBar } from "../Components/HoriBar";

const Sidebar: React.FunctionComponent = () => {
  const navigate = useNavigate();
  let location = useLocation().pathname;
  location = location.slice(1);

  const navLinkGroups: INavLinkGroup[] = [
    {
      links: [
        {
          name: "Dashboard",
          key: "dashboard",
          url: "",
          icon: "ViewDashboard",
          onClick: () => {
            navigate("/");
          },
          forceAnchor: true,
        },
        {
          name: "Event",
          key: "sales",
          url: "",
          icon: "ForwardEvent",
          onClick: () => {
            navigate("Aboutus");
          },
          forceAnchor: true,
        },
        {
          name: "Leaves",
          key: "Leaves",
          url: "",
          icon: "ClearNight",
          onClick: () => {
            navigate("Leaves");
          },
          forceAnchor: true,
        },
        {
          name: "Attendance Request",
          key: "about",
          url: "",
          icon: "AddEvent",
          onClick: () => {
            navigate("");
          },
          forceAnchor: true,
        },
        {
          name: "Report",
          url: "",
          expandAriaLabel: "Expand Home section",
          title: "",
          onClick: () => {
            navigate("");
          },
          forceAnchor: true,
          links: [
            {
              name: "Attendance",
              url: "",
              key: "key4",
              target: "_blank",
              title: "",
            },
            {
              name: "Pay Slip",
              url: "",
              key: "key5",
              target: "_blank",
              title: "",
            },
          ],
          isExpanded: true,
        },
        {
          name: "Company Polices",
          url: "",
          icon: "PageAdd",
          key: "key6",
          target: "_blank",
          title: "",
          onClick: () => {
            navigate("");
          },
          forceAnchor: true,
        },
      ],
    },
  ];
  const navStyles: Partial<INavStyles> = {
    root: {
      width: 200,
      height: "100%",
      boxSizing: "border-box",
      border: "1px solid #eee",
      position: "sticky",
    },
  };

  return (
    <>
      <Stack>
        <Nav
          ariaLabel="Navigation Panel"
          styles={navStyles}
          groups={navLinkGroups}
          initialSelectedKey={location ? location : "dashboard"}
        />
      </Stack>
    </>
  );
};

export default Sidebar;
