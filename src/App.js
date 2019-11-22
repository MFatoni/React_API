import React, {Component} from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataApi: []
    };
  }
  componentDidMount() {
    // fetch("https://jsonplaceholder.typicode.com/posts")
    //   .then(response => response.json())
    //   .then(json => {
    //     this.setState({dataApi: json});
    //   });

    axios.get("https://jsonplaceholder.typicode.com/posts").then(res => {
      this.setState({
        dataApi: res.data
      });
    });
  }
  render() {
    return (
      <div>
        <p>Hello Api</p>
        {this.state.dataApi.map((data, index) => {
          return (
            <div key={index}>
              <p>{data.title}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
