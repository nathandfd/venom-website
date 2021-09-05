import './LoadingScreen.scss'
import * as ReactDOM from "react-dom";

export const LoadingScreen = ()=>{
    return(
        ReactDOM.createPortal(
            <div className={"loadingScreen"}>
                <h1>Chargement...</h1>
                <div className="loader-animation">
                    <div className={"animation-container"}>
                        <div className={"animation-rect"}></div>
                        <div className={"animation-rect"}></div>
                        <div className={"animation-rect"}></div>
                    </div>
                    <div className="logo-container">
                        <div className="v-logo"></div>
                    </div>
                </div>
        </div>,document.getElementById('loader'))
    )
}