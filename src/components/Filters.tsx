"use client";
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function Filters() {
    const router = useRouter();
    const [filters, setFilters] = React.useState({
        name: "",
        date: "",
    });

    useEffect(() => {
      setTimeout(() => {
        router.push(`/?name=${filters.name}&date=${filters.date}`);
      } , 400);
    }, [filters.name]);

    useEffect(() => {
        router.push(`/?name=${filters.name}&date=${filters.date}`);
    }, [filters.date]);
  return (
    <div className='bg-white p-5 rounded-sm mb-5 flex flex-col md:flex-row gap-5 items-end'>
        <div className='w-full'>
          <h1 className="text-sm text-gray-500">Search an event by name</h1>
        <input 
          type="text"  
          placeholder='search an event'
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          className='w-full p-2 rounded-sm border border-gray-400'
        />
        </div>
        <div className='w-full'>
        <h1 className="text-sm text-gray-500">Search an event by date</h1>
        <input 
          type="date"  
          placeholder='search an event'
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          className='w-full p-2 rounded-sm border border-gray-400'
        />
        </div>

        <div className="w-60">
          {" "} 
          <Button className='px-5'
            onClick={() => {
              setFilters({ name: "", date: "" });
            }}
          >Clear Filters</Button>
        </div>
    </div>
  )
}

export default Filters