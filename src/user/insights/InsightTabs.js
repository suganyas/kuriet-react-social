import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from "@material-ui/core/AppBar";
import './Insights.css';
import InsightsImages from "./InsightsImages";
import InsightsStory from "./InsightsStory";
import InsightAccounts from "./InsightAccounts";

export default function InsightTabs(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        console.log(newValue);
        setValue(newValue);
    };

    return (
        <AppBar position="relative" color="default" className="app-style">
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="disabled tabs example"
                >
                    <Tab label="Account Insights" />
                    <Tab label="Post Insights"/>
                    <Tab label="Story Insights" />
                </Tabs>
            <br/>
            {value == 0 && (
                <InsightAccounts {...props}/>
            )}
            {value == 1 && (
                <InsightsImages {...props}/>
            )}
            {value == 2 && (
                <InsightsStory {...props}/>
            )}
        </AppBar>
    );
}