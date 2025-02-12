import React, { useState, useEffect } from 'react';

function VideoPage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [videoSize, setVideoSize] = useState('large');
  const [padding, setPadding] = useState(0);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      // Calculate dynamic padding based on scroll position
      // Max padding of 5% (as per your original className)
      const maxPadding = 5;
      const scrollThreshold = 100; // Adjust this value to control when padding starts changing
      
      if (position > scrollThreshold) {
        // Calculate padding percentage based on scroll position
        const calculatedPadding = Math.min(
          (position - scrollThreshold) / 300 * maxPadding, // Adjust 300 to control how fast padding increases
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

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Padding div to enable scrolling */}
      <div className="h-screen">
        {/* Video container with dynamic sizing */}
        <div className={`fixed top-0 left-0 w-full transition-all duration-300 ease-in-out 
          ${videoSize === 'small' ? 'h-48' : 'h-screen'}`}>
          <video
            className={`rounded-lg object-cover transition-all duration-300 ease-in-out
              ${videoSize === 'small'
                ? `w-full h-[40rem] fixed top-4`
                : 'w-full h-[40rem] top-4 right-4 left-4 bottom-4'}`}
            style={{
              padding: `${padding}%`,
            }}
            autoPlay
            loop
            muted
          >
            <source src="/videos/Wax-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      
      {/* Content below video for scrolling */}
      <div className="min-h-screen bg-white p-8">
        <h1 className="text-2xl font-bold mb-4">Scroll to see video resize</h1>
        <p className="mb-4">Start scrolling to see the video transition to a smaller size...</p>
        {/* Add more content for scrolling */}
        <div className="space-y-4">
          {Array(10).fill(null).map((_, i) => (
            <p key={i} className="text-gray-600">
              Scroll content {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoPage;