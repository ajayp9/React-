import React, { useEffect, useState } from 'react'
import 'animate.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'remixicon/fonts/remixicon.css'

const API_KEY = "wcx7IOoz2IMOxx8QdYX5PjuCwkna43E01r5BXXHcCZPSu72eNJ9hgB2c"



const App = () => {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("people")

  const fetchImage = async ()=>{
    try {
      setLoading(true)
      const options = {
        headers: {
          Authorization: API_KEY
        }
      }
      const res = await axios.get(`https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=12`, options)
      console.log(res.data)
      setPhotos([
        ...photos,
        ...res.data.photos
      ])
    } catch (error) {
      toast.error("failed to fetch image")
    }
    finally{
      setLoading(false)
    }
  }

  const LoadMore = () =>{
    setPage(page+1)
  }
  const search = (e) =>{
    e.preventDefault()
    const q=e.target[0].value.trim()
    setPhotos([])
    setQuery(q)
  }

  useEffect(()=>{
    fetchImage()
  }, [page, query])

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col items-center py-8 gap-12 animate_animated animate__fadeIn'>
      <h1 className='text-3xl font-bold text-indigo-600'>📷 
      Image Gallery</h1>

      <form onSubmit={search} >
        <input 
        className=' p-3 bg-white rounded-l-lg w-[400px] focus:outline-indigo-500' 
        placeholder='Search image here'
        required />
        <button className='bg-gradient-to-br from-indigo-600 via-blue-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700' >Search</button>
      </form>
      {
        photos.length === 0 &&
        <h1 className='text-4xl font-bold text-center'>Search result not found</h1>
      }

      <div className='grid grid-cols-4 lg:gap-12 gap-8 w-9/12'>
      
        {
          photos.map((item,index)=>(
            <div key={index} className='bg-white rounded-xl bg-whiie'>
            <img 
              src={item.src.medium}
              alt={item.alt}
              className='rounded-t-lg h-[180px] object-cover w-full hover:scale-110 transition-transform duration-300'
            />
            <div className='p-4'>
              <h1 className='text-lg font-medium text-gray-600 capitalize'>{item.photographer}</h1>
              <a target="_blank" href={item.src.original} className='mt-2 block bg-green-400 font-bold py-2 rounded-lg text-center hover:scale-105 transition-transform duration-300'>
                <i className="ri-download-line mr-1"></i>
                Download
              </a>
            </div>

            </div>
          ))
        }
      </div>
      {
        loading && 
        <i className="ri-loader-line text-4xl text-gray-400 animate-spin"></i>
      }
      {
        photos.length > 0 &&
        <button onClick={LoadMore} className='bg-rose-500 py-3 px-16 rounded-lg font-medium text-white hover:scale-110 '>Load more</button>
      }

      
      
      <ToastContainer />
    </div>
  )
}

export default App