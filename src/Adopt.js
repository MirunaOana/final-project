import React, { useContext, useEffect, useState } from 'react';
import 'firebase/firestore';
import * as firebase from 'firebase/app';
import Posts from './Posts';
import { authContext } from './AuthContext';

export default function Adopt() {

    const postsAux = [];

    const [posts, setPosts] = useState([]);

    console.log(posts);
    
    useEffect(function() {

        firebase.firestore().collection("rehomed").get().then((querySnapshot) => {

            querySnapshot.forEach((doc) => {

                postsAux.push({...doc.data(), id: doc.id});

            });
           
            setPosts(postsAux);
        });

    }, []);

    return (

        <div>

            <h2 className="bg-dark text-white p-4 text-center" style={{opacity: '0.5'}}>Adopt a bunny</h2>

            <div>

                {posts.map(element => <Posts post={ element } key={element.id}/>)}

            </div>

        </div>

    );
}