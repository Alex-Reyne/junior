const express = require('express');
const router = express.Router();

module.exports = ({
  getGigPostings,
  getGigById,
  getGigImagesByGigId,
  getApplicationsByGigPostingId,
  addGigPosting,
}) => {
  /* GET list of gigs */
  router.get('/', (req, res) => {
    getGigPostings()
      .then(job => res.json(job))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  // return data for single job post based on its jobPostingId
  router.get('/:id', (req, res) => {
    const {id} = req.params;
    getGigById(id)
      .then(gig => {
        getGigImagesByGigId(id).then(images => {
          gig.gig_images = images;
          res.json(gig);
        });
      })
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  // return application data for a single gig posting
  router.get('/:id/applications', (req, res) => {
    getApplicationsByGigPostingId(req.params.id)
      .then(application => res.json(application))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  /* POST a new gig posting */
  router.post('/new', (req, res) => {
    const {employer_id, job_title, description, pay, deadline, photo_url} =
      req.body;

    addGigPosting(employer_id, job_title, description, pay, deadline, photo_url)
      .then(addedGig => {
        res.json(addedGig);
      })
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
