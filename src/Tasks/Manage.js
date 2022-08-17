import React, {useState, useEffect} from 'react'
import { Link, useLocation } from "react-router-dom";
import { FiChevronLeft, FiMoreVertical, FiX } from "react-icons/fi";
import { FaPlay, FaStop } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";
import { MdViewStream } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { useSpring, animated } from "react-spring";
import Plus from '../Static/plus.svg'
import Close from '../Static/close.svg'
import Item from '../Static/item.svg'
import toast, { Toaster } from 'react-hot-toast';


export default function Manage() {
  let location = useLocation()
  let groupName = location.state.groupName
  const [showMore, setShowMore] = useState(false)
  const [showMssg, setShowMssg] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [tasks, setTasks] = useState(() => {
    const savedtasks = localStorage.getItem(groupName);
    if (savedtasks) {
      return JSON.parse(savedtasks);
    } else {
      return [];
    }
  });
  const [inputValue, setInputValue] = useState("");


  const [open, setOpen] = useState(true);
  const [icon, setIcon] = useState(Close);
  const [open2, setOpen2] = useState(false);
  const [icon2, setIcon2] = useState(Plus);

  const toggleHandler = (yur) => {
    setOpen(!open);
    if(icon == Plus){
        setIcon(Close)
    }
    else if(icon == Close){
        setIcon(Plus)
    }
  };

  const openAnimation = useSpring({
    from: { maxHeight: "50px" },
    to: { maxHeight: open ? "400px" : "50px" },
    config: { duration: "200" }
  });



  const toggleHandler2 = (yur) => {
    setOpen2(!open2);
    if(icon2 == Plus){
      setIcon2(Close)
    }
    else if(icon2 == Close){
      setIcon2(Plus)
    }
  };

  const openAnimation2 = useSpring({
    from: { maxHeight: "50px" },
    to: { maxHeight: open2 ? "400px" : "50px" },
    config: { duration: "200" }
  });


  useEffect(() => {
    localStorage.setItem(groupName, JSON.stringify(tasks));
  }, [tasks]);

  function handleIInputChange(e) {
    setInputValue(e.target.value);
  }

  function handleAddTask() {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          site: "Target",
          input: inputValue,
          size: "R",
          profile: "null",
          proxy: "local",
          status: "Created"
        }
      ]);
      setShowMssg(false)
  }

  const showMoreFunc = () => {
      setShowMore(!showMore)
    }

    const checkTasks = () => {
      if(tasks.length == 0){
        setShowMssg(true)
      }
    }
    useEffect(() => {
      checkTasks();
  }, []);


  const toggleModal = () => {
    setCreateModal(!createModal)
    checkTasks()
  }

  const clearAll = () => {
    setTasks([])
      setShowMssg(true)
  } 

  return (
    <div className='ml-20'>
      <Toaster gutter={24} />
      <div className='flex'>
          <div className='w-1/4 flex'>
            <div>
              <Link to={'/tasks'}><button className='ml-6 flex font-medium pt-6 cursor-pointer'><span className='text-2xl text-[#068C54]'><FiChevronLeft/></span>Groups</button></Link>
               <img className='w-[60%] ml-8 mt-3 opacity-50' src = {Item}></img>
            </div>
    <div>
                  <p className='text-[27px] font-semibold pt-5 ml-2 mt-[40px]' id="title">{groupName}</p>
                  <p className='text-[#525861] ml-2 mt-1.5 text-sm'>{tasks.length} total tasks</p>
    </div>
     
          </div>
          <div className='w-1/4 flex justify-end mr-8 mt-14'>
            <div>
              <p className='ml-2 text-sm text-[#525861]'>Views</p>
            <div className='flex'>
            <Tooltip title="Classic" componentsProps={{
          tooltip: {
            sx: {
              bgcolor: '#181E25',
              '& .MuiTooltip-arrow': {
                color: 'common.black',
              },
            },
          },
        }}  TransitionComponent={Zoom} placement="top">        
              <div>
              <button className="text-[#fff] bg-[#181E25]  font-medium rounded-lg px-2.5 py-[9px] text-center inline-flex items-center m-2 mr-4">
              <span className='text-xl'><MdViewStream/></span>
              </button>
              </div>
              </Tooltip>
              <div className='w-[1px] mt-[11px] h-8 bg-[#282F36]'>
              </div>
              <Tooltip title="Grid" componentsProps={{
          tooltip: {
            sx: {
              bgcolor: '#181E25',
              '& .MuiTooltip-arrow': {
                color: 'common.black',
              },
            },
          },
        }}  TransitionComponent={Zoom} placement="top">        
              <div>
                
              <button className="text-[#fff] bg-[#181E25]  font-medium rounded-lg px-2.5 py-[9px] text-center inline-flex items-center m-2 ml-4 mr-2">
              <span className='text-xl'><HiViewGrid/></span>
              </button>
              </div>
              </Tooltip>
           
      </div>
            </div>


          </div>
        
          <div className='w-2/4 flex justify-end mr-8 mt-14'>
            <div>
              <p className='ml-2 text-sm text-[#525861]'>Actions</p>
            <div className='flex'>
              <div>
              <button className="text-[#000] bg-gray-100  font-medium rounded-lg px-5 py-[7px] text-center inline-flex items-center m-2 mr-0" onClick={toggleModal}>
              Create Tasks
              </button>
              </div>
              <div>
              <button className="text-[#000] bg-gray-100  font-medium rounded-lg px-5 py-[7px] text-center inline-flex items-center m-2 mr-0">
              Start All
              </button>
              </div>
              <div>
              <button className="text-[#000] bg-gray-100  font-medium rounded-lg  px-5 py-[7px] text-center inline-flex items-center m-2">
              Stop All
              </button>
              <button className="text-[#000] bg-gray-100  font-medium rounded-lg  px-5 py-[7px] text-center inline-flex items-center m-2 ml-0" onClick={clearAll}>
              Clear All
              </button>
              </div>
              <Tooltip title="More" componentsProps={{
          tooltip: {
            sx: {
              bgcolor: '#181E25',
              '& .MuiTooltip-arrow': {
                color: 'common.black',
              },
            },
          },
        }}  TransitionComponent={Zoom} placement="top">       
              <div>
              <button className="text-[#fff] bg-[#181E25]  font-medium rounded-lg px-2 py-[9px] text-center inline-flex items-center m-2 mr-0" onClick={showMoreFunc}>
              <span className='text-xl'><FiMoreVertical/></span>
              </button>
              </div>
              </Tooltip>
              <div className={
                    !showMore
                    ? 'hidden'
                    : 'block mt-[4px] absolute mt-16 right-7 z-30'
                }>
              <button className="text-[#000] bg-gray-100  font-medium rounded-lg  px-5 py-[7px] text-center inline-flex items-center m-1 ml-2">
                Clone all
              </button>
              <button className="text-[#000] bg-gray-100  font-medium rounded-lg  px-5 py-[7px] text-center inline-flex items-center m-1">
              Edit all
              </button>

              </div>
    
</div>
            </div>


          </div>
      </div>
      <div className='mt-6'>

<div class="overflow-auto relative h-[80vh] w-full">
    <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-[#525861] uppercase bg-[#0a0e13] sticky top-0">
            <tr>
                <th scope="col" class="py-4 px-6">
                    ID
                </th>
                <th scope="col" class="py-4 px-6">
                    Site
                </th>
                <th scope="col" class="py-4 px-6">
                    Product
                </th>
                <th scope="col" class="py-4 px-6">
                    Size
                </th>
                <th scope="col" class="py-4 px-6">
                    Proxy
                </th>
                <th scope="col" class="py-4 px-6">
                    Status
                </th>
                <th scope="col" class="py-4 px-6">
                    Action
                </th>
            </tr>
        </thead>
        {tasks.map((tasks) => (
            <tbody>
            <tr class="border-b border-[#1B1F25] bg-[#13181E] hover:bg-[#0a0e13] cursor-pointer ease-out duration-200">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {tasks.id}
                </th>
                <td class="py-4 px-6">
                {tasks.site}
                </td>
                <td class="py-4 px-6">
                {tasks.input}
                </td>
                <td class="py-4 px-6">
                {tasks.size}
                </td>
                <td class="py-4 px-6">
                {tasks.proxy}
                </td>
                <td class="py-4 px-6">
                {tasks.status}
                </td>
                <td class="py-4 px-6">
                  <button className='ml-1 text-[#2bea8e]'><FaPlay/></button>
                  <button className='ml-4'><FaStop/></button>
                </td>
            </tr>
        </tbody>
        ))}
    </table>
    <div className={
                      !showMssg
                      ? 'hidden'
                      : 'flex justify-center'
                  }>
                    <div>
                      <p className='text-center -ml-16 text-lg font-medium text-[#525861] mt-[20vh]'>You have no tasks</p>
                      <p className='text-center -ml-16 mt-1.5 text-sm text-[#525861]'>Click 'Create Tasks' to get started with your tasks</p>
                    </div>
          </div>
</div>






      </div>

      {createModal && (
  <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0">
  <div className="bg-[#00000070] w-full h-full fixed top-0 left-0 right-0 bottom-0 z-10 "></div>
  <div className="flex justify-center">
    <div className='w-[35vw] bg-[#13181E] border border-[#1B1F25] z-30 rounded-lg mt-32' id="fade">
      <div className='flex'>
        <div className='w-2/3'>
          <p className='text-xl font-semibold ml-4 mt-3'>Create Tasks</p>
          <p className='text-[#525861] ml-4 mt-1 text-sm'>In group {groupName}</p>
          </div>
          <div className='w-1/3 flex justify-end mr-4 -mt-2'>
          <button onClick={toggleModal} className="text-3xl"><FiX/></button>
            </div>
        </div>
        <div className='ml-4 mr-4'>
        <animated.div className="p-10 pt-6 pr-0 pb-11 overflow-hidden cursor-pointer border-b border-[#282F37]" style={openAnimation}>
          <div onClick={toggleHandler} className="flex">
            <div className="w-3/4">
            <p className="pb-10 font-medium -ml-10 mt-[4px]">Site</p>
            </div>
            <div className="w-1/4 flex justify-end">
                <button><img className="w-8 -mt-8" src = {icon}></img></button>
            </div>
          </div>
          <div className="-ml-10 -mt-6">
            <div className='mr-2 ml-2'>
            <label className='relative top-0 text-sm text-[#525861]'>Site</label>
          <select className='w-full mt-1 rounded-lg h-10 pl-3 bg-[#1B2127] border border-[#282F37]' placeholder='new group' >
            <option>Target</option>
          </select>
              <label className='relative top-2 text-sm text-[#525861]'>Mode</label>
              <select className='w-full mt-3 rounded-lg h-10 pl-3 bg-[#1B2127] border border-[#282F37]' placeholder='new group'       
              >
                 <option>Normal</option>
                 <option>Speical</option>
              </select>
            </div>
          </div>
    </animated.div>
      <animated.div className="p-10 pt-6 pr-0 pb-11 overflow-hidden cursor-pointer border-b border-[#282F37]" style={openAnimation2}>
          <div onClick={toggleHandler2} className="flex">
            <div className="w-3/4">
            <p className="pb-10 font-medium -ml-10 mt-[4px]">Configure</p>
            </div>
            <div className="w-1/4 flex justify-end">
                <button><img className="w-8 -mt-8" src = {icon2}></img></button>
            </div>
          </div>
          <div className="-ml-10 -mt-6">
            <div className='mr-2 ml-2'>
              <label className='relative top-0 text-sm text-[#525861]'>Input</label>
                  <input className='w-full mt-1 rounded-lg h-10 pl-3 bg-[#1B2127] border border-[#282F37]' value={inputValue} onChange={handleIInputChange} placeholder='81911164'       
                ></input>
            </div>
          </div>
    </animated.div>
      
          <button className='w-full mt-4 bg-[#fff] h-9 rounded-lg bg-[#068C54] font-semibold mb-4 mt-6' onClick={handleAddTask}>Create</button>
          </div>
    </div>
  </div>
</div>
      )}
    </div>
  )
}
