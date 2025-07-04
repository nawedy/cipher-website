import React from 'react';
import styled from 'styled-components';

const OTPForm = () => {
  return (
    <StyledWrapper>
      <form className="form">
        <div className="content">
          <p>OTP Verification</p>
          <div className="inp">
            <input placeholder="0" type="text" className="input" maxLength={1} />
            <input placeholder="0" type="text" className="input" maxLength={1} />
            <input placeholder="0" type="text" className="input" maxLength={1} />
          </div>
          <button>Verify</button>
          <svg className="svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4073ff" d="M56.8,-23.9C61.7,-3.2,45.7,18.8,26.5,31.7C7.2,44.6,-15.2,48.2,-35.5,36.5C-55.8,24.7,-73.9,-2.6,-67.6,-25.2C-61.3,-47.7,-30.6,-65.6,-2.4,-64.8C25.9,-64.1,51.8,-44.7,56.8,-23.9Z" transform="translate(100 100)" className="path" />
          </svg>
        </div>
      </form>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #00000000;
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8.2px);
    -webkit-backdrop-filter: blur(8.2px);
    border: 1px solid #369eff66;
    width: 14em;
    height: 14em;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: auto;
    margin-bottom: auto;
  }

  .form p {
    color: #fff;
    font-weight: bolder;
  }

  .path {
    fill: #369eff
  }

  .svg {
    filter: blur(20px);
    z-index: -1;
    position: absolute;
    opacity: 50%;
    animation: anim 3s infinite;
  }

  .inp {
    margin-left: auto;
    margin-right: auto;
    white-space: 4px;
  }

  .input + .input {
    margin-left: 0.3em
  }

  .input {
    color: #fff;
    height: 2em;
    width: 2em;
    float: left;
    text-align: center;
    background: #00000000;
    outline: none;
    border: 1px #369eff solid;
    border-radius: 10px;
    transition: all 0.6s ease;
  }

  .input:focus {
    outline: none;
    border: 1px #fff solid;
  }

  .input:not(:placeholder-shown) {
    opacity: 40%
  }

  .form button {
    margin-left: auto;
    margin-right: auto;
    background-color: #00000000;
    color: #fff;
    width: 8.5em;
    height: 2.3em;
    border: #369eff 0.2em solid;
    border-radius: 11px;
    transition: all 0.5s ease;
  }

  .form button:hover {
    background-color: #369eff;
  }

  @keyframes anim {
    0% {
      transform: translateY(-70px);
    }

    50% {
      transform: translateY(-19px);
    }

    100% {
      transform: translateY(-70px);
    }
  }`;

export default OTPForm;
