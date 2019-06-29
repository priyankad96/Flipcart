import React from 'react';
import styled,{keyframes} from 'styled-components';
import {bounce} from 'react-animations';

const Bounce=styled.div`animation: 2s ${keyframes`${bounce}`} infinite`;

const pageNotFound=()=>(
    <div style={{display:'flex',width:'auto',height:'75vh',alignItems:'center',justifyContent:'center',backgroundColor:'#f0f2f5',margin:19}}>
       <Bounce>
        <h1>
        Oooopss Sorry..!!Page Not Found.....!
        </h1>
       </Bounce>
    </div>
)

export default pageNotFound;