import React from 'react'
import ReactDOM  from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/store';
import App from './container/App';

const AppRoot = () => (
        <Provider store={store}>
            <App/>
        </Provider>
    )

let id =  document.getElementById('root');

ReactDOM.render(<AppRoot />, id)