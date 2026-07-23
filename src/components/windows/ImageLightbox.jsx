import { useEffect } from 'react'

export default function ImageLightbox({
  images,
  index,
  onClose,
  onNavigate,
  label,
}) {
  const current = images[index]

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (images.length <= 1 || !onNavigate) return

      if (event.key === 'ArrowLeft') {
        onNavigate((index - 1 + images.length) % images.length)
      }

      if (event.key === 'ArrowRight') {
        onNavigate((index + 1) % images.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [images.length, index, onClose, onNavigate])

  if (!current) {
    return null
  }

  return (
    <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={label}>
      <button
        type="button"
        className="image-lightbox__backdrop"
        aria-label="Close image viewer"
        onClick={onClose}
      />

      <div className="image-lightbox__content">
        <button
          type="button"
          className="image-lightbox__close"
          aria-label="Close"
          onClick={onClose}
        >
          &#10005;
        </button>

        {images.length > 1 && onNavigate && (
          <>
            <button
              type="button"
              className="image-lightbox__nav image-lightbox__nav--prev"
              aria-label="Previous image"
              onClick={() => onNavigate((index - 1 + images.length) % images.length)}
            >
              &#10094;
            </button>
            <button
              type="button"
              className="image-lightbox__nav image-lightbox__nav--next"
              aria-label="Next image"
              onClick={() => onNavigate((index + 1) % images.length)}
            >
              &#10095;
            </button>
          </>
        )}

        <figure className="image-lightbox__figure">
          <img src={current.src} alt={current.alt} />
          <figcaption className="image-lightbox__caption">{current.alt}</figcaption>
        </figure>
      </div>
    </div>
  )
}
