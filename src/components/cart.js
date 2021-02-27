import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/cart.css';
import { cartNo } from '../config/cache';
import { useMutation } from '@apollo/client';
import { payNowMutation } from '../queries/mutations';

var first = true;

const style2 = {
    color: '#43281b',
    textDecoration: 'none'
}

const MAX = 10;

function Cart(){

    const [cart, setCart] = useState(localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")) : []);
    const [overall, setOverall] = useState(all());

    const [instruct, setInstruct] = useState('');
    const [coupon, setCoupon] = useState('');

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

    const [
        updateTodo,
        { loading: mutationLoading, error: mutationError,  data: mutationData }, // created message
    ] = useMutation(payNowMutation);

    if(mutationData && first){
        first = false;
        if(mutationData.payNow.created){
            window.location = mutationData.payNow.message
            setInstruct('');
            setCoupon('');   
        }
    }


    if(cart.length === 0) {
        return (
            <section className="contact">
                <div className="contact--center">
                    <h2 className="contact__heading">Cart is Empty</h2>
                    <p className="contact__para">You have nothing in your shopping cart. Try navigating through the site menu and keep exploring our products. We are sure, you will never regret!</p>
               </div>
            </section>
        );
    }

    function removeItem(p, s){
        let t = cart;
        t = t.filter((e) => !(e.productId === p && e.size === s));
        localStorage.setItem("cart", JSON.stringify(t));
        store();
        setCart(t);
        setOverall(all());
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

    function setQuantity(p, s, w){    

        var t = cart, l = t.length;

        for(let i=0; i<l; i++) {
            if(t[i].productId === p && t[i].size === s){
                let g = Number(t[i].count);

                if((g === MAX && w === 1) || (g === 1 && w === -1))
                    return;

                t[i].count = (g + w).toString();
                break;
            }            
        }

        localStorage.setItem("cart", JSON.stringify(t));
        store();
        setCart(t);
        setOverall(all());
        // console.log(cart);
    }

    function all(){
        let total = 0, h;

        if(localStorage.getItem("cart")){
            h = JSON.parse(localStorage.getItem("cart"));
            for(let i=0; i< h.length; i++)
                total += Number(h[i].price) * Number(h[i].count);        
        }

        return total;
    }

    function checkout(){
        // [{productId: "1", size: "50", count: "4", name: "Abc", photo: "abc.com", price: "$50.00"}]
        let h;

        if(localStorage.getItem("cart")){
            h = JSON.parse(localStorage.getItem("cart"));
            h.forEach(o => {
                delete o.name;
                delete o.photo;
                delete o.price;
            });
        }
        // console.log(h);
        updateTodo({ variables: { productIds: h, instruct: instruct, coupon: coupon } });
        first = true;    
    }
    
    return (
        <React.Fragment>
            <section className="contact">
                <div className="contact--center">
                    <h2 className="contact__heading">Cart</h2>
                    <table className="cart__table">
                        <thead>
                            <tr className = "cart__row">
                                <th className='cart__column cart__column-1 cart__head'>Item</th>
                                <th className='cart__column cart__column-2 cart__head'>Qty.</th>
                                <th className='cart__column cart__column-3 cart__head'>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => {
                                return (
                                    <tr 
                                        key = {item.productId + "-" + item.size}
                                        className = "cart__row"
                                    >

                                        <td className='cart__column cart__column-1 cart__low'>

                                            <div className='cart__product clearfix'>
                                                <div 
                                                    onClick={()=>removeItem(item.productId, item.size)}
                                                    className="cart__remove"
                                                    title="Remove"
                                                >
                                                    X
                                                </div>

                                                <img 
                                                    src={item.photo}
                                                    alt={item.name}
                                                    className='cart__image'
                                                />
                                                
                                                <div className="cart--para">
                                                    <Link to={`/product/${item.productId}`} style={style2}>
                                                        {item.name} ({item.size} oz.)
                                                    </Link>
                                                </div>
                                            </div>

                                        </td>

                                        <td className='cart__column cart__column-2 cart__low'>
                                            <div className = "counting clearfix">
                                                <div className = "counting--minus count--perform" onClick={()=>setQuantity(item.productId, item.size, -1)}>
                                                    -
                                                </div>
                                                <div className = "counting--value">
                                                    {item.count}
                                                </div>
                                                <div className = "counting--plus count--perform" onClick={()=>setQuantity(item.productId, item.size, 1)}>
                                                    +
                                                </div>
                                            </div>
                                        </td>

                                        <td className='cart__column cart__column-3 cart__low'>
                                            ${dollar(item.price)}
                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>


                    <div className="subtotal"><span style={{fontWeight: 700}}>Subtotal :</span> &nbsp;&nbsp;&nbsp; ${dollar(overall)}</div>

                </div>
            </section>

            <section className="message clearfix">
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        checkout();
                    }}
                    autoComplete="off"
                    className="contact__form"
                >

                    <label htmlFor="message">
                        Note (Optional)
                    </label>

                    <textarea
                        name="message"
                        type="text"
                        placeholder="Any special instructions for us?"
                        className="message--name message--message"
                        inputMode="text"
                        value={instruct}
                        onChange={(e)=>setInstruct(e.target.value)}
                    >

                    </textarea>

                    <label htmlFor="name" className='cart--short'>
                        Coupon (Optional)
                    </label>

                    <input
                        name="name"
                        type="text"
                        placeholder="Enter coupon code"
                        className="message--name cart--short"
                        inputMode="text"
                        value={coupon}
                        onChange={(e)=>setCoupon(e.target.value)}
                    />

                    <button 
                        type="submit"
                        className="message--button cart--button"
                    >
                        Checkout
                    </button>

                    {mutationLoading && <div className="message__error cart__error">Just a sec...</div>}
                    {mutationError && <div className="message__error cart__error">Please try again</div>}
                    {mutationData && !mutationData.payNow.created && <div className="message__error cart__error">{mutationData.payNow.message}</div>}

                </form> 
            </section>
        </React.Fragment>
        
    );

}

export default Cart;
