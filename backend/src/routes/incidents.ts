import express from 'express';
import { Incident } from '../models/incident';
import { AuthenticatedRequest, authenticate } from '../middleware/authenticate';
import { incidentSchema } from '../schemas/incidentSchema';
import { validateBody } from '../middleware/validate';
import { summarizeIncident } from '../utils/summarize';

const router = express.Router();

/**
 * @swagger
 * /api/incidents:
 *   post:
 *     summary: Create a new incident
 *     security:
 *       - bearerAuth: []
 *     tags: [Incidents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Incident created
 *       401:
 *         description: Unauthorized
 */
router.post(
    '/', 
    authenticate, 
    validateBody(incidentSchema), 
    async (req: AuthenticatedRequest, res) => {
    const { type, description } = req.body;
    const userId = req.user?.uid;

    try {
        const incident = await Incident.create({
            userId,
            type,
            description
        });

        res.status(201).json(incident);
    } catch (err) {
        console.error('Failed to create incident:', err);
        res.status(500).json({ error: 'Failed to create incident' });
    }
});

/**
 * @swagger
 * /api/incidents:
 *   get:
 *     summary: Get all incidents
 *     tags: [Incidents]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns list of incidents
 */
router.get('/', authenticate, async (req: AuthenticatedRequest, res) => {
  const userId = req.user?.uid;
  const incidents = await Incident.findAll({ where: { userId } });
  res.json(incidents);
});

/**
 * @swagger
 * /api/incidents/{id}/summarize:
 *   post:
 *     summary: Generate a summary for an incident using OpenAI
 *     tags: [Incidents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the incident
 *     responses:
 *       200:
 *         description: Summary created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 summary:
 *                   type: string
 *       404:
 *         description: Incident not found
 *       401:
 *         description: Unauthorized
 */
router.post(
    '/:id/summarize',
    authenticate,
    async (req: AuthenticatedRequest, res) => {
      const incidentId = req.params.id;
      const userId = req.user?.uid;
  
      try {
        const incident = await Incident.findOne({
          where: { id: incidentId, userId },
        });
  
        if (!incident) {
          return res.status(404).json({ error: 'Incident not found' });
        }
  
        const summary = await summarizeIncident(incident.description);
  
        incident.summary = summary;
        await incident.save();
  
        res.json({ message: 'Summary updated', summary });
      } catch (error) {
        console.error('Error summarizing incident:', error);
        res.status(500).json({ error: 'Failed to summarize incident' });
      }
    }
);

export default router;