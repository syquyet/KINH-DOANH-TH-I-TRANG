import "./notFound.css"

export default function NotFound() {
  return (
    <>
      <body className="body-err">
        <div className="container-err">
          <h1 className="title-err">404</h1>
          <p className="content-err">Page Not Found</p>
          <p className="content-err">
            Sorry, the page you are looking for might be in another castle.
          </p>
          <a href="/" className="navigate-err">Go back to Home</a>
        </div>
      </body>
    </>
  );
}
