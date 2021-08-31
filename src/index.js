import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Mobile} from "./Mobile";
import {
    BrowserView,
    MobileView,
} from "react-device-detect";

const completeText = {
    presentation:{
        title:"Qui sommes-nous ?",
        text:
            <>
                <h2>Notre société</h2>
                <p>
                    Depuis 2012, année de sa création, VENOM, réseau de distribution commercial, est partenaire d’<bold>ENGIE</bold> (anciennement GDF Suez). Au travers de ces années d’expérience, une seule volonté : celle de permettre aux consommateurs d’avoir accès à une énergie de qualité à un tarif abordable. VENOM est également présent sur des marchés porteurs tels que l’assurance et la presse. Notre société représente ainsi un apport de plus de 30 000 nouveaux clients pour nos partenaires.
                </p>
                <h2>Nos valeurs</h2>
                <p>
                    Chez Venom, nous préférons à un grand CV la persévérance, l'ambition, le courage et le goût du challenge. C'est pourquoi nous ne recrutons pas uniquement des commerciaux expérimentés. Toute personne motivée avec peu d'expérience peut ainsi prétendre à débuter sa carrière chez Venom. Votre réussite est aussi notre priorité, c'est pourquoi vous aurez la possibilité d'évoluer au sein de notre société. Le plus important est que vous ayez l'envie de réussir et que vous n'ayez pas peur de la difficulté, alors soyez ambitieux et rejoignez-nous !                </p>
                <h2>Notre savoir-faire</h2>
                <p>
                    Chez Venom, nous ne laissons pas la place au hasard. Nos équipes et nos forces de vente sont formées afin d'être les plus efficaces possible. La qualité est un point essentiel au sein de notre société.                </p>
            </>
    },
    partenaire:{
        title:"Partenaire",
        text:
            <>
                <h2>Qui est ENGIE ?</h2>
                <p>
                    ENGIE, partenaire principal de Venom, est un acteur mondial de l’énergie et expert dans 3 métiers : l’électricité, le gaz naturel et les services à l’énergie. Le Groupe fournit à ses clients des solutions de haute technologie pour répondre à leurs besoins et relever les défis énergétiques de demain. ENGIE soutient également une évolution de la société dans une transition énergétique qui repose autant sur le développement économique que le progrès social et la préservation des ressources naturelles.
                </p>
            </>
    },
    recrutement:{
        title:"Recrutement",
        text:
            <>
                <h2>Nous recrutons</h2>
                <p>
                    Réseau de distribution commercial, Venom recrute à travers toute la France pour mener à bien ses objectifs. Conseillers Commerciaux, Managers Commerciaux ou encore Directeurs d'agences, nous recherchons nos futurs collaborateurs. Vous pensez avoir l'âme d'un super-héros de la vente ? Lancez-vous et rejoignez notre société.
                </p>
                <h2>Vos avantages</h2>
            </>
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
      <BrowserView>
          <App completeText={completeText} />
      </BrowserView>
      <MobileView>
          <Mobile completeText={completeText} />
      </MobileView>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
