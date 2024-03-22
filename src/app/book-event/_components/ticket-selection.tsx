"use client";
import { EventType } from '@/interfaces/events'
import { Button } from '@nextui-org/react';
import React, { useEffect } from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
import toast from 'react-hot-toast';
import PaymentModal from './payment-model';
const stripePromise = loadStripe('pk_test_51OvDOAP4aECaHEZ1z8Tn8GZWbNKUryc4rsNbuK9P5IBSz4T0yYYduMHSk1r6Gkixp8AU4A3s0letv0o1Sv8fQ9VF00HpUiC1kl');

interface TicketSelectionProps {
    event: EventType;
    eventBookings: any;
}

function TicketSelection({ event , eventBookings}: TicketSelectionProps) {
    const [ticketCount, setTicketCount] = React.useState(1);
    const [selectedTicketType, setSelectedTicketType] = React.useState(
        event.ticketTypes[0].name
    );
    const [totalAmount , setTotalAmount] = React.useState(0);
    const [clientSecret, setClientSecret] = React.useState('');
    const [showPaymentModal , setShowPaymentModal] = React.useState(false)
    const [loading , setLoading] = React.useState(false);

    useEffect(() => {
        const ticketType = event.ticketTypes.find(
            (ticketType) => ticketType.name === selectedTicketType
        );

        if (ticketType) {
            setTotalAmount(ticketType.price * ticketCount);
        }
    }, [ticketCount, selectedTicketType]);

    const limits: any = {};

    event.ticketTypes.forEach((ticketType) => {
        let bookedTickets = 0;
        eventBookings.forEach((booking: any) => {
            if (booking.ticketType === ticketType.name) {
                bookedTickets += booking.ticketsCount;
            }
        });

        limits[ticketType.name] = ticketType.limit - bookedTickets;
    });

    const getClientSecret = async () => {
        setLoading(true);
        try {
            // checkvif the limit is reached
            if (limits[selectedTicketType] === 0) {
                toast.error("Tickets limit reached");
                return;
            }

            if (limits[selectedTicketType] < ticketCount) {
                toast.error(`Only ${limits[selectedTicketType]} tickets left`);
                return;
            }

            setLoading(true);
            const response = await axios.post("/api/stripe/client-secret", {
                amount: totalAmount * 100,
            });
            setClientSecret(response.data.clientSecret);
        } catch (error: any) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        if (showPaymentModal) {
        getClientSecret();
        }
    }, [showPaymentModal]);

    

    console.log(limits);

  return (
    <div className='mt-7'>
        <div>
        <h1 className='text-2xl font-semibold text-gray-700'>Select Ticket Type</h1>
        <div className="grid grid-cols-4 gap-10 mt-2">
            {event.ticketTypes.map((ticketType) => (
                <div key={ticketType.name}
                    className={`bg-gray-100 border p-3 rounded-sm cursor-pointer
                    ${selectedTicketType === ticketType.name ? 'border-blue-800' : "border-gray-200"}
                    `}
                    onClick={() => setSelectedTicketType(ticketType.name)}
                >
                    <h1 className="font-semibold">{ticketType.name}</h1>
                    <h1 className="text-gray-600 text-sm flex justify-between">
                        ${ticketType.price} <span>{limits[ticketType.name]} tickets left</span>
                    </h1>
                </div>
            ))}
        </div>
        </div>

        <div className='mt-7'>
        <h1 className='text-2xl font-semibold text-gray-700'>Select Tickets Count</h1>
        <div className="flex flex-wrap gap-2 mt-2">
            {[...Array(10)].map((_, index) => (
                <div 
                 className={`bg-gray-100 border h-8 w-8 rounded-sm flex justify-center items-center cursor-pointer
                    ${ticketCount === index + 1 ? "border-blue-800" : "border-gray-200"}
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
            
            <Button color='primary' onClick={() => setShowPaymentModal(true)}
                isLoading={loading}
            >Book Now</Button>
        </div>

        {showPaymentModal && clientSecret && (
            <Elements stripe={stripePromise} 
            options={{
                clientSecret,
            }}
        >
            <PaymentModal 
                showPaymentModal={showPaymentModal}
                setShowPaymentModal={setShowPaymentModal}
                event={event}
                ticketType={selectedTicketType}
                ticketsCount={ticketCount}
                totalAmount={totalAmount}
            />
        </Elements>
        )}
    </div>
  )
}

export default TicketSelection