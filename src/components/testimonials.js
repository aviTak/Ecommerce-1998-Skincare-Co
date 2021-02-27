import React from 'react';
import { useQuery } from '@apollo/client';

import '../css/testimonials.css';
import { getTestimonialsQuery } from '../queries/queries';

/*

var _C, N;

let x0 = null, i = 0;

let locked = false;

function lock(e) {
  x0 = unify(e).clientX;
  _C.classList.toggle('smooth', !(locked = true))
};

function unify(e) { return e.changedTouches ? e.changedTouches[0] : e };

function drag(e) {
    e.preventDefault();
  
    if(locked){
        if(x0 || x0 === 0)  
        _C.style.setProperty('--tx', `${Math.round(unify(e).clientX - x0)}px`);
    }
};

let w;

function size() { w = window.innerWidth };

function move(e) {
  if(locked) {
    let dx = unify(e).clientX - x0, s = Math.sign(dx), 
        f = +(s*dx/w).toFixed(2);

    if((i > 0 || s < 0) && (i < N - 1 || s > 0) && f > .2) {
      _C.style.setProperty('--i', i -= s);
      f = 1 - f
    }
		
    _C.style.setProperty('--tx', '0px');
    _C.style.setProperty('--f', f);
    _C.classList.toggle('smooth', !(locked = false));
    x0 = null;
  }
};

size();

window.addEventListener('resize', size, false);

*/


function Testimonials(){

    /*

    useEffect(() => {

        try{

            _C = document.querySelector('.test__container');
            N = _C.children.length;
            _C.style.setProperty('--n', N);

            _C.addEventListener('touchstart', lock, false);
            _C.addEventListener('touchend', move, false);
            _C.addEventListener('touchmove', drag, false);

        } catch(e){}

        return () => {

            try{
                _C.removeEventListener('touchstart', lock, false);
                _C.removeEventListener('touchend', move, false);
                _C.removeEventListener('touchmove', drag, false);
                window.removeEventListener('resize', size, false);
            } catch(e){}

        }

    });

    */

    const { loading, error, data } = useQuery(getTestimonialsQuery, {
        variables: { last: 0 }
    });  
    
    if (loading || error){
        return (
            <section style={{height: "40vh"}}>
                
            </section>
        );
    }

    const { testimonials } = data;

    let l = testimonials.length;

    if(l === 0) 
        return null;

    return(
        <section className="about testimonial">
            <h2 className="about__heading">Reviews</h2>
            <div className='test__container'>
               {testimonials.map((testimonial, n) => (
                    <div className='test__body' key={testimonial.id}>
                        <p className='test__para' style={{fontStyle: "italic"}}>
                            "{testimonial.summary}"
                        </p>
                        <p className={n===(l-1)?'test__para test__name test-more' : 'test__para test__name'} style={{textAlign: "right", fontWeight: "700"}}>
                            - {testimonial.name}
                        </p>
                    </div>
               ))}
            </div>
        </section>
    );

}

export default Testimonials;
