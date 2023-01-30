import React from "react";
import './App.css';
import Footer from "./Footer/footer";
import Header from "./Header/header";
import withOpen from "./Main/Electric/withOpen/withOpen";
import Electric from "./Main/Electric/Electric";
import Themperature from "./Main/Themperature/Themperature";
import Consumption from "./Main/Consumption/Consumption";
import {BrowserRouter, Routes, Route, HashRouter} from "react-router-dom";
import WithOpen from "./Main/Electric/withOpen/withOpen";
import WithCase from "./Main/Electric/withСase/withCase";
import WithTwo from "./Main/Electric/withTwo/withTwo";
import Thermal from "./Main/Thermal/Thermal";

function App() {

    return (
        <HashRouter>
            <div className={"wrapper"}>

                <Header/>
                <Routes>
                    <Route path="/" element={<Electric/>}/>
                    <Route path="/group1" element={<WithCase/>}/>
                    <Route path="/group2" element={<WithOpen/>}/>
                    <Route path="/group3" element={<WithTwo/>}/>
                    <Route path="/electric" element={<Electric/>}/>
                    <Route path="/themperature" element={<Themperature/>}/>
                    <Route path="/thermal" element={<Thermal/>}/>
                    <Route path="/consumption" element={<Consumption/>}/>
                </Routes>
                <Footer/>

            </div>
        </HashRouter>
    );
}

export default App;
