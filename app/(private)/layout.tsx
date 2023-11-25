"use client"

import {SWRConfig} from 'swr';
import fetcherCBFunction from '../utils/fetcher'

import NavBar from "./navbar";
import Header from './header'
import Footer from './footer'

export default function PrivateLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <SWRConfig
        value={{fetcher: fetcherCBFunction}}
      >
        <Header />
        <NavBar />
        <main>{children}</main>
        <Footer />
      </SWRConfig>
    );
  }
  