import React from "react";
import './App.css';
import Footer from "./Footer/footer";
import Header from "./Header/header";
import withOpen from "./Main/Electric/withOpen/withOpen";
import Electric from "./Main/Electric/Electric";
import Thermal from "./Main/Thermal/Thermal";
import Consumption from "./Main/Consumption/Consumption";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import WithOpen from "./Main/Electric/withOpen/withOpen";
import WithCase from "./Main/Electric/withСase/withCase";
import WithTwo from "./Main/Electric/withTwo/withTwo";

function App() {

    return (
        <BrowserRouter>
            <div className={"wrapper"}>

                <Header/>
                <Routes>
                    <Route path="/group1" element={<WithCase/>}/>
                    <Route path="/group2" element={<WithOpen/>}/>
                    <Route path="/group3" element={<WithTwo/>}/>
                    <Route path="/electric" element={<Electric/>}/>
                    <Route path="/thermal" element={<Thermal/>}/>
                    <Route path="/consumption" element={<Consumption/>}/>
                </Routes>
                <Footer/>

            </div>
        </BrowserRouter>
    );
}

export default App;
