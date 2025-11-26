import React from 'react';
import WorldMap from "../assets/World Map.svg"
import { NavLink } from 'react-router';
const home = () => {
    return (
       <div
  className="hero min-h-screen"
  style={{
    backgroundImage:`url(${WorldMap})`,
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
      <p className="mb-5">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <NavLink to='/bills' className="btn btn-primary">Bills</NavLink>
    </div>
  </div>
</div>
    );
};

export default home;