import * as React from "react";

export interface FetchState<R> {
  readonly error?: Error;
  readonly payload?: R;
  readonly fetching: boolean;
}

interface Props<P, R> {
  readonly url: string;
  readonly params: P;
  readonly render: (fetchState: FetchState<R>) => React.ReactNode;
}

interface State<R> {
  readonly fetchState: FetchState<R>;
}

export class WithFetch<P, R> extends React.Component<Props<P, R>> {
  public state: State<R> = { fetchState: { fetching: false } };

  public render() {
    const { render } = this.props;
    const { fetchState } = this.state;

    return render(fetchState);
  }
}
