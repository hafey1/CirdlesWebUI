// @flow
import React from 'react';
import Radium from 'radium';
import { colors } from 'constants';

type Props = {
  onClick: Function,
  size?: number,
  color?: string,
  textColor?: string,
  margin?: string,
  disabled?: boolean,
  children?: any
};

const BaseButton = ({
  onClick,
  size = 12,
  color = colors.dark,
  textColor,
  margin,
  disabled,
  children,
  ...rest
}: Props) => {
  const style = {
    fontSize: size,
    padding: "0.25em 0.5em",
    margin: margin || "",
    backgroundColor: 'transparent',
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: color,
    color: textColor || color,
    ':hover': {
      backgroundColor: color,
      borderColor: color,
      color: colors.white,
    },
    ':disabled': {
      pointerEvents: "none",
      backgroundColor: colors.lightGray + '88',
      borderColor: colors.mediumGray,
      color: colors.mediumGray
    },
    ':focus': {
      outline: 'none'
    }
  };
  return (
    <button style={[styles.button, style]} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

const styles = {
  button: {
    borderRadius: "1.5em",
    transition: 'all 0.4s',
    ':hover': {
      cursor: 'pointer'
    }
  }
};

export const Button = Radium(BaseButton);
