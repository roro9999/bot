import React, {useState, useEffect} from 'react'
import { Link, useLocation } from "react-router-dom";
import { FiChevronLeft, FiX } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";
import { MdViewStream } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { useSpring, animated } from "react-spring";
import Plus from '../Static/plus.svg'
import Close from '../Static/close.svg'
import Item from '../Static/item.svg'
import toast, { Toaster } from 'react-hot-toast';
import Trash from '../Static/trash.svg';
import Edit from '../Static/edit.svg'
import { FiPlus } from "react-icons/fi";


export default function Manage() {
  let location = useLocation()
  let groupName = location.state.groupName
  let groupId = location.state.groupId
  const [showMssg, setShowMssg] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [editing, setEditing] = useState()
  const [editInput, setEditInput] = useState()
  const [inputValue, setInputValue] = useState("");
  const [taskCount, setTaskCount] = useState(100);
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState(Plus);
  const [open2, setOpen2] = useState(false);
  const [icon2, setIcon2] = useState(Plus);
  const [classic, setClassic] = useState(true);
  const [grid, setGrid] = useState(false);
  const [tasks, setTasks] = useState(() => {
    const savedtasks = localStorage.getItem(groupId);
    if (savedtasks) {
      return JSON.parse(savedtasks);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(groupId, JSON.stringify(tasks));
  }, [tasks]);

  const toggleModal = () => {
    setCreateModal(!createModal)
    checkTasks()
  }
  
  const toggleEdit = (tasks) => {
    setEditModal(!editModal)
    setEditing(tasks.id)
  }

  const editSelected = () => {
    const tasksCopy = [...tasks]
    tasks.forEach((t) => {
      if(t.id == editing){
        t.input = editInput
        setTasks(tasksCopy)
      }
    });
  }

  const toggleGrid = () => {
    setGrid(true)
    setClassic(false)
  }

  const toggleClassic = () => {
    setGrid(false)
    setClassic(true)
  }

  function handleIInputChange(e) {
    setInputValue(e.target.value);
  }

  function handleTaskCountChange(e) {
    setTaskCount(e.target.value);
  }
  
  function handleEditInput(e) {
    setEditInput(e.target.value);
  }

  function taskCountDe() {
    if(taskCount <= 0){
      return
    }
    else if(taskCount >= 0){
      setTaskCount(taskCount - 10);
    }
  }

  function taskCountIn() {
    setTaskCount(taskCount + 10);
  }

  function handleAddTask() {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          site: "YeezySupply",
          input: inputValue,
          size: "R",
          profile: "null",
          proxy: "local",
          status: "Created"
        }
      ]);
      setShowMssg(false)
    }
  

    const checkTasks = () => {
      if(tasks.length == 0){
        setShowMssg(true)
      }
    }
    useEffect(() => {
      checkTasks();
  }, []);

  const clearAll = () => {
    if(tasks.length >= 0){
      setTasks([])
      setShowMssg(true)
    }
  } 

  const removeSelected = (a) => {
    setTasks(tasks.filter((item) => item !== a)); 
    if(tasks.length == 1){
      setShowMssg(true)
    }
  }

  const toggleHandler = () => {
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



  const toggleHandler2 = () => {
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

  return (
    <div className='ml-20'>
      <Toaster position="bottom-right" gutter={12}  toastOptions={{
    className: '',
    duration: 3000,
  }}/>
      <div className='flex'>
          <div className='w-1/4 flex'>
            <div>
              <Link to={'/tasks'}><button className='ml-6 flex font-medium pt-6 cursor-pointer'><span className='text-2xl text-[#0E61FF]'><FiChevronLeft/></span>Groups</button></Link>
               <img className='w-[60%] ml-8 mt-3 opacity-50' src = {Item}></img>
            </div>
    <div>
                  <p className='text-[27px] font-semibold pt-5 ml-2 mt-[40px]'>{groupName}</p>
                  <p className='text-gray-500 ml-2 mt-1.5 text-sm'>{tasks.length} total tasks</p>
    </div>
     
          </div>
          <div className='w-1/4 flex justify-end mr-8 mt-14'>
            <div>
              <p className='ml-2 text-sm text-gray-500'>Views</p>
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
              <span className='text-xl' onClick={toggleClassic}><MdViewStream/></span>
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
              <span className='text-xl' onClick={toggleGrid}><HiViewGrid/></span>
              </button>
              </div>
              </Tooltip>
           
      </div>
            </div>


          </div>
        
          <div className='w-2/4 flex justify-end mr-8 mt-14'>
            <div>
              <p className='ml-2 text-sm text-gray-500'>Actions</p>
            <div className='flex'>
              <div>
              <button className="text-[#fff] bg-[#0E61FF]  font-medium rounded-lg px-5 py-[7px] text-center inline-flex items-center m-2 mr-0" onClick={toggleModal}>
                <span className='text-xl mr-1'><FiPlus/></span>
              Create
              </button>
              </div>
              <div>
              <button className="text-[#fff] bg-[#00D37F]  font-medium rounded-lg px-5 py-[7px] text-center inline-flex items-center m-2 mr-0">
              Start All
              </button>
              </div>
              <div>
              <button className="text-[#fff] bg-[#F54364] font-medium rounded-lg  px-5 py-[7px] text-center inline-flex items-center m-2">
              Stop All
              </button>
              <button className="text-[#fff] bg-[#181E25] font-medium rounded-lg  px-5 py-[7px] text-center inline-flex items-center m-2 ml-0 mr-0" onClick={clearAll}>
              Clear All
              </button>            
              </div>
    
</div>
            </div>


          </div>
      </div>

      {classic && (
      <div className='mt-6'>

<div class="overflow-auto relative h-[80vh] w-full">
    <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-500 uppercase bg-[#0a0e13] sticky top-0">
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
                  <button className='ml-2 text-[#00D37F]'><FaPlay/></button>
                  <button onClick={() => toggleEdit(tasks)} className='ml-2 text-gray-500'><img className='w-[15px]' src = {Edit}></img></button>
                  <button onClick={() => removeSelected(tasks)}><img className='w-[15px] ml-2' src = {Trash}></img></button>

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
                    <div className='flex justify-center -ml-[2.80rem] mt-[18vh]'>
  <div>
  <div className='flex'>
    <div className='w-2/4'>
    <div className='w-32  h-2 bg-gray-700 rounded-lg'></div>
    </div>
    <div className='flex justify-end w-1/3'>
      <div className='w-12 ml-6 h-2 bg-gray-800 rounded-lg'></div>
    </div>
  </div>
  <div className='flex mt-4'>
    <div className='w-1/4'>
    <div className='w-24  h-2 bg-gray-500 rounded-lg'></div>
    </div>
    <div className='flex justify-end w-2/3'>
      <div className='w-24 ml-8 h-2 bg-gray-700 rounded-lg'></div>
    </div>
  </div>
  <div className='flex mt-4'>
    <div className='w-1/4'>
    <div className='w-12  h-2 bg-gray-700 rounded-lg'></div>
    </div>
    <div className='flex justify-end w-2/3'>
      <div className='w-32 ml-8 h-2 bg-gray-600 rounded-lg'></div>
    </div>
  </div>
  </div>
</div>
                      <p className='text-center -ml-16 text-lg font-medium text-gray-500 mt-6'>You have no tasks</p>
                      <p className='text-center -ml-16 mt-1.5 text-sm text-gray-500'>Click 'Create Tasks' to get started with your tasks</p>
                    </div>
          </div>
          
</div>
      </div>
      )}


{grid && (
      <div className='mt-6'>

<div class="overflow-auto relative h-[80vh] w-full">
<div className='h-[1px] w-full bg-[#1B1F25]'></div>
    <table class="w-full flex">
<div className='w-1/3'>
  <p className='font-medium ml-8 mt-5 text-gray-500'>Initializing</p>
</div>
<div className='w-1/3'>
<p className='font-medium mt-5 text-gray-500 ml-8'>Submitting</p>


</div>
<div className='w-1/3'>
<p className='font-medium mt-5 text-gray-500 ml-8'>Finishing</p>


</div>
    </table>
    <div className={
                      !showMssg
                      ? 'hidden'
                      : 'flex justify-center'
                  }>
                                <div>
                    <div className='flex justify-center -ml-[2.80rem] mt-[18vh]'>
  <div>
  <div className='flex'>
    <div className='w-2/4'>
    <div className='w-32  h-2 bg-gray-700 rounded-lg'></div>
    </div>
    <div className='flex justify-end w-1/3'>
      <div className='w-12 ml-6 h-2 bg-gray-800 rounded-lg'></div>
    </div>
  </div>
  <div className='flex mt-4'>
    <div className='w-1/4'>
    <div className='w-24  h-2 bg-gray-500 rounded-lg'></div>
    </div>
    <div className='flex justify-end w-2/3'>
      <div className='w-24 ml-8 h-2 bg-gray-700 rounded-lg'></div>
    </div>
  </div>
  <div className='flex mt-4'>
    <div className='w-1/4'>
    <div className='w-12  h-2 bg-gray-700 rounded-lg'></div>
    </div>
    <div className='flex justify-end w-2/3'>
      <div className='w-32 ml-8 h-2 bg-gray-600 rounded-lg'></div>
    </div>
  </div>
  </div>
</div>
                      <p className='text-center -ml-16 text-lg font-medium text-gray-500 mt-6'>You have no tasks</p>
                      <p className='text-center -ml-16 mt-1.5 text-sm text-gray-500'>Click 'Create Tasks' to get started with your tasks</p>
                    </div>
          </div>
          
</div>
      </div>
      )}

      {createModal && (
  <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0">
  <div className="bg-[#00000070] w-full h-full fixed top-0 left-0 right-0 bottom-0 z-10 "></div>
  <div className="flex justify-center">
    <div className='w-[35vw] bg-[#13181E] border border-[#1B1F25] z-30 rounded-lg mt-32' id="fade">
      <div className='flex'>
        <div className='w-full'>
          <p className='text-xl font-semibold ml-4 mt-3'>Create Tasks</p>
          <p className='text-gray-500 ml-4 mt-1 text-sm'>In group {groupName}</p>
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
            <label className='relative top-0 text-sm text-gray-500'>Site</label>
          <select className='w-full mt-1 rounded-lg h-10 pl-3 bg-[#1B2127] border border-[#282F37]' placeholder='new group' >
            <option>YeezySupply</option>
          </select>
              <label className='relative top-2 text-sm text-gray-500'>Mode</label>
              <select className='w-full mt-3 rounded-lg h-10 pl-3 bg-[#1B2127] border border-[#282F37]'
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
              <div className='flex mr-2'>
                <div className='w-2/3'>
                <label className='relative top-0 text-sm text-gray-500'>Input</label>
                  <input className='w-full mt-1 rounded-lg h-10 pl-3 bg-[#1B2127] border border-[#282F37]' value={inputValue} onChange={handleIInputChange} placeholder='81911164'       
                ></input>
                </div>
                <div className='w-1/3'>
                <label className='relative top-0 text-sm text-gray-500 ml-2'>Quanity</label>
                  <input className='w-full mt-1 rounded-lg h-10 pl-3 bg-[#1B2127] border border-[#282F37] ml-2' value={inputValue} onChange={handleIInputChange} placeholder='1'       
                ></input>
                </div>
              </div>
             
                 <div>
              <label className='relative top-2 text-sm text-gray-500'>Billing</label>
              <select className='w-full mt-3 rounded-lg h-10 pl-3 bg-[#1B2127] border border-[#282F37]'>
                <option value="">Test Profile</option>
              </select>
            </div>
            <div>
              <label className='relative top-2 text-sm text-gray-500'>Proxy</label>
              <select className='w-full mt-3 rounded-lg h-10 pl-3 bg-[#1B2127] border border-[#282F37]'>
                <option value="">List 1</option>
              </select>
            </div>
                <label className='relative top-3 text-sm text-gray-500'>Task count</label>
                <br></br>
                <div className='flex'>
                  <button className='mt-4 ml-1' onClick={taskCountDe}><img src = {Close}></img></button>
                <input type="number" className="w-20 mt-5 rounded-lg h-10 pl-3 bg-transparent text-center" placeholder='100' value={taskCount} onChange={handleTaskCountChange}></input>
                <button className='mt-4' onClick={taskCountIn}><img src = {Plus}></img></button>

                </div>
                
            </div>
          </div>
    </animated.div>
      <div className='flex'>
        <div className='w-1/2'>
        <button className='w-24 h-9 rounded-lg bg-[#0E61FF] font-semibold mb-4 mt-6' onClick={handleAddTask}>Add</button>
          </div>
      <div className='w-1/2 flex justify-end'>
        <button className='w-20 h-9 rounded-lg font-semibold mb-4 mt-6' onClick={toggleModal}>Cancel</button>
        </div>
        </div>

          </div>
    </div>
  </div>
</div>
      )}

{editModal && (
  <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0">
  <div className="bg-[#00000070] w-full h-full fixed top-0 left-0 right-0 bottom-0 z-10 "></div>
  <div className="flex justify-center">
    <div className='w-[35vw] bg-[#13181E] border border-[#1B1F25] z-30 rounded-lg mt-32' id="fade">
      <div className='flex'>
        <div className='w-full'>
          <p className='text-xl font-semibold ml-4 mt-3'>Edit task</p>
          <p className='text-gray-500 ml-4 mt-1 text-sm'>Editing id {editing}</p>
          </div>
        </div>
        <div className='ml-4 mr-4'>
        <animated.div className="p-10 pt-6 pr-0 pb-11 overflow-hidden cursor-pointer border-b border-[#282F37]" style={openAnimation}>
          <div onClick={toggleHandler} className="flex">
            <div className="w-3/4">
            <p className="pb-10 font-medium -ml-10 mt-[4px]">Editable Values</p>
            </div>
            <div className="w-1/4 flex justify-end">
                <button><img className="w-8 -mt-8" src = {icon}></img></button>
            </div>
          </div>
          <div className="-ml-10 -mt-6">
            <div className='mr-2 ml-2'>
              <label className='relative top-2 text-sm text-gray-500'>Mode</label>
              <select className='w-full mt-3 rounded-lg h-10 pl-3 bg-[#1B2127] border border-[#282F37]' placeholder='new group'       
              >
                 <option>Normal</option>
                 <option>Speical</option>
              </select>
              <div className='flex mr-2 mt-2'>
                <div className='w-2/3'>
                <label className='relative top-0 text-sm text-gray-500'>Input</label>
                  <input className='w-full mt-1 rounded-lg h-10 pl-3 bg-[#1B2127] border border-[#282F37]' value={editInput} onChange={handleEditInput} placeholder='81911164'       
                ></input>
                </div>
                <div className='w-1/3'>
                <label className='relative top-0 text-sm text-gray-500 ml-2'>Quanity</label>
                  <input className='w-full mt-1 rounded-lg h-10 pl-3 bg-[#1B2127] border border-[#282F37] ml-2' value={inputValue} onChange={handleIInputChange} placeholder='1'       
                ></input>
                </div>
              </div>
            <div>
              <label className='relative top-2 text-sm text-gray-500'>Proxy</label>
              <select className='w-full mt-3 rounded-lg h-10 pl-3 bg-[#1B2127] border border-[#282F37]'>
                <option value="">List 1</option>
              </select>
            </div>
            </div>
            
          </div>
    </animated.div>
      <div className='flex'>
        <div className='w-1/2'>
        <button className='w-24 h-9 rounded-lg bg-[#0E61FF] font-semibold mb-4 mt-6' onClick={editSelected}>Add</button>
          </div>
      <div className='w-1/2 flex justify-end'>
        <button className='w-20 h-9 rounded-lg font-semibold mb-4 mt-6' onClick={toggleEdit}>Cancel</button>
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
