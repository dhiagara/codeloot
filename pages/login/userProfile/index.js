import React from "react";
import { Layout } from "../../../shared/components";
import Upload from "./upload";
import Fetchfiles from "./fetchhFiles";
import { store } from "../../../shared/store";
import withRematch from "../../../shared/utils/withRematch";
import Router from "next/router";
class Profile extends React.Component {
  componentDidMount() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      Router.push("/login");
    }
  }

  render() {
    const { logedUser } = this.props;
    const gender = logedUser.gender;
    const teacher = (
      <Layout>
        <Upload />
        <Fetchfiles />
      </Layout>
    );
    const admin = <Layout />;
    const etudiant = <Layout />;

    return (
      <div>
        {gender === "professor"
          ? teacher
          : gender === "admin"
          ? admin
          : etudiant}
      </div>
    );
  }
}

const mapState = state => ({
  logedUser: state.login.logedUser,
  isAuthenticated: state.login.isAuthenticated
});

export default withRematch(store, mapState)(Profile);
