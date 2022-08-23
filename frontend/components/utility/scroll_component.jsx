import React, { Component } from "react";

class ScrollComponent extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      loading: false,
      firstMsg: 0,
      prevY: 0
    };
  }

  getMessages(firstMsg) {
    if(this.props.type === "Channel")
    {
        this.setState({ loading: true });

        const formData = new FormData();
       
        formData.append("id", this.props.convo.id);
        formData.append("msgStart", firstMsg);
        $.ajax({
            url: `/api/channels/${this.props.id}/display30`,
            method: "GET",
            data: formData,
            contentType: false,
            processData: false
          }
        ).then(res => {
            if(this.state.messages.length >= 90)
            {
                this.setState({ messages: [...this.state.messages.slice(30), ...res.data] });
            }
            else
            {
                this.setState({ messages: [...this.state.messages, ...res.data] });
            }
            this.setState({ loading: false });
          });
    }
  }

  render() {
    return (
      <div className="container">
        <ul id="server-msg-list">
            {this.props.msgList}
        </ul>
      </div>
    );
  }
}

export default ScrollComponent;