import { useState } from 'react';

const useQAModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing)
  }

  return {
    isShowing,
    toggle
  }
};

export default useQAModal;