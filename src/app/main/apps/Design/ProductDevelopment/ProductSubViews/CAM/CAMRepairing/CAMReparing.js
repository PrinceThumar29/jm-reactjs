import React, { useState, useEffect } from "react";
import { Icon, IconButton, Typography } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import axios from "axios";
import * as Actions from "app/store/actions";
import Config from "app/fuse-configs/Config";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Select, { createFilter } from "react-select";
import Loader from "../../../../../../Loader/Loader";
import History from "@history";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { CAMRepairingPrintComp } from "./CAMRepairingPrintComp/CAMRepairingPrintComp";
import { useReactToPrint } from "react-to-print";
import {
  TextField,
  Checkbox,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import moment from "moment";
import Autocomplete from "@material-ui/lab/Autocomplete";
import handleError from "app/main/ErrorComponent/ErrorComponent";
import NavbarSetting from "app/main/NavbarSetting/NavbarSetting";
import sampleFile from "app/main/SampleFiles/DesignModule/cadIssueRead.csv";
import Icones from "assets/fornt-icons/Mainicons";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    position: "absolute",
    width: 400,
    zIndex: 1,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: "none",
  },
  button: {
    margin: 5,
    textTransform: "none",
    backgroundColor: "#415BD4",
    color: "#FFFFFF",
    borderRadius: 7,
    letterSpacing: "0.06px",
  },
  button1: {
    margin: 5,
    textTransform: "none",
    backgroundColor: "gray",
    color: "white",
  },
  tabroot: {
    overflowX: "auto",
    overflowY: "auto",
    height: "100%",
  },
  table: {
    // minWidth: 650,
  },
  tableRowPad: {
    padding: 7,
  },
  searchBox: {
    padding: 6,
    fontSize: "12pt",
    borderColor: "darkgray",
    borderWidth: 1,
    borderRadius: 5,
  },
}));

