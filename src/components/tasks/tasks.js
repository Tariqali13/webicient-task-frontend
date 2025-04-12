import React, { useState, useEffect } from 'react';
import _get from 'lodash.get';
import { useQuery, useMutation } from 'react-query';
import {
  GET_ALL_TASKS,
  DELETE_TASK,
  UPDATE_TASK,
  UPDATE_TASK_STATUS,
  UPDATE_TASK_ORDER,
} from './queries';
import reactQueryConfig from '@/constants/react-query-config';
import DynamicTable, { TableActions } from '@/components/table/index';
import { tableHeadings } from '@/src/constants/tasks';
import Pagination from '@/src/utils/pagination';
import Router from 'next/router';
import moment from 'moment';
import { ConfirmationModal, ProcessingModal } from '@/components/modal';
import { statuses } from '@/src/constants/tasks';
import ReactSelect from '@/components/react-select/react-select';
import { Message } from '@/components/alert/message';
import { Input } from 'reactstrap';
import DatePicker from 'react-datepicker';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
const Tasks = ({ projectId = '', projectData }) => {
  const [queryParams, setQueryParams] = useState({
    page_no: 1,
    records_per_page: 10,
    project_id: projectId || '',
    status: '',
    due_date: null,
  });
  const [deleteModal, setDeleteModal] = useState(false);
  const [dataToDelete, setDataDelete] = useState({});
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const [paginationData, setPaginationData] = useState({});
  const { mutate: deleteItem, isLoading: isLoadingDelete } =
    useMutation(DELETE_TASK);
  const {
    data: userTasks,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery(['USER_TASKS', queryParams], GET_ALL_TASKS, {
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
  const {
    mutate: updateTaskStatus,
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
  } = useMutation(UPDATE_TASK_STATUS);

  const { mutate: updateTaskOrder, isLoading: isLoadingOrder } =
    useMutation(UPDATE_TASK_ORDER);

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
    if (projectId) {
      Router.push(
        `/admin/projects/${projectId}/tasks/create`,
        `/admin/projects/${projectId}/tasks/create`,
        {
          shallow: true,
        },
      );
    } else {
      Router.push('/admin/tasks/create', '/admin/tasks/create', {
        shallow: true,
      });
    }
  };
  const handleEdit = (id) => {
    if (projectId) {
      Router.push(
        `/admin/projects/${projectId}/tasks/${id}`,
        `/admin/projects/${projectId}/tasks/${id}`,
        {
          shallow: true,
        },
      );
    } else {
      Router.push(`/admin/tasks/${id}`, `/admin/tasks/${id}`, {
        shallow: true,
      });
    }
  };
  const handleView = (id) => {
    if (projectId) {
      Router.push(
        `/admin/projects/${projectId}/tasks/${id}/view`,
        `/admin/projects/${projectId}/tasks/${id}/view`,
        {
          shallow: true,
        },
      );
    } else {
      Router.push(`/admin/tasks/${id}/view`, `/admin/tasks/${id}/view`, {
        shallow: true,
      });
    }
  };
  const handleDelete = (id) => {
    setDeleteModal(true);
    const findTask = _get(userTasks, 'data', []).find(
      (task) => task._id === id,
    );
    setDataDelete(findTask);
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

  const findStatusForFilter = statuses.find(
    (stat) => stat.value === queryParams.status,
  );
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    const tasks = _get(userTasks, 'data', []);
    if (!over || active.id === over.id) return;

    const draggedId = active.id;
    const targetId = over.id;
    const newIndex = tasks.findIndex((task) => task._id === targetId);
    await updateTaskOrder(
      {
        id: draggedId,
        data: { newOrderBy: newIndex },
      },
      {
        onSuccess: (res) => {
          Message.success(res);
          refetch();
        },
        onError: async (err) => {
          Message.error(err);
          return await err;
        },
      },
    );
    // setTasks(newOrder);
  };
  function SortableItem({ i, id, task }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });
    const findStatus = statuses.find(
      (status) => status.value === _get(task, 'status', ''),
    );
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <tr key={i} ref={setNodeRef} style={style}>
        <th scope="row" {...attributes}>
          <i className="ni ni-button-play cursor-move" {...listeners} />
        </th>
        <th scope="row">{i + 1}</th>
        <td>
          <p className="m-0 max-w-[150px] truncate">
            {_get(task, 'title', '')}
          </p>
        </td>
        <td>
          <p className="m-0 max-w-[150px] truncate">
            {_get(task, 'description', '')}
          </p>
        </td>
        <td>
          <ReactSelect
            isMulti={false}
            isCreateable={false}
            defaultValue={findStatus}
            // isDisabled={isLoadingSave}
            options={statuses}
            getOptionLabel="label"
            getOptionValue="value"
            isSearchable={true}
            placeholder="Select Status"
            handleChange={async (value) => {
              if (value.value != _get(task, 'status', '')) {
                await updateTaskStatus(
                  {
                    id: _get(task, '_id', ''),
                    data: {
                      status: value.value,
                    },
                  },
                  {
                    onSuccess: (res) => {
                      Message.success(res);
                      refetch();
                    },
                    onError: async (err) => {
                      Message.error(err);
                      return await err;
                    },
                  },
                );
              }
            }}
          />
        </td>
        <td>
          <p className="m-0 max-w-[100px] truncate">
            {moment(_get(task, 'due_date', '')).format('YYYY-MM-DD')}
          </p>
        </td>
        <td>
          <p className="m-0 max-w-[150px] truncate">
            {_get(task, 'project_id.title', '')}
          </p>
        </td>
        <TableActions
          dataId={_get(task, '_id')}
          isEdit={true}
          handleEdit={handleEdit}
          isView={true}
          handleView={handleView}
          isDelete={true}
          handleDelete={handleDelete}
        />
      </tr>
    );
  }
  return (
    <>
      <DynamicTable
        innerComponent={projectId ? true : false}
        heading={projectId ? `${projectData.title} - All Tasks` : 'All Tasks'}
        tableHeadings={tableHeadings}
        isCreateButton={true}
        handleCreate={handleCreate}
        createButtonText={
          projectId ? `${projectData.title} - Create Task` : 'Create Task'
        }
        paginationData={paginationData}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handlePageSelect={handlePageSelect}
        isLoadingData={isLoading || isFetching}
        noDataFound={isError || _get(userTasks, 'data', []).length === 0}
      >
        <tr>
          <td>Filters: </td>
          <td></td>
          <td></td>
          <td>
            <ReactSelect
              isClearable={true}
              isMulti={false}
              isCreateable={false}
              defaultValue={findStatusForFilter}
              options={statuses}
              getOptionLabel="label"
              getOptionValue="value"
              isSearchable={true}
              placeholder="Select Status"
              handleChange={async (value) => {
                if (value) {
                  setQueryParams({
                    ...queryParams,
                    status: value.value,
                  });
                } else {
                  setQueryParams({
                    ...queryParams,
                    status: '',
                  });
                }
              }}
            />
          </td>
          <td>
            <DatePicker
              className="border border-solid border-black"
              showIcon
              isClearable={true}
              selected={queryParams.due_date}
              onChange={(value) => {
                if (value) {
                  setQueryParams({
                    ...queryParams,
                    due_date: moment(value).format('YYYY-MM-DD'),
                  });
                } else {
                  setQueryParams({
                    ...queryParams,
                    due_date: null,
                  });
                }
              }} //when day is clicked
            />
          </td>
        </tr>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={_get(userTasks, 'data', []).map((task) => task._id)}
            strategy={verticalListSortingStrategy}
          >
            {_get(userTasks, 'data', []).map((task, i) => (
              <SortableItem i={i} task={task} key={task._id} id={task._id} />
            ))}
          </SortableContext>
        </DndContext>
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
          Are you sure you want to delete this Task?
          <strong> {dataToDelete?.title}</strong>
        </p>
      </ConfirmationModal>
      {(isLoadingUpdate || isLoadingOrder) && <ProcessingModal />}
    </>
  );
};

export default Tasks;
