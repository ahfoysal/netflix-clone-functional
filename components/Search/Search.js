
"use client";


import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Icons } from '../assets/Icons';
import { Input } from '@nextui-org/react';
import { useDebounce } from 'use-debounce';
import { useRouter, useSearchParams } from 'next/navigation';



function Search() { 

    const [searchBox, setSearchBox] = useState(false)
    const searchParams = useSearchParams()
 
    const searchValue = searchParams.get('q')
    const inputRef = useRef(null)
    // const debouncedValue = useDebounce(searchValue, 500)
    const router = useRouter()
    // useEffect(() => {
    //     if(!searchValue) return
    //     router.replace('/search?q='+ searchValue)
    //   }, [debouncedValue, router, searchValue])
    
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const setSearchValue = useCallback(
    ( value) => {
      const params = new URLSearchParams(searchParams)
      params.set("q", value)
 
      return params.toString()
    },
    [searchParams]
  )
 

     useEffect(() => {
    if(!searchValue) {
        router.replace('/')
        return setSearchBox(false)
    }
      }, [searchValue,router])

    const handleSearch = (value)=> {
console.log(setSearchValue(value))
router.replace('/search' + '?' + setSearchValue(value))
    }

    const toggleSearchBox = () => {

        if (!searchBox && inputRef.current) inputRef.current.focus();

        setSearchBox(prevState => !prevState)

    }

    const handleBlur = () => {
        console.log('blur')
        if(searchValue)return
        setSearchBox(false)


    }

 


    return (
        <div className="">

<div className={`${searchBox ? "searchBox" : "searchIcon"} w-full`}>
                        <span className="icon" onClick={() => toggleSearchBox()}><Icons.search  /></span>
                        <Input  endContent={<Icons.close height={searchBox ? 21 : 24} width={searchBox ? 21 : 24} className={`${!searchValue && "hidden"} cursor-pointer`} onClick={()=>{
                                       router.push('/' )
                           
                               setSearchBox(false)
                       
                        } } />} className={` ${searchBox && "min-w-[00px]"} searchInput p-0 bg-transparent  focus-visible:bg-transparent  focus:bg-transparent hover:bg-transparent`}
                        size='sm'
                        classNames={{
                            // base:"p-0 bg-transparent",
                            // label: "p-0 bg-transparent",
                          
                            inputWrapper: "py-0 group-data-[focus=true]:bg-transparent bg-transparent focus:bg-transparent data-[focus=true]:bg-transparent data-[hover=true]:bg-transparent data-[focus-within=true]:bg-transparent focus-visible:bg-transparent hover:bg-transparent px-2 h-fit",
                          
                          input: "font-medium text-sm"
                            // description: "bg-transparent",
                            // helperWrapper: "bg-transparent",
                        }}
                        // isClearable
                        // onClear={()=>{
                         
                        // }}
                            ref={inputRef}
                            onChange={(e) => handleSearch(e.currentTarget.value)}
                            value={searchValue || ""}  
                        
                            onBlur={() => handleBlur()}
                            type="text" placeholder="Titles, People, Genres..." maxLength="80" />
                    </div>
        </div>
    );
}

export default Search;