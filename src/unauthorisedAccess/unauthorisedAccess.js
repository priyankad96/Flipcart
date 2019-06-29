import React from 'react';
import styled,{keyframes} from 'styled-components';
import {bounce} from 'react-animations';

const Bounce=styled.div`animation: 2s ${keyframes`${bounce}`} infinite`;

const unauthorisedAccess=()=>(
    <div style={{display:'flex',width:'auto',height:'75vh',alignItems:'center',justifyContent:'center',backgroundColor:'#f0f2f5',margin:19,textAlign:'center'}}>
    <Bounce>
        <h1>
            Oooopss Sorry..!!You don't have permission to access this Page.....!
        </h1>
    </Bounce>
    </div>
)

export default unauthorisedAccess;