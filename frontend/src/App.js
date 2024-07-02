/******************************** IMPORTS ********************************/
// libraries
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import * as sessionActions from "./store/sessionReducer";
import Navigation from "./features/Navigation";
import Landing from "./features/Landing";
import AllVideos from "./features/Videos/AllVideos";
import VideoPage from "./features/Videos/VideoPage";
import SubjectPage from "./features/Subjects/SubjectPage";
import AccountPage from "./features/Account/AccountPage";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Footer from "./features/Footer";

/******************************* COMPONENT *******************************/
function App() {

  /****************** access store *******************/
  const userState = useSelector(state => state.session.user);

  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  /****************** manage state *******************/
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  /**************** render component *****************/
  return (
    <>
    <Navigation isLoaded={isLoaded} exact path="/"/>

      {isLoaded && (
        <Switch>
          <Route exact path={'/'}>
            <Landing userState={userState}/>
          </Route>

          <Route exact path={'/videos'}>
            <AllVideos userState={userState} />
          </Route>

          <Route exact path={'/videos/:videoId'}>
            <VideoPage userState={userState}/>
          </Route>

          <Route exact path={`/subjects/:subjectId`}>
            <SubjectPage userState={userState}/>
          </Route>

          <Route exact path={'/account' }>
            <AccountPage userState={userState}/>
          </Route>

          <Redirect to='/'></Redirect>

        </Switch>
      )}

      <Footer />
    </>
  );
}


/******************************** EXPORTS ********************************/
export default App;
