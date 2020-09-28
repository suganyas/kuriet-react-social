import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import './Insights.css';
import FormGroup from "@material-ui/core/FormGroup";


function createData(name, Image, MediaType, Caption, PostedOn, Likes, Comments, Reach, Impressions, Engagement, Saved, VideoViews, isError, error) {
    return {
        name,
        Image,
        MediaType,
        Caption,
        PostedOn,
        Likes,
        Comments,
        Reach,
        Impressions,
        Engagement,
        Saved,
        VideoViews,
        isError,
        error
    };
}

var rows = [];
var allData = [];

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
    return order === 'desc'
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

const headCells = [
    {id: 'Post', numeric: false, disablePadding: false, label: 'Post'},
    {id: 'MediaType', numeric: false, disablePadding: false, label: 'MediaType'},
    {id: 'Caption', numeric: false, disablePadding: false, label: 'Caption'},
    {id: 'PostedOn', numeric: false, disablePadding: false, label: 'PostedOn'},
    {id: 'Likes', numeric: true, disablePadding: false, label: 'Likes'},
    {id: 'Comments', numeric: true, disablePadding: false, label: 'Comments'},
    {id: 'Reach', numeric: true, disablePadding: false, label: 'Reach'},
    {id: 'Impressions', numeric: true, disablePadding: false, label: 'Impressions'},
    {id: 'Engagement', numeric: true, disablePadding: false, label: 'Engagement'},
    {id: 'Saved', numeric: true, disablePadding: false, label: 'Saved'},
    {id: 'Video Views', numeric: true, disablePadding: false, label: 'Video Views'},

];

function EnhancedTableHead(props) {
    const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{'aria-label': 'select all desserts'}}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const {numSelected} = props;
    const {rowsLength} = props;

    if (rowsLength > 0) {
        return (
            <Toolbar
                className={clsx(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >

                {numSelected > 0 ? (
                    <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
                        Instagram Post Insights
                        <p className="no-insight-info">**Note: Metrics displayed in RED indicate that there is no data
                            for them.Hover over to know the reason</p>
                    </Typography>

                )}

                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon/>
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
        );
    } else {
        return (
            <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
                There are No posts on your Instagram Account for your Selection!
            </Typography>
        );
    }
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {},
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function EnhancedTable(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('none');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [checked, setChecked] = React.useState({
        checkedImage: true,
        checkedCarousel: true,
        checkedVideo: true,
    });

    if (allData.length == 0) {

        props.igInsights.igMediaResponse.data.map(function (data, idx) {
            if (data.mediaInsights.Error) {
                allData.push(createData(data.id, data.media_url, data.media_type, data.caption, data.timestamp, data.like_count, data.comments_count, 0, 0, 0, 0, 0, true, data.mediaInsights.Error));
            } else if (data.media_type == 'IMAGE') {
                allData.push(createData(data.id, data.media_url, data.media_type, data.caption, data.timestamp, data.like_count, data.comments_count, data.mediaInsights.reach.value, data.mediaInsights.impressions.value, data.mediaInsights.engagement.value, data.mediaInsights.saved.value, 0, false, ""));
            } else if (data.media_type == 'CAROUSEL_ALBUM') {
                allData.push(createData(data.id, data.media_url, data.media_type, data.caption, data.timestamp, data.like_count, data.comments_count, data.mediaInsights.carousel_album_reach.value, data.mediaInsights.carousel_album_impressions.value, data.mediaInsights.carousel_album_engagement.value, data.mediaInsights.carousel_album_saved.value, 0, false, ""));
            } else if (data.media_type == 'VIDEO') {
                allData.push(createData(data.id, data.media_url, data.media_type, data.caption, data.timestamp, data.like_count, data.comments_count, data.mediaInsights.reach.value, data.mediaInsights.impressions.value, data.mediaInsights.engagement.value, data.mediaInsights.saved.value, data.mediaInsights.video_views.value, false, ""));
            }
        });
    }

    rows.length=0;
    if(checked.checkedImage) {
        var imageData =  allData.filter(function(element) {
            return element.MediaType == 'IMAGE';
        });
        rows = rows.concat(imageData);
    }
    if(checked.checkedCarousel) {
        var albumData =  allData.filter(function(element) {
            return element.MediaType == 'CAROUSEL_ALBUM';
        });
        rows = rows.concat(albumData);
    }
    if(checked.checkedVideo) {
        var videoData =  allData.filter(function(element) {
            return element.MediaType == 'VIDEO';
        });
        rows = rows.concat(videoData);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };


    const handleChange = (event) => {
        setChecked({...checked, [event.target.name]: event.target.checked});
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} rowsLength={rows.length}/>
                <FormGroup row>
                    <FormControlLabel
                        control={<Checkbox checked={checked.checkedImage} onChange={handleChange} name="checkedImage"/>}
                        label="Image"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={checked.checkedCarousel} onChange={handleChange}
                                           name="checkedCarousel"/>}
                        label="Carousel Album"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={checked.checkedVideo} onChange={handleChange} name="checkedVideo"/>}
                        label="Video"
                    />
                </FormGroup>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
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
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    const noInsightClass = (row.isError == true ? "no-insight" : "");
                                    const noVideoViews = (row.isError == true || row.MediaType == 'IMAGE' || row.MediaType == 'CAROUSEL_ALBUM' ? "no-insight" : "");
                                    //const isVisibleRow = ((row.MediaType == 'IMAGE' && checked.checkedImage) || (row.MediaType == 'VIDEO' && checked.checkedVideo) || (row.MediaType == 'CAROUSEL_ALBUM' && checked.checkedCarousel))?"":"isVisibleRow";
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{'aria-labelledby': labelId}}
                                                />
                                            </TableCell>
                                            <TableCell align="right"><img src={row.Image} width="150"
                                                                          height="150"/></TableCell>
                                            <TableCell align="right">{row.MediaType}</TableCell>
                                            <TableCell align="right">{row.Caption}</TableCell>
                                            <TableCell align="right">{row.PostedOn}</TableCell>
                                            <TableCell align="right">{row.Likes}</TableCell>
                                            <TableCell align="right">{row.Comments}</TableCell>
                                            <TableCell align="right" className={noInsightClass}>{row.Reach} <span
                                                className="tooltiptext">{row.error}</span></TableCell>
                                            <TableCell align="right"
                                                       className={noInsightClass}>{row.Impressions}<span
                                                className="tooltiptext">{row.error}</span></TableCell>
                                            <TableCell align="right"
                                                       className={noInsightClass}>{row.Engagement}<span
                                                className="tooltiptext">{row.error}</span></TableCell>
                                            <TableCell align="right" className={noInsightClass}>{row.Saved}<span
                                                className="tooltiptext">{row.error}</span></TableCell>
                                            <TableCell align="right" className={noVideoViews}>{row.VideoViews}
                                                {row.MediaType == 'IMAGE' || row.MediaType == 'CAROUSEL_ALBUM' ? (
                                                    <span
                                                        className="tooltiptext">No Video Views Insight for media Type {row.MediaType}</span>
                                                ) : (
                                                    <span className="tooltiptext">{row.error}</span>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                                    <TableCell colSpan={6}/>
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
                control={<Switch checked={dense} onChange={handleChangeDense}/>}
                label="Dense padding"
            />
        </div>
    );
}