import React, { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import Hls from 'hls.js';
import 'plyr/dist/plyr.css';

interface VideoPlayerProps {
  source: string;
  type: 'mp4' | 'webm' | 'hls';
  poster?: string;
  subtitles?: Array<{
    src: string;
    label: string;
    srclang: string;
  }>;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  source,
  type,
  poster,
  subtitles,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr>();
  const hlsRef = useRef<Hls>();

  useEffect(() => {
    if (!videoRef.current) return;

    if (type === 'hls') {
      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: false, // Disable web workers to prevent postMessage errors
          debug: false,
        });
        hlsRef.current = hls;
        hls.loadSource(source);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        // For Safari, which has native HLS support
        videoRef.current.src = source;
      }
    }

    playerRef.current = new Plyr(videoRef.current, {
      captions: { active: true },
      quality: {
        default: 1080,
        options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
      },
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'duration',
        'mute',
        'volume',
        'captions',
        'settings',
        'pip',
        'fullscreen',
      ],
    });

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [source, type]);

  return (
    <video
      ref={videoRef}
      className="plyr-react plyr"
      poster={poster}
      crossOrigin="anonymous"
    >
      {type !== 'hls' && <source src={source} type={`video/${type}`} />}
      {subtitles?.map((subtitle) => (
        <track
          key={subtitle.srclang}
          kind="subtitles"
          label={subtitle.label}
          srcLang={subtitle.srclang}
          src={subtitle.src}
        />
      ))}
    </video>
  );
};