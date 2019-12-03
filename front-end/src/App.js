import React, { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import Footer from './components/FooterComponent';

const store = ConfigureStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Main />
        </div>
        <Footer />
      </Provider>
    );
  }
}

export default App;
