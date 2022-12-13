import React, { useContext, useMemo } from "react";
import {
  Stack,
  IStackTokens,
  IStackStyles,
  getTheme,
  mergeStyleSets,
  FontWeights,
  ContextualMenu,
  Modal,
  IDragOptions,
  IIconProps,
  IStackProps,
  CommandButton,
  IContextualMenuProps,
} from "@fluentui/react";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { useId, useBoolean } from "@fluentui/react-hooks";
import { TextField } from "@fluentui/react/lib/TextField";
import { IconButton, IButtonStyles } from "@fluentui/react/lib/Button";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { Empldata } from "./ModalTable";

const stackTokens: IStackTokens = { childrenGap: 130 };
const stackTokensOrignal: IStackTokens = { childrenGap: 30 };

const stackStyleshey: Partial<IStackStyles> = { root: { width: 750 } };

export const MyModal: React.FunctionComponent = () => {
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
  const [keepInBounds, { toggle: toggleKeepInBounds }] = useBoolean(false);

  const dragOptions = useMemo(
    (): IDragOptions => ({
      moveMenuItemText: "Move",
      closeMenuItemText: "Close",
      menu: ContextualMenu,
      keepInBounds,
      dragHandleSelector: ".ms-Modal-scrollableContent > div:first-child",
    }),
    [keepInBounds]
  );
  initializeIcons();

  const titleId = useId("title");

  const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 25 },
    styles: { root: { width: 300 } },
  };

  const changeFilter = (ev: any, item: any) => {
    setFilter(item.key);
  };
  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: "EmplName",
        text: "Filter by EmplName",
        onClick: changeFilter,
      },
      {
        key: "FatherN",
        text: "Filter by FatherN",
        onClick: changeFilter,
      },
    ],
  };

  const {
    postData,
    values,
    errors,
    touched,
    handleBlur,
    isSubmitting,
    handleChange,
    handleSubmit,
    showModal,
    hideModal,
    isModalOpen,
    _deleteClicked,
    _updateClicked,
    toggle,
    updateUser,
    handleimg,
    previmage,
    setFilter,
  } = useContext<any>(Empldata);

  // const hello = async (e: any) => {
  //   let formData = new FormData();
  //   formData.append("file", e.files[0]);
  //   await fetch("/upload.php", {
  //     method: "POST",
  //     body: formData,

  //   });
  // };
  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <Stack horizontal tokens={stackTokensOrignal}>
            <PrimaryButton
              onClick={showModal}
              text="Add Data"
              iconProps={{ iconName: "Add" }}
            />
            <PrimaryButton
              iconProps={{ iconName: "Delete" }}
              text="Delete"
              onClick={_deleteClicked}
              allowDisabledFocus
            />
            <PrimaryButton
              iconProps={{ iconName: "Edit" }}
              text="Update"
              onClick={_updateClicked}
              allowDisabledFocus
            />
            <CommandButton
              text="Filter"
              iconProps={{ iconName: "filter" }}
              menuProps={menuProps}
            />
          </Stack>
          <Modal
            titleAriaId={titleId}
            isOpen={isModalOpen}
            onDismiss={hideModal}
            isBlocking={false}
            containerClassName={contentStyles.container}
            dragOptions={isDraggable ? dragOptions : undefined}
          >
            <div className={contentStyles.header}>
              <span id={titleId}>Employee Data</span>
              <IconButton
                styles={iconsubmitButtonStyles}
                iconProps={SubmitIcon}
                ariaLabel="Submit popup modal"
                type="submit"
                disabled={isSubmitting}
                onClick={toggle ? updateUser : postData}
              />
              <IconButton
                styles={iconButtonStyles}
                iconProps={cancelIcon}
                ariaLabel="Close popup modal"
                onClick={hideModal}
              />
            </div>
            <div className={contentStyles.body}>
              <Stack horizontal tokens={stackTokens} styles={stackStyleshey}>
                <Stack {...columnProps}>
                  <TextField
                    name="emplName"
                    label="Employe Name"
                    placeholder="Please enter text here"
                    id="emplName"
                    value={values.emplName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.emplName && touched.emplName && (
                    <small className="error-text">{errors.emplName}</small>
                  )}

                  <TextField
                    name="email"
                    label="Email"
                    placeholder="Please enter email here"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <small className="error-text">{errors.email}</small>
                  )}

                  <TextField
                    name="moblie"
                    label="Moblie no."
                    placeholder="Please enter number here"
                    // type="number"
                    id="moblie"
                    value={values.moblie}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.moblie && touched.moblie && (
                    <small className="error-text">{errors.moblie}</small>
                  )}
                  <TextField
                    label="Image"
                    prefix="Choose Image In Jpg"
                    iconProps={{ iconName: "Add" }}
                    type="file"
                    name="photo"
                    onChange={handleimg}
                    onBlur={handleBlur}
                    // onClick={(e) => hello(e.target)}
                  />
                  {/* {errors.photo && touched.photo && (
                    <small className="error-text">{errors.photo}</small>
                  )} */}
                </Stack>
                <Stack {...columnProps}>
                  <TextField
                    name="fatherN"
                    label="Father Name"
                    placeholder="Please enter text here"
                    id="fatherN"
                    value={values.fatherN}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.fatherN && touched.fatherN && (
                    <small className="error-text">{errors.fatherN}</small>
                  )}

                  <TextField
                    name="bod"
                    type="date"
                    label="Birth Date"
                    placeholder="Select a date..."
                    id="bod"
                    value={values.bod}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.bod && touched.bod && (
                    <small className="error-text">{errors.bod}</small>
                  )}

                  <TextField
                    label="Address"
                    multiline
                    rows={3}
                    name="address"
                    id="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.address && touched.address && (
                    <small className="error-text">{errors.address}</small>
                  )}
                </Stack>
              </Stack>
            </div>
          </Modal>
        </div>
      </form>
    </>
  );
};

//Modal...
const cancelIcon: IIconProps = { iconName: "Cancel" };
const SubmitIcon: IIconProps = { iconName: "DocumentApproval" };
const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: "1 1 auto",
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: "flex",
      alignItems: "center",
      fontWeight: FontWeights.semibold,
      padding: "12px 12px 14px 24px",
    },
  ],
  body: {
    flex: "4 4 auto",
    padding: "0 24px 24px 24px",
    overflowY: "hidden",
    selectors: {
      p: { margin: "14px 0" },
      "p:first-child": { marginTop: 0 },
      "p:last-child": { marginBottom: 0 },
    },
  },
});

const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px",
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
const iconsubmitButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "-520px",
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
