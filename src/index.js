import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Mobile} from "./Mobile";
import {Tablet} from "./Tablet";
import {
    BrowserView,
    MobileOnlyView,
    TabletView
} from "react-device-detect";
import {Cursor} from "./Components/Cursor";
import {completeText} from "./Components/TextFile";

const cursorRef = React.createRef()

ReactDOM.render(
  <React.StrictMode>
      <BrowserView>
          <Cursor cursorRef={cursorRef}/>
          <App cursorRef={cursorRef} completeText={completeText} />
      </BrowserView>
      <TabletView>
          <Tablet completeText={completeText} />
      </TabletView>
      <MobileOnlyView>
          <Mobile completeText={completeText} />
      </MobileOnlyView>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
