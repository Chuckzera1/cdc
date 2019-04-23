import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorBox from './components/AuthorRefact';
import App from './App';
import Home from './Home'
import BookRefact from './components/BookRefact'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    (<Router>  
        <App>
            <Route exact path="/" component={Home}/>
            <Route path="/autor" component={AuthorBox}/>
            <Route path="/book" component={BookRefact}/>
        </App>
    </Router>),
    document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
