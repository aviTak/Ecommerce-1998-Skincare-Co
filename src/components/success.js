import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { cartNo } from '../config/cache';

import '../css/success.css';
import { getConfirmQuery, acceptPaymentQuery } from '../queries/queries';

function Success(){

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

    const MATTER = (
        <section className="contact">
                <div className="contact--center">
                    <h2 className="contact__heading">That's All!</h2>
                    <p className="contact__para">Nothing more here. Try navigating through the site menu and keep exploring our products. We are sure, you will never regret!</p>
               </div>
        </section>
    );

    var urlParams = new URLSearchParams(window.location.search);
    var token = urlParams.get('token') || "";
    var PayerID = urlParams.get('PayerID') || "";

    const { loading: queryLoading, error: queryError, data: queryData } = useQuery(getConfirmQuery);  
    const { loading: payLoading, error: payError } = useQuery(acceptPaymentQuery, {
        variables: { orderId: token }
    });


    if(token === '' || PayerID === ''){
        return(
            <React.Fragment>
                {MATTER}
            </React.Fragment>
        );
    }

    if(queryLoading || queryError || payLoading){
        return (
            <section style={{height: "30vh"}}>

            </section>
        );
    }

    if(payError) {
        return (
            <React.Fragment>
                {MATTER}
            </React.Fragment>
        );
    }

    // {productId: "1", size: "50", count: "4", name: "Abc", photo: "abc.com"}

    const { home } = queryData;

    localStorage.removeItem("cart");

    cartNo(`(${0})`);
    
    return (
        <section className="contact">
            <div className="contact--center">
                <h2 className="contact__heading">{home.tagline}</h2>
                <p className="contact__para">{home.summary}</p>
            </div>
        </section>
    );

}

export default Success;
