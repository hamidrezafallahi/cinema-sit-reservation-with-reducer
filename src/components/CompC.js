import React from 'react'

function CompC({chairs,clickhandler}) {
    return (
        <div className='section-c'>
             {chairs.map(chair=>(<div className={`chair ${chair.state}`} key={chair.number} onClick={()=>{clickhandler(`${chair.number}`)}}>
                     {chair.number} 
                    </div>))}
        </div>
    )
}

export default CompC
