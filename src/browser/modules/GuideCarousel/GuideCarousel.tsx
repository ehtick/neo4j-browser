/*
 * Copyright (c) "Neo4j"
 * Neo4j Sweden AB [http://neo4j.com]
 *
 * This file is part of Neo4j.
 *
 * Neo4j is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { useEffect } from 'react'
import Directives from 'browser-components/Directives'
import {
  GuideNavContainer,
  GuideNavButton,
  GuideUl,
  StyledCarousel,
  GuideProgressContainer,
  StyledProgressCount,
  CarouselIndicator
} from '../Sidebar/styled'

type GuideCarouselProps = {
  slides: JSX.Element[]
  currentSlideIndex: number
  scrollToTop?: () => void
  gotoSlide: (slideIndex: number) => void
}

function GuidesCarousel({
  slides,
  currentSlideIndex,
  gotoSlide,
  scrollToTop = () => undefined
}: GuideCarouselProps): JSX.Element {
  const currentSlide = slides[currentSlideIndex]
  const onFirstSlide = currentSlideIndex === 0
  const onLastSlide = currentSlideIndex === slides.length - 1
  function nextSlide() {
    if (!onLastSlide) {
      gotoSlide(currentSlideIndex + 1)
    }
  }

  function prevSlide() {
    if (!onFirstSlide) {
      gotoSlide(currentSlideIndex - 1)
    }
  }

  useEffect(() => {
    // As we progress in the slides, scroll to top
    scrollToTop()
  }, [scrollToTop, currentSlideIndex])

  const moreThanOneSlide = slides.length > 1

  return (
    <StyledCarousel>
      <Directives content={currentSlide} />
      {moreThanOneSlide && (
        <GuideNavContainer>
          <GuideNavButton onClick={prevSlide} disabled={onFirstSlide}>
            Previous
          </GuideNavButton>
          <GuideUl>
            <GuideProgressContainer>
              <StyledProgressCount>
                {`${currentSlideIndex + 1} / ${slides.length}`}
              </StyledProgressCount>
              {slides.slice(0, 25).map((_, i) => (
                <CarouselIndicator
                  key={i}
                  aria-label={`${i + 1}`}
                  onClick={() => gotoSlide(i)}
                  active={i === currentSlideIndex}
                >
                  <span />
                </CarouselIndicator>
              ))}
              {slides.length >= 25 && '...'}
            </GuideProgressContainer>
          </GuideUl>
          <GuideNavButton onClick={nextSlide} disabled={onLastSlide}>
            Next
          </GuideNavButton>
        </GuideNavContainer>
      )}
    </StyledCarousel>
  )
}

export default GuidesCarousel