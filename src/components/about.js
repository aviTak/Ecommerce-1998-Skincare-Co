import React from 'react';
import { useQuery } from '@apollo/client';

import '../css/about.css';
import { getAboutQuery } from '../queries/queries';

function About(){

    const { loading, error, data } = useQuery(getAboutQuery);  
    
    if (loading || error){
        return (
            <section style={{height: "40vh"}}>

            </section>
        );
    }

    const { about } = data;

    return(
        <section className="about">
            <div className="about--center">
                <h2 className="about__heading">{about.heading}</h2>
                <p className="about__para para--1">{about.yourInfo}</p>
                <p className="about__para para--2">{about.disclaimerInfo}</p>
            </div>
        </section>
    );

}

export default About;
