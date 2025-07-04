import React from 'react';
import styled from 'styled-components';

const NeonFrameCard = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <p className="card-title">Card Title</p>
        <p className="card-des">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
          deleniti officia. Aliquam repellendus illum pariatur nesciunt dolor et
          natus consectetur repudiandae suscipit autem distinctio commodi vel sed,
          id inventore modi.
        </p>
        <p className="card-text">
          <span>View More</span>
          <svg className="arrow-icon" stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
          </svg>
        </p>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 350px;
    height: 180px;
    box-sizing: border-box;
    background-color: #212121;
    border: 5px solid #222;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
            rgba(0, 0, 0, 0.23) 0px 6px 6px,
            inset rgba(0, 0, 0, 0.19) 0px 10px 20px,
            inset rgba(0, 0, 0, 0.23) 0px 6px 6px;
    transition: all ease-in-out 0.3s;
    overflow: hidden;
  }

  .card:hover {
    box-shadow: rgba(193, 44, 223, 0.19) 0px 10px 20px,
            rgba(193, 44, 223, 0.23) 0px 6px 6px,
            inset rgba(0, 0, 0, 0.19) 0px 10px 20px,
            inset rgba(0, 0, 0, 0.23) 0px 6px 6px;
    border: 5px solid #b671d6;
  }

  .card-title {
    margin: 0;
    font-size: 18px;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
            "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-weight: 600;
    color: #fff;
    cursor: default;
  }

  .card-des {
    margin: 0;
    font-size: 15px;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
            "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-weight: 600;
    color: #fff;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box;
    word-break: break-all;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    cursor: default;
  }

  .card-text {
    position: absolute;
    margin: 0;
    font-size: 14px;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
            "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-weight: 400;
    color: #fff;
    right: 20px;
    bottom: 5px;
    display: flex;
    align-items: center;
    gap: 3px;
    opacity: 0;
    transition: all ease-in-out 0.3s;
    animation: textanimate 0.8s alternate infinite;
    cursor: pointer;
  }

  .card:hover > .card-text {
    opacity: 1;
  }

  @keyframes textanimate {
    0% {
      right: 20px;
    }

    100% {
      right: 10px;
    }
  }

  .arrow-icon {
    font-size: 15px;
    font-weight: 500;
  }`;

export default NeonFrameCard;
