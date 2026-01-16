export default function Header() {
  return (
    <>
      <nav className="navbar container pt-3 pb-3">
        <a href="/" className="navbar-brand text-light">
          Finance Dashboard
        </a>

        <div>
          <a href="" className="btn btn-outline-info">
            Login
          </a>
          &nbsp; &nbsp;
          <a href="" className="btn btn-info">
            Register
          </a>
        </div>
      </nav>
    </>
  );
}
