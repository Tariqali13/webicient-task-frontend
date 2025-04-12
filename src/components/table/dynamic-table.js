import React from 'react';
import { TablePagination } from './components';
import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
  Button,
  Spinner,
} from 'reactstrap';
import _get from 'lodash.get';
import PropTypes from 'prop-types';

const DynamicTable = (props) => {
  const {
    tableHeadings = [],
    children,
    heading,
    isCreateButton,
    createButtonText,
    handleCreate,
    paginationData,
    handleNext,
    handlePrevious,
    handlePageSelect,
    isLoadingData,
    noDataFound,
    innerComponent = false,
  } = props;
  const numberOfRecords = _get(paginationData, 'totalNumberofRecord', 0);
  return (
    <Container className={innerComponent ? 'w-full p-0' : ''}>
      <Row>
        <div className={innerComponent ? 'p-0 col' : 'col'}>
          <Card className="shadow">
            <CardHeader className="border-0">
              {isCreateButton && (
                <Button
                  className="float-right"
                  color="primary"
                  onClick={handleCreate}
                >
                  {createButtonText || 'Create'}
                </Button>
              )}
              <h3 className="mb-0">{heading}</h3>
            </CardHeader>
            <Table
              className="align-items-center table-flush"
              responsive
              style={{
                minHeight: numberOfRecords === 1 ? '140px' : '',
              }}
            >
              <thead className="thead-light">
                <tr>
                  {tableHeadings.map((heading, i) => (
                    <th scope="col" key={i}>
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>{!isLoadingData ? children : null}</tbody>
            </Table>
            {isLoadingData && (
              <div className="w-100 mb-3 mt-3 text-center">
                <Spinner> </Spinner>
              </div>
            )}
            {noDataFound && (
              <div className="w-100 mb-3 mt-3 text-center">No Data Found</div>
            )}
            {!isLoadingData &&
              _get(paginationData, 'totalNumberofRecord', 0) > 0 && (
                <CardFooter className="py-4">
                  <TablePagination
                    paginationData={paginationData}
                    handleNext={handleNext}
                    handlePrevious={handlePrevious}
                    handlePageSelect={handlePageSelect}
                  />
                </CardFooter>
              )}
          </Card>
        </div>
      </Row>
    </Container>
  );
};

DynamicTable.propTypes = {
  tableHeadings: PropTypes.array,
  children: PropTypes.any,
  heading: PropTypes.string,
  isCreateButton: PropTypes.bool,
  createButtonText: PropTypes.string,
  handleCreate: PropTypes.func,
  paginationData: PropTypes.any,
  handleNext: PropTypes.func,
  handlePrevious: PropTypes.func,
  handlePageSelect: PropTypes.func,
  isLoadingData: PropTypes.bool,
  noDataFound: PropTypes.bool,
};
export default DynamicTable;
