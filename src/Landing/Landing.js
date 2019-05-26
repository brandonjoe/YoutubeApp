import React, { Component } from 'react';
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
      updateVideoValue(evt) { //checks to make sure that the user inputs 17 digits
        this.setState({
          videoValue: evt.target.value
        });
        console.log(this.state.videoValue)
      }
      updateCommentValue(evt) { //checks to make sure that the user inputs 17 digits
        this.setState({
          commentValue: evt.target.value
        });
        console.log(this.state.commentValue)
      }
    render() {
        return (
            
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
              <button className={classes.button}>
                Search games above 
              </button>
              </Link>
            </div>
        );
    }
}

export default Landing;