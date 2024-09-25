"use client";
import React, { useState, useContext } from 'react';
import { Button, Image } from '@mantine/core';
import Link from 'next/link';
import { FileContext } from '../../context/fileContext'; // Adjust the import path

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true); // State to manage navbar visibility
  const { fileURL } = useContext(FileContext); // Get the uploaded file URL from context

  const items = [
    'Remover',
    'Splitter',
    'Pitcher',
    'Key BPM Finder',
    'Cutter',
    'Joiner',
    'Recorder',
    'Karaoke'
  ];

  const logos = [
    'https://cdn-icons-png.flaticon.com/512/7468/7468155.png', // Remover
    'https://cdn-icons-png.flaticon.com/512/4937/4937225.png', // Splitter
    'https://cdn-icons-png.flaticon.com/512/7468/7468155.png', // Pitcher
    'https://cdn-icons-png.flaticon.com/512/7468/7468155.png', // Key BPM Finder
    'https://cdn-icons-png.flaticon.com/512/1166/1166921.png', // Cutter
    'https://cdn-icons-png.flaticon.com/512/7468/7468155.png', // Joiner
    'https://cdn-icons-png.flaticon.com/512/7468/7468155.png', // Recorder
    'https://cdn-icons-png.flaticon.com/512/7468/7468155.png'  // Karaoke
  ];

  return (
    <div style={{alignItems:'center', justifyContent:'center'}}>
      <button
        onClick={() => setIsNavbarVisible(!isNavbarVisible)}
        style={{top:'7%', left:'2%', position:'absolute', zIndex:'9999'}} 
      >
        <Image 
          src={"https://cdn-icons-png.flaticon.com/512/4543/4543046.png"}
          width={40}
          height={40}
        />
      </button>
      <div
        style={{
          width: '130px',
          backgroundColor: '#17171E',
          padding: '9px',
          height: '100vh',
          color: 'white',
          alignItems: 'center',
          position: 'absolute',
          justifyContent: 'center',
          display: isNavbarVisible ? 'block' : 'none', // Show/hide navbar
        }}
      >
        <ul
          style={{
            height: '400px',
            overflowY: 'scroll',
            listStyleType: 'none',
            padding: '0',
            margin: '0',
            marginTop: '8rem',
            scrollbarColor: '#665DC3 #17171E',
          }}
        >
          {items.map((item, index) => (
            <li
              key={index}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px 0',
                textAlign: 'center',
                color: hoveredIndex === index ? 'white' : 'gray',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={logos[index]}
                width={30}
                height={30}
                style={{
                  objectFit: 'contain',
                  marginRight: '10px'
                }}
              />
              {item}
            </li>
          ))}

          {/* Conditional link to /cutter if audio is uploaded */}
          {fileURL && (
            <Link href="/cutter">
              <li
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px 0',
                  textAlign: 'center',
                  color: 'white', // Change color to indicate it's active
                  cursor: 'pointer',
                }}
              >
                <Image
                  src={logos[4]} // Using the Cutter logo
                  width={30}
                  height={30}
                  style={{
                    objectFit: 'contain',
                    marginRight: '10px'
                  }}
                />
                Cutter
              </li>
            </Link>
          )}
        </ul>
        <Button mt="sm" size="compact-xl" variant="transparent" color="gray">Support</Button>
        <Image
          src={"https://img.freepik.com/free-vector/illustration-uk-flag_53876-18166.jpg?w=1380&t=st=1727247776~exp=1727248376~hmac=234005c83c07a1442610de92ddfaca0e1f981ea27f4e478f51ab34f2d99bd0fe"}
          width={10}
          height={40}
          mt={'lg'}
          style={{
            objectFit: 'contain',
            marginRight: '10px'
          }}
        />
        <style jsx>{`
          ul::-webkit-scrollbar {
            width: 8px;
          }
          ul::-webkit-scrollbar-thumb {
            background-color: #665DC3; /* Set scrollbar thumb color */
            border-radius: 10px;
          }
          ul::-webkit-scrollbar-track {
            background-color: #17171E; /* Background color for scrollbar track */
          }
        `}</style>
      </div>
    </div>
  );
}
