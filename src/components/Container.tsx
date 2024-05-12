import React from "react";
import Header from "./Header";

function Container({ children }: React.PropsWithChildren) {
  return (
    <div className="container">
      <div className="main">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default Container;
