import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Edit from '../Static/edit.svg'
import { FiX } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";

export default function Tasks() {
  const [addgroup, setAddGroup] = useState(false)
  const [groupNameValue, setGroupNameValue] = useState("");
  const [showMssg, setShowMssg] = useState(false)
  const [groups, setGroups] = useState(() => {
    const savedGroups = localStorage.getItem("groups");
    if (savedGroups) {
      return JSON.parse(savedGroups);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  const toggleModal = () => {
    setAddGroup(!addgroup)
  }  
  const setGroupTextValue = (event) => {
    setGroupNameValue(event.target.value);
  };

  const removeSelected = (a) => {
    // setGroups(groups.filter((item) => item !== a)); 
    setGroups([])
    setShowMssg(true)
  }

  const addNewGroup = () => {
    if(groupNameValue != ""){
      setGroups([...groups, {name: groupNameValue}])
      setGroupNameValue("")
      setShowMssg(false)
    }
    return
  }

  const checkGroups = () => {
    if(groups.length == 0){
      setShowMssg(true)
    }
  }
  useEffect(() => {
    checkGroups();
}, []);

  return (
    <div className='ml-20'>
      <div className='flex'>
        <div className='w-1/2'>
          <p className='text-2xl font-semibold pt-6 ml-8' id="title">Groups</p>
        </div>
        <div className='w-1/2 flex justify-end mr-10'>
          <button onClick={toggleModal} className="text-2xl w-10 h-10 border border-[#1B1F25] rounded-full flex justify-center center mt-6"><span className='mt-[6px]'><FiPlus/></span></button>
        </div>
      </div>
        <div className='flex flex-wrap overflow-auto h-full fixed cursor-pointer ml-8 mt-0'>
        <div className={
                      !showMssg
                      ? 'hidden'
                      : 'flex justify-center w-[100vw]'
                  }>
                    <div>
                      <p className='text-center -ml-48 text-lg font-medium text-[#525861] mt-[35vh]'>You have no groups</p>
                      <p className='text-center -ml-48 mt-1.5 text-sm text-[#525861]'>Click the plus to get started with groups</p>
                    </div>
          </div>
        {groups.map((a, i) => (

                    <div className='w-72 h-36 border border-[#1B1F25] bg-[#13181E] rounded-lg mr-5 mt-5' key={i}>
                      <div className='flex'>
                      <Link to={"/manage"}
                          state={{groupName: a.name, tasks: ""}}
                      ><div className='w-[15rem]'>
                
                        <p className='text-sm text-[#525861] m-4 mb-0 mt-3'>Name</p>
                      <p className='ml-4 font-semibold text-lg'>{a.name}</p>
                        </div>
                        </Link>
                        <div className='w-1/4 flex justify-end mr-4'>
                          <button onClick={() => removeSelected(a)}><img className='w-5' src = {Edit}></img></button>
                        </div>
                      </div>
  
                      <p className='text-sm text-[#525861] m-4 mb-0 mt-4'>Tasks</p>
                      <p className='ml-4 font-semibold text-lg'>0</p>
                  </div>                
          ))}
   
 
      
           </div>
        {addgroup && (
        <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0">
          <div className="bg-[#00000070] w-full h-full fixed top-0 left-0 right-0 bottom-0 z-10 "></div>
          <div className="flex justify-center">
            <div className='w-96 bg-[#13181E] border border-[#1B1F25] z-30 rounded-lg mt-56' id="fade">
              <div className='flex'>
                <div className='w-2/3'>
                  <p className='text-xl font-semibold ml-4 mt-3'>Create Group</p>
                  </div>
                  <div className='w-1/3 flex justify-end mr-4 mt-[16px]'>
                  <button onClick={toggleModal} className="text-3xl"><FiX/></button>
                    </div>
                </div>
                <div className='ml-4 mr-4'>
                <label className='relative top-1 text-sm text-[#525861]'>Group name</label>
                  <input className='w-full mt-2 rounded-lg h-10 pl-3 bg-[#1B2127] border border-[#282F37]' placeholder='Target restocks'       
                    value={groupNameValue}
                    onChange={setGroupTextValue}></input>
                  <button className='w-full mt-4 bg-[#fff] h-9 rounded-lg bg-[#F9888A] font-semibold mb-4' onClick={addNewGroup}>Create</button>
                  </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
