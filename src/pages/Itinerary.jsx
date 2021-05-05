import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Itinerary.css'

import Logo from '../components/Logo'
import PlaylistDetails from '../components/PlaylistDetails'

export class Itinerary extends Component {
    state = {
        isSubmit: false,
        duration: null
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({isSubmit: true})
    }

    render() {
        const {isSubmit, duration} = this.state

        return (
            <div className="flex Itinerary">
                <section className="white">
                    <Logo />

                    <form onSubmit={this.handleSubmit} action="POST" id="form-itinerary"className="flex">
                        <label htmlFor="origin">Departure</label>
                        <input type="text" name="origin" id="origin" placeholder="|"required />

                        <label htmlFor="destination">Arrival</label>
                        <input type="text" name="destination" id="destination" placeholder="|" required />

                        <label htmlFor="mode">Travel Mode</label>
                        <div id="travel-mode" className="flex">
                            <div>
                                <input type="radio" name="mode" id="car" value="DRIVING" required/>
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

                        { !isSubmit && <button id="submit-itinerary" className="Btn-rounded margin-top-std ">Submit</button> }
                    </form>
                    
                    { isSubmit && <PlaylistDetails duration={duration} /> }

                </section>
            </div>
        )
    }
}

export default Itinerary
