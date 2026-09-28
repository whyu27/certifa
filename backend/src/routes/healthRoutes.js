import express from 'express';

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Certifa Backend API',
    timestamp: new Date().toISOString(),
    pinataConfigured: Boolean(process.env.PINATA_JWT && process.env.PINATA_JWT.trim().length > 0)
  });
});

export default router;
