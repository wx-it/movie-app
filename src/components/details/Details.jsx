import React from 'react'

const Details = ({find}) => {
  return (
    <div>
       <img
          src={`https://image.tmdb.org/t/p/w1280/${find.poster_path}`}
          alt={find.title}
        />
      <h1> {find.title} </h1>
      <p> {find.overview} </p>
    </div>
  )
}

export default Details