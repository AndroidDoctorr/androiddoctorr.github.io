import { useState } from 'react'
import { getContactEmail } from '../../utils/contactEmail'

export default function EmailRevealLink() {
  const [revealed, setRevealed] = useState(false)
  const [email, setEmail] = useState('')

  const handleReveal = () => {
    setEmail(getContactEmail())
    setRevealed(true)
  }

  if (!revealed) {
    return (
      <button type="button" className="start-menu__email-reveal" onClick={handleReveal}>
        Email me
      </button>
    )
  }

  return (
    <a href={`mailto:${email}`} className="start-menu__email-link">
      {email}
    </a>
  )
}
