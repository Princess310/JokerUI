import React, {Component, PropTypes} from 'react';
import transitions from '../styles/transitions';
import TextFieldUnderline from './TextFieldUnderline';

function getStyles(props, context, state) {
  const {
    textField: {
      floatingLabelColor,
      textColor,
      disabledColor,
      focusColor,
      hintColor,
    }
  } = context.uiTheme;

  const styles = {
    root: {
      fontSize: 16,
      lineHeight: '24px',
      height: (props.rows - 1) * 24 + (props.floatingLabelText ? 72 : 48),
      display: 'inline-block',
      position: 'relative',
      transition: transitions.easeOut('200ms', 'height'),
    },
    floatingLabel: {
      color: hintColor,
      pointerEvents: 'none',
    },
    input: {
      padding: 0,
      position: 'relative',
      width: '100%',
      border: 'none',
      outline: 'none',
      backgroundColor: 'rgba(0,0,0,0)',
      color: props.disabled ? disabledColor : textColor,
      cursor: props.disabled ? 'not-allowed' : 'initial',
      font: 'inherit',
      appearance: 'textfield',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    },
    textarea: {
    },
  }

  Object.assign(styles.textarea, styles.input, {
    marginTop: props.floatingLabelText ? 36 : 12,
    marginBottom: props.floatingLabelText ? -36 : -12,
    boxSizing: 'border-box',
    font: 'inherit',
  });

  styles.input.height = '100%';

  if (state.hasValue) {
    styles.floatingLabel.color = fade(props.disabled ? disabledTextColor : floatingLabelColor, 0.5);
  }

  if (state.isFocused) {
    styles.floatingLabel.color = focusColor;
  }

  if (props.floatingLabelText) {
    styles.input.boxSizing = 'border-box';

    if (!props.multiLine) {
      styles.input.marginTop = 14;
    }
  }

  return styles;
}

class TextField extends Component {
  static propTypes = {
    defaultValue: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    multiLine: PropTypes.bool,
    rows: PropTypes.number,
    disabled: PropTypes.bool,
    // check if fixed the label for input
    floatingLabelFixed: PropTypes.bool,
    placeholder: PropTypes.string,
    underlineShow: PropTypes.bool,
    id: PropTypes.string,
  }

  static defaultProps = {
    disabled: false,
    floatingLabelFixed: false,
    multiLine: false,
    type: 'text',
    underlineShow: true,
    rows: 1,
  }

  static contextTypes = {
    uiTheme: PropTypes.object.isRequired,
  }

  state = {
    isFocused: false,
    hasValue: false,
    isClean: true,
  }

  componentWillMount() {
    const {
      name,
      placeholder,
      floatingLabelText,
      id,
    } = this.props;

    console.warn(name || placeholder || floatingLabelText || id, `We don't have enough information
      to build a robust unique id for the TextField component. Please provide an id or a name.`);

    const uniqueId = `${name}-${placeholder}-${floatingLabelText}-${
      Math.floor(Math.random() * 0xFFFF)}`;
    this.uniqueId = uniqueId.replace(/[^A-Za-z0-9-]/gi, '');
  }

  handleInputBlur = (event) => {
    this.setState({isFocused: false});
    if (this.props.onBlur) this.props.onBlur(event);
  };

  handleInputChange = (event) => {
    this.setState({hasValue: isValid(event.target.value), isClean: false});
    if (this.props.onChange) this.props.onChange(event, event.target.value);
  };

  handleInputFocus = (event) => {
    if (this.props.disabled) {
      return;
    }
    this.setState({isFocused: true});
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  render() {
    const {
      defaultValue,
      type,
      onChange,
      onFocus,
      onBlur,
      multiLine,
      rows,
      disabled,
      floatingLabelFixed,
      placeholder,
      underlineShow,
      id,
      ...other,
    } = this.props;

    const styles = getStyles(this.props, this.context, this.state);

    let inputElemet = multiLine ? (
      <textarea
        style={styles.textarea}
        placeholder={placeholder}
        onBlur={this.handleInputBlur}
        onFocus={this.handleInputFocus}
        disabled={disabled}
      />
    ) : (
      <input
        type={type}
        style={styles.input}
        placeholder={placeholder}
        onBlur={this.handleInputBlur}
        onFocus={this.handleInputFocus}
        disabled={disabled}
      />
    )

    const inputId = id || this.uniqueId;

    return (
      <div
        style={styles.root}
      >
        {inputElemet}
        <TextFieldUnderline
          disabled={disabled}
          focus={this.state.isFocused}
        />
      </div>
    );
  }
}

export default TextField;
