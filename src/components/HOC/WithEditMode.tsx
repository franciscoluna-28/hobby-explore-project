import React, { useState } from 'react';

interface WithEditModeProps {
  isEditMode: boolean;
  toggleEditMode: () => void;
}

// HOC para manejar el modo de edición
function withEditMode<T extends WithEditModeProps>(WrappedComponent: React.ComponentType<T>) {
  return function WithEditMode(props: Omit<T, keyof WithEditModeProps>) {
    const [isEditMode, setIsEditMode] = useState(false);

    const toggleEditMode = () => {
      setIsEditMode(!isEditMode);
    };

    const modifiedProps = {
      ...props,
      isEditMode,
      toggleEditMode,
    } as T;

    return <WrappedComponent {...modifiedProps} />;
  };
}

export default withEditMode;
