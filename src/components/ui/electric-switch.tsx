import React from 'react';
import styled from 'styled-components';

const ElectricSwitch = () => {
  return (
    <StyledWrapper>
      <label className="switch">
        <input defaultChecked={true} type="checkbox" />
        <div className="button">
          <div className="light" />
          <div className="dots" />
          <div className="characters" />
          <div className="shine" />
          <div className="shadow" />
        </div>
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .switch {
    display: block;
    background-color: black;
    width: 150px;
    height: 195px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2), 0 0 1px 2px black, inset 0 2px 2px -2px white, inset 0 0 2px 15px #47434c, inset 0 0 2px 22px black;
    border-radius: 5px;
    padding: 20px;
    perspective: 700px;
  }

  .switch input {
    display: none;
  }

  .switch input:checked + .button {
    transform: translateZ(20px) rotateX(25deg);
    box-shadow: 0 -10px 20px #18ffec;
  }

  .switch input:checked + .button .light {
    animation: flicker 0.2s infinite 0.3s;
  }

  .switch input:checked + .button .shine {
    opacity: 1;
  }

  .switch input:checked + .button .shadow {
    opacity: 0;
  }

  .switch .button {
    display: block;
    transition: all 0.3s cubic-bezier(1, 0, 1, 1);
    transform-origin: center center -20px;
    transform: translateZ(20px) rotateX(-25deg);
    transform-style: preserve-3d;
    background-color: #06919b;
    height: 100%;
    position: relative;
    cursor: pointer;
    background: linear-gradient(#009890 0%, #006f6f 30%, #006b6f 70%, #009398 100%);
    background-repeat: no-repeat;
  }

  .switch .button::before {
    content: "";
    background: linear-gradient(rgba(255, 255, 255, 0.8) 10%, rgba(255, 255, 255, 0.3) 30%, #006265 75%, #002a32) 50% 50%/97% 97%, #00a5b1;
    background-repeat: no-repeat;
    width: 100%;
    height: 50px;
    transform-origin: top;
    transform: rotateX(-90deg);
    position: absolute;
    top: 0;
  }

  .switch .button::after {
    content: "";
    background-image: linear-gradient(#005665, #002832);
    width: 100%;
    height: 50px;
    transform-origin: top;
    transform: translateY(50px) rotateX(-90deg);
    position: absolute;
    bottom: 0;
    box-shadow: 0 50px 8px 0px black, 0 80px 20px 0px rgba(0, 0, 0, 0.5);
  }

  .switch .light {
    opacity: 0;
    animation: light-off 1s;
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(#7efff4, #18ffec 40%, transparent 70%);
  }

  .switch .dots {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(transparent 30%, rgba(0, 101, 96, 0.7) 70%);
    background-size: 10px 10px;
  }

  .switch .characters {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(white, white) 50% 20%/5% 20%, radial-gradient(circle, transparent 50%, white 52%, white 70%, transparent 72%) 50% 80%/33% 25%;
    background-repeat: no-repeat;
  }

  .switch .shine {
    transition: all 0.3s cubic-bezier(1, 0, 1, 1);
    opacity: 0.3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(white, transparent 3%) 50% 50%/97% 97%, linear-gradient(rgba(255, 255, 255, 0.5), transparent 50%, transparent 80%, rgba(255, 255, 255, 0.5)) 50% 50%/97% 97%;
    background-repeat: no-repeat;
  }

  .switch .shadow {
    transition: all 0.3s cubic-bezier(1, 0, 1, 1);
    opacity: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent 70%, rgba(0, 0, 0, 0.8));
    background-repeat: no-repeat;
  }

  @keyframes flicker {
    0% {
      opacity: 1;
    }

    80% {
      opacity: 0.8;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes light-off {
    0% {
      opacity: 1;
    }

    80% {
      opacity: 0;
    }
  }`;

export default ElectricSwitch;
