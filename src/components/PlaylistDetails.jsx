import React, { Component } from 'react'
import CategoryDetails from './CategoryTags'

import '../styles/PlaylistDetails.css'


export class PlaylistDetails extends Component {
    state = {
        wantToSet: false,
    }

    handleSetup = () => {
        this.setState({wantToSet: true})
    }

    render() {
        const {wantToSet} = this.state

        return (
            <div id="PlaylistDetails">
                <section id="estimated-time" className=" flex blue">
                    <div className="flex">
                        <h3>
                            Estimated <br/>
                            time
                        </h3>
                        <p>
                            632<br/>
                            <span>min</span>
                        </p>
                    </div>

                    {!wantToSet &&
                    <button onClick={this.handleSetup} className="Btn-rounded Btn-blue margin-top-std ">
                        Setup your playlist
                    </button>
                    }
                </section >

                {wantToSet &&
                <section id="playlist-details">
                    <form action="">
                        <h3 className="blue margin-top-std" >Choose a category</h3>
                        <div id="cat-list" className="flex">
                            <CategoryDetails id="20" category="Gaming" />
                            <CategoryDetails id="10" category="Music" />
                            <CategoryDetails id="17" category="Sports" />
                            <CategoryDetails id="19" category="Travel" />
                            <CategoryDetails id="27" category="Education" />
                            <CategoryDetails id="30" category="Movies" />
                            <CategoryDetails id="35" category="Documentary" />
                        </div>

                        <h3 className="blue margin-top-std" >or search by keyword</h3>
                        <input type="text" name="keyword" id="keyword-input" className="blue"/>

                        <button onClick={this.handleCreate} className="Btn-rounded Btn-blue margin-top-std ">
                        Create
                    </button>
                    </form>
                </section>
                }
            </div>
        )
    }
}

export default PlaylistDetails
