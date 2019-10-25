import Bee from'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [ CancellationMail ];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }
  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        queu: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].queu.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { queu, handle } = this.queues[job.key];

      queu.process(handle);
    });
  }
};

export default new Queue();