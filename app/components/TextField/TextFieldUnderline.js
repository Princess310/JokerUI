import React, { Component, PropTypes } from 'react';
import transitions from '../styles/transitions';

class TextFieldUnderline extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    focus: PropTypes.bool,
    error: PropTypes.bool,
    style: PropTypes.object,
    disabledStyle: PropTypes.object,
    focusStyle: PropTypes.object,
    errorStyle: PropTypes.object,
  }

  static defaultProps = {
    disabled: false,
    focus: false,
    error: false,
    style: {},
    disabledStyle: {},
    focusStyle: {},
    errorStyle: {},
  }

  static contextTypes = {
    uiTheme: PropTypes.object.isRequired,
  }

  render() {
    const {
      disabled,
      focus,
      error,
      style,
      disabledStyle,
      focusStyle,
      errorStyle,
    } = this.props;

    const {
      textField: {
        borderColor,
        disabledTextColor,
        errorColor,
        focusColor,
      },
    } = this.context.uiTheme;;

    const {color: errorStyleColor} = errorStyle;

    const styles = {
      root: {
        border: 'none',
        borderBottom: 'solid 1px',
        borderColor: borderColor,
        bottom: 8,
        boxSizing: 'content-box',
        margin: 0,
        position: 'absolute',
        width: '100%',
      },
      disabled: {
        borderBottom: 'dotted 2px',
        borderColor: disabledTextColor,
        cursor: 'not-allowed',
      },
      focus: {
        borderBottom: 'solid 2px',
        borderColor: focusColor,
        transform: 'scaleX(0)',
        transition: transitions.easeOut(),
      },
      error: {
        borderColor: errorStyleColor ? errorStyleColor : errorColor,
        transform: 'scaleX(1)',
      },
    };

    let underline = Object.assign({}, styles.root, style);
    let focusedUnderline = Object.assign({}, underline, styles.focus, focusStyle);

    if (disabled) underline = Object.assign({}, underline, styles.disabled, disabledStyle);
    if (focus) focusedUnderline = Object.assign({}, focusedUnderline, {transform: 'scaleX(1)'});
    if (error) focusedUnderline = Object.assign({}, focusedUnderline, styles.error);

    return (
      <div>
        <hr style={underline} />
        <hr style={focusedUnderline} />
      </div>
    );
  }
}

export default TextFieldUnderline;
