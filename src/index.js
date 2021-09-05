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
import {Cursor} from "./Components/Cursor";

const cursorRef = React.createRef()

const completeText = {
    presentation:{
        title:"Qui sommes-nous ?",
        text:
            <>
                <h2>Notre société</h2>
                <p>
                    Depuis 2012, année de sa création, VENOM, réseau de distribution commercial, est partenaire d’<bold>ENGIE</bold> (anciennement GDF Suez). Au travers de ces années d’expérience, une seule volonté : celle de permettre aux consommateurs d’avoir accès à une énergie de qualité à un tarif abordable. VENOM est également présent sur des marchés porteurs tels que l’assurance et la presse. Notre société représente ainsi un apport de plus de 30 000 nouveaux clients pour nos partenaires.
                </p>
                <p>
                    Nous mobilisons ainsi nos forces de vente au travers de toute la France. Ces dernières sont chargées de promouvoir les offres de nos partenaires, aux particuliers, mais aussi aux professionnels, dans le but de leur permettre de réaliser des économies. Ainsi, nous recrutons des commerciaux partout en France afin de mener à bien ces objectifs.
                </p>
                <h2>Nos valeurs</h2>
                <h3>Défendre les consommateurs</h3>
                <p>
                    L'objectif de VENOM est de défendre les intérêts des consommateurs et de leur proposer des solutions toujours adaptées à leurs besoins et à leurs possibilités. Notre service qualité prend ainsi le temps d'écouter chacun de nos clients, afin de cibler au mieux les attentes et les besoins réels de ces derniers. La satisfaction de nos clients est notre priorité.
                </p>
                <h3>Offrir un service de qualité</h3>
                <p>
                    Malgré une croissance notable, nos valeurs n'ont pas changé depuis la création de notre société : la qualité de service, le conseil personnalisé envers nos clients et des méthodes commerciales soucieuses du respect de l’éthique de nos partenaires restent au cœur de notre ADN.
                </p>
                <h2>Notre savoir-faire</h2>
                <p>
                    Chez VENOM, nous ne laissons pas la place au hasard. Nos équipes et nos forces de vente sont formées afin d'être les plus efficaces possible. La qualité est un point essentiel au sein de notre société.
                </p>
            </>
    },
    partenaire:{
        title:"Partenaire",
        text:
            <>
                <h2>Qui est ENGIE ?</h2>
                <p>
                    ENGIE, partenaire principal de VENOM, est un acteur mondial de l’énergie et expert dans 3 métiers : l’électricité, le gaz naturel et les services à l’énergie. Le Groupe fournit à ses clients des solutions de haute technologie pour répondre à leurs besoins et relever les défis énergétiques de demain. ENGIE soutient également une évolution de la société dans une transition énergétique qui repose autant sur le développement économique que le progrès social et la préservation des ressources naturelles.
                </p>
                <h2>Engagements</h2>
                <h3>Climat et environnement</h3>
                <p>
                    En développant les énergies renouvelables et en optimisant l’efficacité énergétique de son parc de production, ENGIE contribue à la lutte contre le changement climatique.
                </p>
                <h3>Accès à l’énergie pour tous</h3>
                <p>
                    Dans le cadre de ses activités industrielles, ENGIE souhaite contribuer à l’accès à l’énergie durable pour tous et lutter contre les précarités énergétiques. Le Groupe a développé des modèles innovants pour soutenir des projets d’accès à l’énergie pour les populations vulnérables.
                </p>
                <h3>Recherche et Technologies</h3>
                <p>
                    Le succès d’ENGIE repose sur sa capacité à innover. Pour s’engager au mieux dans la transition énergétique et anticiper les besoins futurs des marchés, les innovations technologiques permettent un meilleur contrôle de la consommation et production d’énergie.
                </p>
                <h2>Nos autres partenaires</h2>
                <p>
                    ENGIE est en effet le partenaire principal de JL Distrib, mais il est loin d'être le seul. Notre société JL Distrib travaille également sur d'autres marchés porteurs tels que l'assurance et la presse, pour lesquelles nos forces de vente proposent les offres les plus compétitives du marché.
                </p>
            </>
    },
    recrutement:{
        title:"Recrutement",
        text:
            <>
                <h2>Nos valeurs</h2>
                <p>
                    Chez JL Distrib, nous préférons à un grand CV, la persévérance, l'ambition, le courage et le goût du challenge. C'est pourquoi nous ne recrutons pas uniquement des collaborateurs expérimentés. Toute personne motivée avec peu d'expérience peut ainsi prétendre à rejoindre notre société et nos équipes.
                </p>
                <p>
                    Votre réussite est notre objectif, c'est pourquoi vous aurez la possibilité d'évoluer au sein de notre société grâce à des formations en interne. Nous vous proposons en effet une évolution rapide du poste de Conseiller Commercial vers celui de Manager Commercial puis de Directeur d'agences.
                </p>
                <h2>Votre futur emploi</h2>
                <ul>
                    <li>Missions : relever les défis que nous vous proposerons.</li>
                    <li>Niveau requis : aucun, vous êtes débutant ? Ce n'est pas un problème.</li>
                    <li>Permis requis : le permis B est un plus, mais il n'est pas obligatoire.</li>
                    <li>Statut : un contrat à durée indéterminée (CDI).</li>
                    <li>Salaire :  attractif ! Découvrez des fiches de salaire sans plafond !</li>
                    <li>Les petits plus : des tickets restaurants, mais aussi des primes.</li>
                </ul>
                <h2>Alors, qu'attendez-vous ?</h2>
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
    },
    legalNotices:{
        title:"Mentions légales",
        text:
            <>
                <p>Salut ici les mentions légales</p>
            </>
    }
}

ReactDOM.render(
  <React.StrictMode>
      <BrowserView>
          <Cursor cursorRef={cursorRef}/>
          <App cursorRef={cursorRef} completeText={completeText} />
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
