import { createSafeContext } from './safe-context';

type ListContextValue = {
  isAnimated?: boolean;
};

const [ListContext, useListContext] = createSafeContext<ListContextValue>({
  displayName: 'ListContext',
});

export { useListContext };

type ListProviderProps = React.PropsWithChildren<ListContextValue>;

export default function ListProvider({ children, ...rest }: ListProviderProps) {
  return <ListContext.Provider value={rest}>{children}</ListContext.Provider>;
}
