import React from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import PropTypes from 'prop-types';

const TableActions = (props) => {
  const {
    isView,
    isEdit,
    isDelete,
    handleView,
    handleEdit,
    handleDelete,
    dataId,
    children,
  } = props;
  return (
    <td className="text-left">
      <UncontrolledDropdown>
        <DropdownToggle
          className="btn-icon-only text-light"
          href="#"
          role="button"
          size="sm"
        >
          <i className="fas fa-ellipsis-v" />
        </DropdownToggle>
        <DropdownMenu
          className="dropdown-menu-arrow"
          end
          container="body"
          style={{ zIndex: 9999 }}
        >
          {isView && (
            <DropdownItem onClick={() => handleView(dataId)}>View</DropdownItem>
          )}
          {isEdit && (
            <DropdownItem onClick={() => handleEdit(dataId)}>Edit</DropdownItem>
          )}
          {children}
          {isDelete && (
            <DropdownItem onClick={() => handleDelete(dataId)}>
              Delete
            </DropdownItem>
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
    </td>
  );
};

TableActions.propTypes = {
  isEdit: PropTypes.bool,
  isDelete: PropTypes.bool,
  isView: PropTypes.bool,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  handleView: PropTypes.func,
  dataId: PropTypes.string,
  children: PropTypes.any,
};

export { TableActions };
