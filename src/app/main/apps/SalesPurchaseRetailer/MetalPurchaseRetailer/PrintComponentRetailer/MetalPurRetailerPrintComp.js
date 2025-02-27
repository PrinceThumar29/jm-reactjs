import * as React from "react";
import { ToWords } from "to-words";
import HeaderPrint from "../../Helper/HeaderPrint";
import FooterPrint from "../../Helper/FooterPrint";
import Config from "app/fuse-configs/Config";
export class MetalPurRetailerPrintComp extends React.PureComponent {

  componentDidMount() {}

  render() {
    // const { text } = this.props;
    const { printObj } = this.props;
    const toWords = new ToWords({
      localeCode: "en-IN",
      converterOptions: {
        currency: true,
        ignoreDecimal: false,
        ignoreZeroCurrency: false,
        doNotAddOnly: false,
      },
    });
    const myprofileData = localStorage.getItem("myprofile")
    ? JSON.parse(localStorage.getItem("myprofile"))
    : [];
 
    return (
      <>
        <div
          className="increase-padding-dv jewellery_main_print-blg"
          style={{ width: "805px", height: "530px" }}
        >
          {/* Metal_purchase */}
          <style type="text/css" media="print">
            {
              "\
            @page { size: A5 landscape !important; margin:10px 25px 10px 25px; }          "
            }
          </style>
          <ul>
           <HeaderPrint myprofileData={myprofileData}/>
            <div className="add-client-row"></div>
            <div style={{ margin: "5px", height: "290px" }}>
              <div style={{ width: "100%" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <h6>Metal Purchase</h6>
                    <h6>To,</h6>
                    <h6>{printObj?.supplierName}</h6>
                  </div>
                  <div>
                    <h6>TAX INVOICE</h6>
                  </div>
                  <div>
                  {
                      myprofileData.gst_number_flag && <h6>
                      GSTIN :{" "}
                      {myprofileData.gst_number ? myprofileData.gst_number : "-"}
                    </h6>
                    }
                    <h6>Voucher No.: {printObj.purcVoucherNum}</h6>
                    <h6>Date: {printObj.voucherDate}</h6>
                  </div>
                </div>
              </div>
              <li className="d-block">
                <div className="tabel-deta-show">
                  <div className="row">
                    <div className="header-tabel-deta">
                      <div style={{ maxWidth: "50px" }}>
                        {" "}
                        <b> NO </b>
                      </div>
                      <div style={{ minWidth: "120px" }}>
                        {" "}
                        <b> Category Variant </b>
                      </div>
                      <div style={{ minWidth: "210px" }}>
                        {" "}
                        <b> Category Name </b>
                      </div>
                      <div style={{ maxWidth: "70px" }}>
                        {" "}
                        <b> HSN </b>
                      </div>
                      <div>
                        {" "}
                        <b style={{ marginRight: "5px" }}> GWT </b>
                      </div>
                      <div>
                        {" "}
                        <b style={{ marginRight: "5px" }}> NWT  </b>
                      </div>
                      <div style={{ maxWidth: "45px" }}>
                        {" "}
                        <b style={{ marginRight: "5px"}}> Purity </b>
                      </div>
                      <div>
                        {" "}
                        <b style={{ marginRight: "5px" }}> Fine Gold</b>
                      </div>
                      <div style={{ minWidth: "110px" }}>
                        {" "}
                        <b style={{ marginRight: "5px" }}> Amount</b>
                      </div>
                    </div>
                  </div>

                  {printObj.orderDetails.map((row, index) =>
                    row.stockCode ? (
                      <div className="row" key={index}>
                        <div className="body-tabel-deta">
                          <div
                            border="1"
                            style={{
                              maxWidth: "50px",
                              justifyContent: "center",
                              fontWeight:"500"
                            }}
                          >
                            {index + 1}
                          </div>
                          <div border="1" style={{ textAlign: "center", fontWeight:"500",minWidth: "120px"}}>
                            {row.stockCode?.label}
                          </div>
                          <div border="1" style={{fontWeight:"500",minWidth: "210px"}}>{row.categoryName}</div>
                          <div border="1" style={{fontWeight:"500",maxWidth: "70px"}}>{row.selectedHsn}</div>
                          <div border="1" style={{ justifyContent: "end", fontWeight:"500"}}>
                            <span style={{ marginRight: "5px" }}>
                              {row.grossWeight}
                            </span>
                          </div>
                          <div border="1" style={{ justifyContent: "end", fontWeight:"500"}}>
                            <span style={{ marginRight: "5px" }}>
                              {row.netWeight}
                            </span>
                          </div>
                          <div border="1" style={{ justifyContent: "end", fontWeight:"500",maxWidth: "45px"}}>
                            <span style={{ marginRight: "5px" }}>
                              {row.purity}
                            </span>
                          </div>
                          <div border="1" style={{ justifyContent: "end", fontWeight:"500"}}>
                            <span style={{ marginRight: "5px" }}>
                              {row.fineGold}
                            </span>
                          </div>
                          <div
                            border="1"
                            className="alignment-right-text"
                            style={{ minWidth: "110px", justifyContent: "end", fontWeight:"500"}}
                          >
                            <span style={{ marginRight: "5px" }}>
                              {Config.numWithComma(row.amount)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                  )}

                  <div className="row">
                    <div className="body-tabel-deta body-tabel-deta-bdr">
                      <div border="1" style={{ maxWidth: "50px" }}>
                        {" "}
                        &nbsp;
                      </div>
                      <div border="1" style={{ minWidth: "120px" }}> &nbsp;</div>
                      <div border="1" style={{ minWidth: "210px" }}> &nbsp;</div>
                      <div border="1" style={{ maxWidth: "70px" }}> &nbsp;</div>
                      <div border="1"> &nbsp;</div>
                      <div border="1"> &nbsp;</div>
                      <div border="1" style={{ maxWidth: "45px" }}> &nbsp;</div>
                      <div border="1"> &nbsp;</div>
                      <div border="1" style={{ minWidth: "110px" }}>
                        {" "}
                        &nbsp;
                      </div>
                    </div>

                    {/* <div className="body-tabel-deta body-tabel-deta-bdr">
                      <div style={{ maxWidth: "50px" }}> &nbsp;</div>
                      <div> &nbsp;</div>
                      <div className="retailer-print">SubTotal</div>
                      <div> &nbsp;</div>
                      <div> &nbsp;</div>
                      <div> &nbsp;</div>
                      <div> &nbsp;</div>
                      <div> &nbsp;</div>
                      <div style={{ minWidth: "130px", justifyContent: "end" }}>
                        <span style={{ marginRight: "5px" }}>
                          {Config.numWithComma(printObj.taxableAmount)}
                        </span>
                      </div>
                    </div> */}
                    {!printObj.isIgst  ? (
                      <>
                        <div className="body-tabel-deta body-tabel-deta-bdr">
                          <div style={{ maxWidth: "50px" }}> &nbsp;</div>
                          <div style={{ minWidth: "120px" }}> &nbsp;</div>
                          <div className="retailer-print" style={{ minWidth: "210px" }}>Add CGST</div>
                          <div style={{ maxWidth: "70px" }}> &nbsp;</div>
                          <div> &nbsp;</div>
                          <div> &nbsp;</div>
                          <div style={{ maxWidth: "45px" }}> &nbsp;</div>
                          <div> &nbsp;</div>
                          <div
                            style={{ minWidth: "110px", justifyContent: "end" }}
                          >
                            <span style={{ marginRight: "5px" }}>
                              {Config.numWithComma(printObj.cGstTot)}
                            </span>
                          </div>
                        </div>
                        <div className="body-tabel-deta body-tabel-deta-bdr">
                          <div style={{ maxWidth: "50px" }}> &nbsp;</div>
                          <div style={{ minWidth: "120px" }}> &nbsp;</div>
                          <div className="retailer-print" style={{ minWidth: "210px" }}>Add SGST</div>
                          <div style={{ maxWidth: "70px" }}> &nbsp;</div>
                          <div> &nbsp;</div>
                          <div> &nbsp;</div>
                          <div style={{ maxWidth: "45px" }}> &nbsp;</div>
                          <div> &nbsp;</div>
                          <div
                            style={{ minWidth: "110px", justifyContent: "end" }}
                          >
                            <span style={{ marginRight: "5px" }}>
                              {Config.numWithComma(printObj.sGstTot)}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="body-tabel-deta body-tabel-deta-bdr">
                        <div style={{ maxWidth: "50px" }}> &nbsp;</div>
                        <div style={{ minWidth: "120px" }}> &nbsp;</div>
                        <div className="retailer-print" style={{ minWidth: "210px" }}>Add IGST</div>
                        <div style={{ maxWidth: "70px" }}> &nbsp;</div>
                        <div> &nbsp;</div>
                        <div> &nbsp;</div>
                        <div style={{ maxWidth: "45px" }}> &nbsp;</div>
                        <div> &nbsp;</div>
                        <div
                          style={{ minWidth: "110px", justifyContent: "end" }}
                        >
                          <span style={{ marginRight: "5px" }}>
                            {Config.numWithComma(printObj.iGstTot)}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="body-tabel-deta body-tabel-deta-bdr">
                      <div style={{ maxWidth: "50px" }}> &nbsp;</div>
                      <div style={{ minWidth: "120px" }}> &nbsp;</div>
                      <div className="retailer-print" style={{ minWidth: "210px" }}>Round Off</div>
                      <div style={{ maxWidth: "70px" }}> &nbsp;</div>
                      <div> &nbsp;</div>
                      <div> &nbsp;</div>
                      <div style={{ maxWidth: "45px" }}> &nbsp;</div>
                      <div> &nbsp;</div>
                      <div style={{ minWidth: "110px", justifyContent: "end" }}>
                        <span style={{ marginRight: "5px" }}>
                          {printObj.roundOff === "" ? 0 : printObj.roundOff}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="d-block">
                <div className="tabel-deta-show tabel-deta-show_total totallast_col mb-3">
                  <div className="row">
                    <div className="body-tabel-deta">
                      <div style={{ maxWidth: "50px" }}></div>
                      <div style={{ minWidth: "120px" }}></div>
                      <div className="retailer-print" style={{ minWidth: "210px" }}>Total</div>
                      <div style={{ maxWidth: "70px" }}></div>
                      <div style={{ justifyContent: "end" }}>
                        <span style={{ marginRight: "5px" }}>
                          {printObj.grossWtTOt}
                        </span>
                      </div>
                      <div style={{ justifyContent: "end" }}>
                        <span style={{ marginRight: "5px" }}>
                          {printObj.netWtTOt}
                        </span>
                      </div>
                      <div style={{ maxWidth: "45px" }}></div>
                      <div style={{ justifyContent: "end" }}>
                        <span style={{ marginRight: "5px" }}>
                          {printObj.fineWtTot}
                        </span>
                      </div>
                      <div style={{ minWidth: "110px", justifyContent: "end" }}>
                        <span style={{ marginRight: "5px" }}>
                          {Config.numWithComma(printObj.balancePayable)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </div>
            <div style={{ margin: "5px", height: "40px" }}>
              {/* <div
                style={{
                  width: "100%",
                  border: "1px solid black",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              > */}
                {/* <div
                  style={{
                    display: "flex",
                    width: "50%",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    <h6 style={{ borderBottom: "1px solid black" }}>Credits</h6>
                    <h6>Old Purchase:</h6>
                    <h6>Advance:</h6>
                  </div>
                  <div>
                    <h5></h5>
                    <h5></h5>
                  </div>
                </div> */}
                        {/* <div
                  style={{
                    display: "flex",
                    width: "50%",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    <h6></h6>
                    <h6></h6>
                    <h6></h6>
                  </div>
                  <div>
                    <h5></h5>
                    <h5></h5>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "50%",
                    justifyContent: "space-between",
                    marginRight:"5px"
                  }}
                >
                  <div>
                    <h6 style={{ borderBottom: "1px solid black" }}>
                      Total Received
                    </h6>
                    <h6>Cash:</h6>
                    <h6>Cheque/Bank:</h6>
                    <h6>Card Details:</h6>
                  </div>
                  <div>
                    <h6>&nbsp;</h6>
                    <h6>{Config.numWithComma(printObj.balancePayable)}</h6>
                    <h6></h6>
                    <h6></h6>
                  </div>
                </div>
              </div> */}
            
              <li className="d-block" style={{borderTop:"1px solid black"}}>
                <div className="tabel-deta-show tabel-deta-show_total">
                  <div className="row">
                    <div className="body-tabel-deta">
                      <div className="flex_balancep_payable">
                        <span className="print-div-left-increase">
                          Amount Chargeable (in words) :<br />
                          <span>
                            {printObj.balancePayable !== "" &&
                              !isNaN(printObj.balancePayable) &&
                              toWords.convert(printObj.balancePayable)}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </div>

            {/* <li className="d-block mt-10">
                <div className="tabel-deta-show multiple-tabel-blg">
                  <div className="row">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{borderTop:"1px solid black"}}>Customer Sign.</span>
                      <span style={{borderTop:"1px solid black",width:"130px",textAlign:"center"}}>For, {myprofileData.firm_name}</span>
                    </div>
                  </div>
                </div>
              </li> */}
            <div className="add-client-row"></div>
           <FooterPrint myprofileData={myprofileData}/>
          </ul>
        </div>
      </>
    );
  }
}

export const FunctionalComponentToPrint = React.forwardRef((props, ref) => {
  // eslint-disable-line max-len text={props.text}
  return <MetalPurRetailerPrintComp ref={ref} printObj={props.printObj} />;
});
