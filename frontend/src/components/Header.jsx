import { Link } from "react-router-dom";
import Button from "./Button";

export default function Header() {
  return (
    <>
      <nav className="navbar container pt-3 pb-3">
        <Link to="/" className="navbar-brand">
          Finance Dashboard
        </Link>

        <div>
          <Button class="btn-outline-info" url="/login" text="Login" />
          &nbsp; &nbsp;
          <Button class="btn-info" url="/register" text="Register" />
        </div>
      </nav>
    </>
  );
}
