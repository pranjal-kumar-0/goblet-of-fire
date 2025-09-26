'use client'
import React, { useEffect, useState } from 'react'

const ImageSlideshowBackground = () => {
  const [mounted, setMounted] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  const images = [
    '/BGImgs/image1.jpg',
    '/BGImgs/image2.jpg',
    '/BGImgs/image3.jpg',
    '/BGImgs/image4.jpg',
    '/BGImgs/image5.jpg',
    '/BGImgs/image6.jpg',
    '/BGImgs/image7.jpg',
    '/BGImgs/image8.jpg',
    // more later change if u need
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % images.length
      )
    }, 10000) // 10sec

    return () => clearInterval(interval)
  }, [mounted, images.length])

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  const handleImageError = () => {
    console.error(`Failed to load image: ${images[currentImageIndex]}`)
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    )
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="slideshow-bg">
      <div 
        className={`slide ${isLoaded ? 'loaded' : ''}`}
        key={currentImageIndex}
      >
        <img 
          src={images[currentImageIndex]}
          alt={`Background ${currentImageIndex + 1}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>

      {images[(currentImageIndex + 1) % images.length] && (
        <img 
          src={images[(currentImageIndex + 1) % images.length]}
          alt="preload"
          style={{ display: 'none' }}
        />
      )}

      <div className="indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        .slideshow-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }

        .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }

        .slide.loaded {
          opacity: 1;
        }

        .slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: blur(5px);
          transition: filter 0.3s ease;
        }

        .slide:hover img {
          filter: blur(3px);
        }

        .indicators {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 10;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.5);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator:hover {
          border-color: rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.3);
        }

        .indicator.active {
          background: rgba(255, 255, 255, 0.8);
          border-color: white;
        }

        /* Fade animation for smooth transitions */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .indicators {
            bottom: 15px;
            gap: 8px;
          }

          .indicator {
            width: 10px;
            height: 10px;
          }

          .slide img {
            filter: blur(1.5px);
          }

          .slide:hover img {
            filter: blur(0.5px);
          }
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .slide {
            transition: none;
          }
          
          .indicator {
            transition: none;
          }
        }
      `}</style>
    </div>
  )
}

export default ImageSlideshowBackground