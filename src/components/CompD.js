import React from 'react'

function CompD({chairs,clickhandler}) {
    return (
        <div className='section-d'>
            {chairs.map(chair=>(<div className={`chair ${chair.state}`} key={chair.number} onClick={()=>{clickhandler(`${chair.number}`)}}>
                     {chair.number} 
                    </div>))}
        </div>
    )
}

export default CompD
