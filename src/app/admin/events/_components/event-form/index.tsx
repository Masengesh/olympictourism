'use client'
import React from 'react';
import Steps from '@/components/Steps';
import General from './General';
import LocationAndDate from './LocationAndDate';
import Media from './Media';
import Tickets from './Tickets';
import { uploadImagesToFirebaseAndGetUrls } from '@/helpers/image-upload';
import toast from 'react-hot-toast';
import axios from 'axios'
import { useRouter } from 'next/navigation';

function EventForm() {
    const [activeStep = 0, setActiveStep] = React.useState<number>(0);
    const [newlySelectedImages = [], setNewlySelectedImages] = React.useState<any[]>([]);
    const [event , setEvent] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const router = useRouter();
    const onSubmit = async (e: any) => {
        try {
            setLoading(true);
            e.preventDefault();
            event.images = await uploadImagesToFirebaseAndGetUrls(newlySelectedImages.map((image: any) => 
            image.file)
            );
            await axios.post("/api/admin/events", event);
            toast.success("Event created successfully");
            router.refresh();
            router.push("/admin/events");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false)
        };
    };
    const commonProps = {
        event,
        setEvent,
        activeStep,
        setActiveStep,
        newlySelectedImages,
        setNewlySelectedImages,
        loading, 
    };

  return (
    <div>
        <form onSubmit={onSubmit}>
        <Steps 
            stepNames={["General", "Location & Date", "Media", "Tickets"]}
            stepsContent={[
                <General {...commonProps} />,
                <LocationAndDate {...commonProps}/>,
                <Media {...commonProps}/>,
                <Tickets {...commonProps}/>,
            ]}
            activeStep={activeStep}
        />
        </form>
    </div>
  );
}
export default EventForm;