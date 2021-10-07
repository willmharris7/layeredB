import React, { useState } from 'react'

function SearchBedrooms() {

    const [formInput, setFormInput] = useState("")
    const [bedroomNames, setBedroomNames] = useState([])

    let bedroomList = bedroomNames.map(name => 
        <li>{name}</li>
    )
    
    async function handleSubmit(e: any) {
        e.preventDefault()
        const backendResp = await fetch('/api/bedrooms', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"test_key": formInput})
        })
        const body = await backendResp.json()
        setBedroomNames(body["express"])
    }

    return(
        <div>
            <span> Select number of bedrooms </span>
            <form onSubmit={handleSubmit}>
                <input type="number" onChange={e => setFormInput(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
            <ul>{bedroomList}</ul>
        </div>
    )
}

export default SearchBedrooms