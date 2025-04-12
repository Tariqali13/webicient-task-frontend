/* eslint-disable prettier/prettier */
import React from 'react';
import AlertMessage from '@/components/alert/alert-message';
import _get from 'lodash/get';
import { toast } from 'react-toastify';
import ValidationMessage from '@/components/alert/validation-message';

export class Message {
  static errorMultiLine(e, heading) {
    toast.error(<ValidationMessage errors={e} heading={heading || 'Oops'} />);
  }

  static error(e, otherOption) {
    toast.error(
      <AlertMessage
        message={
          !otherOption?.message
            ? _get(
                e,
                'response.data.message',
                'Something went wrong. Please try again.”',
              )
            : otherOption?.message || 'Operation Failed'
        }
        heading={otherOption?.heading || 'Failure'}
      />,
    );
  }

  static success(res, otherOption) {
    toast.success(
      <AlertMessage
        message={res?.message || 'Your changes have been saved successfully.'}
        heading={otherOption?.heading || 'Great Success!'}
      />,
    );
  }

  static notificationsSuccess(res, otherOption) {
    toast.success(
      <AlertMessage
        message={
          otherOption?.message || 'Your changes have been saved successfully.'
        }
        heading={otherOption?.heading || 'Great Success!'}
      />,
    );
  }

  static successUserSite(res, otherOption) {
    toast.success(
      <AlertMessage
        message={
          !otherOption
            ? _get(res, 'message', 'Your changes have been saved successfully.')
            : otherOption?.message ||
              'Your changes have been saved successfully.'
        }
        heading={otherOption?.heading || 'Great Success!'}
      />,
    );
  }

  static notification(message) {
    toast.success(<AlertMessage message={message} heading="Great Success!" />);
  }
}
