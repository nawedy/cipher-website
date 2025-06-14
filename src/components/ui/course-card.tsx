import React from 'react';
import styled from 'styled-components';

const CourseCard = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <svg className="App-logo" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.885 16c-8.124 0-7.617 3.523-7.617 3.523l.01 3.65h7.752v1.095H21.197S16 23.678 16 31.876c0 8.196 4.537 7.906 4.537 7.906h2.708v-3.804s-.146-4.537 4.465-4.537h7.688s4.32.07 4.32-4.175v-7.019S40.374 16 31.885 16zm-4.275 2.454c.771 0 1.395.624 1.395 1.395s-.624 1.395-1.395 1.395a1.393 1.393 0 0 1-1.395-1.395c0-.771.624-1.395 1.395-1.395z" fill="url(#a)" /><path d="M32.115 47.833c8.124 0 7.617-3.523 7.617-3.523l-.01-3.65H31.97v-1.095h10.832S48 40.155 48 31.958c0-8.197-4.537-7.906-4.537-7.906h-2.708v3.803s.146 4.537-4.465 4.537h-7.688s-4.32-.07-4.32 4.175v7.019s-.656 4.247 7.833 4.247zm4.275-2.454a1.393 1.393 0 0 1-1.395-1.395c0-.77.624-1.394 1.395-1.394s1.395.623 1.395 1.394c0 .772-.624 1.395-1.395 1.395z" fill="url(#b)" /><defs><linearGradient id="a" x1="19.075" y1="18.782" x2="34.898" y2="34.658" gradientUnits="userSpaceOnUse"><stop stopColor="#387EB8" /><stop offset={1} stopColor="#366994" /></linearGradient><linearGradient id="b" x1="28.809" y1="28.882" x2="45.803" y2="45.163" gradientUnits="userSpaceOnUse"><stop stopColor="#FFE052" /><stop offset={1} stopColor="#FFC331" /></linearGradient></defs></svg>
        <div className="header"><center><span className="welcometo">Welcome to</span> <br /> <span className="python">Python</span></center></div>
        <button className="App-button">Start learning now</button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    background-color: #191e24;
    border: 3px solid #387EB8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    font-weight: 700;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 25px 5px;
    color: white;
    border-radius: 45px;
  }

  .App-logo {
    pointer-events: none;
    margin-top: -40px;
    margin-bottom: -40px;
    width: 250px;
  }

  .App-button {
    padding: 10px 20px;
    background-color: transparent;
    color: #FFE052;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 15px;
    border: 3px solid #FFE052;
    border-radius: 5em;
    margin-top: 20px;
    transition: 0.2s;
  }

  .App-button:hover {
    color: #191e24;
    background-color: #FFE052;
  }

  .welcometo {
    color: #387EB8;
  }

  .python {
    color: #FFE052;
  }`;

export default CourseCard;
