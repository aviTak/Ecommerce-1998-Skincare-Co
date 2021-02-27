import React, { useEffect, useState } from 'react';
import '../css/product.css';
import { cartNo } from '../config/cache';

import { useQuery } from '@apollo/client';
import { getProductQuery } from '../queries/queries';

function Product(props){

    const [ink, setInk] = useState(0);
    const [count, setCount] = useState('1');
    const [err, setErr] = useState('');

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

    function scene(a){
        try{
            if(a === 0 && ink === 1){
                document.getElementById('s-1').style.background = '#193c46';
                document.getElementById('s-2').style.background = 'transparent';
                setInk(0);
                return;
            }

            if(a === 1 && ink === 0){
                document.getElementById('s-2').style.background = '#193c46';
                document.getElementById('s-1').style.background = 'transparent';
                setInk(1);
                return;
            }
        } catch(e){}
    }

    function store(){
        try{
            var a = 0, f;
            
            if(localStorage.getItem("cart")){                
                try{
                    f = JSON.parse(localStorage.getItem("cart"));
            
                    for(let i=0; i<f.length; i++)
                        a += Number(f[i].count);
                        
                } catch(e) {
                    localStorage.removeItem("cart");
                }  
            }

            if(Number(a) > 100){
                a = '100+';
            }

            cartNo(`(${a})`);

        } catch(e) {}
    }

    function send(){
        // [{productId: "1", size: "50", count: "4", name: "Abc", photo: "abc.com", price: "$50.00"}]
        let h = {
            productId: product.id,
            size: product.item[ink].size,
            count: count,
            name: product.name,
            photo: product.photo[0],
            price: product.item[ink].price
        };

        // console.log(h);

        let local, t, l, i;

        if(localStorage.getItem("cart")){

            local = JSON.parse(localStorage.getItem("cart"));
            t = local;
            l = t.length;

            for(i=0; i<l; i++) {
                if(t[i].productId === product.id && t[i].size === product.item[ink].size){
                    if((Number(t[i].count) + Number(count)) > 10){
                        // console.log("Max limit for eact product is 10 items.");
                        setErr("Max limit for eact product is 10 items.");
                        return;
                    } else {
                        t[i].count = (Number(t[i].count) + Number(count)).toString();
                        break;
                    }
                }
            }

            if(i === l){
                t.push(h);
            }

            localStorage.setItem("cart", JSON.stringify(t));
            store();
            setErr('Added!');

        } else {
            let k = [];
            k.push(h);
            localStorage.setItem("cart", JSON.stringify(k));
            store();
            setErr('Added!');
        }

    }

    const { loading, error, data } = useQuery(getProductQuery, {
        variables: { id: props.match.params.id },
        pollInterval: 50
    });

    if (loading || error){
        return (
            <section style={{height: "120vh"}}>

            </section>
        );
    }

    const { product } = data;

    if(!product){
        return (
            <section className="contact">
                <div className="contact--center">
                    <h2 className="contact__heading">That's All!</h2>
                    <p className="contact__para">Nothing more here. Try navigating through the site menu and keep exploring our products. We are sure, you will never regret!</p>
                </div>
            </section>
        );
    }

    return (
        <section className="contact">
            
            <div className='product__container clearfix'>
                <div className='product__photo'>
                    <figcaption className="contact__heading mobile-heading">{product.name}</figcaption>   
                    <img alt={product.name} src={product.photo[0]}className='product--picture' />
                </div>

                <div className='product__info'>

                    <h2 className="contact__heading desktop-heading">{product.name}</h2>                    
                    <p className="contact__para new-padding">{product.summary}</p>

                    <p className="contact__para new-padding new-height">
                        <span style={{fontWeight: '700'}}>Category : </span>
                        <span style={{textTransform: 'capitalize'}}>&nbsp;{product.gender}</span>
                    </p>

                    <div className='filter__box clearfix'>
                        {product.item[0] && <div onClick={()=>scene(0)} className='filter__out' id='size-1'><div id='s-1' className='filter__in'></div></div>}
                        {product.item[0] && <span className='filter__text'>&nbsp;&nbsp;{product.item[0].size} oz.</span>}

                        {product.item[1] && <div onClick={()=>scene(1)} className='filter__out' id='size-2'><div id='s-2' className='filter__in'></div></div>}
                        {product.item[1] && <span className='filter__text'>&nbsp;&nbsp;{product.item[1].size} oz.</span>}
                    </div>

                    <p className="contact__para new-padding new-height new-price">
                        <span>$ {dollar(product.item[ink].price)}</span>
                    </p>

                    <form
                        onSubmit={e => {
                            e.preventDefault();

                            if(!product.available){
                                return;
                            }

                            setErr('');

                            try{
                                document.getElementById('save-check').innerHTML = 'Adding...';
                            } catch(e){}

                            setTimeout(()=>{
                                try{
                                    document.getElementById('save-check').innerHTML = 'Add to Cart';
                                } catch(e){}
                            }, 400);

                            send();

                        }}
                        autoComplete="off"
                        className="product__form"
                    >

                        <div className='product__block new-size'>
                            <label htmlFor="name" className='product--label'>
                                <span style={{fontWeight: '700'}}>Qty. : </span>&nbsp;
                            </label>

                            <input
                                name="name"
                                type="number"
                                required
                                placeholder="0"
                                min="1"
                                max="10"
                                className="product--name"
                                inputMode="numeric"
                                value={count}
                                onChange={(e)=>setCount(e.target.value)}
                            />
                        </div>

                        {product.available && <button 
                            type="submit"
                            className="message--button"
                            id='save-check'
                        >
                            Add to Cart
                        </button>}

                        {!product.available && <button 
                            className="message--button out"
                        >
                            Out of Stock
                        </button>}

                    </form>

                    <div className='product--error new-error'>{err}</div>

                </div>   
            </div>

        </section>
    );

}

export default Product;
