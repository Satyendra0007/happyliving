import React from 'react'

export default function Spinner() {
  return (
    <div className="relative">
      <div className="flex flex-row gap-4 w-full h-full fixed top-[4rem] left-0   items-center justify-center bg-white/60 backdrop-blur-sm z-50 " >
        <div
          className="w-12 h-12 rounded-full animate-spin border-y border-solid border-cyan-500 border-t-transparent shadow-md">
        </div>

        <div
          className="w-12 h-12 rounded-full animate-spin border-y-2 border-solid border-violet-500 border-t-transparent shadow-md">
        </div>

        <div
          className="w-12 h-12 rounded-full animate-spin border-y-4 border-solid border-pink-500 border-t-transparent shadow-md">
        </div>

        <div
          className="w-12 h-12 rounded-full animate-spin border-y-8 border-solid border-green-500 border-t-transparent shadow-md">
        </div>
      </div>
    </div>
  )
}
