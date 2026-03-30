import { jest } from '@jest/globals';

export const mockResult = { ok: true };

export const mockWaitUntilFinished = jest.fn<() => Promise<any>>();

export const mockAdd = jest.fn<() => Promise<any>>();

export const mockQueue = {
  add: mockAdd
} as any;

export const mockQueueEvents = {} as any;

export function setupSuccessMock() {
  mockWaitUntilFinished.mockResolvedValue(mockResult);

  mockAdd.mockResolvedValue({
    waitUntilFinished: mockWaitUntilFinished
  });
}

export function setupFailureMock() {
  mockWaitUntilFinished.mockRejectedValue(new Error('fail'));

  mockAdd.mockResolvedValue({
    waitUntilFinished: mockWaitUntilFinished
  });
}