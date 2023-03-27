import React from 'react'
import { useEffect, useState } from 'react'
function BackToTop () {
  const [top, setTop] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setTop(true)
      } else {
        setTop(false)
      }
    })
  }, [])

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  return (
    <div className='App'>
      {top && (
        <button
          style={{
            position: 'fixed',
            backgroundColor: 'black',
            color: 'white',
            bottom: '50px',
            right: '50px',
            height: '50px',
            borderRadius: '30px',
            fontSize: '20px'
          }}
          onClick={scrollUp}
        >
          Back to top
        </button>
      )}
    </div>
  )
}

export default BackToTop
