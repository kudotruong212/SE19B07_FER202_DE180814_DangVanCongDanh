import Button from "react-bootstrap/Button";
import "./Footer.css";

function MyFooter({ author = "DanhDVCDE180814", email = "DanhDVCDE180814@fpt.edu.vn", linkGithub = "https://github.com/kudotruong212/SE19B07_FER202_DE180814_DangVanCongDanh.git" }) {
  return (
    <footer>
      <p>Author: {author}</p>
      <p>Created by: {email}</p>
      <p>&copy; {new Date().getFullYear()} DanhDVCDE180814. All rights reserved</p>
      <Button variant="link" href={linkGithub} target="_blank" rel="noreferrer">
        My Link Github: Movie Management Project
      </Button>
    </footer>
  );
}
export default MyFooter;
