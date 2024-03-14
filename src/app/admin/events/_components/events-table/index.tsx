'use client'
import { EventType } from '@/interfaces/events'
import React from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";


function EventsTable({events} : {events: EventType[]}) {
  return (
    <div className='mt-5'>
      <Table aria-label="Example static collection table">
      <TableHeader>
        {["Name", "Organizer", "Date", "Time", "Location", "Actions"].map(
          (column) => (
            <TableColumn className='bg-gray-400 text-white' key={column}>
              {column}
            </TableColumn> 
          )
        )}
        
      </TableHeader>
      <TableBody>
        {events.map((event) => (
        <TableRow key={event._id!}>
          <TableCell>{event.name}</TableCell>
          <TableCell>{event.organizer}</TableCell>
          <TableCell>{event.date}</TableCell>
          <TableCell>{event.time}</TableCell>
          <TableCell>{event.location}</TableCell>
          <TableCell>
            <div className='flex gap-5'>
              
              <Button isIconOnly size='sm'><i className="ri-delete-bin-line"></i></Button>
              <Button isIconOnly size='sm'><i className="ri-edit-line"></i></Button>
            </div>
          </TableCell>
        </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
}

export default EventsTable;