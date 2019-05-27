import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./Landing.module.css";
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoValue: "",
      commentValue: ""
    };
  }
  updateVideoValue(evt) {
    //checks to make sure that the user inputs 17 digits
    this.setState({
      videoValue: evt.target.value
    });
    console.log(this.state.videoValue);
  }
  updateCommentValue(evt) {
    //checks to make sure that the user inputs 17 digits
    this.setState({
      commentValue: evt.target.value
    });
    console.log(this.state.commentValue);
  }
  render() {
    return (
      <div className={classes.container}>
        <div className={classes.container2}>
          <div className={classes.header}>
            <div className={classes.title}>Youtube Comment Searcher</div>
            <div className={classes.title2}>
              Want to search through through thousands of comments in a video
              looking for something? Just input the video url and your search
              query, and get the results!
            </div>
          </div>
          <div>
            <input
              className={classes.videoValue}
              type="search"
              value={this.state.videoValue}
              onChange={evt => this.updateVideoValue(evt)}
              placeholder="Enter youtube url"
            />
            <input
              className={classes.commentValue}
              type="search"
              value={this.state.commentValue}
              onChange={evt => this.updateCommentValue(evt)}
              placeholder="Enter Search"
            />
            <Link
              style={{ textDecoration: "none" }}
              className={classes.link}
              to={`/${this.state.videoValue}/${this.state.commentValue}`}
            >
              <button className={classes.button}>Search for comments</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
