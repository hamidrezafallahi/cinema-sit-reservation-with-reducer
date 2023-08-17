import React, { useEffect, useReducer} from 'react'
import axios from 'axios'
import '../styles/mystyle.scss'
import CompA from './CompA'
import CompB from './CompB'
import CompC from './CompC'
import CompD from './CompD'
function Sections() {
    const initdata = {
        chairs: [],
        error: "",
        count: 0,
        sum: 0
    }
    const reducer = (state=initdata, action) => {
        switch (action.type) {
            case ("success"): return { ...state, chairs: action.chairs };
            case ("failed"): return { ...state, error: action.error };
            case ("change-state"): return { ...state, chairs: action.chairs };
            case ("count"): return { ...state, sum: action.sum, count: action.count };
            default: return state;
        }
    }
    const [data, dispatch] = useReducer(reducer, initdata)
    useEffect(() => {
        axios.get('../../chairs.json')
            .then((response) => dispatch({
                type: "success",
                chairs: response.data
            }))
            .catch((error) => dispatch({
                type: "failed",
                error: error.message
            }))
    }, [])
    const clickhandler = (number) => {
        console.log(number)
        switch (data.chairs[number - 1].state) {
            case "unselected":
              data.chairs[number - 1].state = "selected";
              break;
            case "selected":
              data.chairs[number - 1].state = "pending";
              break;
            case "pending":
              data.chairs[number - 1].state = "reserved";
              break;
            case "reserved":
              alert("قبلا رزرو شده");
              break;
              default : return {...data}
          }
        dispatch({
            type:"change-state",
            chairs:data.chairs
        })
        if(data.chairs[number - 1].state === "reserved"){
            const reservedchairs = data.chairs.filter(chair=>chair.state==="reserved");
            let count=reservedchairs.length;
            let sum = 0;
            for (let index = 0; index < reservedchairs.length; index++) {
                const element = reservedchairs[index];
                sum += element.price;
            }
            dispatch({
                type:"count",
                count:count,
                sum:sum
            })
        }
    }
    return (
        <>
            <div className="space">
                <div className='header'>
                    <button disabled> <h1>stage</h1> </button>
                    <div>
                        <span>count is : {data.count}</span><br/>
                        <span>sum is : {data.sum}</span>
                    </div>
                </div>
                <div className='chair-containers'>
                    <div className='closer'>
                        <CompB chairs={data.chairs.filter((chair)=>chair.section === "B")} clickhandler={clickhandler} />
                        <CompA chairs={data.chairs.filter((chair)=>chair.section === "A")} clickhandler={clickhandler}/>
                        <CompC chairs={data.chairs.filter((chair)=>chair.section === "C")} clickhandler={clickhandler}/>
                    </div>
                    <CompD chairs={data.chairs.filter((chair)=>chair.section === "D")} clickhandler={clickhandler}/>
                </div>
            </div>

        </>
    )
}

export default Sections
