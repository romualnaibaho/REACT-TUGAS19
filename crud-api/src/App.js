import React, { Component } from "react";

import Header from "./Layout/Header";
import Main from "./Layout/Main";

class App extends Component {

    render(){
        return (
            <div>
              <Header/>

              <Main/>
            </div>
        );
    }
}

export default App;
