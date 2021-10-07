import React, { useState } from 'react'

function GetDatabases() {

    const [dbNames, setDbNames] = useState([])
     
    let dbList = dbNames.map(name =>
        <li>{name}</li>
    )

    async function getDbNames() {
        const backendResp = await fetch("/api/dbs")
        console.log(backendResp)
        const body = await backendResp.json()
        setDbNames(body["express"])
    }

    return(
        <div>
            <button onClick={getDbNames}>Get database list</button>
            <ul>{dbList}</ul>
        </div>
    )
}

export default GetDatabases