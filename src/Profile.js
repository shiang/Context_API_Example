import React from "react";
import ProfileDetail from "./ProfileDetail";

export default class Profile extends React.Component {

  render() {
    return (
      <div>
        <h1>This is Profile page</h1>
        <ProfileDetail />
      </div>
    );
  }
}
