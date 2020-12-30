import React from 'react'

const Room = ({name}) => {
    return (
        <div className="row">
    <div className="col s12 m7">
      <div className="card">
        <div className="card-content">
          <p>{name}</p>
        </div>
      </div>
    </div>
  </div>
    )
}

export default Room
