import { startOfDay , parseISO, endOfDay } from 'date-fns';
const { Op } = require('sequelize');

import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
  async index (req,res) {
    const checkUserProvier = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvier) {
      return res.status(401).json({error: 'User is not a provider'});
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between] : [
            startOfDay(parsedDate), endOfDay(parsedDate),
          ]
        },
      },
      order: ['date'],
    })

    return res.json(appointments);
  }
}

export default new ScheduleController();