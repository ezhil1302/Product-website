import React from 'react'
import {} from "antd"
import "./App.css"
import Header from './components/header/Header'
import PageContent from './components/pagecontent'
import Footer from './components/footer/Footer'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
        <BrowserRouter>
        <Header/>
       <PageContent/>
       <Footer/>
        </BrowserRouter>
    </div>
  )
}

export default App