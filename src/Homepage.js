import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase/app';

export default function Homepage() {

    const [homePost, setHomePost] = useState([]);

    const homePostAux = [];

    useEffect(function() {

        firebase.firestore().collection("rehomed").get().then((querySnapshot) => {

            querySnapshot.forEach((doc) => {

                homePostAux.push({...doc.data(), id: doc.id});

            });
           
            setHomePost(homePostAux);
        });

    }, []);

    return (

        <div className="w-75 m-auto" style={{backgroundColor: '#fbeaeb'}}>

            <h2 className="bg-dark text-white p-3 text-center">Welcome to Bunny Care</h2>

            <div className="p-3 text-muted font-weight-bold">Bunny Care is here for the bunnies that need a loving family to raise them. We adopt bunnies from people who can't afford to raise them or they don't feel up to it and we rehome them.</div>

            <h4 className="bg-dark text-white p-3 text-center">Adopt a bunny</h4>

            <div className="card w-50" style={{margin: 'auto', marginTop: '50px'}}>

            <div>

                <h5 className="card-title text-center bg-dark text-white p-2" onClick={() => console.log(homePost[0].name)}>{homePost.name} </h5>

            </div>

            <div className="p-3">

                <img className="card-img-top w-50" src={homePost.imageUrl} alt={homePost.name}/>

            </div>

            <div className="card-body">

                <ul className="font-weight-bold">

                    <li>{`Age: ${homePost.age} years`}</li>
                    <li>{`Breed: ${homePost.breed}`}</li>
                    <li>{`Gender: ${homePost.gender}`}</li>
                    <li>{`Neutred: ${homePost.neutred ? 'Yes' : 'No'}`}</li>

                </ul>

                <footer>

                        <span>
                            
                            <input className="btn font-weight-bold btn-dark" type="button" value="Adopt &#10084;"/>

                        </span>
     
                </footer>

            </div>

        </div>


        </div>

    );
}