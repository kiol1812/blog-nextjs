'use client'
import {useState, useEffect } from 'react';
import styles from './headerBar.module.css';
import styled from 'styled-components';
import Link from 'next/link';
import SocialMediaLinks from './socialMediaLinks';
export const useRWD=()=>{
    const [device, setDevice]=useState(false);
    const handleRWD=()=>{
        if(window.innerWidth>768) setDevice(false);
        // else if(window.innerWidth>576) setDevice("tablet");
        else setDevice(true);
    }
    useEffect(()=>{
        window.addEventListener('resize', handleRWD);
        handleRWD();
        return (()=>{
            window.removeEventListener('resize', handleRWD);
        })
    }, []);
    return device;
}
export function BurgerLabel(){
    const device = useRWD();
    return (
        <label htmlFor="burger" className={styles.burgerLabel}>{((device)?"☰":"")}</label>
    );
}
interface burPropType{
    ulState: string,
}
const Burger_ul = styled.ul<{
    $ulState?:string,
    $device?:boolean,
}>`
    display: ${props => ((props.$device)?props.$ulState:"inline-block")};
    position: absolute;
    right: ${(props => (props.$device)?"15px":"280px")};
    top: ${(props => (props.$device)?"90px":"50px")};
    padding-right: 5px;
`;
const Burger_li_text = styled.li<{$liState?:string}>`
    display: ${props => props.$liState};
`;
export function BurgerUl({ulState}:burPropType){
    const device = useRWD();
    const liState = (device)?"block":"inline-block";
    return (
        <Burger_ul $ulState={ulState} $device={device}>
            <Burger_li_text key={"home"} $liState={liState}>
                <Link className={styles.textLink} href={'/'}>home</Link>
            </Burger_li_text>
            <Burger_li_text key={"portfolio"} $liState={liState}>
                <Link className={styles.textLink} href={'/'}>portfolio</Link>
            </Burger_li_text>
            <Burger_li_text key={"blog"} $liState={liState}>
                <Link className={styles.textLink} href={'/gists'}>blog</Link>
            </Burger_li_text>
            <SocialMediaLinks />
        </Burger_ul>
    );
}

export function SearchSelectionsPerShow(){
    return (
        <ul></ul>
    );
}