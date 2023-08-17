import React from 'react'

function CompB({chairs,clickhandler}) {
    return (
        <div className='section-b'>
            {chairs.map(chair=>(<div className={`chair ${chair.state}`} key={chair.number} onClick={()=>{clickhandler(`${chair.number}`)}}>
                     {chair.number} 
                    </div>))}
        </div>
    )
}

export default CompB
