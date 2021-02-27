import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './css/App.css';
import './config/firebase';

import Slideshow from './components/slideshow';
import About from './components/about';
import Navbar from './components/navbar';
import Testimonials from './components/testimonials';
import Social from './components/social';
import Footer from './components/footer';
import Contact from './components/contact';
import Success from './components/success';
import Cart from './components/cart';
import Product from './components/product';
import List from './components/list';
import Four from './components/404';
import ScrollToTop from './components/scrolltotop';


class App extends React.Component {

  render(){

    return (

      <Router>

        <ScrollToTop />
        <Navbar />
   
        <Switch>  

          <Route exact path = '/contact' component = {Contact} />

          
          <Route exact path = '/cart' component = {Cart} />


          <Route exact path = '/success' component = {Success} />


          <Route exact path = '/shop/:category?/:search?' component = {List} />


          <Route exact path = '/product/:id' component = {Product} />


          <Route exact path = '/'>

            <Slideshow />
            <About />
            <Testimonials />

          </Route>

          <Route path = '*' component = {Four} />


        </Switch>

        <Social />
        <Footer />

      </Router>

    );

  }
  
}

export default App;
