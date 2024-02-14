'use client';
import styles from './headerBar.module.css';
import Link from 'next/link';
import styled from 'styled-components';
// import { ThemeProvider } from "styled-components"
import React from 'react';
import { useState } from 'react';

import Image from 'next/image';

interface burPropType{
    ulState: string,
}
const Burger_ul = styled.ul<{$ulState?:string;}>`
    display: ${props => props.$ulState};
`;
const BurgerLabel = styled.label`
    display: block;
    font-size: 32px;
`;
const BurgerCheckBox = styled.input`
    display: none;
`;
function BurgerUl({ulState}:burPropType){   
    return (
        <Burger_ul $ulState={ulState}>
            <li className={styles.burger_li}>
                <a href="https://github.io">
                    <Image src={"/images/github.png"} width={24} height={24} className={styles.githubIcon} alt="github icon"></Image>
                </a>
            </li>
            <li className={styles.burger_li}>
                <a href="https://pinterest.com">
                    <Image src={"/images/pinterest.png"} width={24} height={24} className={styles.pinterestIcon} alt="pinterest icon"></Image>
                </a>
            </li>
            <li className={styles.burger_li}>
                <a href="https://twitter.com">
                    <Image src={"/images/twitter-sign.png"} width={24} height={24} className={styles.twitterIcon} alt="twitter icon"></Image>
                </a>
            </li>
        </Burger_ul>
    );
}
export default function HeaderBar(){
    const [ulState, setUlState] = useState("none");
    function changeUlState(){
        if(ulState==="none") setUlState("inline-block");
        else setUlState("none");
    }
    return (
        <div className={styles.headerBar}>
            <Link className={styles.textLink} href={'/'}>home</Link>
            <BurgerLabel htmlFor="burger">☰</BurgerLabel>
            <BurgerCheckBox type="checkbox" id="burger" onChange={changeUlState} />
            <BurgerUl ulState={ulState} />
        </div>
    );
}