import React, { useContext } from 'react'
import { authContext } from './AuthContext';

export default function Posts({post}) {

    const {uid} = useContext(authContext);

    return (

        <div className="card w-50" style={{margin: 'auto', marginTop: '50px', backgroundColor: '#fbeaeb'}}>

            <div>

                <h5 className="card-title text-center bg-dark text-white p-2">{post.name} </h5>

            </div>

            <div className="p-3">

                <img className="card-img-top w-50" src={post.imageUrl} alt={post.name}/>

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