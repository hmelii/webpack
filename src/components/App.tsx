import  {useState} from 'react'
import classes from './App.module.scss'
import {Link, Outlet} from "react-router-dom";
import {About} from "@/pages/About";
import avatarPng from '@/assets/avatar.png'
import avatarJpg from '@/assets/avatar.jpg'
import Calendar from '@/assets/calendar.svg'
import calendar from '@/assets/calendar.svg?url'
import Image from '@/assets/app-image.svg'

const App = () => {
    const [count, setCount] = useState<number>(0)
    const increment = () => {
        setCount(prev => prev + 1)
    }

   /* if (__PLATFORM__=== 'desktop') {
        return <div>IS desktop</div>
    }

    if (__PLATFORM__=== 'mobile') {
        return <div>IS mobile</div>
    }*/

    return (
        <>
            <h1>PLATFORM= {__PLATFORM__}</h1>
            <Link to={'/'}>Back</Link><br /><br />
            <Link to={'/about'}>About</Link><br /><br />
            <Link to={'/shop'}>Shop</Link><br /><br />
            <div>Hello world {count}</div>
            <div>
                <button className={classes.button} onClick={increment}><span>Increment</span></button>
            </div>
            <div><img width={100} src={avatarPng} alt="" /></div>
            <div><img width={100} src={avatarJpg} alt="" /></div>
            <div><Calendar  className={classes.red} width={50} height={50} /></div>
            <div><Image className={classes.red} width={50} height={50} /></div>
            <div><img src={calendar} alt={''} /></div>
            <About />

            <Outlet />
        </>
    )
}

export default App