import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

const Home = () => {
    return (
        <div className="flex Home white">
            <section>
                <h6>Welcome on</h6>
                <h1>Playmap.</h1>

                <p>
                Stop being frustrated and stopped in a middle of a video.
                </p>
                <p>
                With Playmap your video playlist correspond to the length of your travel
                </p>
            </section>    
            <section>
                <p className="instructions">
                    Enter your travel length (in minutes)
                </p>
                <input type="number" name="duration" id="duration-input" placeholder="62min"/>

                <p>Or</p>
                <Link to="/itinerary">
                    <button className="Btn-rounded">Create your itinerary</button>
                </Link>
            </section>
        </div>
    )
}

export default Home
