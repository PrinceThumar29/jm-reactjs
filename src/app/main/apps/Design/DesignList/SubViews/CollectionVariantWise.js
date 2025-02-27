import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "app/fuse-configs/Config";
import { useDispatch } from "react-redux";
import * as authActions from "app/auth/store/actions";
import * as Actions from "app/store/actions";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { TextField, Icon, IconButton, Checkbox } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import handleError from "app/main/ErrorComponent/ErrorComponent";
import Select, { createFilter } from "react-select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LoaderPopup from "app/main/Loader/LoaderPopup";

function getModalStyle() {
  const top = 50; //+ rand();
  const left = 50; //+ rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    position: "absolute",
    width: 600,
    zIndex: 1,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: "none",
  },
  button: {
    margin: 5,
    textTransform: "none",
    backgroundColor: "cornflowerblue",
    color: "white",
  },
}));

const CollectionVariantWise = (props) => {
  const [open, setOpen] = React.useState(true);
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [variantFile, setVariantFile] = useState(null);
  const [variantFileErr, setVariantFileErr] = useState("");

  const [radioValue, setRadioValue] = useState("1");

  const [design_num, setDesignNum] = useState("");
  const [designNumErr, setDesignNumErr] = useState("");

  const [settingMehodList, setSettingMehodList] = useState([]);
  const [settingmethod, setSettingMethod] = useState("");
  const [settingmethodErr, setSettingMethodErr] = useState("");

  const [productCategory, setProductCategory] = useState([]);
  const [selectedProdCat, setSelectedProdCat] = useState("");
  const [prodCatErr, setProdCatErr] = useState("");

  const [prodCategoryGroup, setProdCategoryGroup] = useState([]);
  const [selectedProdCatGrp, setSelectedProdCatGrp] = useState("");
  const [prodCatGrpErr, setProdGrpCatErr] = useState("");

  const [size, setSize] = useState(""); //OPTIONAL
  const [remarks, setRemarks] = useState(""); //optional

  const [searchData, setSearchData] = useState("");

  const [designSearchList, setDesignSearchList] = useState([]); //search suggestion api
  const [SelectedDesignVariant, setSelectedDesignVariant] = useState(""); //selected in auto suggest search box

  const [designVariantList, setDesignVariantList] = useState([]); //showing data in table

  const handleRadioInputChange = (e) => {
    const value = e.target.value;
    setRadioValue(value);
  };

  const handleMethodChange = (method) => {
    setSettingMethod(method);
    setSettingMethodErr("");
  };

  const handleClose = () => {
    setOpen(false);
    props.modalColsed();
  };

  const handleCloseModal = () => {
    setOpen(false);
    props.moldalheaderClose();
  };

  function handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (name === "design_num") {
      setDesignNum(value);
      setDesignNumErr("");
    } else if (name === "size") {
      setSize(value);
    } else if (name === "remarks") {
      setRemarks(value);
    }
  }

  const handleCategoryChange = (e) => {
    setSelectedProdCat({
      value: e.value,
      label: e.label,
    });
    setProdCatErr("");
  };

  const handleCategoryGroupChange = (e) => {
    setSelectedProdCatGrp({
      value: e.value,
      label: e.label,
    });
    setProdGrpCatErr("");
    getCombinationCategories(e.value);
  };

  const HandleFile = (e) => {
    setVariantFile(e.target.files);
    setVariantFileErr("");
  };

  const handleManualAdd = (e) => {
    e.preventDefault();
    if (
      settingMethodValidation() &&
      categoryGroupValidation() &&
      categoryValidation() &&
      DesignVariantValidation()
    ) {
      if (designVariantList.length === 0) {
        dispatch(
          Actions.showMessage({
            message: "Variants Required",
            variant: "error",
          })
        );
      } else {
        setLoading(true);
        addSizeCombinationApi();
      }
    }
  };

  function addSizeCombinationApi() {
    let data = {
      design_id: designVariantList.map((item) => item.id),
      variant_number: design_num,
      // ...(size !== "" && {
      size: size,
      // }),
      setting_method_id: settingmethod.value,
      category_id: selectedProdCat.value,
      category_group_id: selectedProdCatGrp.value,
      remark: remarks,
    };


    axios
      .post(Config.getCommonUrl() + "api/design/combination", data)
      .then((response) => {
        console.log(response);
        setLoading(false);

        if (response.data.success) {
          handleClose();
          dispatch(
            Actions.showMessage({
              message: response.data.message,
              variant: "success",
            })
          );
        } else {
          dispatch(
            Actions.showMessage({
              message: response.data.message,
              variant: "error",
            })
          );
        }
      })
      .catch((error) => {
        setLoading(false);
        handleError(error, dispatch, {
          api: "api/design/combination",
          body: data,
        });
      });
  }

  function categoryValidation() {
    if (selectedProdCat === "") {
      setProdCatErr("Please Select Category");
      return false;
    }

    return true;
  }

  function categoryGroupValidation() {
    if (selectedProdCatGrp === "") {
      setProdGrpCatErr("Please Select Category Group");
      return false;
    }
    return true;
  }

  function settingMethodValidation() {
    if (settingmethod === "") {
      setSettingMethodErr("Please Select Setting Method");
      return false;
    }

    return true;
  }

  function DesignVariantValidation() {
    if (design_num === "") {
      setDesignNumErr("Enter valid Design Variant");
      return false;
    }
    return true;
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchData) {
        getVariantSearch(searchData);
      } else {
        setDesignSearchList([]);
      }
    }, 800);
    return () => {
      clearTimeout(timeout);
    };
    //eslint-disable-next-line
  }, [searchData]);

  function getVariantSearch(sData) {
    axios
      .get(Config.getCommonUrl() + `api/design/search/variant/${sData}`)
      .then(function (response) {
        if (response.data.success === true) {
          console.log(response);
          setDesignSearchList(response.data.data);
        } else {
          dispatch(
            Actions.showMessage({
              message: response.data.message,
              variant: "error",
            })
          );
        }
      })
      .catch((error) => {
        handleError(error, dispatch, {
          api: `api/design/search/variant/${sData}`,
        });
      });
  }

  const handleVariantSelect = (val) => {
    let filteredArray = designSearchList.filter(
      (item) => item.variant_number === val
    );

    if (filteredArray.length > 0) {
      setSelectedDesignVariant(val);
      // if (designVariantList.length < 5) {
      getDesignVariantDetails(filteredArray[0].id);
      // }
    }
  };

  const getDesignVariantDetails = (id) => {
    axios
      .get(Config.getCommonUrl() + `api/design/variant/info/${id}`)
      .then(function (response) {
        if (response.data.success === true) {
          console.log(response);

          let list = [...designVariantList];
          // if (list.length === 0) {
          //     setSelectedDefDesign(response.data.design?.id)
          // }
          list.push(response.data.design);
          setDesignVariantList(list);
        } else {
          dispatch(
            Actions.showMessage({
              message: response.data.message,
              variant: "error",
            })
          );
        }
      })
      .catch((error) => {
        handleError(error, dispatch, {
          api: `api/design/variant/info/${id}`,
        });
      });
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (variantFile === null) {
      setVariantFileErr("Please choose file");
    } else {
      const formData = new FormData();
      for (let i = 0; i < variantFile.length; i++) {
        formData.append("file", variantFile[i]);
      }
      callFileUploadApi(formData);
    }
  };

  function callFileUploadApi(formData) {
    setLoading(true);
    const body = formData;

    var api = "api/design/combination/csv";

    axios
      .post(Config.getCommonUrl() + api, body)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setVariantFile("");
          setVariantFileErr("");
          handleClose();
          dispatch(
            Actions.showMessage({
              message: response.data.message,
              variant: "success",
            })
          );
        } else {
          let downloadUrl = response.data.url;
          window.open(downloadUrl);
          setVariantFile("");
          setVariantFileErr("");
          handleClose();
          dispatch(
            Actions.showMessage({
              message: response.data.message,
              variant: "error",
            })
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        handleError(error, dispatch, { api: api, body: body });
      });
  }

  const selectStyles = {
    input: (base) => ({
      ...base,
      color: theme.palette.text.primary,
      "& input": {
        font: "inherit",
      },
    }),
  };

  useEffect(() => {
    getDroupDown(1);
    getProductCategoriesGroups();
  }, []);

  function getProductCategoriesGroups() {
    axios
      .get(Config.getCommonUrl() + "api/productcategory/main/category")
      .then(function (response) {
        if (response.data.success === true) {
          console.log(response);
          setProdCategoryGroup(response.data.data);
        }
      })
      .catch(function (error) {
        handleError(error, dispatch, {
          api: "api/productcategory/main/category",
        });
      });
  }

  function getCombinationCategories(id) {
    axios
      .get(Config.getCommonUrl() + `api/productcategory/main/category/${id}`)
      .then(function (response) {
        if (response.data.success === true) {
          console.log(response);
          setProductCategory(response.data.data);
        }
      })
      .catch(function (error) {
        handleError(error, dispatch, {
          api: `api/productcategory/main/category/${id}`,
        });
      });
  }

  function getDroupDown(flag) {
    axios
      .get(Config.getCommonUrl() + `api/designDropDown?flag=${flag}`)
      .then(function (response) {
        if (response.data.success === true) {
          console.log(response);
          const arrData = response.data.data;
          if (flag === 1) {
            setSettingMehodList(arrData);
          }
        } else {
          dispatch(
            Actions.showMessage({
              message: response.data.message,
              variant: "error",
            })
          );
        }
      })
      .catch((error) => {
        handleError(error, dispatch, {
          api: `api/designDropDown?flag=${flag}`,
        });
      });
  }

  return (
    <div>
      {loading && <LoaderPopup />}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={(_, reason) => {
          if (reason !== "backdropClick") {
            handleCloseModal();
          }
        }}
      >
        <div style={modalStyle} className={classes.paper}>
          <h5
            className="p-5"
            style={{
              textAlign: "center",
              backgroundColor: "black",
              color: "white",
            }}
          >
                        Upload Design Combination
            <IconButton
              style={{ position: "absolute", top: "0", right: "0" }}
              onClick={handleCloseModal}
            >
              <Icon style={{ color: "white" }}>close</Icon>
            </IconButton>
          </h5>

          <div
            className="p-5 pl-16 pr-16"
            style={{ maxHeight: "80vh", overflow: "auto" }}
          >
            <FormControl
              id="redio-input-dv"
              component="fieldset"
              className={classes.formControl}
            >
              <RadioGroup
                aria-label="Gender"
                id="radio-row-dv"
                name="designAll"
                className={classes.group}
                // value={designAll}
                onChange={handleRadioInputChange}
              >
                <Grid item xs={12} style={{ padding: 0 }}>
                  <FormControlLabel
                    value={"1"}
                    control={<Radio />}
                    label="Upload CSV"
                    checked={radioValue === "1"}
                  />
                  <FormControlLabel
                    value={"2"}
                    control={<Radio />}
                    label="Manual"
                    checked={radioValue === "2"}
                  />
                </Grid>
              </RadioGroup>
            </FormControl>

            {radioValue === "1" && (
              <>
                <TextField
                  className="mt-16"
                  label="Upload CSV Excel File"
                  name="variantFile"
                  type="file"
                  error={variantFileErr.length > 0 ? true : false}
                  helperText={variantFileErr}
                  onChange={(e) => HandleFile(e)}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <Button
                  variant="contained"
                  color="primary"
                  className="w-full mx-auto mt-16"
                  style={{
                    backgroundColor: "#4caf50",
                    border: "none",
                    color: "white",
                  }}
                  onClick={(e) => handleFileUpload(e)}
                >
                  Upload
                </Button>
              </>
            )}

            {radioValue === "2" && (
              <>
                <Select
                  filterOption={createFilter({ ignoreAccents: false })}
                  className={clsx(
                    classes.selectBox,
                    "mt-16",
                    "purchase-select-dv selectsales-dv"
                  )}
                  classes={classes}
                  styles={selectStyles}
                  options={settingMehodList.map((suggestion) => ({
                    value: suggestion.id,
                    label: suggestion.method,
                  }))}
                  value={settingmethod}
                  onChange={(e) => {
                    handleMethodChange(e);
                  }}
                  placeholder="Setting Method"
                />
                <span style={{ color: "red" }}>
                  {settingmethodErr.length > 0 ? settingmethodErr : ""}
                </span>

                <Select
                  className={clsx(
                    classes.selectBox,
                    "mt-16",
                    "purchase-select-dv selectsales-dv"
                  )}
                  filterOption={createFilter({
                    ignoreAccents: false,
                  })}
                  styles={selectStyles}
                  options={prodCategoryGroup.map((suggestion) => ({
                    value: suggestion.id,
                    label: suggestion.category_name,
                  }))}
                  value={selectedProdCatGrp}
                  onChange={(e) => {
                    handleCategoryGroupChange(e);
                  }}
                  placeholder="Category Group Name"
                />
                <span style={{ color: "red" }}>
                  {prodCatGrpErr.length > 0 ? prodCatGrpErr : ""}
                </span>

                <Select
                  className={clsx(
                    classes.selectBox,
                    "mt-16",
                    "purchase-select-dv selectsales-dv"
                  )}
                  filterOption={createFilter({
                    ignoreAccents: false,
                  })}
                  styles={selectStyles}
                  options={productCategory.map((suggestion) => ({
                    value: suggestion.id,
                    label: suggestion.category_name,
                  }))}
                  value={selectedProdCat}
                  onChange={(e) => {
                    handleCategoryChange(e);
                  }}
                  placeholder="Category Name"
                />
                <span style={{ color: "red" }}>
                  {prodCatErr.length > 0 ? prodCatErr : ""}
                </span>

                <TextField
                  className="mt-16 mb-16"
                  label="Design Number"
                  name="design_num"
                  value={design_num}
                  variant="outlined"
                  required
                  fullWidth
                  error={designNumErr.length > 0 ? true : false}
                  helperText={designNumErr}
                  onChange={(e) => handleInputChange(e)}
                />

                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  onChange={(event, newValue) => {
                    // setValue(newValue);

                    handleVariantSelect(newValue);
                  }}
                  onInputChange={(event, newInputValue) => {
                    setSearchData(newInputValue);
                  }}
                  // disabled={isView}
                  value={SelectedDesignVariant}
                  options={designSearchList.map(
                    (option) => option.variant_number
                  )}
                  renderInput={(params) => (
                    <TextField
                      className="cate-input-blg"
                      {...params}
                      placeholder="Search Variant"
                      variant="outlined"
                      style={{ padding: 0 }}
                    />
                  )}
                />

                <TextField
                  className="mt-16"
                  label="Size"
                  name="size"
                  value={size}
                  variant="outlined"
                  // required
                  fullWidth
                  // error={designNumErr.length > 0 ? true : false}
                  // helperText={designNumErr}
                  onChange={(e) => handleInputChange(e)}
                />

                <TextField
                  className="mt-16"
                  label="Remarks"
                  name="remarks"
                  value={remarks}
                  variant="outlined"
                  // required
                  fullWidth
                  // error={designNumErr.length > 0 ? true : false}
                  // helperText={designNumErr}
                  onChange={(e) => handleInputChange(e)}
                />

                <Table className="mt-16">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableRowPad} align="center">
                        Image
                      </TableCell>
                      <TableCell className={classes.tableRowPad} align="center">
                        Design/Variant Number
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {designVariantList.map((row, index) => (
                      <TableRow key={index}>
                        {/* <TableCell className={classes.tableRowPad}>
                                                    <Checkbox type="checkbox" value={JSON.stringify(row)} onChange={handleDefaultSelect} checked={selectedDefDesign == row.id ? true : false} />
                                                </TableCell> */}
                        <TableCell
                          align="center"
                          className={classes.tableRowPad}
                        >
                          {row.image_files.length > 0 && (
                            <img
                              src={row.image_files[0].image_file}
                              height={50}
                              width={50}
                            />
                          )}
                        </TableCell>

                        <TableCell
                          align="center"
                          className={classes.tableRowPad}
                        >
                          {row.variant_number}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Button
                  variant="contained"
                  color="primary"
                  className="w-full mx-auto mt-16"
                  style={{
                    backgroundColor: "#4caf50",
                    border: "none",
                    color: "white",
                  }}
                  onClick={(e) => handleManualAdd(e)}
                >
                  Save
                </Button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CollectionVariantWise;
