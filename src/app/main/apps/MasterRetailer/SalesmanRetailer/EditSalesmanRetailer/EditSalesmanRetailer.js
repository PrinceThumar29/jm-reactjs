import React, { useState, useEffect } from "react";
import { Divider, Typography } from "@material-ui/core";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import Config from "app/fuse-configs/Config";
import { FuseAnimate } from "@fuse";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { useDispatch } from "react-redux";
import * as Actions from "app/store/actions";
import Grid from "@material-ui/core/Grid";
import History from "@history";
import Select, { createFilter } from "react-select";
import NavbarSetting from "app/main/NavbarSetting/NavbarSetting";
import handleError from "app/main/ErrorComponent/ErrorComponent";
import Icones from "assets/fornt-icons/Mainicons";

const useStyles = makeStyles((theme) => ({
  root: {},
  form: {
    marginTop: "3%",
    display: "contents",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const EditSalesmanRetailer = (props) => {
  const dataToBeEdited = props.location.state;
  const [isViewOnly, setIsViewOnly] = useState(false);

  const dispatch = useDispatch();

  const [SalesManName, setSalesManName] = useState("");
  const [SalesManNameErr, setSalesManNameErr] = useState("");

  const [SalesManCode, setSalesManCode] = useState("");
  const [SalesManCodeErr, setSalesManCodeErr] = useState("");

  const [phoneNumOne, setPhoneNumOne] = useState("");
  const [phoneNumOneErr, setPhoneNumOneErr] = useState("");

  const [phoneNumTwo, setPhoneNumTwo] = useState("");
  const [phoneNumTwoErr, setPhoneNumTwoErr] = useState("");

  const [SalesManEmail, setSalesManEmail] = useState("");
  const [SalesManEmailErr, setSalesManEmailErr] = useState("");

  const [mpin, setmpin] = useState("");
  const [mpinErr, setmpinErr] = useState("");

  const [panNumber, setpanNumber] = useState("");
  const [panNumberErr, setpanNumberErr] = useState("");

  const [SalesManAddress, setSalesManAddress] = useState("");
  const [SalesManAddressErr, setSalesManAddressErr] = useState("");

  const [bankName, setBankName] = useState("");
  const [bankNameErr, setBankNameErr] = useState("");

  const [accHolderName, setAccHolderName] = useState("");
  const [accHolderNameErr, setAccHolderNameErr] = useState("");

  const [stateData, setStateData] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedStateErr, setSelectedStateErr] = useState("");

  const [countryData, setCountryData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountryErr, setSelectedCountryErr] = useState("");

  const [cityData, setCityData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCityErr, setSelectedCityErr] = useState("");

  const [accType, setAccType] = useState("");
  const [accTypeErr, setAccTypeErr] = useState("");

  const [accNumber, setAccNumber] = useState("");
  const [accNumberErr, setAccNumberErr] = useState("");

  const [pincode, setPincode] = useState("");
  const [pincodeErr, setPincodeErr] = useState("");

  const [IFSCcode, setIFSCcode] = useState("");
  const [IFSCcodeErr, setIFSCcodeErr] = useState("");

    const [confirmaccNumber, setConfirmAccNumber] = useState("");
  const [confirmaccNumberErr, setconfirmaccNumberErr] = useState("");

  const [aadhaarcardnum, setaadhaarcardnum] = useState("");
  const [aadhaarcardnumErr, setaadhaarcardnumErr] = useState("");
  const [accTypeData, setaccTypeData] = useState([{id:"1",name:"Savings account"},{id:"2",name:"Current account"}]);

  const theme = useTheme();

  const selectStyles = {
    input: (base) => ({
      ...base,
      color: theme.palette.text.primary,
      "& input": {
        font: "inherit",
      },
    }),
  };
  function handleacctypeChange(value) {
    setAccType(value)
    console.log(value);
  }
  useEffect(() => {
    NavbarSetting("Master-Retailer", dispatch);
    //eslint-disable-next-line
  }, []);

  const classes = useStyles();

  function handleInputChange(event) {

    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (name === "SalesManName") {
      setSalesManName(value);
      setSalesManNameErr("");
    } else if (name === "SalesManCode") {
      setSalesManCodeErr("");
      setSalesManCode(value);
    } else if (name === "phoneNo") {
      if (/^\d{0,10}$/.test(value)) {
        setPhoneNumOne(value);
        setPhoneNumOneErr("");
      }
    } else if (name === "panNumber") {
      setpanNumber(value);
      setpanNumberErr("");
    } else if (name === "address") {
      setSalesManAddress(value);
      setSalesManAddressErr("");
    } else if (name === "accHoldNm") {
      setAccHolderName(value);
      setAccHolderNameErr("");
    } else if (name === "bankName") {
      setBankName(value);
      setBankNameErr("");
    } else if (name === "accType") {
      setAccType(value);
      setAccTypeErr("");
    } else if (name === "accNumber") {
      setAccNumber(value);
      setAccNumberErr("");
    } else if (name === "pincode") {
      setPincode(value);
      setPincodeErr("");
    } else if (name === "IfseCode") {
      setIFSCcode(value);
      setIFSCcodeErr("");
    } else if (name === "confirmaccNumber") {
      setConfirmAccNumber(value);
      setconfirmaccNumberErr("");
    } else if (name === "aadhaarcardnum") {
      setaadhaarcardnum(value);
      setaadhaarcardnumErr("");
    }
  }

  function SalesManNameValidation() {
    var Regex = /^[a-zA-Z\s.'-]{2,30}$/;
    if (!SalesManName || Regex.test(SalesManName) === false) {
      if(SalesManName === ""){
        setSalesManNameErr("Enter salesman name");
      }else{
        setSalesManNameErr("Enter valid salesman name");
      }
      return false;
    }
    return true;
  }

  function SalesManCodeValidation() {
    var Regex = /^[A-Za-z0-9 ]*[A-Za-z]+[A-Za-z0-9 ]*$/;
    if (!SalesManCode || Regex.test(SalesManCode) === false) {
      setSalesManCodeErr("Enter Valid Salesman Code");
      return false;
    }
    return true;
  }

  function phoneNumberValidation() {
    var Regex = /^[0-9]{10}$/;
    if (!phoneNumOne || Regex.test(phoneNumOne) === false) {
          if(phoneNumOne === ""){
        setPhoneNumOneErr("Enter mobile number");
      }else{
        setPhoneNumOneErr("Enter valid mobile number");
      }
      return false;
    }
    return true;
  }

  function emailValidation() {
    //const Regex = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
    const Regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!SalesManEmail || Regex.test(SalesManEmail) === false) {
      setSalesManEmailErr("Enter Valid Email Id");
      return false;
    }
    return true;
  }

  function mpinvalidation() {
    var Regex = /^(\d{4}|\d{6})$/;
    if (mpin) {
      if (mpin && Regex.test(mpin)) {
        return true;
      } else {
        setmpinErr("Enter Valid MPIN");
        return false;
      }
    } else {
      setmpinErr("Enter Valid MPIN");
      return false;
    }
  }

  function validatePAN() {
    var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    if (panNumber && regpan.test(panNumber)) {
      return true;
    } else {
      setpanNumberErr("Enter valid pan number");
      return false;
    }
  }

  function countryValidation() {
    if (selectedCountry === "") {
      setSelectedCountryErr("Please Select Country");
      return false;
    }
    return true;
  }

  function stateValidation() {
    if (selectedState === "") {
      setSelectedStateErr("Please Select State");
      return false;
    }
    return true;
  }

  function cityValidation() {
    if (selectedCity === "") {
      setSelectedCityErr("Please Select City");
      return false;
    }
    return true;
  }

  function accNumberValidation() {
    const Regex = /^[0-9]{9,18}$/;
    if (accNumber !== "" && Regex.test(accNumber) === false) {
      if(accNumber === ""){
        setAccNumberErr("Enter account number");
      }else{
        setAccNumberErr("Enter valid account number");
      }
      return false;
    }
    return true;
  }

  function validateConfiACN() {
    if (accNumber !== confirmaccNumber) {
      if(confirmaccNumber === ""){
        setconfirmaccNumberErr("Enter confirm account number");
      }else{
        setconfirmaccNumberErr("Account number don't match");
      }
      return false;
    }
    return true;
  }

  function pincodeValidation() {
    const Regex = /^(\d{4}|\d{6})$/;
    if (!pincode || Regex.test(pincode) === false) {
      setPincodeErr("Enter Valid pincode");
      return false;
    }
    return true;
  }

  function accTypeValidation() {
    var Regex = /^[a-zA-Z\s.'-]{2,10}$/;
    if (accType !== "" && Regex.test(accType) === false) {
      if(accType === ""){
        setAccTypeErr("Enter account type");
      }else{
        setAccTypeErr("Enter valid account type");
      }
      return false;
    }
    return true;
  }

  function addressValidation() {
    // const Regex = ""; Regex.test(SalesManAddress) === false
    if (SalesManAddress !== "" && SalesManAddress === "") {
      setSalesManAddressErr("Enter address");
      return false;
    }
    return true;
  }

  function IFSCcodeValidation() {
    const Regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (IFSCcode !== "" && Regex.test(IFSCcode) === false) {
      if(IFSCcode === ""){
        setIFSCcodeErr("Enter IFSC code");
      }else{
        setIFSCcodeErr("Enter valid IFSC code");
      }
      return false;
    }
    return true;
  }

  function bankNameVAlidation() {
    var Regex = /^[a-zA-Z\s.'-]{2,30}$/;
    if (bankName !== "" && Regex.test(bankName) === false) {
      if(bankName === ""){
        setBankNameErr("Enter bank name");
      }else{
        setBankNameErr("Enter valid bank name");
      }
      return false;
    }
    return true;
  }

  function accHolderNameVAlidation() {
    var Regex = /^[a-zA-Z\s.'-]{2,30}$/;
    if (accHolderName !=="" && Regex.test(accHolderName) === false) {
      if(accHolderName === ""){
        setAccHolderNameErr("Enter account holder name");
      }else{
        setAccHolderNameErr("Enter valid account holder name");
      }
      return false;
    }
    return true;
  }

  function AadhaarCardValidation() {
    const aadhaarPattern = /^\d{12}$/;
    if (!aadhaarcardnum || aadhaarPattern.test(aadhaarcardnum) === false) {
      if(aadhaarcardnum === ""){
        setaadhaarcardnumErr("Enter aadhar card number");
      }else{
        setaadhaarcardnumErr("Enter Valid aadhar card number");
      }
      return false;
    }
    return true;
  }

  function panNumberValidation() {
    const Regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    if (panNumber !== "" && Regex.test(panNumber) === false) {
      if(panNumber === ""){
        setpanNumberErr("Enter pan number");
      }else{
        setpanNumberErr("Enter valid pan number");
      }
      return false;
    }
    return true;
  }

  function handleFormSubmit(ev) {
    ev.preventDefault();
    // resetForm();
    if (
      SalesManNameValidation() &&
      phoneNumberValidation() &&
      AadhaarCardValidation()&&
      panNumberValidation()&&
      addressValidation() &&
      bankNameVAlidation() &&
      accNumberValidation() &&
      validateConfiACN()&&
      accHolderNameVAlidation() &&
      // accTypeValidation() &&
      IFSCcodeValidation()
    ) {
      callEditSalesManApi();
    } 
  }

  function callEditSalesManApi() {
    let data;
      data = {
        account_holder_name: accHolderName,
        account_number: accNumber,
        confirm_account_number: confirmaccNumber,
        adhar_card: aadhaarcardnum,
        account_type: accType.label,
        address: SalesManAddress,
        bank_name: bankName,
        code: SalesManCode,
        ifsc_code: IFSCcode,
        name: SalesManName,
        mobile_number: phoneNumOne,
        pan_number: panNumber,
      };
    axios
      .put(
        Config.getCommonUrl() + "retailerProduct/api/salesman/update/" + dataToBeEdited.row.id,
        data
      )
      .then(function (response) {
        console.log(response);

        if (response.data.success === true) {
          // response.data.data
          // setGoldColor("");
          History.goBack(); //.push("/dashboard/masters/vendors");

          dispatch(Actions.showMessage({ message: response.data.message,variant:"success" }));
        }  else {
          dispatch(Actions.showMessage({ message: response.data.message,variant: "error" }));
        }
      })
      .catch((error) => {
        handleError(error, dispatch, {
          api: "retailerProduct/api/salesman/update/" + dataToBeEdited.row.id,
          body: data,
        });
      });
  }

  useEffect(() => {
    getCountrydata();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    //
    setIsViewOnly(dataToBeEdited.isViewOnly);
    setSalesManName(dataToBeEdited.row.name);
    setSalesManCode(dataToBeEdited.row.salesman_code);

    setPhoneNumOne(dataToBeEdited.row.mobile_number);
    // setPhoneNumTwo(
    //   dataToBeEdited.row.sec_number !== null
    //     ? dataToBeEdited.row.sec_number
    //     : ""
    // );
    // setSalesManEmail(dataToBeEdited.row.email);
    // setmpin(dataToBeEdited.row.m_pin);
    setpanNumber(dataToBeEdited.row.pan_number);
    setSalesManAddress(dataToBeEdited.row.address);

    setAccHolderName(dataToBeEdited.row.account_holder_name);
    setBankName(dataToBeEdited.row.bank_name);
    setAccType({
      value: accTypeData.id,
      label: dataToBeEdited.row.account_type,
    });
    setAccNumber(dataToBeEdited.row.account_number);
    setConfirmAccNumber(dataToBeEdited.row.confirm_account_number);
    setaadhaarcardnum(dataToBeEdited.row.adhar_card);
    // setPincode(dataToBeEdited.row.pincode);
    setIFSCcode(dataToBeEdited.row.ifsc_code);
    // setSelectedCountry({
    //   value: dataToBeEdited.row.country_name.id,
    //   label: dataToBeEdited.row.country_name.name,
    // });
    // getStatedata(dataToBeEdited.row.country_name.id, true);

    // getCityData(dataToBeEdited.row.state_name.id);
    // setSelectedCity({
    //   value: dataToBeEdited.row.city_name.id,
    //   label: dataToBeEdited.row.city_name.name,
    // });
    //eslint-disable-next-line
  }, [dataToBeEdited]);

  function getCountrydata() {
    axios
      .get(Config.getCommonUrl() + "api/country")
      .then(function (response) {
        if (response.data.success === true) {
          console.log(response);
          setCountryData(response.data.data);
        }  else {
          dispatch(Actions.showMessage({ message: response.data.message,variant: "error" }));
        }
      })
      .catch((error) => {
        handleError(error, dispatch, { api: "api/country" });
      });
  }

  function getStatedata(countryID, flag) {
    axios
      .get(Config.getCommonUrl() + "api/country/state/" + countryID)
      .then(function (response) {
        if (response.data.success === true) {
          console.log(response);
          setStateData(response.data.data);
          if (flag === true) {
            const stateArr = response.data.data;
            stateArr.map((stateVal) => {
              if (stateVal.id === dataToBeEdited.row.state_name.id) {
                setSelectedState({
                  value: stateVal.id,
                  label: stateVal.name,
                });
              }
              return true;
            });
          }
        }  else {
          dispatch(Actions.showMessage({ message: response.data.message,variant: "error" }));
        }
      })
      .catch((error) => {
        handleError(error, dispatch, { api: "api/country/state/" + countryID });
      });
  }

  function handleCountryChange(value) {
    setSelectedCountry(value);
    setSelectedCountryErr("");

    setStateData([]);
    setSelectedState("");
    setSelectedStateErr("");

    setCityData([]);
    setSelectedCity("");
    getStatedata(value.value, false);
  }

  function handleChangeState(value) {
    setSelectedState(value);
    setSelectedStateErr("");
    setCityData([]);
    setSelectedCity("");
    getCityData(value.value);
  }

  function getCityData(stateID) {
    axios
      .get(Config.getCommonUrl() + "api/country/city/" + stateID)
      .then(function (response) {
        if (response.data.success === true) {
          console.log(response);
          setCityData(response.data.data);
        }  else {
          dispatch(Actions.showMessage({ message: response.data.message,variant: "error" }));
        }
      })
      .catch((error) => {
        handleError(error, dispatch, { api: "api/country/city/" + stateID });
      });
  }

  function handleChangeCity(value) {
    setSelectedCity(value);
    setSelectedCityErr("");
  }

  return (
    <div className={clsx(classes.root, props.className, "w-full")}>
      <FuseAnimate animation="transition.slideUpIn" delay={200}>
        <div className="flex flex-col md:flex-row container">
          <div className="flex flex-1 flex-col min-w-0 makeStyles-root-1 ">
            <Grid
              container
              alignItems="center"
              style={{ paddingInline: 30, marginBlock: 20 }}
            >
              <Grid item xs={6} sm={5} md={5} key="1">
                <FuseAnimate delay={300}>
                  <Typography className="text-18 font-700">
                    {isViewOnly ? "View Salesman" : "Edit Salesman"}
                  </Typography>
                </FuseAnimate>
              </Grid>
              <Grid item xs={6} sm={7} md={7} key="2">
                <div className="btn-back">
                  <Button
                    id="btn-back"
                    className=""
                    size="small"
                    onClick={(event) => {
                      // History.push("/dashboard/masters/clients");
                      History.goBack();
                      //   setDefaultView(btndata.id);
                      //   setIsEdit(false);
                    }}
                  >
                  <img src={Icones.arrow_left_pagination} className="back_arrow" alt="" />
                    Back
                  </Button>
                </div>
              </Grid>
            </Grid>

            <div className="main-div-alll ">
              {/* {JSON.stringify(contDetails)} */}
              <form
                name="registerForm"
                noValidate
                className="flex flex-col justify-center w-full"
                onSubmit={handleFormSubmit}
              >
                 <h4 style={{marginBottom: 16}}>Salesman Details</h4>
                 <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <p>Salesman Code*</p>
                    <TextField
                      placeholder="Salesman Code"
                      name="SalesManCode"
                      value={SalesManCode}
                      error={SalesManCodeErr.length > 0 ? true : false}
                      helperText={SalesManCodeErr}
                      onChange={(e) => handleInputChange(e)}
                      variant="outlined"
                      required
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <p>Salesman Name*</p>
                    <TextField
                      placeholder="Salesman Name"
                      autoFocus
                      name="SalesManName"
                      value={SalesManName}
                      error={SalesManNameErr.length > 0 ? true : false}
                      helperText={SalesManNameErr}
                      onChange={(e) => handleInputChange(e)}
                      variant="outlined"
                      required
                      fullWidth
                      disabled={isViewOnly}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                  <p>Mobile Number*</p>
                    <TextField
                      placeholder="Phone No"
                      name="phoneNo"
                      value={phoneNumOne}
                      error={phoneNumOneErr.length > 0 ? true : false}
                      helperText={phoneNumOneErr}
                      onChange={(e) => handleInputChange(e)}
                      variant="outlined"
                      required
                      fullWidth
                      disabled={isViewOnly}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                  <p>Aadhaar Card No*</p>
                    <TextField
                      placeholder="Enter Aadhaar No"
                      name="aadhaarcardnum"
                      value={aadhaarcardnum}
                      error={aadhaarcardnumErr.length > 0 ? true : false}
                      helperText={aadhaarcardnumErr}
                      onChange={(e) => handleInputChange(e)}
                      variant="outlined"
                      required
                      fullWidth
                      disabled={isViewOnly}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                  <p>Pan No.</p>
                    <TextField
                      placeholder="PAN Number"
                      name="panNumber"
                      value={panNumber}
                      error={panNumberErr.length > 0 ? true : false}
                      helperText={panNumberErr}
                      onChange={(e) => handleInputChange(e)}
                      variant="outlined"
                      required
                      fullWidth
                      disabled={isViewOnly}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <p>Address</p>
                    <TextField
                      className="textarea-input-dv "
                      placeholder="Address"
                      name="address"
                      value={SalesManAddress}
                      error={SalesManAddressErr.length > 0 ? true : false}
                      helperText={SalesManAddressErr}
                      onChange={(e) => handleInputChange(e)}
                      variant="outlined"
                      required
                      multiline
                      maxRows={3}
                      fullWidth
                      disabled={isViewOnly}
                    />
                  </Grid>
                 </Grid>
                 <Divider style={{marginBlock: 16}} />
                 <h4 style={{marginBottom: 16}}>Bank Details</h4>
                 <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                  <p>Bank Name</p>
                    <TextField
                      placeholder="Bank Name"
                      name="bankName"
                      value={bankName}
                      error={bankNameErr.length > 0 ? true : false}
                      helperText={bankNameErr}
                      onChange={(e) => handleInputChange(e)}
                      variant="outlined"
                      required
                      fullWidth
                      disabled={isViewOnly}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                  <p>Account Number</p>
                    <TextField
                      placeholder="Account Number"
                      name="accNumber"
                      value={accNumber}
                      error={accNumberErr.length > 0 ? true : false}
                      helperText={accNumberErr}
                      onChange={(e) => handleInputChange(e)}
                      variant="outlined"
                      required
                      fullWidth
                      disabled={isViewOnly}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                  <p>Confirm Account Number</p>
                    <TextField
                      placeholder="Enter Confirm Account Number"
                      name="confirmaccNumber"
                      value={confirmaccNumber}
                      error={confirmaccNumberErr.length > 0 ? true : false}
                      helperText={confirmaccNumberErr}
                      onChange={(e) => handleInputChange(e)}
                      variant="outlined"
                      required
                      fullWidth
                      disabled={isViewOnly}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                  <p>Account Holder Name</p>
                    <TextField
                      placeholder="Account Holder Name"
                      name="accHoldNm"
                      disabled={isViewOnly}
                      value={accHolderName}
                      error={accHolderNameErr.length > 0 ? true : false}
                      helperText={accHolderNameErr}
                      onChange={(e) => handleInputChange(e)}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                  <p>Account Type</p>
                    <Select
                        filterOption={createFilter({ ignoreAccents: false })}
                        classes={classes}
                        styles={selectStyles}
                        options={accTypeData.map((suggestion) => ({
                          value: suggestion.id,
                          label: suggestion.name,
                        }))}
                        // components={components}
                        value={accType}
                        onChange={handleacctypeChange}
                        placeholder="Select Account Type"
                        // isDisabled={isView}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                  <p>IFSC Code</p>
                    <TextField
                      placeholder="IFSC Code"
                      name="IfseCode"
                      value={IFSCcode}
                      error={IFSCcodeErr.length > 0 ? true : false}
                      helperText={IFSCcodeErr}
                      onChange={(e) => handleInputChange(e)}
                      variant="outlined"
                      required
                      fullWidth
                      disabled={isViewOnly}
                    />
                  </Grid>
                 </Grid>
              </form>

              {!isViewOnly && (
                <Button
                  variant="contained"
                  id="btn-save"
                  className="w-128 mx-auto mt-16 float-right"
                  aria-placeholder="Register"
                  //   disabled={!isFormValid()}
                  // type="submit"
                  onClick={(e) => {
                    handleFormSubmit(e);
                  }}
                >
                  Save
                </Button>
              )}
            </div>
          </div>
        </div>
      </FuseAnimate>
    </div>
  );
};

export default EditSalesmanRetailer;
