import React, { useContext } from 'react'
import { authContext } from './AuthContext';
import * as firebase from 'firebase/app';

export default function Posts({post}) {

    const {uid} = useContext(authContext);

    function deletePost() {

        firebase.firestore().collection("rehomed").doc(`${post.id}`).delete().then(function() {

            window.location.reload('true');

        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    return (

        <div className="card w-50" style={{margin: 'auto', marginTop: '50px', backgroundColor: '#fbeaeb'}}>

            <div className="bg-dark"> 
                
                <input type="button" value="Delete Post" className="btn btn-danger float-right m-2" onClick={deletePost}/>

                <h5 className="card-title text-center text-white p-2">{post.name} </h5>

            </div>

            <div className="p-3">

                <img className="card-img-top w-50 d-block m-auto" src={post.imageUrl} alt={post.name} style={{height: '400px'}}/>

            </div>

            <div className="card-body">

                <ul className="font-weight-bold">

                    <li>{`Age: ${post.age} years`}</li>
                    <li>{`Breed: ${post.breed}`}</li>
                    <li>{`Gender: ${post.gender}`}</li>
                    <li>{`Neutred: ${post.neutred ? 'Yes' : 'No'}`}</li>

                </ul>

                <footer>

                    {uid !== post.uid ? (

                    <>

                        <span>
                            
                            <input className="btn font-weight-bold btn-dark" type="button" value="Adopt &#10084;"/>

                        </span>
                        

                        <span className="float-right font-weight-bold text-muted mt-2">Posted by {post.user}</span>

                    </>

                    ) : (

                        <span className="float-right font-weight-bold text-muted mt-2">You posted this</span>

                    )}

                </footer>

            </div>

        </div>

    );

}