import React, { useState, useEffect } from "react";
import { InputBase, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { FuseAnimate } from "@fuse";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Icon, IconButton } from "@material-ui/core";
import axios from "axios";
import Config from "app/fuse-configs/Config";
import * as Actions from "app/store/actions";
import { useDispatch } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";
// import Loader from "../../../Loader/Loader";
import NavbarSetting from "app/main/NavbarSetting/NavbarSetting";
import handleError from "app/main/ErrorComponent/ErrorComponent";
import SearchIcon from "@material-ui/icons/Search";
import Icones from "assets/fornt-icons/Mainicons";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none",
  },
  button: {
    textTransform: "none",
    backgroundColor: "#415BD4",
    color: "#FFFFFF",
    borderRadius: 7,
    letterSpacing: "0.06px",
  },
  tabroot: {
    // width: "fit-content",
    // marginTop: theme.spacing(3),
    overflowX: "auto",
    overflowY: "auto",
    // height: "100%",
    height: "100%",
  },
  table: {
    minWidth: 850,
  },
  tableRowPad: {
    padding: 7,
    wordBreak: "break-all",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: "340px",
    height: "37px",
    color: "#CCCCCC",
    opacity: 1,
    letterSpacing: "0.06px",
    font: "normal normal normal 14px/17px Inter",
  },
  search: {
    display: "flex",
    border: "1px solid #cccccc",
    float: "right",
    height: "38px",
    width: "340px",
    borderRadius: "7px !important",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    opacity: 1,
    padding: "2px 4px",
    alignItems: "center",
  },
  iconButton: {
    width: "19px",
    height: "19px",
    opacity: 1,
    color: "#CCCCCC",
  },
  wrapText: {
    whiteSpace: "nowrap",
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const VenderRetailer = (props) => {
  // const [defaultView, setDefaultView] = useState("1");
  // const [selectedIdForEdit, setSelectedIdForEdit] = useState("");
  const [selectedIdForDelete, setSelectedIdForDelete] = useState("");
  // const [isEdit, setIsEdit] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [apiData, setApiData] = useState([]);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const roleOfUser = localStorage.getItem("permission")
  ? JSON.parse(localStorage.getItem("permission"))
  : null;
    const [authAccessArr, setAuthAccessArr] = useState([]);

    useEffect(() => {
      let arr = roleOfUser
          ? roleOfUser["Master-Retailer"]["Vendors-Retailer"]
            ? roleOfUser["Master-Retailer"]["Vendors-Retailer"]
            : []
          : [];
      const arrData = [];
      if (arr.length > 0) {
        arr.map((item) => {
          arrData.push(item.name);
        });
      }
      setAuthAccessArr(arrData);
    }, []);

  useEffect(() => {
    NavbarSetting("Master-Retailer", dispatch);
    //eslint-disable-next-line
  }, []);

  function editHandler(id,isEditAllow,isViewAllow) {
    props.history.push("/dashboard/mastersretailer/vendorretailer/addvendorretailer", {
      id: id,
      isViewOnly : isViewAllow,
      isEditOnly : isEditAllow
    });
  }

  function deleteHandler(id) {
    setSelectedIdForDelete(id);
    setOpen(true);
  }

  function handleClose() {
    setSelectedIdForDelete("");
    setOpen(false);
  }

  function callDeleteVendorApi() {
    axios
      .delete(Config.getCommonUrl() + "retailerProduct/api/vendor/" + selectedIdForDelete)
      .then(function (response) {
        console.log(response);
        setOpen(false);
        if (response.data.success === true) {
          getVendors();
          dispatch(
            Actions.showMessage({
              message: response.data.message,
              variant: "success",
            })
          );
          setSelectedIdForDelete("");
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
          api: "retailerProduct/api/vendor/" + selectedIdForDelete,
        });
      });
  }

  useEffect(() => {
    if (loading) {
      setTimeout(() => setLoading(false), 7000);
    }
  }, [loading]);

  useEffect(() => {
    getVendors();
  }, [dispatch]);

  function getVendors() {
    setLoading(true);
    axios
      .get(Config.getCommonUrl() + "retailerProduct/api/vendor")
      .then(function (response) {
        if (response.data.success === true) {
          console.log(response);
          const arrData = response.data.data.map((item)=>{
            return {
              ...item,
              statusname : item.status === 1 ? "Active" : "Deactive"
            }
          })
          setApiData(arrData);
          setLoading(false);
        }
      })
      .catch(function (error) {
        setApiData([])
        setLoading(false);
        handleError(error, dispatch, { api: "retailerProduct/api/vendor" });
      });
  }

  return (
    <div className={clsx(classes.root, props.className, "w-full")}>
      <FuseAnimate animation="transition.slideUpIn" delay={200}>
        <div className="flex flex-col md:flex-row container">
          <div className="flex flex-1 flex-col min-w-0 makeStyles-root-1 pt-20 ">
            <Grid
              container
              alignItems="center"
              style={{paddingBottom: 20, paddingInline: 30}}
            >
              <Grid item xs={12} sm={6} md={3} key="1">
                <FuseAnimate delay={300}>
                  <Typography className="text-18 font-700">
                    Vendors
                  </Typography>
                </FuseAnimate>

                {/* <BreadcrumbsHelper /> */}
              </Grid>
            {
              authAccessArr.includes('Add /Edit Vendors-Retailer') &&  <Grid
              item
              xs={12}
              sm={6}
              md={9}
              key="2"
              style={{ textAlign: "right", justifyContent: "flex-end" }}
            >
              <Link
                to="/dashboard/mastersretailer/vendorretailer/addvendorretailer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button
                  className={classes.button}
                  size="small"
                >
                  Add New
                </Button>
              </Link>
            </Grid>
            }
             
            </Grid>
            {/* {loading && <Loader />} */}
            <div className="main-div-alll ">
              <div
                style={{ borderRadius: "7px !important" }}
                component="form"
                className={classes.search}
              >
                <InputBase
                  className={classes.input}
                  placeholder="Search"
                  inputProps={{ "aria-label": "search" }}
                  value={searchData}
                  onChange={(event) => setSearchData(event.target.value)}
                />
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </div>
              <div
                className="mt-56 department-tbl-mt-dv"
                // style={{marginBottom: "8%"}}
              >
                <Paper
                  className={clsx(classes.tabroot, "table-responsive ")}
                  id="vendors_tabel_dv"
                >
                  {/* <div className="table-responsive "> */}
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tableRowPad} style={{width:"70px"}}>
                          ID
                        </TableCell>
                        <TableCell className={classes.tableRowPad} align="left">
                          Vendor Name
                        </TableCell>
                        <TableCell className={classes.tableRowPad} align="left">
                          Contact No.
                        </TableCell>
                        <TableCell className={classes.tableRowPad} align="left">
                          Email
                        </TableCell>
                        <TableCell className={classes.tableRowPad} align="left">
                         Vendor Code
                        </TableCell>
                        <TableCell className={classes.tableRowPad} align="left">
                          City
                        </TableCell>
                        <TableCell className={classes.tableRowPad} align="left">
                          Status
                        </TableCell>
                        <TableCell className={classes.tableRowPad} align="left">
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {apiData
                        .filter(
                          (temp) =>
                            temp.name !== "" && temp.name
                              .toLowerCase()
                              .includes(searchData.toLowerCase()) ||
                            temp.mobile_number !== "" && temp.mobile_number
                              .toLowerCase()
                              .includes(searchData.toLowerCase()) ||
                            temp.email !== "" && temp.email
                              .toLowerCase()
                              .includes(searchData.toLowerCase()) ||
                            temp.vendor_code !== "" && temp.vendor_code
                              .toLowerCase()
                              .includes(searchData.toLowerCase()) ||
                            temp.city_name?.name !== "" && temp.city_name?.name
                              .toLowerCase()
                              .includes(searchData.toLowerCase()) ||
                            temp.statusname !== "" && temp.statusname
                              .toLowerCase()
                              .includes(searchData.toLowerCase())
                        )
                        .map((row, i) => (
                          <TableRow key={row.id}>
                            <TableCell className={classes.tableRowPad}>
                              {i + 1}
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.tableRowPad}
                            >
                              {row.name} 
                            </TableCell>

                            <TableCell
                              align="left"
                              className={classes.tableRowPad}
                            >
                               {row.mobile_number} 
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.tableRowPad}
                            > 
                            {row.email ? row.email : "-"}
                            </TableCell>

                            <TableCell
                              align="left"
                              className={classes.tableRowPad}
                            >
                               {row.vendor_code}
                            </TableCell>

                            <TableCell
                              align="left"
                              className={clsx(
                                classes.tableRowPad,
                                classes.wrapText
                              )}
                            >
                              {row.city_name ? row.city_name.name : "-"}
                            </TableCell>
                            <TableCell
                              align="left"
                              className={clsx(
                                classes.tableRowPad,
                                classes.wrapText
                              )}
                            >
                              {row.statusname}
                            </TableCell>
                            <TableCell className={classes.tableRowPad}>
                              {
                                authAccessArr.includes('Add /Edit Vendors-Retailer') &&  <IconButton
                                style={{ padding: "0" }}
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  ev.stopPropagation();
                                  editHandler(row.id, true,false);
                                }}
                              >
                                <Icon className="mr-8 edit-icone">
                                  <img src={Icones.edit} alt="" />
                                </Icon>
                              </IconButton>
                              }
                              {
                                authAccessArr.includes('View Vendors-Retailer') &&  <IconButton
                                style={{ padding: "0" }}
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  ev.stopPropagation();
                                  editHandler(row.id,false,true);
                                }}
                              >
                                <Icon className="mr-8 view-icone">
                                  <img src={Icones.view} alt="" />
                                </Icon>
                              </IconButton>
                              }
                              {
                                authAccessArr.includes('Delete Vendors-Retailer') &&  <IconButton
                                style={{ padding: "0" }}
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  ev.stopPropagation();
                                  deleteHandler(row.id);
                                }}
                              >
                                <Icon className="mr-8 delete-icone">
                                  <img src={Icones.delete_red} alt="" />
                                </Icon>
                              </IconButton>
                              }
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  {/* </div> */}
                </Paper>
              </div>
            </div>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" className="popup-delete">
                {"Alert!!!"}
                <IconButton
                  style={{
                    position: "absolute",
                    marginTop: "-5px",
                    right: "15px",
                  }}
                  onClick={handleClose}
                >
                  <img
                    src={Icones.cross}
                    className="delete-dialog-box-image-size"
                    alt=""
                  />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this record?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  className="delete-dialog-box-cancle-button"
                >
                  Cancel
                </Button>
                <Button
                  onClick={callDeleteVendorApi}
                  className="delete-dialog-box-delete-button"
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
            
          </div>
        </div>
      </FuseAnimate>
    </div>
  );
};

export default VenderRetailer;
