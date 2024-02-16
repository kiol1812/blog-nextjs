'use client';
import styles from './headerBar.module.css';
import Link from 'next/link';
import styled from 'styled-components';
// import { ThemeProvider } from "styled-components"
import React from 'react';
import { useState, useEffect } from 'react';

import Image from 'next/image';

import { BurgerLabel, BurgerUl, useRWD, SearchSelectionsPerShow } from './deviceWidthChanged';

const BurgerCheckBox = styled.input`
    display: none;
`;
const Search_frame = styled.div`
    vertical-align: middle;
    white-space: nowrap;
    position: relative;
    display: inline;
`;
const SearchInput = styled.input`
    width: 160px;
    height: 32px;
    border: none;
    color: #005f75aa;
    font-size: 14pt;
    background: #00000000;
    display: inline;
    outline: none;
`;
const SearchBtn = styled.button`
    outline: none;
    background-color: #00000000;
    border: none;
    height: 32px;
    width: 34px;
    position: absolute;
    top: -7px;
    right: -40px;
`;
function SearchBar(){
    function handleSearchBtn(){}
    const [inputStr, setInputStr] = useState("");
    function searchValue(){
        setInputStr("target");
    }
    // useEffect(()=>{
    //     const input = document.getElementById("searchInput");
    //     setInputStr(`${input?.textContent||input?.innerHTML}`);
    //     console.log(input?.innerHTML);
    // }, [inputStr])
    return (
        <>
            <Search_frame>
                <SearchInput id='searchInput' onKeyUp={searchValue} placeholder='search' maxLength={50} />
                <SearchBtn onClick={handleSearchBtn}>
                    <Image src={"/images/search.png"} width={24} height={24} className={styles.searchIcon} alt="search icon"></Image>
                </SearchBtn>
            </Search_frame>
            <SearchSelectionsPerShow />
        </>
    );
}
export default function HeaderBar(){
    const device = useRWD();
    const [ulState, setUlState] = useState("none");
    function changeUlState(){
        if(ulState==="inline-block") setUlState("none");
        else setUlState("inline-block");
    }
    useEffect(()=>{
        const checkbox = document.getElementById('burger', ) as HTMLInputElement | null;
        if(checkbox!=null) checkbox.checked = false;
        setUlState("none");
    }, [device])
    return (
        <div className={styles.headerBar}>
            <div className={styles.searchSection}>
                <SearchBar />
            </div>
            <BurgerLabel />
            <BurgerCheckBox type="checkbox" id="burger" onChange={changeUlState} />
            <BurgerUl ulState={ulState} />
        </div>
    );
}