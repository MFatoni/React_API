import React, {Component} from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataApi: [],
      edit: false,
      dataPost: {
        id: 0,
        title: "",
        body: ""
      }
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.inputChange = this.inputChange.bind(this);
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
        dataApi: res.data,
        edit: false
      });
    });
  }

  inputChange(e) {
    let newdataPost = {...this.state.dataPost};
    if (this.state.edit === false) {
      newdataPost["id"] = new Date().getTime();
    }
    newdataPost[e.target.name] = e.target.value;
    this.setState(
      {
        dataPost: newdataPost
      },
      () => console.log(this.state.dataPost)
    );
  }
  onSubmitForm = () => {
    if (this.state.edit === false) {
      axios
        .post(`http://localhost:3004/posts`, this.state.dataPost)
        .then(() => {
          this.reloadData();
          this.clearData();
        });
    } else {
      axios
        .put(
          `http://localhost:3004/posts/${this.state.dataPost.id}`,
          this.state.dataPost
        )
        .then(() => {
          this.reloadData();
          this.clearData();
        });
    }
  };
  clearData = () => {
    let newdataPost = {...this.state.dataPost};
    newdataPost["id"] = "";
    newdataPost["body"] = "";
    newdataPost["title"] = "";
    this.setState({
      dataPost: newdataPost
    });
  };
  getDataId = e => {
    axios.get(`http://localhost:3004/posts/${e.target.value}`).then(res => {
      this.setState({
        dataPost: res.data,
        edit: true
      });
    });
  };
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
        <input
          type="text"
          name="body"
          value={this.state.dataPost.body || ""}
          placeholder="Masukkan Body"
          onChange={this.inputChange}
        />
        <input
          type="text"
          name="title"
          value={this.state.dataPost.title || ""}
          placeholder="Masukkan Title"
          onChange={this.inputChange}
        />
        <button type="submit" onClick={this.onSubmitForm}>
          {" "}
          Add Data{" "}
        </button>
        {this.state.dataApi.map((data, index) => {
          return (
            <div key={index}>
              <p>{data.title}</p>
              <button value={data.id} onClick={this.handleRemove}>
                Delete
              </button>
              <button value={data.id} onClick={this.getDataId}>
                Edit Data
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
