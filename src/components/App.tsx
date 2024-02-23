import  {useState} from 'react'
import classes from './App.module.scss'
import {Link, Outlet} from "react-router-dom";
const App = () => {
    const [count, setCount] = useState<number>(0)
    const increment = () => {
        setCount(prev => prev + 1)
    }
    return (
        <>
            <Link to={'/'}>Back</Link><br /><br />
            <Link to={'/about'}>About</Link><br /><br />
            <Link to={'/shop'}>Shop</Link><br /><br />
            <div>Hello world {count}</div>
            <div>
                <button className={classes.button} onClick={increment}><span>Increment</span></button>
            </div>
            <Outlet />
        </>
    )
}

export default App