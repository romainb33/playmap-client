import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import axios from "axios";

// CSS
import '../styles/Itinerary.css'
// Components
import Logo from '../components/Logo'
import PlaylistDetails from '../components/PlaylistDetails'

export class Itinerary extends Component {
    state = {
        isSubmit: false,
        arrivalSelected: false,
        departureSelected: false,
        duration: null,
        departure: {
          address: "",
          coordinates: [], //[longitude, latitude]
        },
        arrival: {
          address: "",
          coordinates: [] //[longitude, latitude]
        },
        travelMode: "", // value = driving-traffic, walking, cycling
        results: [],   
        search:"", 
    }

    clearSearch = () => {
      this.setState({search: "", results:[]})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({isSubmit: true})
        console.log("handleSubmit")
        this.handleDuration()
        
    }
    
    handleChange = (event) => {
      const value = event.target.value;
      const key = event.target.name
      if (key === "departure") {
          let departure = {...this.state.departure}
          departure.address = value
          this.setState({departure, departureSelected: false});
      } else if (key === "arrival") {
          let arrival = {...this.state.arrival}
          arrival.address = value
          this.setState({arrival, arrivalSelected: false});
      } else {
          this.setState({[key]: value});
      }
    }

    selectAddress = (type, place) => {
      if (type === "departure") {
        let departure = {...this.state.departure}
        departure.address = place.place_name;
        departure.coordinates = place.geometry.coordinates
        this.setState({departure, departureSelected: true});
      } 
      else if (type === "arrival") {
        let arrival = {...this.state.arrival}
        arrival.address = place.place_name;
        arrival.coordinates = place.geometry.coordinates
        this.setState({arrival, arrivalSelected: true});
      }
      this.setState({search: "", results: []});
    }
    
    
    handleAutoComplete = (input) => {
      const {search} = this.state
      if (input.address.length > 10 ) {
        this.setState({search: encodeURI(input.address)}, () => {
          axios
          .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}&cachebuster=1620662989569&autocomplete=true&types=address%2Cplace%2Cpoi&limit=7`)
          .then(response => {
            this.setState({results: response.data.features })
          })
          .catch(err => console.log(err))
        })
      }
    }
      
    handleDuration = () => {
      console.log("handleDuration")
      const {departure, arrival, travelMode} = this.state  
      if (travelMode === "car") {
      } else {
        console.log(`https://transit.router.hereapi.com/v8/routes?apiKey=${process.env.REACT_APP_HERE_TOKEN}&origin=${departure.coordinates[1]},${departure.coordinates[0]}&destination=${arrival.coordinates[1]},${arrival.coordinates[0]}&return=travelSummary&modes=-inclined,-aerial,-flight,-spaceship`
        )
        
        axios.get(
          `https://transit.router.hereapi.com/v8/routes?apiKey=${process.env.REACT_APP_HERE_TOKEN}&origin=${departure.coordinates[1]},${departure.coordinates[0]}&destination=${arrival.coordinates[1]},${arrival.coordinates[0]}&return=travelSummary&modes=-inclined,-aerial,-flight,-spaceship`
        )
        .then(res => {
          console.log(res)
          const sections = res.data.routes[0].sections;
          let transitDuration = 0;
          sections.forEach(section => transitDuration += section.travelSummary.duration)
          return transitDuration
        })
        
        .then(transitDuration => {
          console.log(transitDuration)
          this.setState({duration: transitDuration}, () => console.log(this.state.duration))
        })
        .catch(err => console.log(err))
      }
    }

    componentDidUpdate(prevProps, prevState) {
      let {departure, arrival, search} = this.state
      if (prevState.departure.address !== departure.address) {
        this.handleAutoComplete(departure)
        
      }
      if (prevState.arrival.address !== arrival.address) {
        this.handleAutoComplete(arrival)
      }
    }

    render() {
        const {isSubmit, duration, departure, arrival, results, departureSelected, arrivalSelected} = this.state
            
        return (
          <div className="flex Itinerary">
            <section className="white">
              <Logo />

              <form
                onSubmit={this.handleSubmit}
                action="POST"
                id="form-itinerary"
                className="flex"
              >
                <div className="relative flex">
                  <label htmlFor="departure">Departure</label>
                  <input
                    type="text"
                    name="departure"
                    id="departure"
                    placeholder="|"
                    onClick={this.clearSearch}
                    onChange={this.handleChange}
                    value={departure.address}
                    required
                  />
                  {departure.address && results.length > 0 && !departureSelected &&
                  <ul className="dropdown-results">
                      {results.map((place) => (
                          <li
                          onClick={() => this.selectAddress("departure", place)}
                          key={place.id}
                          >
                          {place.place_name}
                          </li>
                      ))}
                  </ul>
                  }
                </div>
                
                <div className="relative flex">  
                  <label htmlFor="arrival">Arrival</label>
                  <input
                    type="text"
                    name="arrival"
                    id="arrival"
                    placeholder="|"
                    onClick={this.clearSearch}
                    onChange={this.handleChange}
                    value={arrival.address}
                    required
                  />
                  {arrival.address && results.length > 0 && !arrivalSelected && 
                  <ul className="dropdown-results" >
                      {results.map((place) => (
                          <li
                          onClick={() => this.selectAddress("arrival", place)}
                          key={place.id}
                          >
                          {place.place_name}
                          </li>
                      ))}
                  </ul>
                  }
                </div>

                <label htmlFor="mode">Travel Mode</label>
                <div id="travel-mode" className="flex">
                  <div>
                    <input
                      type="radio"
                      name="mode"
                      id="car"
                      value="DRIVING"
                      required
                    />
                    <label htmlFor="car">Car</label>
                  </div>
                  <div>
                    <input type="radio" name="mode" id="walk" value="WALKING" />
                    <label htmlFor="walk">Walk</label>
                  </div>
                  <div>
                    <input type="radio" name="mode" id="bus" value="BUS" />
                    <label htmlFor="bus">Bus</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="mode"
                      id="subway"
                      value="SUBWAY"
                    />
                    <label htmlFor="subway">Subway</label>
                  </div>
                </div>

                {!isSubmit && (
                  <button
                    id="submit-itinerary"
                    className="Btn-rounded margin-top-std "
                  >
                    Submit
                  </button>
                )}
              </form>

              {isSubmit && <PlaylistDetails duration={duration} />}
            </section>
          </div>
        );
    }
}

export default Itinerary
