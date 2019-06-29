import React from 'react';
import homelogo from '../../assets/Home.png';

const home = ()=>(
    <div style={{display:'flex',width:'auto',height:'75vh',alignItems:'center',justifyContent:'center',backgroundColor:'#f0f2f5',margin:19}}>
        <img src={homelogo} height={250} width={250}/>
    </div>
);

export default home;