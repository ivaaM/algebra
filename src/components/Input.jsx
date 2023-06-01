import {Component} from "react";
import React from "react";

class Input extends Component {
  state = {
    text: ""
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({text: ""});

    if(this.state.text !== "") {
    this.props.onSendMessage(this.state.text); 
    } else {
      alert('Molimo upišite poruku!');
    }
  }

onChange(e) {
    this.setState({text: e.target.value});
  }

  render() {
    return (
      <div className="Input">
        <form onSubmit={e => this.onSubmit(e)}>
          <input
            onChange={e => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Upiši poruku..."
            autoFocus={true}
          />
          <button>Pošalji</button>
        </form>
      </div>
    );
  }

}

export default Input;