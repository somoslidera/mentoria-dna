document.addEventListener('DOMContentLoaded', function() {
    // Typing effect code (existing)
    const typingTextElement = document.getElementById('typing-text');
    if (typingTextElement) {
        const text = typingTextElement.innerText;
        typingTextElement.innerText = '';
        let i = 0;
        let isTyping = true;

        function typeWriter() {
            if (isTyping && i < text.length) {
                typingTextElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Adjust typing speed here
            }
        }

        typingTextElement.addEventListener('click', () => {
            if (isTyping) {
                isTyping = false;
                typingTextElement.innerHTML = text;
            }
        });

        typeWriter();
    }

    // Testimonial slider code (new)
    const slider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');

    if (slider && testimonials.length > 0 && prevButton && nextButton) {
        let currentIndex = 0;
        const totalSlides = testimonials.length;

        // Clone first and last slides for infinite loop effect
        const firstClone = testimonials[0].cloneNode(true);
        const lastClone = testimonials[totalSlides - 1].cloneNode(true);

        slider.appendChild(firstClone);
        slider.insertBefore(lastClone, testimonials[0]);

        const allSlides = document.querySelectorAll('.testimonial');
        const slideWidth = allSlides[0].offsetWidth;

        let realIndex = 1; // Start at the first real slide
        slider.style.transform = `translateX(${-slideWidth * realIndex}px)`;


        function showSlide() {
            slider.style.transition = 'transform 0.5s ease-in-out';
            slider.style.transform = `translateX(${-slideWidth * realIndex}px)`;
        }

        prevButton.addEventListener('click', () => {
            realIndex--;
            showSlide();
        });

        nextButton.addEventListener('click', () => {
            realIndex++;
            showSlide();
        });

        slider.addEventListener('transitionend', () => {
            if (realIndex === 0) {
                slider.style.transition = 'none';
                realIndex = totalSlides;
                slider.style.transform = `translateX(${-slideWidth * realIndex}px)`;
            }

            if (realIndex === totalSlides + 1) {
                slider.style.transition = 'none';
                realIndex = 1;
                slider.style.transform = `translateX(${-slideWidth * realIndex}px)`;
            }
        });
    }
});