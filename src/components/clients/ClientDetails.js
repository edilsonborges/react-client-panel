import React, { Component } from "react";

class ClientDetails extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <div>
        <h1>Testing</h1>
      </div>
    );
  }
}

export default ClientDetails;
