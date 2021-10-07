import React, { useState } from 'react'

function GetTop5() {
    
    const [top5Names, setTop5Names] = useState([])

    let top5List = top5Names.map(name =>
        <li>{name}</li>
    )

    async function getTop5Names() {
        const backendResp = await fetch("/api/top5")
        const body = await backendResp.json()
        setTop5Names(body["express"])
    }

    return(
        <div>
            <button onClick={getTop5Names}>Get 5 AirBnB listings</button>
            <ul>{top5List}</ul>
        </div>
    )
}

export default GetTop5