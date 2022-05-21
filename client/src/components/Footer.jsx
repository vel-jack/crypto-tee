import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-between sm:justify-around px-5 sm:px-0 items-end py-4 h-24">
      <div className="flex gap-2 sm:items-end sm:flex-row flex-col">
        <div className="font-bold text-lg ">Crypto-T</div>
        <div className="italic">
          <a href="https://github.com/vel-jack/crypto-tee">GitHub</a>
        </div>
      </div>
      <div className="flex gap-2 sm:flex-row flex-col">
        <div className="italic">
          <a href="https://twitter.com/the_vjack" target="_blank">
            Twitter,
          </a>
        </div>
        <div className="italic">
          <a href="mailto://cenavel2@gmail.com">Email</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
