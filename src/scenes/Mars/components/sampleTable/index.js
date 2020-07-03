import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import PublishIcon from "@material-ui/icons/Publish";
import FilterListIcon from "@material-ui/icons/FilterList";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import { CsvBuilder } from "filefy";
import GetAppIcon from "@material-ui/icons/GetApp";

import _ from "lodash";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    originalKeys,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all samples" }}
          />
        </TableCell>
        {originalKeys.map((headCell) => (
          <TableCell
            key={headCell}
            padding={"default"}
            align={"right"}
            sortDirection={orderBy === headCell ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell}
              direction={orderBy === headCell ? order : "asc"}
              onClick={createSortHandler(headCell)}
            >
              {headCell}
              {orderBy === headCell ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    samples,
    sampleIndicies,
    user,
    mapFile,
    onUpload,
    originalValues,
    originalKeys,
  } = props;

  var values = [];
  for (let i = 0; i < originalValues.length; i++) {
    values[i] = Object.values(originalValues[i]);
  }
  const handleClick = (props) => (event) => {
    onUpload(mapFile, samples, user, sampleIndicies);
  };

  function handleExport(values) {
    var csvBuilder = new CsvBuilder("samples.csv")
      .setDelimeter(",")
      .setColumns(originalKeys)
      .addRows(values)
      .exportFile();
  }
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Upload to SESAR
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Upload">
          <IconButton aria-label="upload" onClick={handleClick(props)}>
            <PublishIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Download CSV">
          <IconButton
            aria-label="filter list"
            onClick={() => handleExport(values)}
          >
            <GetAppIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  container: {
    maxHeight: 700,
  },
}));

function CreateRows(props) {
  const {
    row,
    isItemSelected,
    labelId,
    originalValues,
    handleClick,
    sampleIndicies,
    samples,
  } = props;
  const [open, setOpen] = React.useState(false);

  let index = 0;
  for (let i = 0; i < originalValues.length; i++) {
    if (_.isEqual(row, originalValues[i]) === true) {
      index = i;
    }
  }

  let sampleRow = samples[index];
  return (
    <React.Fragment>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.SAMPLE}
        selected={isItemSelected}
      >
        <TableCell padding="checkbox">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell padding="checkbox">
          <Checkbox
            checked={isItemSelected}
            inputProps={{ "aria-labelledby": labelId }}
            onClick={(event) => handleClick(event, row, originalValues)}
          />
        </TableCell>
        {Object.entries(row).map(([key, value]) => (
          <TableCell
            component="th"
            id={labelId}
            scope="row"
            style={{ paddingBottom: 0, paddingTop: 0 }}
            key={key}
            align={"right"}
          >
            {value}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Mapping
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Original Field</TableCell>
                    <TableCell>Original Value</TableCell>
                    <TableCell>SESAR Field</TableCell>
                    <TableCell>SESAR Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sampleRow.map((sample) => (
                    <TableRow>
                      <TableCell>{sample.originalKey}</TableCell>
                      <TableCell>{sample.originalValue}</TableCell>
                      <TableCell>{sample.key}</TableCell>
                      <TableCell>{sample.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function SampleTable(props) {
  console.log(props);
  const classes = useStyles();
  const rows = props.originalValues;
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("igsn");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sampleIndicies, setSampleIndicies] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n);
      setSelected(newSelecteds);
      let indicies = [];
      for (var i = 0; i < rows.length; i++) {
        indicies = indicies.concat(sampleIndicies, i);
      }
      setSampleIndicies(indicies);
      return;
    }
    setSelected([]);
    setSampleIndicies([]);
  };

  const handleClick = (event, name, originalValues) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    let indicies = [];

    let index = 0;
    for (let i = 0; i < originalValues.length; i++) {
      if (_.isEqual(name, originalValues[i]) === true) {
        index = i;
      }
    }
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      indicies = indicies.concat(sampleIndicies, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      indicies = indicies.concat(sampleIndicies.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      indicies = indicies.concat(sampleIndicies.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      indicies = indicies.concat(
        sampleIndicies.slice(0, selectedIndex),
        sampleIndicies.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    setSampleIndicies(indicies);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          samples={props.samples}
          sampleIndicies={sampleIndicies}
          user={props.user}
          mapFile={props.mapFile}
          onUpload={props.onUpload}
          originalValues={props.originalValues}
          originalKeys={props.originalKeys}
        />
        <TableContainer className={classes.container}>
          <Table
            stickyHeader
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              originalKeys={props.originalKeys}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <CreateRows
                      row={row}
                      isItemSelected={isItemSelected}
                      labelId={labelId}
                      originalValues={props.originalValues}
                      handleClick={handleClick}
                      sampleIndicies={sampleIndicies}
                      samples={props.samples}
                    />
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
