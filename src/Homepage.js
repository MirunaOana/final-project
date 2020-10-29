import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase/app';

export default function Homepage() {

    return (

        <div className="w-75" style={{backgroundColor: '#fbeaeb', margin: 'auto', marginTop: '130px'}}>

            <h2 className="bg-dark text-white p-3 text-center">Welcome to Bunny Care</h2>

            <div className="p-3 text-muted font-weight-bold">Bunny Care is here for the bunnies that need a loving family to raise them. We adopt bunnies from people who can't afford to raise them or they don't feel up to it and we rehome them.</div>

            <h4 className="bg-dark text-white p-3 text-center">Adopt a bunny</h4>

            <div className="p-3">There are plenty of bunnies waiting to be adopted, you just need to create an account and look up for a bunny in the <a href="/adopt">Adopt</a> section.</div>

            <h4 className="bg-dark text-white p-3 text-center">Rehome a bunny</h4>

            <div className="p-3">You can rehome a bunny and as soon someone adopts it, someone capable of raising it will take care of your bunny. All you have to do is to click the <a href="/rehome">Rehome</a> section.</div>

            <h4 className="bg-dark text-white p-3 text-center">Get in contact with us</h4>

            <div className="p-3">If you have any questions you can contact us, just go to the <a href="/contact">Contact</a> section, send us a message and we will respond as soon as possible</div>

        </div>

    );
}