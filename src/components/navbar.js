import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';
import { useQuery } from '@apollo/client';
import { cartQuery } from '../queries/queries';

const style = {
    color: '#000000',
    textDecoration: 'none'
};

const style2 = {
    color: '#43281b',
    textDecoration: 'none'
}

const menu = '<svg id="our-menu" fill="#000000" height="20" x="0px" y="10%" viewBox="0 0 384.97 384.97"><g><g><path d="M12.03,84.212h360.909c6.641,0,12.03-5.39,12.03-12.03c0-6.641-5.39-12.03-12.03-12.03H12.03 C5.39,60.152,0,65.541,0,72.182C0,78.823,5.39,84.212,12.03,84.212z"/><path d="M372.939,180.455H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03 S379.58,180.455,372.939,180.455z"/><path d="M372.939,300.758H12.03c-6.641,0-2.03,5.39-12.03,12.03c0,6.641,5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03C384.97,306.147,379.58,300.758,372.939,300.758z"/></g><g></g><g></g><g></g><g>	</g><g></g><g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';

function Navbar(){

    useEffect(() => {
        try{
            document.getElementById('our-menu').addEventListener('click', openTab);
        } catch(e) {}


        return () => {
            try{
                document.getElementById('our-menu').removeEventListener('click', openTab);
            } catch(e) {}            
        }
    });

    function closeTab(){

        var x = document.getElementById('latab');

        try{
            if (x.classList.contains("ringrose")){
                x.classList.remove("ringrose");
            }
        } catch(e) {}
    }

    function openTab(){

        var x = document.getElementById('latab');

        try{
            if (!(x.classList.contains("ringrose"))){
                x.classList.add("ringrose");
            }
        } catch(e) {}
    }

    const { data, loading, error } = useQuery(cartQuery);

    if(loading || error) return null;

    return(
        <React.Fragment>
            <header className='navbar' id="nav">
    
                <div className='navbar__logo' dangerouslySetInnerHTML={{__html: `${menu}`}} />

                <div className='navbar--tab' id='latab'>
                    
                    <div className='tab-1'>
                        <div className='tab--close'>
                            <span style={{cursor: 'pointer'}} onClick={closeTab}>X</span>
                        </div>
                        <ul className='tavbar__list'> 
                            <li id='mo-home'><Link to='/' style={style2}>Home</Link></li>
                            <li id='mo-contact'><Link to='/contact' style={style2}>Contact</Link></li> 
                            <li id='mo-store'><Link to='/shop/all' style={style2}>Shop</Link></li>
                        </ul>
                        <div className='tab-we'>
                            <div>1998</div>
                            <div>Skincare</div>
                            <div>Co.</div>
                        </div>
                    </div>

                    <div className='tab-2' onClick={closeTab}></div>

                </div>
            
                <nav className='navbar__box'>                
                    <ul className='navbar__list'>       
                        <h1 className='navbar__heading'>1998 Skincare Co.</h1>                 
                        <li id='home'><Link to='/' style={style}>Home</Link></li>
                        <li id='contact'><Link to='/contact' style={style}>Contact</Link></li> 
                        <li id='store'><Link to='/shop/all' style={style}>Shop</Link></li>
                        <li id='cart'><Link to='/cart' style={style}>Cart <span id="cart-count">{data.cartNo}</span></Link></li>
                    </ul>
                </nav>
            </header>
        </React.Fragment>
    );

}

export default Navbar;
