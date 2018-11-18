import * as React from "react";

interface Props {
  readonly brand: React.ReactNode;
  readonly children: React.ReactNode;
}

export function AppLayout({ brand, children }: Props) {
  return (
    <>
      <header>
        <div className="navbar navbar-dark bg-dark shadow-sm">
          <div className="container d-flex justify-content-between">
            <div className="navbar-brand d-flex align-items-center">
              {brand}
            </div>
          </div>
        </div>
      </header>

      <main role="main" className="py-5">
        <div className="container">{children}</div>
      </main>
    </>
  );
}
