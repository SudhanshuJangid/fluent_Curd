import React, { useState, useEffect, useCallback, createContext } from "react";
import { useBoolean, useConst } from "@fluentui/react-hooks";
import { SearchBox } from "@fluentui/react/lib/SearchBox";
import { Stack, StackItem } from "@fluentui/react";
import { ITextFieldStyles } from "@fluentui/react/lib/TextField";
import {
  DetailsList,
  DetailsListLayoutMode,
} from "@fluentui/react/lib/DetailsList";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import axios from "axios";
import { columns } from "./columns";
import { useFormik } from "formik";
import { MyModal } from "./MyModal";
import { Schehma } from "./Scehma";
import { initialUser } from "./initialUser";
import { Selection } from "@fluentui/react/lib/Selection";

export const Empldata = createContext({});

const exampleChildClass = mergeStyles({
  marginBottom: "10px",
});

const textFieldStyles: Partial<ITextFieldStyles> = {
  root: { maxWidth: "300px" },
};

interface IDetailsListBasicExampleItem {
  key: number;
  name: string;
  value: number;
}
interface IDetailsListBasicExampleState {
  items: IDetailsListBasicExampleItem[];
  // selectionDetails: string;
}

const onSubmit = async (values: any, action: any) => {
  console.log(values);
  console.log(action);
  await new Promise((reslove) => setTimeout(reslove, 2000));
  action.resetForm();
};

const ModalTable = () => {
  const [state, setState] = useState<IDetailsListBasicExampleState>({
    items: [],
    // selectionDetails: "",
  });

  // console.log("hello", state.items[0]);

  const [newUser, setNewUser] = useState<any>(initialUser);

  const [toggle, setToggle] = useState(false);

  const [trigger, setTrigger] = useState<boolean>(false);
  const selection = useConst(() => new Selection());

  useEffect(() => {
    loadUse();
  }, [newUser, trigger]);

  const loadUse = async () => {
    await axios
      .get("https://localhost:7244/api/FlentApi")
      .then((res) => {
        setState((p) => ({ ...p, items: res.data }));
      })
      .catch((er) => console.error(er));
  };

  const postData = () => {
    setToggle(false);
    axios
      .post("https://localhost:7244/api/FlentApi", values, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        loadUse();
        hideModal();
        setNewUser(initialUser);
      })
      .catch((err) => console.error(err));
  };

  // const [idgen, setIdGen] = useState<any>({
  //   item: {},
  //   index: undefined,
  //   ev: "",
  // });
  // console.log(idgen);
  const [Genid, setGetId] = useState(initialUser);

  // console.log(Genid);
  // console.log(state.items);
  function _deleteClicked(): void {
    const deletedIds: any = selection.getSelection().map((itm: any) => itm.id);
    const arrid: string = deletedIds.length > 1 ? deletedIds.join(",") : "";
    console.log(arrid);
    if (!!arrid) {
      axios
        .delete(`https://localhost:7244/api/FlentApi/MultiDelete/${arrid}`)
        .then(() => {
          loadUse();
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .delete(`https://localhost:7244/api/FlentApi/${Genid.id}`)
        .then(() => {
          loadUse();
        })
        .catch((err) => console.error(err));
    }
  }

  const _updateClicked = () => {
    showModal();
    setToggle(true);
    setValues(Genid);
  };
  // console.log(idgen);
  const updateUser = () => {
    axios
      .put(`https://localhost:7244/api/FlentApi/${Genid.id}`, values, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setValues(res.data);
        // console.log(res.data);
        loadUse();
        hideModal();
      })
      .catch((err) => console.error(err));
  };

  const [previmage, setPrevimage] = useState("");

  const handleimg = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.files[0] });
    //preview....
    setPrevimage(URL.createObjectURL(e.target.files[0]));
  };

  const {
    setValues,
    values,
    errors,
    touched,
    handleBlur,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialUser,
    validationSchema: Schehma,
    onSubmit,
  });
  //modal open and closed...
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
    useBoolean(false);

  const [filter, setFilter] = useState<any>("Name");
  //Search box.....
  const handleSearch = async (e: any) => {
    if (e.target.value) {
      try {
        const resp = await axios.get(
          `https://localhost:7244/api/FlentApi/search?value=${e.target.value}&fliter=${filter}`
        );
        const fluentData = resp.data;
        setState({ ...state, items: fluentData });
      } catch (err) {
        console.log(err);
      }
    } else {
      setTrigger((prev) => !prev);
    }
  };
  // const _onActiveItemChanged = (item: any): void => {
  //   console.log(`Item invoked: ${JSON.stringify(item)}`);
  // };

  return (
    <>
      <Stack>
        <StackItem>
          <Empldata.Provider
            value={{
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
            }}
          >
            <MyModal />
          </Empldata.Provider>
        </StackItem>
        <StackItem>
          <div>
            <div className={exampleChildClass}></div>
            <SearchBox
              placeholder="Search"
              className={exampleChildClass}
              styles={textFieldStyles}
              onChange={handleSearch}
              onClear={() => {
                setTrigger((prev) => !prev);
              }}
            />
            <DetailsList
              items={state.items}
              columns={columns}
              enterModalSelectionOnTouch={true}
              onActiveItemChanged={(item?: any) => setGetId(item)}
              // onItemInvoked={(
              //   item?: any,
              //   index?: number | undefined,
              //   ev?: Event
              // ) => setIdGen({ item, index, ev })}
              selection={selection}
              selectionPreservedOnEmptyClick
              layoutMode={DetailsListLayoutMode.fixedColumns}
              ariaLabelForSelectionColumn="Toggle selection"
              ariaLabelForSelectAllCheckbox="Toggle selection for all items"
              checkButtonAriaLabel="select row"
            />
          </div>
        </StackItem>
      </Stack>
    </>
  );
};

export default ModalTable;
