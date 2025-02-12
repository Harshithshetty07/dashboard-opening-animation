import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

function VideoPage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [videoSize, setVideoSize] = useState('large');
  const [padding, setPadding] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      // Calculate padding based on scroll position
      const maxPadding = 5;
      const scrollThreshold = 100;
      
      if (position > scrollThreshold) {
        const calculatedPadding = Math.min(
          (position - scrollThreshold) / 10,
          maxPadding
        );
        setPadding(calculatedPadding);
        setVideoSize('small');
      } else {
        setPadding(0);
        setVideoSize('large');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle play/pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="h-screen">
        <div 
          className={`fixed top-0 left-0 w-full transition-all duration-300 ease-in-out 
            ${videoSize === 'small' ? 'h-48' : 'h-screen'}`}
        >
          <div className="relative">
            <video
              ref={videoRef}
              className={`rounded-lg object-cover transition-all duration-300 ease-in-out
                ${videoSize === 'small'
                  ? `w-full h-[30rem] fixed top-4 rounded-lg`
                  : 'w-full h-[40rem] top-4 right-4 left-4 bottom-4 rounded-lg'}`}
              style={{
                paddingLeft: `${padding}%`,
                paddingRight: `${padding}%`
              }}
              autoPlay
              loop
              muted
            >
              <source src="/videos/Wax-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="absolute bottom-4 right-6 flex justify-end bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}>
              {isPlaying ? (
                <Pause className="w-10 h-10" />
              ) : (
                <Play className="w-10 h-10" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="min-h-screen bg-white p-8">
        <h1 className="text-2xl font-bold mb-4">Scroll to see video resize</h1>
        <p className="mb-4">Start scrolling to see the video transition to a smaller size...</p>
        <div className="space-y-4">
          {[...Array(10)].map((_, i) => (
            <p key={i} className="text-gray-600">
              Scroll down to see the padding effect... The padding will increase smoothly as you scroll down
              and decrease as you scroll back up.
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoPage;