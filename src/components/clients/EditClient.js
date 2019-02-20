import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import classnames from "classnames";

class EditClient extends Component {
  constructor(props) {
    super(props);
    // Creat refs
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }
  render() {
    const { client } = this.props;
    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left"> Back To Dashboard</i>
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-header">Edit Client</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-groups">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    minLength="2"
                    required
                    ref={this.firstNameInput}
                    defaultValue={client.firstName}
                  />
                </div>

                <div className="form-groups">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    minLength="2"
                    required
                    ref={this.lastNameInput}
                    defaultValue={client.lastName}
                  />
                </div>

                <div className="form-groups">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    ref={this.emailInput}
                    defaultValue={client.email}
                  />
                </div>

                <div className="form-groups">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="phone"
                    className="form-control"
                    name="phone"
                    minLength="10"
                    required
                    ref={this.phoneInput}
                    defaultValue={client.phone}
                  />
                </div>

                <div className="form-groups">
                  <label htmlFor="balance">Balance</label>
                  <input
                    type="text"
                    className="form-control"
                    name="balance"
                    ref={this.balanceInput}
                    defaultValue={client.balance}
                  />
                </div>

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "clients",
      storeAs: "client",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(EditClient);