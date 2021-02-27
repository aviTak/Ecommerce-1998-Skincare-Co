import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import { appendScript } from '../utils/appendScript';
import { removeScript } from '../utils/removeScript';

import '../css/slideshow.css';

import { getSlidesQuery } from '../queries/queries';

var move, start = false;

const she = 30, time = 5000;

var initialX = null;  
var initialY = null;

function unify(e) {	return e.changedTouches ? e.changedTouches[0] : e };

function startTouch(e){
  initialX = unify(e).clientX;
  initialY = unify(e).clientY;
}

function moveTouch(e){
    if(initialX===null)
      return;
    if(initialY===null)
      return;
    
    var currentX=unify(e).clientX;
    var currentY=unify(e).clientY;
    
    var diffX=initialX-currentX;
    var diffY=initialY-currentY;
    
      if(Math.abs(diffX)>Math.abs(diffY)){
        if(diffX > she)
          document.querySelector('#next').click(); 
        else if(diffX < -she)
          document.querySelector('#prev').click(); 
      }
   
    initialX=null;
    initialY=null;
}

function arrowSwipe(ev){
    
    const keyCode = ev.keyCode || ev.which;
    if ( keyCode === 37 ) {
        document.querySelector('#prev').click();
        clean();
    }
    else if ( keyCode === 39 ) {
        document.querySelector('#next').click();
        clean();
    }
    
}

function clean(){

    clearInterval(move);

    move = setInterval(function(){ 
        
        try{
            document.querySelector('#next').click(); 
        } catch (e) {}

    }, time); 

}

function work(){

    var x = document.getElementById('nav');
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    try{

        if(scrollTop < 2 * x.clientHeight){
            if (x.classList.contains("show")){
                x.classList.remove("show");
            }
        } else {
            if (!(x.classList.contains("show"))){
                x.classList.add("show");
            }
        }

    } catch(e) {}

}

function Slideshow() {

    useEffect(() => {

        var x = document.getElementById('latab');

        work();

        window.addEventListener("scroll", work);

        try{
            if (x.classList.contains("ringrose")){
                x.classList.remove("ringrose");
            }
        } catch(e) {}
        

        if(start){
            appendScript("/js/imagesloaded.pkgd.min.js");
            appendScript("/js/anime.min.js");
            appendScript("/js/demo2.js");

            clearInterval(move);

            move = setInterval(function(){ 

                try{
                    document.querySelector('#next').click(); 
                } catch (e) {}
                
            }, time);

            document.addEventListener("keydown", arrowSwipe);

        }


        return () => {
           
            removeScript("/js/imagesloaded.pkgd.min.js");
            removeScript("/js/anime.min.js");
            removeScript("/js/demo2.js");

            clearInterval(move);
            document.removeEventListener("keydown", arrowSwipe);

            window.removeEventListener("scroll", work);

        }

    });

    /*
    try{
        document.getElementById('nav').style.display = 'block';
    } catch(e){}
    */
    const { loading, error, data } = useQuery(getSlidesQuery, {
      variables: { last: 0 }
    });

  
    if (loading || error){

        return (
            <div className="slideshow">
                <div className="slides">
                    <div className="slide slide--current">
                        <div className="slide__img"
                            style={{
                            backgroundImage: 
                                `linear-gradient(45deg, rgba(255,154,158,1) 0%, 
                                rgba(250,208,196,1) 99%, 
                                rgba(250,208,196,1) 100%))`
                            }}
                        ></div>
                        <h2 className="slide__title">Hello!</h2>
                        <p className="slide__desc">Welcome to our online store.</p>
                        <Link to='/shop/all' className="slide__link">Shop Now</Link>
                    </div>
                </div>      
                
                <nav className="slidenav remove">
                    <button className="slidenav__item slidenav__item--prev" id="hide-prev">Previous</button>
                    <span>/</span>
                    <button className="slidenav__item slidenav__item--next" id="hide-next">Next</button>
                </nav> 
    
            </div>
        );

    }

    start = true;

    const { slides } = data;

    let l = slides.length;

    if(l === 0) 
        return null;

    if(l === 1){
        return (
            <div className="slideshow">
                <div className="slides">
                    <div className="slide slide--current">
                        <div className="slide__img"
                           style={{
                            backgroundImage: 
                                `linear-gradient(45deg, rgba(255,154,158,.8) 0%, 
                                rgba(250,208,196,.8) 99%, 
                                rgba(250,208,196,.6) 100%),
                                url(${slides[0].photo})`
                            }}
                        >
                        </div>
                        <h2 className="slide__title">{slides[0].heading}</h2>
                        <p className="slide__desc">{slides[0].caption}</p>
                        <Link to='/shop/all' className="slide__link">Shop Now</Link>
                    </div>
                </div>      
                
                <nav className="slidenav remove">
                    <button className="slidenav__item slidenav__item--prev" id="hide-prev">Previous</button>
                    <span>/</span>
                    <button className="slidenav__item slidenav__item--next" id="hide-next">Next</button>
                </nav> 
    
            </div>
        );
    }
  
    return (
        <section className="slideshow" id="move" onTouchStart={startTouch} onTouchEnd={moveTouch}>
            {slides.map((slide, n) => (
				<div className="slides" key = {slide.id}>
					<div className={(n===0)? "slide slide--current" : "slide"}>
                        <div className="slide__img" 
                            style={{
                                backgroundImage: 
                                    `linear-gradient(45deg, rgba(255,154,158,.8) 0%, 
                                    rgba(250,208,196,.8) 99%, 
                                    rgba(250,208,196,.6) 100%),
                                    url(${slide.photo})`
                            }}>
                        </div>
						<h2 className="slide__title">{slide.heading}</h2>
						<p className="slide__desc">{slide.caption}</p>
                        <Link to='/shop/all' className="slide__link">Shop Now</Link>
					</div>
				</div>      
            ))}
            
            <nav className="slidenav">
                <button className="slidenav__item slidenav__item--prev" id="prev" onClick = {clean}>Previous</button>
                <span>/</span>
                <button className="slidenav__item slidenav__item--next" id="next" onClick = {clean}>Next</button>
            </nav> 

        </section>
    );
  }

export default Slideshow;
