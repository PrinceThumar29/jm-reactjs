import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import HelperFunc from "../../Helper/HelperFunc";
import Config from "app/fuse-configs/Config";

const useStyles = makeStyles((theme) => ({
  root: {},
  tabroot: {
    overflowX: "auto",
    overflowY: "auto",
    height: "100%",
  },
  table: {
    minWidth: 650,
  },
  tableRowPad: {
    padding: 7,
  },
}));

const CategoryWiseList = (props) => {
  const classes = useStyles();
  const [isView, setIsView] = useState(false);
  const [productData, setProductData] = useState([]); //category wise Data
  // const [stateId, setStateId] = useState("");
  useEffect(() => {
    setProductData(props.productData);
    setIsView(props.isView);

    // setStateId(props.stateId)
    //eslint-disable-next-line
  }, [props]);

  return (
    <Paper className={clsx(classes.tabroot, "m-16 table-responsive")}>
      <MaUTable className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableRowPad}>Category</TableCell>
            <TableCell className={classes.tableRowPad}>
              Billing Category
            </TableCell>
            <TableCell className={classes.tableRowPad}>HSN</TableCell>

            <TableCell className={classes.tableRowPad}>Pieces</TableCell>
            <TableCell className={classes.tableRowPad}>Gross Weight</TableCell>
            <TableCell className={classes.tableRowPad}>Net Weight</TableCell>
            <TableCell className={classes.tableRowPad}>Purity</TableCell>
            <TableCell className={classes.tableRowPad}>
              Job work Fine in Pure
            </TableCell>
            <TableCell className={classes.tableRowPad}>Rate</TableCell>
            <TableCell className={classes.tableRowPad}>Valuation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productData.map((element, index) => (
            <TableRow key={index}>
              <TableCell className={classes.tableRowPad}>
                {/* Category */}
                {element.category_name}
              </TableCell>
              <TableCell className={classes.tableRowPad}>
                {/* Billing Category */}
                {element.billing_category_name}
              </TableCell>
              <TableCell className={classes.tableRowPad}>
                {/* HSN */}
                {element.hsn_number}
              </TableCell>

              <TableCell className={classes.tableRowPad}>
                {/* Pcs */}
                {element.pcs}
              </TableCell>
              <TableCell className={classes.tableRowPad}>
                {/* Gross Weight */}
                {parseFloat(element.gross_weight).toFixed(3)}
              </TableCell>
              <TableCell className={classes.tableRowPad}>
                {/* Net Weight */}
                {parseFloat(element.net_weight).toFixed(3)}
              </TableCell>
              <TableCell className={classes.tableRowPad}>
                {/* Purity */}
                {element.purity}
              </TableCell>
              <TableCell className={classes.tableRowPad}>
                {/* Job work Fine in Pure */}
                {element.jobWorkFineinPure}
              </TableCell>
              <TableCell className={classes.tableRowPad}>
                {/* Rate */}
                {isView
                  ? Config.numWithComma(element.rate)
                  : parseFloat(element.rate).toFixed(3)}
              </TableCell>
              <TableCell className={classes.tableRowPad}>
                {/* Valuation */}
                {isView
                  ? Config.numWithComma(element.valuation)
                  : parseFloat(element.valuation).toFixed(3)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow style={{backgroundColor:"#D1D8F5"}} >
            <TableCell className={classes.tableRowPad} style={{fontWeight:"700"}}>
              {/* Category */}
            </TableCell>
            <TableCell className={classes.tableRowPad} style={{fontWeight:"700"}}>
              {/* Billing Category */}
            </TableCell>
            <TableCell className={classes.tableRowPad} style={{fontWeight:"700"}}>{/* HSN */}</TableCell>

            <TableCell className={classes.tableRowPad} style={{fontWeight:"700"}}>
            {HelperFunc.getTotalOfFieldNoDecimal(productData, "pcs")}
            </TableCell>
            <TableCell className={classes.tableRowPad} style={{fontWeight:"700"}}>
              {/* Gross Weight */}
              {/* {totalGrossWeight} */}
              {HelperFunc.getTotalOfField(productData, "gross_weight")}
            </TableCell>
            <TableCell className={classes.tableRowPad} style={{fontWeight:"700"}}>
              {/* Net Weight */}
              {/* {totalNetWeight} */}
              {HelperFunc.getTotalOfField(productData, "net_weight")}
            </TableCell>
            <TableCell className={classes.tableRowPad} style={{fontWeight:"700"}}>
              {/* Purity */}
            </TableCell>
            <TableCell className={classes.tableRowPad} style={{fontWeight:"700"}}>
              {/* Job work Fine in Pure */}
              {/* {totalJobWorkFine} */}
              {HelperFunc.getTotalOfField(productData, "jobWorkFineinPure")}
            </TableCell>
            <TableCell className={classes.tableRowPad} style={{fontWeight:"700"}}>{/* Rate */}</TableCell>
            <TableCell className={classes.tableRowPad} style={{fontWeight:"700"}}>
              {/* Valuation */}
              {/* {valuationTotal} */}
              {isView
                ? Config.numWithComma(
                    HelperFunc.getTotalOfField(productData, "valuation")
                  )
                : HelperFunc.getTotalOfField(productData, "valuation")}
            </TableCell>
          </TableRow>
        </TableBody>
      </MaUTable>
    </Paper>
  );
};

export default CategoryWiseList;
