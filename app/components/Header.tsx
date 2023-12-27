import { Link, useRouteLoaderData } from "@remix-run/react";
import { loader } from "../root";

const Header = () => {
  const data = useRouteLoaderData<typeof loader>("root");
  const cartTotal = data && data?.cart.totalQuantity;

  return (
    <div className="flex justify-between px-0 md:px-6 lg:px-10 py-6 shadow">
      <div>
        <Link to="/" className="uppercase">
          Cricri Curls
        </Link>
      </div>
      <nav className="flex justify-between gap-6 uppercase">
        <Link prefetch="intent" to="/products">
          Shop
        </Link>
        <Link prefetch="intent" to="/products">
          Routine
        </Link>
        <Link to="/products">About</Link>
      </nav>
      <div className="flex gap-4">
        <div>
          <button type="button" aria-label="Open favorites">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 20C12 20 21 14.9875 21 8.97234C21 2.95722 14 2.45597 12 7.16221C10 2.45597 3 2.95722 3 8.97234C3 14.9875 12 20 12 20Z"
                stroke="#14181F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div>
          <button type="button" aria-label="Open login">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 21C19 18.7909 15.866 17 12 17C8.13401 17 5 18.7909 5 21"
                stroke="#14181F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"
                stroke="#14181F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div>
          <button type="button" aria-label="Open cart" className="relative">
            <span
              className={`absolute -top-3  ${
                Number(cartTotal) > 9 ? "-right-4" : "-right-2"
              }`}
            >
              {cartTotal}
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8"
                stroke="#14181F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.2786 9.6712C19.1179 8.70683 18.2835 8 17.3058 8H6.69433C5.71665 8 4.88227 8.70683 4.72154 9.6712L3.38821 17.6712C3.18503 18.8903 4.12512 20 5.361 20H18.6392C19.875 20 20.8151 18.8903 20.6119 17.6712L19.2786 9.6712Z"
                stroke="#14181F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
