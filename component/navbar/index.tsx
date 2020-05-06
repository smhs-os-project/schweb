import React, { useState } from 'react';
import { Navbar } from 'bloomer/lib/components/Navbar/Navbar';
import { NavbarBrand } from 'bloomer/lib/components/Navbar/NavbarBrand';
import { NavbarItem } from 'bloomer/lib/components/Navbar/NavbarItem';
import Head from 'next/head';
import Link from 'next/link';
import { NavbarMenu } from 'bloomer/lib/components/Navbar/NavbarMenu';
import { NavbarBurger } from 'bloomer';

export interface INavProps {
  siteTitle: string;
}

export default function navbar({ siteTitle }: INavProps) {
  const [navIsActive, _setNavIsActive] = useState(false);
  const setNavIsActive = () => _setNavIsActive(!navIsActive);

  return (
    <div className="schweb-navbar">
      <Head>
        <title>
          SchWeb -
          {' '}
          {siteTitle}
        </title>
      </Head>
      <Navbar>
        <NavbarBrand>
          <NavbarItem>
            SchWeb
          </NavbarItem>
          <NavbarBurger isActive={navIsActive} onClick={setNavIsActive} />
        </NavbarBrand>
        <NavbarMenu isActive={navIsActive} onClick={setNavIsActive}>
          <Link href="/"><NavbarItem href="/">總覽</NavbarItem></Link>
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
