import React from 'react'
import { EventFormStepProps } from './General'
import { Button, Input } from '@nextui-org/react'

function LocationAndDate({event , setEvent, activeStep , setActiveStep} : EventFormStepProps) {
  return (
    <div className='flex flex-col gap-5'>
      
      <Input label='Location' 
              placeholder='Location' 
              value={event?.location}
              onChange={(e) => setEvent({ ...event, location: e.target.value })}
              isRequired
              labelPlacement='outside'
      />
      <div className="flex gap-5">
      <Input label='Date' 
              placeholder='Date' 
              value={event?.date}
              onChange={(e) => setEvent({ ...event, date: e.target.value })}
              type="date"
              isRequired
              labelPlacement='outside'
      />

      <Input label='Time' 
              placeholder='Time' 
              value={event?.time}
              onChange={(e) => setEvent({ ...event, time: e.target.value })}
              type="time"
              isRequired
              labelPlacement='outside'
      />
      </div>

      <div className="flex justify-center gap-5">
      <Button onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
      <Button onClick={() => setActiveStep(activeStep + 1)} color='primary'
      isDisabled={!event?.location || !event?.date || !event?.time}
      >Next
      </Button>
      </div>
    </div>
  );
}

export default LocationAndDate