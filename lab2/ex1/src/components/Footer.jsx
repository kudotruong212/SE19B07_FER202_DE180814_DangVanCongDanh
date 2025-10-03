import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} Pizza House. All rights reserved.</p>
        <p className="mb-0">Made with <span style={{color: "red"}}>♥</span> by Đặng Văn Công Danh</p>
      </div>
    </footer>
  );
}

export default Footer;