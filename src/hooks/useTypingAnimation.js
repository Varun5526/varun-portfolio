import { useState, useEffect, useRef } from 'react';

export function useTypingAnimation(roles) {
  const [typingText, setTypingText] = useState('');
  const rolesRef = useRef(roles);

  useEffect(() => {
    rolesRef.current = roles;
  }, [roles]);

  useEffect(() => {
    let loopNum = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let timer;

    const handleType = () => {
      const currentRole = rolesRef.current[loopNum % rolesRef.current.length];
      const fullText = currentRole;

      setTypingText(prevText => {
        if (!isDeleting && prevText === fullText) {
          setTimeout(() => { isDeleting = true; }, 2000);
          return prevText;
        }
        if (isDeleting && prevText === '') {
          isDeleting = false;
          loopNum++;
          return '';
        }
        return isDeleting
          ? fullText.substring(0, prevText.length - 1)
          : fullText.substring(0, prevText.length + 1);
      });

      typingSpeed = isDeleting ? 50 : 100;
      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, 100);
    return () => clearTimeout(timer);
  }, []);

  return typingText;
}
