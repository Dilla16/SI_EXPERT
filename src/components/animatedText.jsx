import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const AnimatedText = ({ text, typingDelay = 100, eraseDelay = 50, pauseDelay = 1500 }) => {
  const [typingText, setTypingText] = useState("");

  useEffect(() => {
    const animateText = () => {
      let index = 0;
      let direction = 1; // 1 for typing, -1 for erasing

      const intervalId = setInterval(
        () => {
          if (direction === 1) {
            if (index <= text.length) {
              setTypingText(text.slice(0, index));
              index++;
            } else {
              direction = -1;
              setTimeout(() => {
                direction = 1;
                setTypingText("");
                index = 0;
              }, pauseDelay);
            }
          } else if (direction === -1) {
            if (index >= 0) {
              setTypingText(text.slice(0, index));
              index--;
            } else {
              direction = 1;
              setTimeout(() => {
                direction = -1;
                setTypingText("");
                index = text.length;
              }, pauseDelay);
            }
          }
        },
        direction === 1 ? typingDelay : eraseDelay
      );

      return () => clearInterval(intervalId);
    };

    animateText();
  }, [text, typingDelay, eraseDelay, pauseDelay]);

  return <div className="text-3xl font-bold text-primary overflow-hidden whitespace-nowrap">{typingText}</div>;
};

AnimatedText.propTypes = {
  text: PropTypes.string.isRequired,
  typingDelay: PropTypes.number,
  eraseDelay: PropTypes.number,
  pauseDelay: PropTypes.number,
};

export default AnimatedText;
