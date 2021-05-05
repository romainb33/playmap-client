import React, { Component } from 'react'

export class PlaylistDetails extends Component {
    render() {
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

                    <button className="Btn-rounded Btn-blue margin-top-std ">
                        Create your playlist
                    </button>
                </section>

                <section>

                </section>
            </div>
        )
    }
}

export default PlaylistDetails
