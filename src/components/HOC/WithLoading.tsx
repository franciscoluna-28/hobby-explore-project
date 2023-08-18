import { QueryKey, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../ui/loading-spinner";
import { motion, AnimatePresence } from "framer-motion";

// Define a type for the component props that will be wrapped by the HOC
export type WithLoadingProps<T> = {
  data: T;
  isLoading: boolean;
};

// Define the HOC function with generic types
export function withLoading<T>(queryKey: QueryKey, fetchFn: () => Promise<T>) {
  return function WithLoadingComponent<Props>(
    WrappedComponent: React.ComponentType<Props & WithLoadingProps<T>>
  ): React.FC<Props> {
    return function WithLoading(props: Props) {
      const { data, isLoading, isError } = useQuery<T>(queryKey, fetchFn);

      const wrappedProps: WithLoadingProps<T> = {
        data: data!,
        isLoading,
      };

      if (isLoading) {
        return (
          <AnimatePresence initial={true} mode="wait">
            <motion.section
              key="loading"
              className="m-auto flex items-center h-full justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingSpinner />
            </motion.section>
          </AnimatePresence>
        );
      }

      if (isError) {
        return (
          <AnimatePresence initial={true} mode="wait">
            <motion.p
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              There was an error while loading...
            </motion.p>
          </AnimatePresence>
        );
      }

      return (
        <AnimatePresence initial={true} mode="wait">
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WrappedComponent {...props} {...wrappedProps} />
          </motion.div>
        </AnimatePresence>
      );
    };
  };
}
