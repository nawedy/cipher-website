import React from 'react';
import styled from 'styled-components';

const BlogCard = () => {
  return (
    <StyledWrapper>
      <article className="card">
        <div className="card-img">
          <div className="card-imgs pv delete" />
        </div>
        <div className="project-info">
          <div className="flex">
            <div className="project-title">Title card</div>
            <span className="tag">type</span>
          </div>
          <span className="lighter">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae
            voluptas ullam aut incidunt minima.</span>
        </div>
      </article>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .project-info {
    padding: 100px 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    top: -50px;
  }

  .project-title {
    font-weight: 500;
    font-size: 1.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: black;
  }

  .lighter {
    font-size: 0.9em;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tag {
    font-weight: lighter;
    color: grey;
  }

  /*DELETE THIS TWO LINE*/
  .delete {
    background-color: #b2b2fd;
  }

  .card-img div {
    width: 90%;
  }
  /*IF USING IMAGES*/

  .card {
    background-color: white;
    color: black;
    width: 300px;
    max-height: 330px;
    border-radius: 8px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  }

  .card-img {
    position: relative;
    top: -20px;
    height: 100px;
    display: flex;
    justify-content: center;
  }

  /* Change the .card-img div to .card-img img to use img*/
  .card-img a,
  .card-img div {
    height: 150px;
    width: 90%;
    /* Change this width here to change the width of the color/image */
    object-fit: cover;
    border-radius: 8px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }

  .card-imgs {
    transition: all 0.5s;
  }`;

export default BlogCard;
