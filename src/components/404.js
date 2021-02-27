import React, { useEffect } from 'react';
import '../css/404.css';

function Four(){

    useEffect(() => {

        var x = document.getElementById('latab');
        var y = document.getElementById('nav');

        try{
            if (x.classList.contains("ringrose")){
                x.classList.remove("ringrose");
            }

            if (!(y.classList.contains("show"))){
                y.classList.add("show");
            }
        } catch(e) {}


        return () => {

        }

    });


    return(
            
        <section className="contact">
            <div className="contact--center">
                <h2 className="contact__heading">That's All!</h2>
                <p className="contact__para">Nothing more here. Try navigating through the site menu and keep exploring our products. We are sure, you will never regret!</p>
            </div>
        </section>

            
    );

}

export default Four;
