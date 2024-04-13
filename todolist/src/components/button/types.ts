export type ButtonAsyncTask<T> = {
  emitData: (data: T) => void;
  performAsyncTask: () => Promise<T>;
};

export type ButtonProps<T> = {
  extendClassName?: string;
  color: string;
  hoverColor?: string;
  activeColor?: string;
  focusColor?: string;
  asyncTask?: ButtonAsyncTask<T>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;