import React, { Component } from "react";
import { connect } from "react-redux";

class UserHeader extends Component {
    render() {
        const { user } = this.props;
        
        if (!user) {
            return null;
        }

        return(
            <div className="header">
                {user.name}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // the following logic is extracted from "UserHeader" component
    // we can also pass second arguments to the "mapStateToProps" which refers to "props" of component we pass in connect
    // we pass "UserHeader" in "connect" function so we can access props by "ownProps" argument
    return { user: state.users.find((user) => user.id === ownProps.userId )}
}

export default connect(mapStateToProps)(UserHeader);