import React from 'react'

function CompA({chairs,clickhandler}) {
    return (
        <div className='section-a'>
            {chairs.map(chair=>(<div className={`chair ${chair.state}`} key={chair.number} onClick={()=>{clickhandler(`${chair.number}`)}}>
                     {chair.number} 
                    </div>))}
        </div>
    )
}

export default CompA
