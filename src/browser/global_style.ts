import { createGlobalStyle } from 'styled-components'

export const DashboardGlobalStyle = createGlobalStyle`
  * {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
     overflow: hidden;
     font-family: 'Noto Sans JP', sans-serif;
     color:#fff;
  }
  body {
    position: relative;
  }
 `

export const GraphicsGlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow: hidden;
    font-family: 'Noto Sans JP', sans-serif;
    color:#fff;
  }
  
  html,body{
    width:1920px;
    height:1080px;
    margin: 0;
    padding: 0;
  }

  body {
    position: relative;
  }

`
