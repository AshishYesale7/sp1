import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/http-streaming';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface VideoSource {
  src: string;
  type: string;
  label?: string;
  quality?: string;
}

interface VideoPlayerProps {
  sources: VideoSource[];
  poster?: string;
  subtitles?: Array<{
    src: string;
    label: string;
    srclang: string;
  }>;
  onNext?: () => void;
}

export const EnhancedVideoPlayer: React.FC<VideoPlayerProps> = ({
  sources,
  poster,
  subtitles,
  onNext,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const settings = useSelector((state: RootState) => state.auth.user?.settings);

  useEffect(() => {
    if (!videoRef.current) return;

    playerRef.current = videojs(videoRef.current, {
      controls: true,
      fluid: true,
      html5: {
        hls: {
          enableLowInitialPlaylist: true,
          smoothQualityChange: true,
        },
      },
      playbackRates: [0.5, 1, 1.5, 2],
      sources,
      poster,
    });

    if (settings?.autoPlay) {
      playerRef.current.on('ended', () => {
        if (onNext) onNext();
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [sources, poster, settings?.autoPlay, onNext]);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered"
      >
        {subtitles?.map((subtitle) => (
          <track
            key={subtitle.srclang}
            kind="subtitles"
            label={subtitle.label}
            src={subtitle.src}
            srcLang={subtitle.srclang}
          />
        ))}
      </video>
    </div>
  );
};