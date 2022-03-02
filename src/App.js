import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

// Pages
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

// Components
import Header from "./components/header/header.component.jsx";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    // subscribe to authenticated user
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = createUserProfileDocument(userAuth);

        // When something in the db has changed this is a listener that fires after its changes has been made
        (await userRef).onSnapshot((snapShot) => {
          if (snapShot) {
            // set state of current user
            this.setState({
              currentUser: {
                id: snapShot.id,
                ...snapShot.data(),
              },
            });
          } else {
            // Set to null
            this.setState({ currentUser: userAuth });
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
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/shop" element={<ShopPage />}></Route>
          <Route path="/signin" element={<SignInAndSignUpPage />}></Route>
        </Routes>
      </div>
    );
  }
}

export default App;
