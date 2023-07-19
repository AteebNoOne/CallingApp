import React from 'react';
import { IonButton } from '@ionic/react'; // Import the Ionic button component


interface InheritedTouchableOpacityProps {
  disabled?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
  testID?: string;
}

export type Props = React.PropsWithChildren<
  {
    size: number;
  } & InheritedTouchableOpacityProps
>;

const Button: React.FC<Props> = ({
  accessibilityLabel,
  children,
  disabled,
  onPress,
  size,
  testID,
}) => {
  const containerStyle = React.useMemo(
    () => ({
      ...styles.container,
      ...{
        height: size,
        width: size,
        opacity: disabled ? 0.2 : 1,
      },
    }),
    [size, disabled],
  );

  return (
    <IonButton
      disabled={disabled}
      onClick={onPress}
      aria-label={accessibilityLabel}
      id={testID}
      style={containerStyle}>
      {children}
    </IonButton>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
