import { NextRequest, NextResponse } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(request : NextRequest) {
    try { 
        //generate client secrete
        const reqBody = await request.json();
        const amount = reqBody.amount;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            metadata: { integration_check: "accept_a_payment" },
            description : "Biento payment"
        });

        const clientSecret = paymentIntent.client_secret;
        console.log(clientSecret);
        return NextResponse.json({ clientSecret: clientSecret });
        
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, {status: 500 });
    }
}