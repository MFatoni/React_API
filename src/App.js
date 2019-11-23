import React, {Component} from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataApi: []
    };
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleRemove(e) {
    console.log(e.target.value);
    fetch(`http://localhost:3004/posts/${e.target.value}`, {
      method: "DELETE"
    }).then(res => this.reloadData());
  }

  reloadData() {
    axios.get("http://localhost:3004/posts").then(res => {
      this.setState({
        dataApi: res.data
      });
    });
  }
  componentDidMount() {
    // fetch("https://jsonplaceholder.typicode.com/posts")
    //   .then(response => response.json())
    //   .then(json => {
    //     this.setState({dataApi: json});
    //   });
    this.reloadData();
  }
  render() {
    return (
      <div>
        <p>Hello Api</p>
        {this.state.dataApi.map((data, index) => {
          return (
            <div key={index}>
              <p>{data.title}</p>
              <button value={data.id} onClick={this.handleRemove}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
