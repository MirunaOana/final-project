import React from 'react';

export default function About() {

    return ( 

        <div className="w-50 rounded border" style={{backgroundColor: '#fbeaeb', margin: 'auto', marginTop: '140px'}}>

            <div>

                <h3 className="bg-dark text-white p-2"> Bunny Care </h3>

                <p className="p-3 font-weight-bold" style={{color: '#A9A9A9'}}>At Bunny Care we provide useful information for bunny owners. There are plenty of websites that provide useful documentations about dogs and cats, the most common pets, but on the internet there isn't much information about raising a bunny properly. After all a pet is like a dumber child, but more cute. Many people don't see pets like a responsability and sometimes they get bored of them and choose to get rid of them in many ways, without thinking that they are also beings, or they read or hear undocumented pieces of information and they end up wrongfully raising their bunny and unfortunately the pet ends up dying in many cases. Bunny Care also allows users to interact with each other in order to share their experiences about their pets, to recommend skilled vets, as many of them don't have the experience that is necessary about bunnys and to rehome their pet to a more capable person to raise it, if they don't feel up to it.</p>

            </div>

            <div>

                <h5 className="bg-dark text-white p-2">Rules</h5>

                <p className="p-3 font-weight-bold" style={{color: '#A9A9A9'}}>As every other website that allows user interaction, this website has some rules. The antisocial behavior is not allowed, in case you see a user that doesn't behave properly (posts rude comments or they harass you, his/her posts aren't related to the topic) you can report them and in a short time, if their profile matches your complain the user will be deleted after the investigation, or their reported post/comment will be deleted. </p>

            </div>

        </div>
    );
}