import PageTitle from '@/components/PageTitle'
import EventModel from '@/models/event-model';
import React from 'react'
import EventsTableForReports from './_component/reports-for-events';
import { connectDB } from '@/config/dbConfig';

connectDB();
async function ReportsPage() {
  const events = await EventModel.find({});
  return (
    <div>
        <PageTitle title='Reports' />
        <EventsTableForReports events={JSON.parse(JSON.stringify(events))}/>
    </div>
  );
}

export default ReportsPage