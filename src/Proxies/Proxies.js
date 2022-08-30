import React, {useState, useEffect} from 'react'
import { FiPlus, FiRefreshCcw } from "react-icons/fi";
import { MdSpeed } from "react-icons/md";
import ListImg from '../Static/lists.png';
import Random from 'random-number';
import Trash from '../Static/trash.svg';
import Edit from '../Static/edit.svg';

export default function Proxies() {
  const [showMssg, setShowMssg] = useState(false);
  const [addProxy, setAddProxy] = useState(false);
  const [tester, setTester] = useState(false);
  const [listName, setListName] = useState("");
  const [proxyValue, setProxyValue] = useState("");
  const [tested, setTested] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [listSelect, setListSelect] = useState("");
  const [count, setCount] = useState(0);
  let listLength = proxyValue.split(/\r\n|\r|\n/).length-1
  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem("lists");
    if (savedLists) {
      return JSON.parse(savedLists);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  var options = {
    min:  0
  , max:  10000
  , integer: true
  }

  const checkLists = () => {
    if(lists.length === 0){
      setShowMssg(true)
    }
  }
  useEffect(() => {
    checkLists();
}, []);

const toggleProxy = () => {
  setAddProxy(!addProxy)
}
const toggleTester = () => {
  setTester(!tester)
}

const addNewProxy = () => {
    let proxyArr = proxyValue.split('\n');
    setLists([...lists, {id: Random(options), name: listName, proxies: proxyArr, length:  proxyValue.split(/\r\n|\r|\n/).length-1, ip:  proxyValue.substring(0, proxyValue.indexOf(':'))}])
    setShowMssg(false)
}
const removeSelected = (a) => {
  setLists(lists.filter((item) => item !== a)); 
  localStorage.removeItem(a.id);
  if(lists.length === 1){
    setShowMssg(true)
  }
}
const setListNameValue = (event) => {
  setListName(event.target.value);
};
const setProxyValueText = (event) => {
  setProxyValue(event.target.value);
};
const setSelectedValueProxy = event => {
  console.log(event.target.value)
  setListSelect(event.target.value)
  lists.forEach((l) => {
    if(l.name == event.target.value){
      setSelectedValue(l.proxies)
    }
  });
};
const importList = (e) => {
  const fileReader = new FileReader();
  fileReader.readAsText(e.target.files[0], "UTF-8");
  fileReader.onload = e => {
    console.log(e.target.result);
    setProxyValue(e.target.result);
  };
};

const testProxy = () => {
  if(count == 0){
    selectedValue.forEach((l) => {
      setTested(tested => [...tested, {proxy: l, speed: '200ms'}]);
    });
  }
  console.log("Cooldown")
  setCount(1)
};

  return (
    <div className='ml-20'>
      <div className='flex'>
        <div className='w-1/2'>
          <p className='text-2xl font-semibold pt-6 ml-8'>Proxies</p>
        </div>
        <div className='w-1/2 flex justify-end mr-10'>
          <button className="text-[#fff] bg-[#181E25] font-medium rounded-lg px-5 py-[7px] text-center inline-flex items-center mt-6 mr-2" onClick={toggleTester}><span className='text-xl mr-1'><MdSpeed/></span>Test</button>        
          <button className="text-[#fff] bg-[#0E61FF] font-medium rounded-lg px-5 py-[7px] text-center inline-flex items-center mt-6" onClick={toggleProxy}><span className='text-xl mr-1'><FiPlus/></span>Create</button>        
        </div>
      </div>



      <div className='flex flex-wrap overflow-auto fixed cursor-pointer mt-0 ml-8'>
        <div className={
              !showMssg
              ? 'hidden'
              : 'flex justify-center w-[100vw] -ml-28 mt-[20vh]'
          }>
              <div>
                <div className='flex justify-center'>
                  <img className='w-32 -rotate-6' src = {ListImg}></img>
                </div>
                  <p className='text-center text-lg font-medium text-gray-500 mt-2.5'>You have no lists</p>
                  <p className='text-center mt-1.5 text-sm text-gray-500'>Click 'Create' to get started with proxies</p>
              </div>
          </div>


        {lists.map((a, i) => (
                    <div className='w-56 h-64 border border-[#1B1F25] bg-[#13181E] rounded-lg mr-5 mt-4' key={i}>
                      <div className='ml-4 mt-3'>
                        <div>
                          <p className='text-sm text-gray-500 mb-0'>Name</p>
                          <p className='font-semibold text-lg mt-1 w-44 truncate'>{a.name}</p>
                        </div>
                        <div className='mt-2'>
                          <p className='text-sm text-gray-500 mb-0'>Length</p>
                          <p className='font-semibold text-lg mt-1 w-44 truncate'>{a.length}</p>
                        </div>
                        <div className='mt-2'>
                          <p className='text-sm text-gray-500 mb-0'>IP</p>
                          <p className='font-semibold text-lg mt-1 w-44 truncate'>{a.ip}</p>
                        </div>
                        <div className='mt-4 flex'>
                          <button onClick={() => removeSelected(a)}><img className='w-5' src = {Trash}></img></button>
                          <button className='ml-3 -mt-[1px]'><img className='w-5 mt-1.5' src = {Edit}></img></button>
                        </div>
                      </div>
                  </div>                  
          ))}
           </div>


           {addProxy && (
  <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0">
  <div className="bg-[#00000070] w-full h-full fixed top-0 left-0 right-0 bottom-0 z-10 "></div>
  <div className="flex justify-center">
    <div className='w-[45vw] bg-[#13181E] border border-[#1B1F25] z-30 rounded-lg mt-24' id="fade">
      <div className='flex'>
        <div className='w-full'>
          <p className='text-xl font-semibold ml-4 mt-3'>Add Proxies</p>
          </div>
        </div>
        <div className='ml-4 mr-4'>
          <div>
          <label className='relative top-1 text-sm text-gray-500'>Group name</label>
                  <input className='w-full mt-2 rounded-lg h-10 pl-3 bg-[#1B2127] border border-[#282F37]' placeholder='Residental'       
                    value={listName}
                    onChange={setListNameValue}></input>
          </div>
          <div>
          <label className='relative top-1 text-sm text-gray-500'>Proxies</label>
                  <textarea className='w-full h-56 mt-2 rounded-lg pl-3 bg-[#1B2127] border border-[#282F37] pt-2' placeholder='Paste your proxies'  
                    value={proxyValue}
                    onChange={setProxyValueText}
       ></textarea>
          </div>
       
            <div className="upload-styles-2">
            <div className='mt-4 h-24 border-dashed border-2 border-gray-800 rounded-lg'>
              <p className='text-center text-gray-600 mt-[18px] font-medium underline'>Import .txt file</p>
              <p className='text-center text-gray-600 text-sm mt-1'>Drag or select from local files</p>
            </div>
          <input type="file" name="myfile" onChange={importList} />
        </div>
      <div className='flex'>
        <div className='w-1/2'>
        <button className='pl-7 pr-7 h-9 rounded-lg bg-[#0E61FF] font-semibold mb-4 mt-6' onClick={addNewProxy}>Add <span className='text-sm'>{listLength}</span></button>
          </div>
      <div className='w-1/2 flex justify-end'>
        <button className='w-20 h-9 rounded-lg font-semibold mb-4 mt-6' onClick={toggleProxy}>Cancel</button>
        </div>
        </div>
          </div>
    </div>
  </div>
</div>
      )}

{tester && (
  <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0">
  <div className="bg-[#00000070] w-full h-full fixed top-0 left-0 right-0 bottom-0 z-10 "></div>
  <div className="flex justify-center">
    <div className='w-[35vw] bg-[#13181E] border border-[#1B1F25] z-30 rounded-lg mt-24' id="fade">
      <div className='flex'>
        <div className='w-full'>
          <p className='text-xl font-semibold ml-4 mt-3'>Proxy Tester</p>
          </div>
        </div>
        <div className='ml-4 mr-4'>
          <div>
          <label className='relative top-1 text-sm text-gray-500'>List</label>
          <select className='w-full mt-2 rounded-lg h-10 pl-3 bg-[#1B2127] border border-[#282F37]' value={listSelect} onChange={setSelectedValueProxy}>
            <option selected>Select list</option>
            {lists.map(lists => (
              <option key={lists.id} value={lists.name}>
                {lists.name}
              </option>
            ))}
          </select>
          </div>
          <div>
            <p className='text-sm text-gray-500 mt-4'>Results</p>
            <div className='max-h-96 overflow-auto'>
            {tested.map((a, i) => (
              <div key={i} className="w-full h-10 bg-[#1B2127] mt-2 mb-2 rounded-lg ">
                <div className='flex pt-[7px]'>
                  <div className='w-2/3 ml-4'>
                    <p className='truncate w-full test-sm'>{a.proxy}</p>
                  </div>
                  <div className='w-1/3 flex justify-end mr-4'>
                    <p className='text-sm mt-[3px]'>{a.speed}</p>
                  </div>
                </div>
              </div>               
          ))}
              </div>
            
          </div>
     
      <div className='flex'>
        <div className='w-1/2'>
        <button className='pl-7 pr-7 h-9 rounded-lg bg-[#0E61FF] font-semibold mb-4 mt-6' onClick={testProxy}>Test</button>
          </div>
      <div className='w-1/2 flex justify-end'>
        <button className='w-20 h-9 rounded-lg font-semibold mb-4 mt-6' onClick={toggleTester}>Cancel</button>
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
