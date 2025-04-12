import React, { useState, useEffect } from 'react';
import _get from 'lodash.get';
import { useQuery, useMutation } from 'react-query';
import { GET_USER_PROJECTS, DELETE_PROJECT } from './queries';
import reactQueryConfig from '@/constants/react-query-config';
import DynamicTable, { TableActions } from '@/components/table/index';
import { tableHeadings } from '@/src/constants/projects';
import Pagination from '@/src/utils/pagination';
import Router from 'next/router';
import moment from 'moment';
import { ConfirmationModal } from '@/components/modal';
import { Message } from '@/components/alert/message';

const Projects = () => {
  const [queryParams, setQueryParams] = useState({
    page_no: 1,
    records_per_page: 10,
  });
  const [deleteModal, setDeleteModal] = useState(false);
  const [dataToDelete, setDataDelete] = useState({});
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const [paginationData, setPaginationData] = useState({});
  const { mutate: deleteItem, isLoading: isLoadingDelete } =
    useMutation(DELETE_PROJECT);
  const {
    data: userProjects,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery(['USER_PROJECTS', queryParams], GET_USER_PROJECTS, {
    ...reactQueryConfig,
    onSuccess: (res) => {
      const { result } = Pagination(
        res.records_per_page,
        res.total_number_of_records,
        res.page_no,
        res.data.length,
      );
      return setPaginationData(result);
    },
    onError: () => {
      setPaginationData({});
    },
  });
  const handleNext = (currentPage) => {
    setQueryParams({
      ...queryParams,
      page_no: parseInt(currentPage) + 1,
    });
  };
  const handlePrevious = (currentPage) => {
    setQueryParams({
      ...queryParams,
      page_no: parseInt(currentPage) - 1,
    });
  };
  const handlePageSelect = (page) => {
    setQueryParams({
      ...queryParams,
      page_no: page,
    });
  };
  const handleCreate = () => {
    Router.push('/admin/projects/create', '/admin/projects/create', {
      shallow: true,
    });
  };
  const handleEdit = (id) => {
    Router.push(`/admin/projects/${id}`, `/admin/projects/${id}`, {
      shallow: true,
    });
  };
  const handleView = (id) => {
    Router.push(`/admin/projects/${id}/view`, `/admin/projects/${id}/view`, {
      shallow: true,
    });
  };
  const handleDelete = (id) => {
    setDeleteModal(true);
    const findProject = _get(userProjects, 'data', []).find(
      (project) => project._id === id,
    );
    setDataDelete(findProject);
  };
  const handleConfirmDelete = async () => {
    toggleDeleteModal();
    await deleteItem(_get(dataToDelete, '_id', ''), {
      onSuccess: async (res) => {
        await refetch();
        Message.success(res);
        return await res;
      },
      onError: async (err) => {
        Message.error(err);
        return await err;
      },
    });
  };
  return (
    <>
      <DynamicTable
        heading="All Projects"
        tableHeadings={tableHeadings}
        isCreateButton={true}
        handleCreate={handleCreate}
        createButtonText="Create Project"
        paginationData={paginationData}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handlePageSelect={handlePageSelect}
        isLoadingData={isLoading || isFetching}
        noDataFound={isError || _get(userProjects, 'data', []).length === 0}
      >
        {_get(userProjects, 'data', []).map((project, i) => (
          <tr key={i}>
            <th scope="row">{i + 1}</th>
            <td>
              <p className="m-0 max-w-[150px] truncate">
                {_get(project, 'title', '')}
              </p>
            </td>
            <td>
              <p className="m-0 max-w-[400px] truncate">
                {_get(project, 'description', '')}
              </p>
            </td>
            <td>
              <p className="m-0 max-w-[150px] truncate">
                {moment(_get(project, 'createdAt', '')).format(
                  'YYYY-MM-DD HH:mm',
                )}
              </p>
            </td>
            <TableActions
              dataId={_get(project, '_id')}
              isEdit={true}
              handleEdit={handleEdit}
              isView={true}
              handleView={handleView}
              isDelete={true}
              handleDelete={handleDelete}
            />
          </tr>
        ))}
      </DynamicTable>
      <ConfirmationModal
        isLoading={isLoadingDelete}
        heading="Confirm Delete"
        modalOpen={deleteModal}
        toggleModal={toggleDeleteModal}
        handleCancelButton={toggleDeleteModal}
        isCancelButton={true}
        isConfirmButton={true}
        confirmButtonText="Delete"
        handleConfirmButton={handleConfirmDelete}
      >
        <p>
          Are you sure you want to delete this Project
          <strong> {dataToDelete?.title}</strong>
        </p>
      </ConfirmationModal>
    </>
  );
};

export default Projects;
