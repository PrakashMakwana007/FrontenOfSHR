import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';

// Rotation animation
const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = () => {
  const { theme } = useSelector(state => state.theme);

  const gradient =
    theme === 'dark'
      ? 'linear-gradient(-225deg, #4f46e5 0%, #6d28d9 50%, #9333ea 100%)'
      : 'linear-gradient(-225deg, #ff7402 0%, #ffe700 50%, #a3e635 100%)';

  return (
    <StyledWrapper>
      <div className="loader">
        <span style={{ backgroundImage: gradient }} />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;

  .loader {
    position: relative;
    width: 120px;
    height: 120px;
    border: 4px solid #282828;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.1),
      10px 10px 10px rgba(0, 0, 0, 0.4),
      inset -5px -5px 5px rgba(255, 255, 255, 0.2),
      inset 10px 10px 10px rgba(0, 0, 0, 0.4);
  }

  .loader:before {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    z-index: 10;
    background: ${props => (props.theme === 'dark' ? '#1e1e2f' : '#fdfcf0')};
    border-radius: 50%;
    border: 2px solid #292929;
    box-shadow: inset -2px -2px 5px rgba(255, 255, 255, 0.2),
      inset 3px 3px 5px rgba(0, 0, 0, 0.5);
  }

  .loader span {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    filter: blur(20px);
    z-index: -1;
    animation: ${rotate} 0.8s linear infinite;
  }
`;

export default Loader;
