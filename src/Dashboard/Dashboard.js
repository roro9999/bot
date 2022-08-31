import React from 'react'

export default function Dashboard() {
  return (
    <div className='ml-28'>
              <p className='text-2xl font-semibold pt-6'>Dashboard</p>

              <div className='mt-6 bg-[#0a0e13] h-72 rounded-l-md'>
                <p className='text-xl font-semibold ml-4 pt-4'>Preformace</p>
                <p className='ml-4 mt-1 text-gray-600'>View recent checkouts and failures</p>

                <div className='flex mt-7'>
                  <div className='w-64 h-40 border border-[#1B1F25] bg-[#13181E] rounded-md ml-4'>

                  </div>

                  <div className='w-64 h-40 border border-[#1B1F25] bg-[#13181E] rounded-md ml-4'>

                  </div>
              </div>


              </div>
      </div>
  )
}
