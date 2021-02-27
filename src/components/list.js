import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../css/list.css';
import '../css/gallery.css';

import { useQuery, NetworkStatus } from '@apollo/client';
import { getProductsQuery } from '../queries/queries';


const COUNT = 12, delay = 1000;

var prev = '', cursor = '', busy = false, input, play = false, lastClick = 0;

const style1 = {
    color: '#43281b',
    textDecoration: 'none'
}

const style2 = {
    color: '#193c46',
    textDecoration: 'none'
}

const boy = '<svg class="boy" fill="#6d412c" height="28" x="0px" y="0px" viewBox="0 0 487.95 487.95" style="enable-background:new 0 0 487.95 487.95;" xml:space="preserve"><g><g><path d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';


function List(props){

    const [re, setRe] = useState(0);

    useEffect(() => {

        // play = false;  
        // re = 0;

        prev = '';

        setRe(0);

        var z = document.getElementById('proton');

        try{
            if(props.match.params){
                if(!props.match.params.category){
                    props.history.push('/shop/all');
                }
                if(props.match.params.search){
                    z.value = decodeURIComponent(props.match.params.search);
                } else {
                    z.value = null;
                }
            }
        } catch(e) {}

    }, [props]);

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


        try{
            let p = 'all';
            if(props.match.params){
                if(props.match.params.category){
                    p = props.match.params.category;
                }
            }

            document.getElementById(p).style.background = '#193c46';
            document.getElementById(p).style.color = '#f7e8e1';
            document.getElementById(p).style.pointerEvents = 'none';
        } catch(e) {}

        window.addEventListener("scroll", beforeClick);

        return () => {

            try{
                let p = 'all';
                if(props.match.params){
                    if(props.match.params.category){
                        p = props.match.params.category;
                    }
                }
    
                document.getElementById(p).style.color = '#193c46';
                document.getElementById(p).style.background = '#f7e8e1';
                document.getElementById(p).style.pointerEvents = 'auto';
            } catch(e) {}

            window.removeEventListener("scroll", beforeClick);

        }

    });


    function dollar(a){
        a = a.toString().trim();
        var p = a.indexOf('.');
        var k = '';

        if(p !== -1){
            k = a.substr(p, a.length - 1);
            a = a.substr(0, p);
        }

        var b = '';
        let i, l = a.length, c = 0;

        for(i = l - 1; i >= 0; i--){
            if(c % 3 === 0 && i !== l - 1) {
                b = a.charAt(i) + ',' + b;
            } else {
                b = a.charAt(i) + b;
            }
            c++;
        }

        b = b + k;

        return b;
    }


    let gender = null, search = null, value = null;

    if(props.match.params){
        if(props.match.params.category !== 'all'){
            gender = props.match.params.category;
        }
        if(props.match.params.search){
            search = decodeURIComponent(props.match.params.search);
            value = 'search';
        }
    }


    const { loading, error, data, fetchMore, networkStatus } = useQuery(getProductsQuery, {
        variables: { 
            gender: gender,
            [value]: search? search.toLowerCase().trim() : null,
            last: COUNT,
            cursor: ''
        },
        notifyOnNetworkStatusChange: true
    });


    const beforeClick = async () => {

        /*
        console.log('cursor:', cursor);
        console.log('play:', play);
        console.log('busy:', busy);
        */
       
        if(play || busy || !cursor){ //play
            return;
        }

        if(prev === cursor){
            return;
        }

        if(lastClick >= (Date.now() - delay)){
            return;
        }

        let E, C;

        try{

            E = document.getElementById('gall').offsetHeight; // Height of element
            C = document.getElementById('gall').getBoundingClientRect();

        } catch(e) { return }


        let S = window.pageYOffset; // Total scroll
        let B = document.body.getBoundingClientRect();        
        let P = C.top - B.top;
        let W = window.innerHeight;


        if(E + P - W - 100 <= S){             

            // Save new cursor and new last click and make it busy

            let PT = prev, RT = re; // Preserve previous values in case of error

            prev = cursor;       
            
            try{
                setRe(data.products.length);
            } catch(e) { 
                prev = PT;
                setRe(RT);

                return;
            }
            
            lastClick = Date.now();
            busy = true;

            // Values saved

            try{
                await fetchMore({
                    variables: {
                        cursor: cursor
                    }
                });  
            }

            catch(e){
                prev = PT;
                setRe(RT);

                // play = false;
            }      

            busy = false;

        }

    };

