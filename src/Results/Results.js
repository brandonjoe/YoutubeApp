import React, { Component } from "react";
import classes from "./Results.module.css";

class Results extends Component {
  constructor(props) {
    super(props);
    const keys = "AIzaSyBsnoc9bzHl8bIsq8x7vm1dD1v9Eepg-TU";
    //AIzaSyBsnoc9bzHl8bIsq8x7vm1dD1v9Eepg-TU
    //AIzaSyBCI-ZqIIw7Kqrbs9KDEJEhjmmiRhthJPE
    this.state = {
      comments: [],
      nextToken: "",
      numResults: "",
      isDone: false
    };
  }

  componentWillMount() {
    function testString(testData, lookup){
      return testData.toLowerCase().indexOf(lookup) === -1;
    }
    const getComments = fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${
        this.props.videoID
      }&order=time&searchTerms=${
        this.props.search
      }&maxResults=100&key=AIzaSyBG1RdP2tA5iSXa378jXuaviVybE9Nl6WU`
    )
      .then(res => res.json())
      .then(val => {
        return val;
      });
    let list = [];
   getComments.then(val => {
     console.log(val)
      val.items.forEach(snippet => {
        console.log(snippet)
        if(snippet.snippet.topLevelComment.snippet.textOriginal.toLowerCase().includes(this.props.search) ){
          list.push(snippet.snippet.topLevelComment.snippet);
        } else {
          if(snippet.replies) {
            snippet.replies.comments.forEach(val => {
              if(val.snippet.textOriginal.toLowerCase().includes(this.props.search)){
                list.push(val.snippet)
              } 
            })
          }
          

        }
        
      });
      if(list.length > 0){
        list.forEach(item=> {
          item.publishedAt = item.publishedAt.substring(0,10)
        })
      }
      
      console.log(list)
      this.setState({
        comments: list,
        numResults: val.pageInfo.totalResults
      });
     
      if (val.nextPageToken !== undefined) {
        this.setState({
          nextToken: val.nextPageToken
        });
      }
      const promise2 = () => {
        if(this.state.numResults === 100){
          let dorequest = () => {
            console.log('aaaa')
            fetch(
              `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${
                this.props.videoID
              }&pageToken=${this.state.nextToken}&order=time&searchTerms=${
                this.props.search
              }&maxResults=100&key=AIzaSyBG1RdP2tA5iSXa378jXuaviVybE9Nl6WU`
            )
              .then(res => res.json())
              .then(data => {
                data.items.forEach(val => {

                  list.push(val.snippet.topLevelComment.snippet); //push each item to our list
                });
                
                console.log(this.state)
                if(data.pageInfo.totalResults === 100){
                  this.setState({
                    numResults: data.pageInfo.totalResults,
                    nextToken: data.nextPageToken //this is used to return a different result each time we go through the loop
                  });
                  dorequest()
                } else{
                  this.state.comments.forEach(item=> {
                  item.publishedAt = item.publishedAt.substring(0,10)
                  console.log(item.publishedAt)
                })
                  this.setState({
                    comments:list,
                    isDone: true
                  })
                  
                }
                
              })
          };
          dorequest()
          Promise.all([dorequest()]).then(
            console.log(this.state)
          )
        }
        return this.state
      }
      promise2()

   
    })
  }
  render() {
    if(this.state.isDone === true){
     
    }
    // let filtercomments = this.state.comments.filter(comments => {
    //   return (
    //     comments.feedname.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
    //     -1
    //   );
    // });
    return (
    <div className={classes.main}>
   {(this.state.comments.map((item, index) => {
      return (
        <div key={index} className={classes.comment}>
           <div className={classes.author}>{item.authorDisplayName}</div>
          <div className={classes.text}>{item.textOriginal}</div>
          <div className={classes.date}>{item.publishedAt}</div>
          
        </div>
      )
    }))}
    </div>
    )
  }
}

export default Results;
