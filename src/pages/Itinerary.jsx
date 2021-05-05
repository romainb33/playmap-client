import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Itinerary.css'

import Logo from '../components/Logo'

const Home = () => {
    return (
        <div className="flex Itinerary">
            <section className="white">
                <Logo />

                <form action="POST" id="form-itinerary"className="flex">
                    <label htmlFor="origin">Departure</label>
                    <input type="text" name="origin" id="origin" placeholder="|"required />

                    <label htmlFor="destination">Arrival</label>
                    <input type="text" name="destination" id="destination" placeholder="|" required />

                    <label htmlFor="mode">Travel Mode</label>
                    <div id="travel-mode" className="flex">
                        <div>
                            <input type="radio" name="mode" id="car" value="DRIVING" checked/>
                            <label htmlFor="car">Car</label>
                        </div>
                        <div>
                            <input type="radio" name="mode" id="walk" value="WALKING"/>
                            <label htmlFor="walk">Walk</label>
                        </div>
                        <div>
                            <input type="radio" name="mode" id="bus" value="BUS"/>
                            <label htmlFor="bus">Bus</label>
                        </div>
                        <div>
                            <input type="radio" name="mode" id="subway" value="SUBWAY"/>
                            <label htmlFor="subway">Subway</label>
                        </div>
                    </div>

                    <button id="submit-itinerary" className="Btn-rounded">Submit</button>
                </form>

            </section>
        </div>
    )
}

export default Home