function getModalStyle() {
  const top = 50; //+ rand();
  const left = 50; //+ rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const CAMRepairing = (props) => {
  const [printObj, setPrintObj] = useState({
    remark: "",
    endDate: "",
    designerName: "",
    selectedCadJob: "",
  });

  const componentRef = React.useRef(null);

  const onBeforeGetContentResolve = React.useRef(null);

  const handleAfterPrint = () => {
    //React.useCallback
    //resetting after print
    // checkAndReset()
    History.push(`/dashboard/design`, { view: 1, sub: 3, tab: 3 });
  };

  const handleBeforePrint = React.useCallback(() => {
  }, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        resolve();
      }, 10);
    });
  }, []); //setText

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  function getDateAndTime() {
    return (
      new Date().getDate() +
      "_" +
      (new Date().getMonth() + 1) +
      "_" +
      new Date().getFullYear() +
      "_" +
      new Date().getHours() +
      ":" +
      new Date().getMinutes()
    );
  }
  const onKeyDown = (e) => {
    e.preventDefault();
  };

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "New_CAD_Request_" + getDateAndTime(),
    onBeforeGetContent: handleOnBeforeGetContent,
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
    removeAfterPrint: true,
  });

  function checkforPrint() {
    if (
      validateNumber() &&
      validatename() &&
      validateEndDate() &&
      validateSelectbox()
    ) {
      callCADRepairingapi(true);
    }
  }
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [cadNo, setCadNo] = useState("");
  const [cadErr, setCadErr] = useState("");
  const [cadApiData, setCadApiData] = useState([]);
  const [cadSearch, setCadSearch] = useState("");
  const [refCADNumberCSV, setRefCADNumberCSV] = useState("");
  const [cadNumList, setCadNumList] = useState([]);

  const [designerList, setDesignerList] = useState([]);
  const [designerName, setDesignerName] = useState("");
  const [designerNameErr, setDesignerNameErr] = useState("");

  const [endDate, setEndDate] = useState("");
  const [endDateErr, setEndDateErr] = useState("");
  const [remark, setRemark] = useState("");

  const [selectDesign, setSelectDesign] = useState([]);
  const [selectErr, setSelectErr] = useState("");

  const [cadList, setCadList] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDesignerList();
  }, []);

  useEffect(() => {
    NavbarSetting("Design", dispatch);
  }, []);

  useEffect(() => {
    if (refCADNumberCSV !== "" && refCADNumberCSV !== null) {
      uploadCamRepairCsv();
    }
  }, [refCADNumberCSV]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (cadSearch) {
        //&& cadSearch.length > 2
        getCADData(cadSearch);
      } else {
        setCadApiData([]);
      }
    }, 800);
    return () => {
      clearTimeout(timeout);
    };
    //eslint-disable-next-line
  }, [cadSearch]);

  function getCADData(JobNo) {
    setLoading(true);
    axios
      .get(Config.getCommonUrl() + `api/cadjob/reparing/${JobNo}?tab=3`)
      .then(function (response) {
        console.log(response);
        if (response.data.success === true) {
          console.log(response.data.data);
          if (response.data.data.length > 0) {
            setCadApiData(response.data.data);
          } else {
            setCadApiData([]);
            dispatch(
              Actions.showMessage({
                message: "Please Insert Proper Job No",
                variant: "error",
              })
            );
          }
        } else {
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
        handleError(error, dispatch, {
          api: `api/cadjob/reparing/${JobNo}?tab=3`,
        });
      });
  }

  let handleJobNoSelect = (JobNo) => {
    let filteredArray = cadApiData.filter(
      (item) => item.CadJobNumber.cad_number === JobNo
    );
    if (filteredArray.length > 0) {
      setCadApiData(filteredArray);
      setCadNumList([
        ...cadNumList,
        ...filteredArray[0].ReceiveJobDetails.map((item) => {
          return {
            id: item.id,
            cad_number: item.temp_cad_no,
          };
        }),
      ]);
      setCadErr("");
      setCadNo(JobNo);
      setPrintObj({ ...printObj, selectedCadJob: JobNo });
    } else {
      setCadNo("");
      setCadNumList([]);
      setCadErr("Please Select Proper CAD No");
    }
  };

  function getDesignerList() {
    setLoading(true);
    axios
      .get(Config.getCommonUrl() + `api/cadjob/designer?is_design_master=1`)
      .then(function (response) {
        console.log(response);
        if (response.data.success === true) {
          const tempData = response.data.data;
          setDesignerList(tempData);
        } else {
          dispatch(
            Actions.showMessage({
              message: response.data.message,
              variant: "error",
            })
          );
        }
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        handleError(error, dispatch, {
          api: `api/cadjob/designer?is_design_master=1`,
        });
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

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value ? e.target.value : e.target.files;
    const target = e.target;
    const endDateValue = target.type === "checkbox" ? target.checked : target.value;
    var today = moment().format("YYYY-MM-DD"); 

    if (name === "endDate") {
      setEndDate(endDateValue);
      let dateVal = moment(endDateValue).format("YYYY-MM-DD"); //new Date(value);
      if (dateVal >= today ) {
        setEndDateErr("");
      } else {
        setEndDateErr("Enter Valid Date");
      }
      setPrintObj({ ...printObj, endDate: value });
    } else if (name === "remark") {
      setRemark(value);
      setPrintObj({ ...printObj, remark: value });
    } else if (name === "refCADNumber") {
      if(e.target.files[0].type==="text/csv"){
       setRefCADNumberCSV(e.target.files[0]);
      setCadErr("");
      }else{
        // setCadErr("Invalid File Format");
        dispatch(Actions.showMessage({ message: "Accept only csv format" }));
        document.getElementById("fileinput").value = "";
      }
    }
  };

  const handleChangeDesigner = (value) => {
    setDesignerName(value);
    setDesignerNameErr("");
    setPrintObj({ ...printObj, designerName: value.label });
  };

  function validateNumber() {
    if (cadNo === "" && refCADNumberCSV === "") {
      setCadErr("Enter valid Job number or upload file");
      return false;
    }
    return true;
  }

  function validateSelectbox() {
    if (refCADNumberCSV && selectDesign.length === 0) {
      setSelectErr("Select CAD job number");
      return false;
    }
    return true;
  }

  function validatename() {
    if (designerName === "" || designerName === null) {
      setDesignerNameErr("Select Designer Name");
      return false;
    }
    return true;
  }

  function validateEndDate() {
    if (endDate === "" || endDate === null) {
      setEndDateErr("Enter end date");
      return false;
    }
    return true;
  }

  function uploadCamRepairCsv() {
    const formData = new FormData();
    formData.append("file", refCADNumberCSV);
    setLoading(true);
    axios
      .post(Config.getCommonUrl() + `api/camjob/cad/repair/read`, formData)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          let tempData = response.data.data;
          let list = tempData.map((item) => {
            return {
              id: item.id,
              cad_number: item.temp_cad_no,
            };
          });
          setCadNumList(list);
        } else {
          setCadNumList([]);
          dispatch(
            Actions.showMessage({
              message: response.data.message,
              variant: "error",
            })
          );
          if (response.data.hasOwnProperty("csverror")) {
            if (response.data.csverror === 1) {
              let downloadUrl = response.data.url;
              window.open(downloadUrl);
            }
            document.getElementById("fileinput").value = "";
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        document.getElementById("fileinput").value = "";
        handleError(error, dispatch, {
          api: `api/camJob/cad/repair/read`,
          body: JSON.stringify(formData),
        });
      });
  }

  const handleChangeChecked = (event) => {
    const newVal = event.target.value;
    let newDesignSelect;
    if (selectDesign.indexOf(newVal) > -1) {
      newDesignSelect = selectDesign.filter((s) => s !== newVal);
    } else {
      newDesignSelect = [...selectDesign, newVal];
    }
    setSelectDesign(newDesignSelect);
    setSelectErr("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      validateNumber() &&
      validatename() &&
      validateEndDate() &&
      validateSelectbox()
    ) {
      callCADRepairingapi(false);
    }
  };

  function callCADRepairingapi(isPrint) {
    const body = {
      employee_id: designerName.value,
      end_date: endDate,
      remark: remark,
      cad_job_receive_design_id: selectDesign.length > 0 ? selectDesign : null,
    };
    setLoading(true);
    axios
      .post(Config.getCommonUrl() + `api/camjob/repair/issue`, body)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          if (isPrint) {
            handlePrint();
          } else {
            History.push(`/dashboard/design`, { view: 1, sub: 3, tab: 3 });
          }
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
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        handleError(error, dispatch, {
          api: `api/cadjob/repair/receive`,
          body: body,
        });
      });
  }

  return (
    <div className={clsx(classes.root, props.className, "w-full")}>
      <FuseAnimate animation="transition.slideUpIn" delay={200}>
        <div className="flex flex-col md:flex-row container">
          <div className="flex flex-1 flex-col min-w-0 makeStyles-root-1 pt-20">
            <Grid
              className="department-main-dv"
              container
              spacing={4}
              alignItems="stretch"
              style={{ margin: 0 }}
            >
              <Grid item xs={12} sm={4} md={3} key="1" style={{ padding: 0 }}>
                <FuseAnimate delay={300}>
                  <Typography className="pl-28 pt-16 text-18 font-700">
                    CAM Repair
                  </Typography>
                </FuseAnimate>
                {/* <BreadcrumbsHelper /> */}
              </Grid>
              {loading && <Loader />}
              <Grid
                item
                xs={12}
                sm={4}
                md={9}
                key="2"
                style={{ textAlign: "right" }}
              >
                {/* <Button
                  id="voucher-list-btn"
                  variant="contained"
                  className={classes.button1}
                  size="small"
                  onClick={() =>
                    History.push(`/dashboard/design`, { view: 1, sub: 3, tab: 3 })
                  }
                >
                  Back
                </Button> */}

                <div className="btn-back mt-2">
                  {" "}
                  <img src={Icones.arrow_left_pagination} alt="" />
                  <Button
                    id="btn-back"
                    size="small"
                    onClick={() =>
                      History.push(`/dashboard/design`, {
                        view: 1,
                        sub: 3,
                        tab: 3,
                      })
                    }
                  >
                    Back
                  </Button>
                </div>
              </Grid>
            </Grid>
            <div className="main-div-alll">
              <div className=" model-row-blg-dv">
                <Grid
                  item
                  lg={6}
                  md={4}
                  sm={6}
                  xs={12}
                  style={{ padding: 6 }}
                  className="packing-slip-input"
                >
                  <label>CAD job number</label>
                  <Autocomplete
                    className="mt-1"
                    id="free-solo-demo"
                    freeSolo
                    disableClearable
                    onChange={(event, newValue) => {
                      handleJobNoSelect(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
            
                      if (event !== null) {
                        if (event.type === "change")
                          // not using this condition because all other data is showing in dropdown
                          setCadSearch(newInputValue);
                        if (newInputValue === "") {
                          setCadNo("");
                          setCadNumList([]);
                        }
                      } else {
                        setCadSearch("");
                        setCadNo("");
                      }
                    }}
                    value={cadNo}
                    options={cadApiData.map(
                      (option) => option.CadJobNumber.cad_number
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        style={{ padding: 0 }}
                        placeholder="CAD job number"
                        disabled={refCADNumberCSV ? true : false}
                      />
                    )}
                  />
                </Grid>

                <Grid
                  item
                  lg={4}
                  md={12}
                  sm={12}
                  xs={12}
                  style={{ padding: 6 }}
                >
                  <label>Brows excel</label>
                  <TextField
                    className="mt-1"
                    id="fileinput"
                    placeholder="Brows excel"
                    type="file"
                    inputProps={{
                      accept:".csv"
                    }}
                    name="refCADNumber"
                    // error={cadErr.length > 0 ? true : false}
                    // helperText={cadErr}
                    onChange={(e) => handleInputChange(e)}
                    variant="outlined"
                    fullWidth
                    disabled={cadNo !== "" ? true : false}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <span style={{ color: "red" }}>
                    {cadErr.length > 0 ? cadErr : ""}
                  </span>
                </Grid>
                <Grid
                  item
                  lg={2}
                  md={6}
                  sm={6}
                  xs={6}
                  style={{ padding: 6, display: "flex", alignItems: "center" }}
                >
                  <a href={sampleFile} download="CAM_repairing_issue.csv">
                    Download Sample{" "}
                  </a>
                </Grid>
                <Grid item lg={6} md={4} sm={6} xs={12} style={{ padding: 6 }}>
                  <label>Designer name</label>
                  <Select
                    className="mt-1"
                    classes={classes}
                    styles={selectStyles}
                    options={designerList.map((group) => ({
                      value: group.id,
                      label: group.username,
                    }))}
                    filterOption={createFilter({ ignoreAccents: false })}
                    value={designerName}
                    onChange={handleChangeDesigner}
                    placeholder="Designer name"
                  />
                  <span style={{ color: "red" }}>
                    {designerNameErr.length > 0 ? designerNameErr : ""}
                  </span>
                </Grid>
                <Grid item lg={6} md={4} sm={6} xs={12} style={{ padding: 6 }}>
                  <label>End Date</label>
                  <TextField
                    type="date"
                    placeholder="End Date"
                    name="endDate"
                    value={endDate}
                    // error={endDateErr.length > 0 ? true : false}
                    // helperText={endDateErr}
                    onChange={(e) => handleInputChange(e)}
                    // onKeyDown={onKeyDown}
                    variant="outlined"
                    fullWidth
                    inputProps={{
                      max: moment().format("YYYY-MM-DD"),
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <span style={{ color: "red" }}>
                    {endDateErr.length > 0 ? endDateErr : ""}
                  </span>
                </Grid>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className="mb-16 table_scroll mt-5"
                >
                  <>
                    <MaUTable className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            className={classes.tableRowPad}
                            style={{ textAlign: "start" }}
                          >
                            CAD Job Number
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cadNumList.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell style={{ textAlign: "start" }}>
                              <FormControlLabel
                                key={item.id}
                                label={item.cad_number}
                                control={
                                  <Checkbox
                                    name={item.cad_number}
                                    value={item.id}
                                    onChange={handleChangeChecked}
                                  />
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </MaUTable>
                    <span style={{ color: "red" }}>
                      {selectErr.length > 0 ? selectErr : ""}
                    </span>
                  </>
                </Grid>

                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  style={{ padding: 6 }}
                >
                  <label>Remark</label>
                  <TextField
                    placeholder="Remark"
                    name="remark"
                    value={remark}
                    onChange={(e) => handleInputChange(e)}
                    variant="outlined"
                    fullWidth
                    multiline
                  />
                </Grid>
                <Grid lg={12} md={12} sm={12} xs={12} className="mt-10">
                  <Button
                    id="btn-save"
                    className="float-right mr-2"
                    variant="contained"
                    color="primary"
                    onClick={(e) => handleFormSubmit(e)}
                  >
                    SAVE
                  </Button>

                  <Button
                    id="btn-save"
                    className="float-right mr-10"
                    variant="contained"
                    color="primary"
                    onClick={(e) => checkforPrint(e)}
                    // onClick={(e) => handleFormSubmit(e)}
                    hidden={true}
                  >
                    Save & Print
                  </Button>
                  <div style={{ display: "none" }}>
                    <CAMRepairingPrintComp
                      ref={componentRef}
                      printObj={printObj}
                    />
                  </div>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </FuseAnimate>
    </div>
  );
};

export default CAMRepairing;
