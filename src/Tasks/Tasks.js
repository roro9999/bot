import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Trash from '../Static/trash.svg'
import Edit from '../Static/edit.svg'
import { FiX } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import Random from 'random-number'

export default function Tasks() {
  const [addgroup, setAddGroup] = useState(false)
  const [editGroup, setEditGroup] = useState(false)
  const [editing, setEditing] = useState()
  const [groupNameValue, setGroupNameValue] = useState("");
  const [groupNameEditValue, setGroupNameEditValue] = useState("");
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

  var options = {
    min:  0
  , max:  10000
  , integer: true
  }

  const toggleModal = () => {
    setAddGroup(!addgroup)
  }  
  const toggleEdit = (a) => {
    setEditGroup(!editGroup)
    setEditing(a.id)
  }  
  const setGroupTextValue = (event) => {
    setGroupNameValue(event.target.value);
  };

  const setEditInputValue = (event) => {
    setGroupNameEditValue(event.target.value);
  };

  const removeSelected = (a) => {
    setGroups(groups.filter((item) => item !== a)); 
    localStorage.removeItem(a.name);
    if(groups.length == 1){
      setShowMssg(true)
    }
  }

  const editSelected = () => {
    const copyGroups = [...groups]
    groups.forEach((g) => {
      if(g.id == editing){
        g.name = groupNameEditValue
        setGroups(copyGroups)
      }
    });
  }


  const addNewGroup = () => {
    if(groupNameValue != ""){
      setGroups([...groups, {id: Random(options), name: groupNameValue}])
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
          <p className='text-2xl font-semibold pt-6 ml-8'>Groups</p>
        </div>
        <div className='w-1/2 flex justify-end mr-10'>
        <button className="text-[#fff] bg-[#0E61FF]  font-medium rounded-lg px-5 py-[7px] text-center inline-flex items-center mt-6" onClick={toggleModal}>
                <span className='text-xl mr-1'><FiPlus/></span>
              Create
              </button>        </div>
      </div>
        <div className='flex flex-wrap overflow-auto fixed cursor-pointer ml-8 mt-0'>
        <div className={
                      !showMssg
                      ? 'hidden'
                      : 'flex justify-center w-[100vw]'
                  }>
                    <div>

<div className='flex justify-center -ml-[10.80rem] mt-[29vh]'>
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
  

                      <p className='text-center -ml-48 text-lg font-medium text-gray-500 mt-6'>You have no groups</p>
                      <p className='text-center -ml-48 mt-1.5 text-sm text-gray-500'>Click the plus to get started with groups</p>
                    </div>
          </div>
        {groups.map((a, i) => (

                    <div className='w-72 h-24 border border-[#1B1F25] bg-[#13181E] rounded-lg mr-5 mt-4' key={i}>
                      <div className='flex'>
                      <Link to={"/manage"}
                          state={{groupName: a.name, tasks: "", groupId: a.id}}
                      ><div className='w-[15rem]'>
                
                        <p className='text-sm text-gray-500 m-4 mb-0 mt-3'>Name</p>
                      <p className='ml-4 font-semibold text-lg mt-1'>{a.name}</p>
                        </div>
                        </Link>
                        <div className='w-1/4 flex justify-end mr-4 mt-[1.1rem]'>
                          <div>
                          <button onClick={() => removeSelected(a)}><img className='w-5' src = {Trash}></img></button>
                          <button onClick={() => toggleEdit(a)}><img className='w-5 mt-1.5' src = {Edit}></img></button>
                            </div>
                        </div>
                      </div>
                  </div>                
                  
          ))}
   
 
      
           </div>
        {addgroup && (
        <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0">
          <div className="bg-[#00000070] w-full h-full fixed top-0 left-0 right-0 bottom-0 z-10 "></div>
          <div className="flex justify-center">
            <div className='w-96 bg-[#13181E] border border-[#1B1F25] z-30 rounded-lg mt-56' id="fade">
              <div className='flex'>
                <div className='w-full'>
                  <p className='text-xl font-semibold ml-4 mt-3'>Create Group</p>
                  </div>
                </div>
                <div className='ml-4 mr-4'>
                <label className='relative top-1 text-sm text-gray-500'>Group name</label>
                  <input className='w-full mt-2 rounded-lg h-10 pl-3 bg-[#1B2127] border border-[#282F37]' placeholder='Yeezy day'       
                    value={groupNameValue}
                    onChange={setGroupTextValue}></input>
                       <div className='flex'>
        <div className='w-1/2'>
        <button className='w-24 h-9 rounded-lg bg-[#0E61FF] font-semibold mb-4 mt-6' onClick={addNewGroup}>Add</button>
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

{editGroup && (
        <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0">
          <div className="bg-[#00000070] w-full h-full fixed top-0 left-0 right-0 bottom-0 z-10 "></div>
          <div className="flex justify-center">
            <div className='w-96 bg-[#13181E] border border-[#1B1F25] z-30 rounded-lg mt-56' id="fade">
              <div className='flex'>
                <div className='w-full'>
                  <p className='text-xl font-semibold ml-4 mt-3'>Edit Group</p>
                  <p className='text-gray-500 ml-4 mt-1 text-sm'>Id {editing}</p>
                  </div>
                </div>
                <div className='ml-4 mr-4'>
                <label className='relative top-2 text-sm text-gray-500'>New group name</label>
                  <input className='w-full mt-3 rounded-lg h-10 pl-3 bg-[#1B2127] border border-[#282F37]' placeholder='Kanye day'       
                    value={groupNameEditValue}
                    onChange={setEditInputValue}></input>
                       <div className='flex'>
        <div className='w-1/2'>
        <button className='w-24 h-9 rounded-lg bg-[#0E61FF] font-semibold mb-4 mt-6' onClick={editSelected}>Edit</button>
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
