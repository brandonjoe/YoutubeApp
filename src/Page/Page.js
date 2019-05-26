import React, { Component } from 'react';
import Results from "../Results/Results";
import classes from "./Page.module.css";
import { Link } from "react-router-dom";
class Page extends Component {
    render() {
        let pathArray = this.props.location.pathname.split("/");
        console.log(pathArray[1])
        return (
            <div className={classes.main}>
                <Results videoID={pathArray[1]} search={pathArray[2]}/> 
            </div>
        );
    }
}

export default Page;