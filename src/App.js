import React, { Component } from 'react';
import Messages from "./components/Messages";
import Input from "./components/Input";
import "./App.css";

function randomName() {
const adjectives = [
"charming", "fantastic", "sharp", "blue", "purple", "magic", "gentle", "brave"
];
const nouns = [
"star", "flower", "mouse", "book", "map", "spring", "summer", "land", "artist"
];
const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
const noun = nouns[Math.floor(Math.random() * nouns.length)];
return adjective + noun;
}

function randomColor() {
return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class App extends Component {
state = {
messages: [],
member: {
username: randomName(),
color: randomColor(),
}
}

constructor() {
super();
this.drone = new window.Scaledrone("KpC1TNn53biDvNY8", {
data: this.state.member
});
this.drone.on('open', error => {
if (error) {
return console.error(error);
}
const member = {...this.state.member};
member.id = this.drone.clientId;
this.setState({member});
});
const room = this.drone.subscribe("observable-room");
room.on('data', (data, member) => {
const messages = this.state.messages;
messages.push({member, text: data});
this.setState({messages});
});
}

render() {
return (
<div className="App">
<div className="App-header">
<h1>Chat App</h1>
</div>
<Messages
messages={this.state.messages}
currentMember={this.state.member}
/>
<Input
onSendMessage={this.onSendMessage}
/>
</div>
);
}

onSendMessage = (message) => {
this.drone.publish({
room: "observable-room",
message
});
}

}

export default App;
