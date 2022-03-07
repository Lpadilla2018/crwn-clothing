import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/reducers/user/user.action";

// Pages
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

// Components
import Header from "./components/header/header.component.jsx";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    // subscribe to authenticated user
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = createUserProfileDocument(userAuth);

        // When something in the db has changed this is a listener that fires after its changes has been made
        (await userRef).onSnapshot((snapShot) => {
          if (snapShot) {
            // set state of current user
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data(),
            });
          } else {
            // Set to null
            setCurrentUser(userAuth);
          }
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route path="/shop" element={<ShopPage />}></Route>
          <Route
            exact
            path="/signin"

            element={
              this.props.currentUser ? (
                <Navigate to="/" replace={true} />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          ></Route>
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)), // pass action with args
});

// Null is passed into connect for 1st arg since we do not need to look into a slice
export default connect(mapStateToProps, mapDispatchToProps)(App);
