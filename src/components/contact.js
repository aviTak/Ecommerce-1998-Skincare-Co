import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import '../css/contact.css';
import { getContactQuery } from '../queries/queries';
import { addFeedbackMutation } from '../queries/mutations';

var first = true;

function Contact(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');


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


    const { loading: queryLoading, error: queryError, data: queryData } = useQuery(getContactQuery);  

    const [
        updateTodo,
        { loading: mutationLoading, error: mutationError,  data: mutationData }, // created message
    ] = useMutation(addFeedbackMutation);


    if (queryLoading || queryError){
        return (
            <section style={{height: "120vh"}}>

            </section>
        );
    }

    const { contact } = queryData;

    if(mutationData && first){
        first = false;
        if(mutationData.addFeedback.message === 'Thank You!'){
            setName('');
            setEmail('');   
            setMessage('');
        }
    }


    return(
        <React.Fragment>
            
            <section className="contact">
                <div className="contact--center">
                    <h2 className="contact__heading">{contact.heading}</h2>
                    <p className="contact__para">{contact.info}</p>
                </div>
            </section>

            <section className="message clearfix">
            
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        updateTodo({ variables: { name: name, email: email, message: message } });
                        first = true;
                    }}
                    autoComplete="off"
                >

                    <label htmlFor="name">
                        Name <sup>*</sup>
                    </label>

                    <input
                        name="name"
                        type="text"
                        placeholder="Full name"
                        className="message--name"
                        inputMode="text"
                        required
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />

                    <label htmlFor="email">
                        Email <sup>*</sup>
                    </label>

                    <input
                        name="email"
                        type="email"
                        placeholder="Your personal email address"
                        className="message--name"
                        inputMode="email"
                        required
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />

                    <label htmlFor="message">
                        Message <sup>*</sup>
                    </label>

                    <textarea
                        name="message"
                        type="text"
                        placeholder="We value your feedbacks..."
                        className="message--name message--message"
                        inputMode="text"
                        required
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                    >

                    </textarea>

                    {mutationLoading && <div className="message__error">Just a sec...</div>}
                    {mutationError && <div className="message__error">Please try again</div>}
                    {mutationData && <div className="message__error">{mutationData.addFeedback.message}</div>}

                    <button 
                        type="submit"
                        className="message--button"
                    >
                        Send
                    </button>

                </form> 
            </section>   

        </React.Fragment>
    );

}

export default Contact;
