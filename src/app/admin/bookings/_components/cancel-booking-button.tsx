"use client";
import { BookingType } from '@/interfaces/events'
import { Button } from '@nextui-org/react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

function CancelBookingBtn({ booking }: { booking: BookingType }) {

  const [loading , setLoading] = React.useState(false);
  const router = useRouter();

  const cancelBooking = async () => {
    try {
      setLoading(true);
      await axios.put(`/api/bookings/${booking._id}`, {
        status: "Cancelled"
      });
      toast.success("Booking cancelled successfully");
      router.refresh();
    } catch (error) {
      toast.error("Cancelling booking Error");
    } finally{
      setLoading(false);
    }
  };
  return (
    <div className='p-3'>
        <Button color='danger' isLoading={loading} onClick={cancelBooking}>CancelBookingBtn</Button>
    </div>
  );
}

export default CancelBookingBtn