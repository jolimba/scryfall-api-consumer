import { OracleMTGController } from '../Controller/OracleMTGController';
import {
  mockQueue,
  mockQueueEvents,
  setupSuccessMock,
  setupFailureMock
} from './controller/mocks/BullMQ.mock';

describe('OracleMTGController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('success', async () => {
    setupSuccessMock();

    const controller = new OracleMTGController(
      mockQueue,
      mockQueueEvents
    );

    const req: any = {
      body: { message: 'teste' }
    };

    const res: any = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await controller.oracleMTGListRedis(req, res);

    expect(res.json).toHaveBeenCalledWith({
      requestId: expect.any(String),
      result: expect.any(Object)
    });
  });

  it('failure', async () => {
    setupFailureMock();

    const controller = new OracleMTGController(
      mockQueue,
      mockQueueEvents
    );

    const req: any = {
      body: { message: 'teste' }
    };

    const res: any = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await controller.oracleMTGListRedis(req, res);

    expect(res.status).toHaveBeenCalledWith(504);
    expect(res.json).toHaveBeenCalledWith({
      requestId: expect.any(String),
      error: 'timeout or worker failed'
    });
  });
});