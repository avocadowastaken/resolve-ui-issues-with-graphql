import { isEqual, trim } from "lodash";
import * as React from "react";

interface Props {
  readonly url: string;
  readonly method?: string;
  readonly data?: object;

  readonly render: (props: State) => React.ReactNode;
}

interface State {
  readonly error?: Error;
  readonly fetching: boolean;
  readonly response?: unknown;
}

function pickFetchParams({ url, data, method = "GET" }: Props) {
  return { url, method, body: data && JSON.stringify(data) };
}

export class Fetch extends React.Component<Props, State> {
  public readonly state: State = { fetching: true };

  private abortController?: AbortController;

  private abortFetch() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = undefined;
    }
  }

  private fetch() {
    this.abortFetch();
    this.abortController = new AbortController();

    const { signal } = this.abortController;
    const { url, body, method } = pickFetchParams(this.props);

    this.setState({ fetching: true, error: undefined, response: undefined });

    fetch(url, {
      body,
      method,
      signal,
      cache: "force-cache",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": trim(process.env.REACT_API_KEY),
      },
    })
      .then(x => {
        if (!x.ok) {
          throw new Error(x.statusText);
        }

        return x.json();
      })
      .then(response => {
        this.setState({ response, fetching: false });
      })
      .catch((error: Error) => {
        if (error.name !== "AbortError") {
          this.setState({ error, fetching: false });
        }
      });
  }

  public componentDidMount(): void {
    this.fetch();
  }

  public componentDidUpdate(prevProps: Readonly<Props>): void {
    const prevParams = pickFetchParams(prevProps);
    const nextParams = pickFetchParams(this.props);

    if (!isEqual(prevParams, nextParams)) {
      this.fetch();
    }
  }

  public componentWillUnmount(): void {
    this.abortFetch();
  }

  public render() {
    const { render } = this.props;

    return render(this.state);
  }
}
