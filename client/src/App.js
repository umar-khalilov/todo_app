import { connect } from 'react-redux';
import './App.css';

const App = ({ count, dispatch }) => {
    const increment = () => dispatch({ type: 'INCREMENT' });
    const decrement = () => dispatch({ type: 'DECREMENT' });
    return (
        <div className="App">
            <h1>Current counter value: {count}</h1>
            <button onClick={increment}>Increment</button>
            &nbsp;
            <button onClick={decrement}>Decrement</button>
        </div>
    );
};

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {}

export default connect(mapStateToProps)(App);
