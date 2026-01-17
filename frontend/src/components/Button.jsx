import { Link } from "react-router-dom";

export default function Button(props) {
  return (
    <>
      <Link to={props.url} className={`btn ${props.class}`}>
        {props.text}
      </Link>
    </>
  );
}
