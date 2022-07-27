import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
    :root{
        --white : #ecdbba;
        --black : #191919;
        --red : #c84b31;
        --blue: #2d4263;
        --textSmall: 12px;
        --textMedium: 15px;
    }
    body{
        background-color: var(--black);
        font-family: 'Roboto', sans-serif;
        color: var(--white);
    }
    h1{
        color : var(--red);
    }
    table, td, th{
        color: var(--white);
    }
`;
