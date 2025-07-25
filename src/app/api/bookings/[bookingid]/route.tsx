import { connectDB } from "@/config/dbConfig";
import BookingModel from "@/models/booking-model";
import { NextRequest , NextResponse } from "next/server";
import {auth} from "@clerk/nextjs";

connectDB();

export async function PUT(
    request: NextRequest,
     { params } : { params: { bookingid: string }}
     ) {
    try {
        const { userId } = auth();
        if (!userId)
         return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        const reqBody = await request.json();
        await BookingModel.findByIdAndUpdate(params.bookingid, reqBody);
        return NextResponse.json(
            { message: "Booking Updated Successfully" },
            { status: 201 }
        );
    } catch (error:any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }   
}