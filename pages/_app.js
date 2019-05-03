import React from 'react';
import App, { Container } from 'next/app';
import { store } from '../shared/store'

import jwt from 'jsonwebtoken'




class MyApp extends App {
    componentDidMount(){
        if(localStorage.jwtToken){
          store.dispatch.login.setLogedUser(jwt.decode(localStorage.jwtToken))
        }
       
       }
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);

    }
    

    return { pageProps };
  }

    render() {
        const { Component, pageProps } = this.props;
    
        return (
          <Container>
            <Component {...pageProps} />
          </Container>
        );
      }
    }


export default MyApp;
