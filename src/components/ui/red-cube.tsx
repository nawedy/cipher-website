import React from 'react';
import styled from 'styled-components';

const RedCube = () => {
  return (
    <StyledWrapper>
      <div className="cube-container">
        <div className="cube">
          <div className="face front">Front</div>
          <div className="face back">Back</div>
          <div className="face right">Right</div>
          <div className="face left">Left</div>
          <div className="face top">Top</div>
          <div className="face bottom">Bottom</div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .cube-container {
    width: 200px;
    height: 200px;
    perspective: 800px;
    margin: 50px auto;
  }

  .cube {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    animation: rotate 8s infinite linear;
  }

  .face {
    position: absolute;
    width: 200px;
    height: 200px;
    color: rgb(214, 21, 21);
    font-size: 18px;
    text-align: center;
    line-height: 200px;
    background: transparent;
    opacity: 0.9;
    border: 2px solid;
    border-image: linear-gradient(to right, #ff6b6b, #355c7d, #557d35, #cfcf16, #a51f1f) 1;
    box-shadow: 0 0 100px rgba(245, 8, 8, 0.8);
  }

  .front {
    transform: translateZ(100px);
  }

  .back {
    transform: rotateY(180deg) translateZ(100px);
  }

  .right {
    transform: rotateY(90deg) translateZ(100px);
  }

  .left {
    transform: rotateY(-90deg) translateZ(100px);
  }

  .top {
    transform: rotateX(90deg) translateZ(100px);
  }

  .bottom {
    transform: rotateX(-90deg) translateZ(100px);
  }

  .cube-container:hover .cube {
    animation-play-state: paused;
  }

  @keyframes rotate {
    0% {
      transform: rotateX(0) rotateY(0) rotateZ(0);
    }

    100% {
      transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
    }
  }`;

export default RedCube;