/*
    const handleClick = useCallback(async () => {

        let t;

        try{
           t = data.products.length;
        } catch(e) { return }

        if(t === 0)
            return;

        // SAFETY 1 

        if(busy){
            return;
        }

        // SAFETY 2

        let cu = data.products[t - 1].id;
        
        if(cu === prev){
            return;
        }

        // Save new cursor and new last click and make it busy

        prev = cu;

        lastClick = Date.now();

        busy = true;

        // Values saved

        await fetchMore({
          variables: {
            cursor: data.products[t - 1].id
          }
        });

        busy = false;

    }, [fetchMore, data]);
*/

    let t = props.match.params.category;

    if(!(t === 'all' || t === 'men' || t === 'women' || t === 'unisex')){
        return (
            <section className="contact">
                <div className="contact--center">
                    <h2 className="contact__heading">That's All!</h2>
                    <p className="contact__para">Nothing more here. Try navigating through the site menu and keep exploring our products. We are sure, you will never regret!</p>
                </div>
            </section>
        );
    }

    const MATTER = (
        <section className="contact lallery">
            <div className="contact--center">
                <h2 className="contact__heading">Shop</h2>

                <div className="message list--form">

                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            let h = encodeURIComponent(input.value);
                            let H = (!h)? '' : `/${h}`;
                            let q = (!gender)? 'all' : gender; 
                            props.history.push(`/shop/${q}${H}`);                                
                        }}
                        autoComplete="off"
                    >

                        <input
                            ref={node => {
                                input = node;
                            }}
                            name="name"
                            type="text"
                            placeholder="Search..."
                            className="list--name"
                            inputMode="text"
                            id='proton'
                            onFocus={()=>document.getElementById('lgbt').style.opacity='1'}
                            onBlur={()=>document.getElementById('lgbt').style.opacity='.6'}
                        />


                        <button 
                            type="submit"
                            className="list--button"
                            id="lgbt"
                            dangerouslySetInnerHTML={{__html: `${boy}`}}
                        />

                    </form>

                </div>

                <div className="option">
                    <Link style={style2} to={`/shop/all${!search? '' : '/' + props.match.params.search}`} className="option__value" id="all">All</Link>
                    <Link style={style2} to={`/shop/men${!search? '' : '/' + props.match.params.search}`} className="option__value" id="men">Men</Link>
                    <Link style={style2} to={`/shop/women${!search? '' : '/' + props.match.params.search}`} className="option__value" id="women">Women</Link>
                    <Link style={style2} to={`/shop/unisex${!search? '' : '/' + props.match.params.search}`} className="option__value" id="unisex">Unisex</Link>
                </div>

            </div>
        </section>
    );

    const GALLERY = (
        <React.Fragment>
            <section className="gallery" id="gall">
                {data && data.products && data.products.map((product)=>(
                    <Link to={`/product/${product.id}`} style={style1} key={"s-"+product.id} className="gallery__in" id='jesse'>
                        
                        <div className="shop__container">
                            
                            <div className='chop'>
                                <div 
                                    className='chop__image'
                                    style={{backgroundImage: `url(${product.photo[0]})`}}
                                >                                    
                                </div>
                            </div>

                            <div className='hop'>
                                <p className='listy--sfx'>{product.name}</p>
                                <p className="listy--price">Price: ${dollar(product.item[0].price)}</p>
                                {!product.available && <p className="listy--stock">Out of Stock</p>}
                            </div>
                        
                        </div>
                    
                    </Link>
                ))}
            </section>
        </React.Fragment>
    );

    const NALLERY = (
        <React.Fragment>
            <section className="gallery">
                {data && data.products && data.products.map((product)=>(
                    <Link to={`/product/${product.id}`} style={style1} key={"s-"+product.id} className="gallery__in" id='jesse'>
                        
                        <div className="shop__container">
                            
                            <div className='chop'>
                                <div 
                                    className='chop__image'
                                    style={{backgroundImage: `url(${product.photo[0]})`}}
                                >                                    
                                </div>
                            </div>

                            <div className='hop'>
                                <p className='listy--sfx'>{product.name}</p>
                                <p className="listy--price">Price: ${dollar(product.item[0].price)}</p>
                                {!product.available && <p className="listy--stock">Out of Stock</p>}
                            </div>
                        
                        </div>
                    
                    </Link>
                ))}
            </section>
        </React.Fragment>
    );


    if(networkStatus === NetworkStatus.fetchMore){

        busy = true;
        cursor = '';

        // re = data.products.length;

        return(
            <React.Fragment>
                {MATTER}
                {NALLERY}
                <div className="refetch">
                    <div className="lds-hourglass"></div>
                </div>
            </React.Fragment>
        );
    }

    if(loading || error){
        
        return (
            <React.Fragment>
                {MATTER}
                <div className="regain">
                    <div className="lds-hourglass"></div>
                </div>
            </React.Fragment>
        );
    }

    if(data.products.length === 0){

        play = true;
        cursor = '';

        return(
            <React.Fragment>
                {MATTER}
                <div className="regain">Oops! There isn't anything as such here.</div>
            </React.Fragment>
        );
    }


    if(data.products.length < re + COUNT || data.products.length % COUNT !== 0){
        play = true;
    } else {
        play = false;
    }
    
    // console.log(play);

    // In render: {done && <div className="refetch">That's all we've got!</div>}

    cursor = data.products[data.products.length - 1].id;

    /*
    console.log('Previous', prev);
    console.log(cursor);
    console.log('Play', play);
    console.log('Busy', busy);
    */

    return (

        <React.Fragment>
            {MATTER}                  
            {GALLERY} 
        </React.Fragment>

      );
      
}

export default List;
