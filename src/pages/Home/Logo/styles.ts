import styled from 'styled-components';

export const Logotype = styled.div`
    width=100%;
    position: relative;
    & img {
        width: 600px;
        filter: drop-shadow( -3px 0 0 #888);
    }
    & p {
        font-size: 70px;
        font-family: Courier;
        position: absolute;
        bottom: -5px;
        left: 70px;
        text-shadow: -3px 0 0 #fff;
        color: #ffcb00;
        user-select: none;
        
    }
`