import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Mobile} from "./Mobile";

const completeText = {
    presentation:{
        title:"Qui sommes-nous ?",
        text:
            <>
                <h2>Notre société</h2>
                <p>
                    Depuis 2012, année de sa création, VENOM, réseau de distribution commercial, est partenaire d’<bold>ENGIE</bold> (anciennement GDF Suez). Au travers de ces années d’expérience, une seule volonté : celle de permettre aux consommateurs d’avoir accès à une énergie de qualité à un tarif abordable. VENOM est également présent sur des marchés porteurs tels que l’assurance et la presse. Notre société représente ainsi un apport de plus de 30 000 nouveaux clients pour nos partenaires.
                </p>
                <h2>Notre société</h2>
                <p>
                    Depuis 2012, année de sa création, VENOM, réseau de distribution commercial, est partenaire d’<bold>ENGIE</bold> (anciennement GDF Suez). Au travers de ces années d’expérience, une seule volonté : celle de permettre aux consommateurs d’avoir accès à une énergie de qualité à un tarif abordable. VENOM est également présent sur des marchés porteurs tels que l’assurance et la presse. Notre société représente ainsi un apport de plus de 30 000 nouveaux clients pour nos partenaires.
                </p>
                <h2>Notre société</h2>
                <p>
                    Depuis 2012, année de sa création, VENOM, réseau de distribution commercial, est partenaire d’<bold>ENGIE</bold> (anciennement GDF Suez). Au travers de ces années d’expérience, une seule volonté : celle de permettre aux consommateurs d’avoir accès à une énergie de qualité à un tarif abordable. VENOM est également présent sur des marchés porteurs tels que l’assurance et la presse. Notre société représente ainsi un apport de plus de 30 000 nouveaux clients pour nos partenaires.
                </p>
            </>
    },
    partenaire:{
        title:"Partenaire",
        text:<h3>Salut</h3>
    },
    recrutement:{
        title:"Recrutement",
        text:"lorem lorem"
    },
    contact:{
        title:"Nous contacter",
        text:
            <>
                <form>
                    <div className={"row"}>
                        <input type="text" name={"name"} placeholder={"Nom"}/>
                        <input type="text" name={"firstname"} placeholder={"Prénom"}/>
                    </div>
                    <input type="mail" name={"email"} placeholder={"E-mail"}/>
                    <input type="text" name={"sujet"} placeholder={"Sujet"}/>
                    <input type="text" name={"message"} placeholder={"votre message..."}/>
                    <input type="submit" value={"Envoyer"}/>
                </form>
            </>
    }
}

ReactDOM.render(
  <React.StrictMode>
    {/*<App completeText={completeText} />*/}
      <Mobile completeText={completeText} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
