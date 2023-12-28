"use client";
import Plyr from 'plyr';
import Hls from 'hls.js';
import { useEffect } from 'react';
import "plyr-react/plyr.css";
import './player.css';

const VideoPlayer = ({ src, sub, ts, title }) => {
    const options = {
        seekTime: 5,
        fullscreen: {
            enabled: true,
            iosNative: true
        },
        keyboard: { focused: true, global: true },
        captions: { active: true, update: true },
        quality: { default: 1080, forced: true, options: [1080, 720, 480, 360] },
        storage: { enabled: true, key: 'plyr' },
        controls: [
            'play-large', 'rewind', 'play', 'fast-forward', 'progress', 'mute', 'volume', 'current-time', 'duration', 'settings', 'fullscreen'
        ],
    };

    useEffect(() => {
        const source = src;
        const video = document.querySelector('#player');

        if (!Hls.isSupported()) {
            video.src = source;
            const player = new Plyr(video, options);
        } else {
            const hls = new Hls();
            hls.loadSource(source);

            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                const availableQualities = hls.levels.map((l) => l.height);
                availableQualities.unshift(0);

                options.quality = {
                    default: 0,
                    options: availableQualities,
                    forced: true,
                    onChange: (e) => updateQuality(e),
                };

                options.i18n = {
                    qualityLabel: {
                        0: 'Auto',
                    },
                };

                hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
                    const span = document.querySelector(".plyr__menu__container [data-plyr='quality'][value='0'] span");

                    if (hls.autoLevelEnabled) {
                        span.innerHTML = `AUTO (${hls.levels[data.level].height}p)`;
                    } else {
                        span.innerHTML = `AUTO`;
                    }
                });

                const player = new Plyr(video, options);

                const backbtn = document.getElementById("backbutton");

                if (backbtn) {
                    player.on('controlshidden', () => {
                        backbtn.style.opacity = 0;
                    });
                    player.on('controlsshown', () => {
                        backbtn.style.opacity = 1;
                    });
                }
            });

            hls.attachMedia(video);
            window.hls = hls;
        }

        function updateQuality(newQuality) {
            if (newQuality === 0) {
                window.hls.currentLevel = -1;
            } else {
                window.hls.levels.forEach((level, levelIndex) => {
                    if (level.height === newQuality) {
                        window.hls.currentLevel = levelIndex;
                    }
                });
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src]);

    const backButton = () => {
        window.parent.postMessage("backbutton-clicked", "*");
    };

    return (
        <>
            <div className='style-plyr'>
                <svg className="backicon back-icon" onClick={backButton} focusable="false" viewBox="0 0 24 24" aria-hidden="true" id="backbutton">
                    <path d="M16.62 2.99c-.49-.49-1.28-.49-1.77 0L6.54 11.3c-.39.39-.39 1.02 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z"></path>
                </svg>
                <video autoPlay={true} className='js-plyr plyr' id='player' key={src} crossOrigin="anonymous">
                    {sub?.length > 0 && sub?.slice(0, 20).map((pro, index) => {
                        if (pro?.label || pro?.lang !== 'Default (maybe)') {
                            return <track key={index}
                                kind="captions"
                                label={`${pro?.label || pro?.lang}`}
                                srcLang={`${index} `}
                                src={pro?.src || pro?.url}
                            />;
                        }
                    })}
                </video>
            </div>
        </>
    );
};

export default VideoPlayer;
