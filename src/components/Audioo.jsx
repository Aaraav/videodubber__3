"use client";

import React, { useState, useEffect, useContext, useRef } from 'react';
import { FileContext } from '../../context/fileContext';
import wavesurfer from 'wavesurfer.js';
import { Play, SkipBack } from 'lucide-react';

const AudioWaveform = () => {
    const wavesurferRef = useRef(null);
    const { fileURL } = useContext(FileContext);
    const [wavesurferObj, setWavesurferObj] = useState();
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [startTime, setStartTime] = useState('00:00.0');
    const [endTime, setEndTime] = useState('00:00.0');

    useEffect(() => {
        if (wavesurferRef.current && !wavesurferObj) {
            setWavesurferObj(
                wavesurfer.create({
                    container: '#waveform',
                    waveColor: '#00FD8D',
                    progressColor: '#00FD8D',
                    responsive: true,
                })
            );
        }
    }, [wavesurferRef, wavesurferObj]);

    useEffect(() => {
        if (fileURL && wavesurferObj) {
            wavesurferObj.load(fileURL);
        }
    }, [fileURL, wavesurferObj]);

    useEffect(() => {
        if (wavesurferObj) {
            wavesurferObj.on('play', () => {
                setPlaying(true);
                setIsPlaying(true);
            });
            wavesurferObj.on('pause', () => {
                setPlaying(false);
                setIsPlaying(false);
            });
        }
    }, [wavesurferObj]);

    useEffect(() => {
        if (wavesurferObj) wavesurferObj.setVolume(volume);
    }, [volume, wavesurferObj]);

    const handlePlayPause = () => {
        wavesurferObj.playPause();
    };

    const handleVolumeSlider = (e) => {
        setVolume(e.target.value);
    };

    return (
        <section className='waveform-container' style={{ width: '90vw' }}>
            <div ref={wavesurferRef} id='waveform' />
			<div>
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#17171E',
        padding: '1rem',
        borderRadius: '0.5rem',
        width: '90%',  
        position: 'fixed',  
        bottom: 0,  
        left: 0,  
        marginTop: "auto", 
        zIndex: 1000,
		marginLeft:"120px" , 
		borderTop: "0.5px  white"
    }}>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
        }}>
            <button
                title='play/pause'
                onClick={handlePlayPause}
                style={{
                    width: '3rem',
                    height: '3rem',
                    backgroundColor: '#374151',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4B5563'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#374151'}
            >
                <Play style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    color: 'white',
                    display: isPlaying ? 'none' : 'block',
                }} />
                <span style={{
                    width: '1rem',
                    height: '1rem',
                    backgroundColor: 'white',
                    display: isPlaying ? 'block' : 'none',
                }}></span>
            </button>
            <button
                title='skip back'
                style={{
                    width: '3rem',
                    height: '3rem',
                    backgroundColor: '#374151',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4B5563'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#374151'}
            >
                <SkipBack style={{
                    width: '1.25rem',
                    height: '1.25rem',
                    color: 'white',
                }} />
            </button>
        </div>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
        }}>
            <div style={{
                color: 'white',
                fontSize: '0.875rem',
            }}>
                Start:
                <span style={{
                    marginLeft: '0.5rem',
                    backgroundColor: '#374151',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                }}>{startTime}</span>
            </div>
            <div style={{
                color: 'white',
                fontSize: '0.875rem',
            }}>
                End:
                <span style={{
                    marginLeft: '0.5rem',
                    backgroundColor: '#374151',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                }}>{endTime}</span>
            </div>
        </div>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
        }}>
            <span style={{
                color: '#10B981',
                fontSize: '0.875rem',
            }}>format: mp3</span>
            <button style={{
                backgroundColor: '#E5E7EB',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
            }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D1D5DB'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'}
            >
                Save
            </button>
        </div>
    </div>
</div>

            <div className='volume-slide-container'>
                {volume > 0 ? (
                    <i className='material-icons'>volume_up</i>
                ) : (
                    <i className='material-icons'>volume_off</i>
                )}
                <input
                    type='range'
                    min='0'
                    max='1'
                    step='0.05'
                    value={volume}
                    onChange={handleVolumeSlider}
                    className='slider volume-slider'
                />
            </div>
        </section>
    );
};

export default AudioWaveform;
