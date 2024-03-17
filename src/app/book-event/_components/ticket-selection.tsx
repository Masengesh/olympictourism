"use client";
import { EventType } from '@/interfaces/events'
import { Button } from '@nextui-org/react';
import React, { useEffect } from 'react'

interface TicketSelectionProps {
    event: EventType;
}

function TicketSelection({ event }: TicketSelectionProps) {
    const [ticketCount, setTicketCount] = React.useState(1);
    const [selectedTicketType, setSelectedTicketType] = React.useState(event.ticketTypes[0].name);
    const [totalAmount , setTotalAmount] = React.useState(0);

    useEffect(() => {
        const ticketType = event.ticketTypes.find(
            (ticketType) => ticketType.name === selectedTicketType
        );

        if (ticketType) {
            setTotalAmount(ticketType.price * ticketCount);
        }
    }, [ticketCount, selectedTicketType]);

  return (
    <div className='mt-7'>
        <div>
        <h1 className='text-2xl font-semibold text-gray-700'>Select Ticket Type</h1>
        <div className="grid grid-cols-4 gap-10 mt-2">
            {event.ticketTypes.map((ticketType) => (
                <div key={ticketType.name}
                    className={`bg-gray-100 border border-gray-200 p-3 rounded-sm cursor-pointer
                    ${selectedTicketType === ticketType.name && 'border-blue-800'}
                    `}
                    onClick={() => setSelectedTicketType(ticketType.name)}
                >
                    <h1 className="font-semibold">{ticketType.name}</h1>
                    <h1 className="text-gray-600 text-sm">${ticketType.price}</h1>
                </div>
            ))}
        </div>
        </div>

        <div className='mt-7'>
        <h1 className='text-2xl font-semibold text-gray-700'>Select Tickets Count</h1>
        <div className="flex flex-wrap gap-2 mt-2">
            {[...Array(10)].map((_, index) => (
                <div 
                 className={`bg-gray-100 border border-gray-200 h-8 w-8 rounded-sm flex justify-center items-center cursor-pointer
                    ${ticketCount === index + 1 && "border-blue-800"}
                 `}
                    onClick={() => setTicketCount(index + 1)}
                >
                    {index + 1}
                </div>
            ))}
        </div>
        </div>

        <div className="mt-7 bg-gray-100 border border-gray-200 p-3 flex justify-between items-center">
            <h1 className='font-semibold text-2xl uppercase'>
                Total Amount : $ {totalAmount}
            </h1>
            
            <Button color='primary'>Book Now</Button>
        </div>
    </div>
  )
}

export default TicketSelection