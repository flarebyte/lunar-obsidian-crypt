type Success<A> = {
  status: 'success';
  value: A;
};
type Failure<E> = {
  status: 'failure';
  error: E;
};

export type Result<A, E> = Success<A> | Failure<E>;

/**
 * Return a successful response
 */
export const succeed = <A>(a: A): Success<A> => ({
  status: 'success',
  value: a,
});

/**
 * Return a failure result
 */
export const willFail = <E>(e: E): Failure<E> => ({
  status: 'failure',
  error: e,
});
