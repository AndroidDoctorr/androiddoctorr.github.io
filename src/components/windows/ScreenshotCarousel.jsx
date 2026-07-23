import { useCallback, useEffect, useMemo, useState } from 'react'
import ImageLightbox from './ImageLightbox'

function getOrientation(width, height) {
  if (!width || !height) return 'landscape'
  return height / width > 1.05 ? 'portrait' : 'landscape'
}

function CarouselSlide({ shot, isActive, onOpen }) {
  const [orientation, setOrientation] = useState('landscape')

  const handleLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.currentTarget
    setOrientation(getOrientation(naturalWidth, naturalHeight))
  }

  const isPortrait = orientation === 'portrait'

  return (
    <figure
      className={`screenshot-carousel__slide${
        isActive ? ' screenshot-carousel__slide--active' : ''
      }${isPortrait ? ' screenshot-carousel__slide--portrait' : ' screenshot-carousel__slide--landscape'}`}
      aria-hidden={!isActive}
    >
      <button
        type="button"
        className={
          isPortrait ? 'screenshot-carousel__device' : 'screenshot-carousel__frame'
        }
        onClick={isActive ? onOpen : undefined}
        tabIndex={isActive ? 0 : -1}
        aria-label={isActive ? `View full size: ${shot.alt}` : undefined}
      >
        <img
          src={shot.src}
          alt={shot.alt}
          loading={isActive ? 'eager' : 'lazy'}
          onLoad={handleLoad}
        />
      </button>
    </figure>
  )
}

export default function ScreenshotCarousel({ screenshots, label, mobileApp = false }) {
  const [index, setIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [orientations, setOrientations] = useState({})
  const count = screenshots.length

  const goTo = useCallback(
    (nextIndex) => {
      if (count === 0) return
      setIndex((nextIndex + count) % count)
    },
    [count],
  )

  const portraitCount = useMemo(
    () => Object.values(orientations).filter((value) => value === 'portrait').length,
    [orientations],
  )

  const layout = useMemo(() => {
    if (mobileApp || portraitCount > count / 2) return 'mobile'
    if (portraitCount > 0) return 'mixed'
    return 'desktop'
  }, [count, mobileApp, portraitCount])

  useEffect(() => {
    let cancelled = false

    screenshots.forEach((shot) => {
      const image = new Image()
      image.onload = () => {
        if (cancelled) return
        setOrientations((current) => ({
          ...current,
          [shot.src]: getOrientation(image.naturalWidth, image.naturalHeight),
        }))
      }
      image.src = shot.src
    })

    return () => {
      cancelled = true
    }
  }, [screenshots])

  useEffect(() => {
    if (count <= 1 || lightboxIndex != null) return undefined

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count)
    }, 6000)

    return () => window.clearInterval(timer)
  }, [count, lightboxIndex])

  useEffect(() => {
    if (lightboxIndex != null) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') goTo(index - 1)
      if (event.key === 'ArrowRight') goTo(index + 1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goTo, index, lightboxIndex])

  if (count === 0) {
    return null
  }

  const current = screenshots[index]

  return (
    <>
      <section
        className={`screenshot-carousel screenshot-carousel--${layout}`}
        aria-label={`${label} screenshots`}
      >
        <div className="screenshot-carousel__stage">
          {screenshots.map((shot, shotIndex) => (
            <CarouselSlide
              key={shot.src}
              shot={shot}
              isActive={shotIndex === index}
              onOpen={() => setLightboxIndex(shotIndex)}
            />
          ))}

          {count > 1 && (
            <>
              <button
                type="button"
                className="screenshot-carousel__nav screenshot-carousel__nav--prev"
                onClick={() => goTo(index - 1)}
                aria-label="Previous screenshot"
              >
                &#10094;
              </button>
              <button
                type="button"
                className="screenshot-carousel__nav screenshot-carousel__nav--next"
                onClick={() => goTo(index + 1)}
                aria-label="Next screenshot"
              >
                &#10095;
              </button>
            </>
          )}
        </div>

        <div className="screenshot-carousel__footer">
          <p className="screenshot-carousel__caption">
            {current.alt}
            <span className="screenshot-carousel__hint">Click image to enlarge</span>
          </p>
          {count > 1 && (
            <div className="screenshot-carousel__dots" role="tablist" aria-label="Screenshot navigation">
              {screenshots.map((shot, dotIndex) => (
                <button
                  key={shot.src}
                  type="button"
                  role="tab"
                  className={`screenshot-carousel__dot${
                    dotIndex === index ? ' screenshot-carousel__dot--active' : ''
                  }`}
                  aria-label={`Show screenshot ${dotIndex + 1}`}
                  aria-selected={dotIndex === index}
                  onClick={() => goTo(dotIndex)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {lightboxIndex != null && (
        <ImageLightbox
          images={screenshots}
          index={lightboxIndex}
          label={`${label} screenshots`}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  )
}
