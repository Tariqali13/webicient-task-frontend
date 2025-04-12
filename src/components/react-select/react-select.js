import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const ReactSelect = (props) => {
  const {
    isClearable = false,
    getOptionLabel,
    getOptionValue,
    options,
    defaultValue,
    isMulti,
    handleChange,
    isLoading,
    noOptionsMessage,
    isDisabled,
    creatableSelectStyles,
    handleInputChange,
    isSearchable,
    formatOptionLabel,
    onBlur,
    onFocus,
    blurInputOnSelect,
    onMenuOpen,
    value,
    placeholder,
    ownGetOptionLabel,
    classes,
    inputId,
  } = props;
  const handleFocus = (e) => {
    e.target.setAttribute('autocomplete', 'off');
  };
  return (
    <React.Fragment>
      <Select
        isClearable={isClearable}
        isLoading={isLoading}
        isMulti={isMulti}
        value={value || defaultValue}
        defaultValue={defaultValue}
        options={options}
        isDisabled={isDisabled}
        blurInputOnSelect={blurInputOnSelect}
        onFocus={(e) => {
          if (onFocus) {
            onFocus();
          }
          handleFocus(e);
        }}
        onBlur={onBlur}
        onMenuOpen={onMenuOpen}
        onInputChange={handleInputChange}
        formatOptionLabel={formatOptionLabel}
        style={creatableSelectStyles}
        getOptionValue={(opt) => opt[getOptionValue]}
        getOptionLabel={(opt) =>
          ownGetOptionLabel ? ownGetOptionLabel(opt) : opt[getOptionLabel]
        }
        inputId={inputId}
        noOptionsMessage={noOptionsMessage}
        isSearchable={isSearchable}
        onChange={handleChange}
        classNamePrefix="select"
        placeholder={placeholder}
        inputProps={{ autoComplete: 'off', autoFill: 'off' }}
        className={`react-msd rt-themeselectdropdown ${classes}`}
        menuPortalTarget={document.body} // portal the dropdown out of the table
        styles={{
          ...creatableSelectStyles,
          menuPortal: (base) => ({ ...base, zIndex: 9999 }), // ensure it's on top
        }}
      />
    </React.Fragment>
  );
};
ReactSelect.propTypes = {
  getOptionLabel: PropTypes.string,
  getOptionValue: PropTypes.string,
  options: PropTypes.array,
  defaultValue: PropTypes.array,
  isMulti: PropTypes.bool,
  handleChange: PropTypes.func,
  isLoading: PropTypes.bool,
  noOptionsMessage: PropTypes.any,
  isDisabled: PropTypes.bool,
  creatableSelectStyles: PropTypes.any,
  handleInputChange: PropTypes.func,
  handleKeyDown: PropTypes.func,
  inputValue: PropTypes.string,
  handleBlur: PropTypes.any,
  isSearchable: PropTypes.bool,
  formatOptionLabel: PropTypes.any,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  blurInputOnSelect: PropTypes.bool,
  onMenuOpen: PropTypes.func,
  value: PropTypes.any,
  placeholder: PropTypes.any,
  classes: PropTypes.string,
  ownGetOptionLabel: PropTypes.func,
  isMenuOpen: PropTypes.bool,
  inputId: PropTypes.string,
};

export default ReactSelect;
