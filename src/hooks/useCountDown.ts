import { useEffect, useMemo, useState } from 'react';

const useCountDown = (milliseconds: number, onCompleted?: () => void) => {
  const expireTime = useMemo(() => new Date().getTime() + milliseconds, [milliseconds]);
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const countdown = expireTime - new Date().getTime();
      if (countdown > 0) {
        setDays(Math.floor(countdown / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setMinutes(Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((countdown % (1000 * 60)) / 1000));
      } else {
        setSeconds(0);
        clearInterval(intervalId);
        if (onCompleted) onCompleted();
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return { days, hours, minutes, seconds };
};

export { useCountDown };
