import React from 'react'
import  './styles.css'

function Score(data) {
    return (
        <div style={{display:`${data.visible ? 'block':'none'}`}} className="scoreHolder">
            <div className='title'>{data.data[0]} <span style={{color:'#3AA12F'}}>DKS</span></div>
            <hr style={{color:'white'}} />
            <div style={{backgroundColor:'#F7E09E'}} className="datas">
                <span>Correct:</span> <span style={{color:'#4E6E39'}}> {data.data[0]} </span>
            </div>
            <div style={{backgroundColor:'#F7E09E'}} className="datas">
                <span>Wrong:</span> <span style={{color:'#D61909'}}> {data.data[1]} </span>
            </div>
            <div style={{backgroundColor:'#F7E09E'}} className="datas">
                <span>Correctness (%):</span> <span style={{color:'#48C739'}}> {parseFloat((100*(data.data[0])/(data.data[0]+data.data[1])).toFixed(2))}% </span>
            </div>
        </div>
    )
}

export default Score
