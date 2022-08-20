import React, {useState} from 'react'
import Home from '../Static/home.svg'
import Dashboard from '../Static/dashboard.svg'
import Billing from '../Static/billing.svg'
import Proxies from '../Static/proxies.svg'
import Settings from '../Static/settings.svg'
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';


export default function Sidebar() {
    const [dashboard, setDashboard] = useState(true)
    const [tasks, setTasks] = useState(false)
    const [billing, setBilling] = useState(false)
    const [proxies, setProxies] = useState(false)
    const [settings, setSettings] = useState(false)

    const toggleModal = () => {
        setSettings(!settings)
      }  

        function getOne(){
                setDashboard(true)
                setTasks(false)
                setBilling(false)
                setProxies(false)
        }
        function getTwo(){
            setDashboard(false)
            setTasks(true)
            setBilling(false)
            setProxies(false)
    }
    function getThree(){
        setDashboard(false)
        setTasks(false)
        setBilling(true)
        setProxies(false)
}
function getFour(){
    setDashboard(false)
    setTasks(false)
    setBilling(false)
    setProxies(true)
}


  return (
    <div className='w-20 h-[100vh] bg-[#0a0e13] absolute'>
        <div className='pt-1 ml-[17px] flex'>
        </div>
        <div className='flex justify-center h-5/6'>
            <div className='mt-4'>
            <Tooltip title="Dashboard"  componentsProps={{
          tooltip: {
            sx: {
              bgcolor: '#181E25',
              '& .MuiTooltip-arrow': {
                color: 'common.black',
              },
            },
          },
        }} TransitionComponent={Zoom} placement="right">
                <Link to={"/dashboard"}><button onClick={getOne} className={
                    !dashboard
                    ? 'mt-5 flex center text-lg tracking-wide font-medium cursor-pointer mt-1 p-[8px] bg-[#13181E] rounded-md border border-[#1B1F25] opacity-40'
                    : 'mt-5 flex center text-lg tracking-wide font-medium cursor-pointer mt-1 p-[8px] bg-[#13181E] rounded-md border border-[#1B1F25]'
                }
                    ><span><img className='w-6' src = {Dashboard}></img></span></button></Link>
                    </Tooltip>
                    <Tooltip title="Tasks" componentsProps={{
          tooltip: {
            sx: {
              bgcolor: '#181E25',
              '& .MuiTooltip-arrow': {
                color: 'common.black',
              },
            },
          },
        }} TransitionComponent={Zoom} placement="right">
                <Link to={"/tasks"}><button onClick={getTwo} className={
                    !tasks
                    ? 'mt-5 flex center text-lg tracking-wide font-medium cursor-pointer mt-1 p-[8px] bg-[#13181E] rounded-md border border-[#1B1F25] opacity-40'
                    : 'mt-5 flex center text-lg tracking-wide font-medium cursor-pointer mt-1 p-[8px] bg-[#13181E] rounded-md border border-[#1B1F25]'
                }
                    ><span><img className='w-6' src = {Home}></img></span></button></Link>
                    </Tooltip>
                    <Tooltip title="Billing" componentsProps={{
          tooltip: {
            sx: {
              bgcolor: '#181E25',
              '& .MuiTooltip-arrow': {
                color: 'common.black',
              },
            },
          },
        }} TransitionComponent={Zoom} placement="right">
            <Link to={"/billing"}><button onClick={getThree} className={
                    !billing
                    ? 'mt-5 flex center text-lg tracking-wide font-medium cursor-pointer mt-1 p-[8px] bg-[#13181E] rounded-md border border-[#1B1F25] opacity-40'
                    : 'mt-5 flex center text-lg tracking-wide font-medium cursor-pointer mt-1 p-[8px] bg-[#13181E] rounded-md border border-[#1B1F25]'
                }
                    ><span><img className='w-6' src = {Billing}></img></span></button></Link> 
                    </Tooltip>
                    <Tooltip title="Proxies" componentsProps={{
          tooltip: {
            sx: {
              bgcolor: '#181E25',
              '& .MuiTooltip-arrow': {
                color: 'common.black',
              },
            },
          },
        }}  TransitionComponent={Zoom} placement="right">
                         <Link to={"/proxies"}><button onClick={getFour} className={
                    !proxies
                    ? 'mt-5 flex center text-lg tracking-wide font-medium cursor-pointer mt-1 p-[8px] bg-[#13181E] rounded-md border border-[#1B1F25] opacity-40'
                    : 'mt-5 flex center text-lg tracking-wide font-medium cursor-pointer mt-1 p-[8px] bg-[#13181E] rounded-md border border-[#1B1F25]'
                }
                    ><span><img className='w-6' src = {Proxies}></img></span></button></Link>  
                    </Tooltip>                
            </div>
        </div>
          <div className='flex justify-center'>
              <div className='bottom-6 absolute'>
              <Tooltip title="Settings" componentsProps={{
          tooltip: {
            sx: {
              bgcolor: '#181E25',
              '& .MuiTooltip-arrow': {
                color: 'common.black',
              },
            },
          },
        }} TransitionComponent={Zoom} placement="right">
                  <button onClick={toggleModal} className='flex center text-lg tracking-wide font-medium cursor-pointer p-[8px] bg-[#13181E] rounded-md border border-[#1B1F25]'><span><img className='w-6' src = {Settings}></img></span></button>
                  </Tooltip>
              </div>
          </div>

        {settings && (
        <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0">
          <div className="bg-[#00000070] w-full h-full fixed top-0 left-0 right-0 bottom-0 z-10 "></div>
          <div className='w-[100vw]'>
          <div className="flex justify-center" id="modal">
            <div className='w-[40vw] bg-[#13181E] border border-[#1B1F25] z-30 rounded-lg mt-48' id="fade">
              <div className='flex'>
                <div className='w-full'>
                  <p className='text-xl font-semibold ml-4 mt-3'>Settings</p>
                  </div>
                </div>
                <div className='ml-4 mr-4'>
                    <label className='relative top-1 text-sm text-[#525861]'>Discord webhook</label>
                  <input className='w-full mt-2  rounded-lg h-10 pl-3 bg-[#1B2127] border border-[#282F37]' placeholder='https://discord.gg'></input>
                  <div className='flex mt-3'>
                    <div className='w-1/2'>
                    <label className='relative text-sm text-[#525861]'>Retry delay</label>
                  <input className='w-full mt-1  rounded-lg h-10 pl-3 bg-[#1B2127] border border-[#282F37]' placeholder='1000'></input>
                        </div>
                        <div className='w-1/2 ml-4'> 
                        <label className='relative text-sm text-[#525861]'>Monitor delay</label>
                  <input className='w-full mt-1  rounded-lg h-10 pl-3 bg-[#1B2127] border border-[#282F37]' placeholder='1000'></input>
                            </div>
                    </div>
                    <div className='flex'>
        <div className='w-1/2'>
        <button className='w-24 h-9 rounded-lg bg-[#0E61FF] font-semibold mb-4 mt-6'>Save</button>
          </div>
      <div className='w-1/2 flex justify-end'>
        <button className='w-20 h-9 rounded-lg font-semibold mb-4 mt-6' onClick={toggleModal}>Cancel</button>
        </div>

        </div>
                  <div className='flex mb-4'>
                    <div className='w-2/3 flex'>
                    <p className='text-[#525861]'>Exp: never</p>
                    <p className='text-[#525861] ml-5'>v0.0.0</p>
                        </div>
                    <div className='w-1/3 flex justify-end mr-[10px]'>
                        <button className='text-[#0E61FF] font-semibold'>Log out</button>
                        </div>
                    </div>
                  </div>
            </div>
          </div>
            </div>
          
        </div>
      )}

    </div>
  )
}
