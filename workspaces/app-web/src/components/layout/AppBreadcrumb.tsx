import cx from "classnames";
import * as React from "react";

interface Props {
  readonly path: React.ReactNode[];
}

export function AppBreadcrumb({ path }: Props) {
  const lastIdx = path.length - 1;

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {path.map((x, idx) => {
          const isLast = idx === lastIdx;

          return (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              aria-current={isLast ? "page" : "false"}
              className={cx("breadcrumb-item", { active: isLast })}
            >
              {x}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
