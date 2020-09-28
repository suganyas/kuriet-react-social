import React from 'react';
import './Insights.css';
import '../profile/Profile.css';
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { WorldMap } from "react-svg-worldmap"
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import InsightCityMap from "./InsightCityMap";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    gridList: {
        width: 200,
        height: 200,
    },
    gridRoot: {
        display: 'flex',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    table: {
        minWidth: 650,
        maxWidth:650
    },

}));
export default function InsightAccounts(props) {

    var  audienceData=[];
    var audienceAgeData=[];
    var hashtagUsageData=[];
    var hashTagEngagementData=[];

    props.igInsights.igAccountResponse.data.map(function(data, idx) {
        if (data.name == 'audience_country') {
            var countries = data.values[0].value;
            for (var key in countries) {
                audienceData.push(createData(key,countries[key]));
            }
        }
        if(data.name == 'audience_gender_age') {
            var ageData = data.values[0].value;
            for(var ageGender in ageData) {
                var res = ageGender.split(".");
                audienceAgeData.push(createAgeData(res[0],res[1],ageData[ageGender]))
            }
        }

    });

    var hashtagInsight = props.igInsights.igAccountResponse.hashTagInsights;
    for (var key in hashtagInsight) {
        hashTagEngagementData.push(createHashTagData(key,hashtagInsight[key]));
    }

    var hashtagUse = props.igInsights.igAccountResponse.hashTagUsage;
    for (var key in hashtagUse) {
        hashtagUsageData.push(createHashTagData(key,hashtagUse[key]));
    }

    function createData(country,value) {
        return {country,value };
    }

    function createAgeData(age,gender,value) {

        return {age,gender,value };
    }

    function createHashTagData(hashtag,value) {

        return {hashtag,value };
    }
    function compare( a, b ) {
        if ( a.value < b.value ){
            return 1;
        }
        if ( a.value > b.value ){
            return -1;
        }
        return 0;
    }
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
        <div className="profile-container">
            <div className="container">
                <div className="profile-info">
                    <div className="profile-avatar">
                        {
                            props.igInsights.igAccountResponse.profile_picture_url ? (
                                <img src={props.igInsights.igAccountResponse.profile_picture_url} alt={props.igInsights.igAccountResponse.name}/>
                            ) : (
                                <div className="text-avatar">
                                    <span>{props.igInsights.igAccountResponse.name && props.igInsights.igAccountResponse.name[0]}</span>
                                </div>
                            )
                        }
                    </div>
                    <div className="profile-name">
                        <h2>{props.igInsights.igAccountResponse.name}</h2>
                    </div>
                </div>
            </div>
        </div>
                <div className={classes.gridRoot}>
                    <GridList cellHeight={50} className={classes.gridList}>
                        <GridListTile key="follower_count" cols={3}>
                            <GridListTileBar
                                title={"Followers Count: " + props.igInsights.igAccountResponse.followers_count} titlePosition="top"
                            />
                        </GridListTile>
                        <GridListTile key="follows_count" cols={3}>
                            <GridListTileBar
                                title={"Follows Count: "+ props.igInsights.igAccountResponse.follows_count} titlePosition="top"
                            />
                        </GridListTile>
                        <GridListTile key="media_count" cols={3}>
                            <GridListTileBar
                                title={"Media Count: "+ props.igInsights.igAccountResponse.media_count} titlePosition="top"
                            />
                        </GridListTile>
                    </GridList>
                </div>
                <div className="profile-info">
                    <h2>Audience Country Insights</h2>
                    <WorldMap color="red" value-suffix="audience" size="lg" data={audienceData} />
                    <h2>Audience City Insights</h2>
                    <InsightCityMap/>
                    <h2>Audience Age Insights</h2>
                    <TableContainer className="profile-container">
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Age</TableCell>
                                    <TableCell align="center">Gender</TableCell>
                                    <TableCell align="center">Count</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {audienceAgeData.sort(compare).map((row) => (
                                    <TableRow>
                                        <TableCell align="center">{row.gender}</TableCell>
                                        <TableCell align="center">{row.age}</TableCell>
                                        <TableCell align="center">{row.value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <h2>HashTag Usage Insight</h2>
                    <TableContainer className="profile-container">
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">HashTag</TableCell>
                                    <TableCell align="center">Used Times(in posts)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {hashtagUsageData.map((row) => (
                                    <TableRow>
                                        <TableCell align="center">{row.hashtag}</TableCell>
                                        <TableCell align="center">{row.value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <h2>HashTag Engagement Insight</h2>
                    <TableContainer className="profile-container">
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">HashTag</TableCell>
                                    <TableCell align="center">Audience Engagement(Avg)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {hashTagEngagementData.map((row) => (
                                    <TableRow>
                                        <TableCell align="center">{row.hashtag}</TableCell>
                                        <TableCell align="center">{row.value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Paper>
        </div>

    );
}