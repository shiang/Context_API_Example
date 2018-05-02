import React from "react";
import { TokenContext } from "./Auth";
import jwtDecoder from "jwt-decode";
import moment from "moment";

export default class ProfileDetail extends React.Component {
  render() {
    return (
      <TokenContext.Consumer>
        {({ token, signOut }) => {
          const userInfo = jwtDecoder(token);

          return (
            <div>
              <h1>This is another protected page</h1>
              <h4>email is {userInfo.email}</h4>
              <h4>User ID is {userInfo.sub}</h4>
              <h4>My token expires on {moment(userInfo.exp).format()}</h4>
              <button onClick={signOut}>Sign out</button>
            </div>
          );
        }}
      </TokenContext.Consumer>
    );
  }
}
