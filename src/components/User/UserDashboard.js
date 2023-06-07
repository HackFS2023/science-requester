import React, { useState } from 'react';
import Modal from 'react-modal';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function Dashboard({ computations }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [jobData, setJobData] = useState({
    APIVersion: 'V1beta1',
    ClientID: '',
    Spec: {
      engine: '',
      verifier: '',
      publisher: '',
      docker: {
        image: '',
        entrypoint: [],
      },
      // Add the rest of the fields as necessary
    },
  });

  const handleChange = (e) => {
    // Update the jobData state with the new value
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the function to submit the job
    // submitJob(jobData);
    setModalOpen(false); // close the modal after submitting
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Requested Computations</h2>
        {/* Display requested computations */}
        {computations && computations.requested.map(comp => <div key={comp.id}>{comp.name}</div>)}
      </div>
      <div>
        <h2>Completed Computations</h2>
        {/* Display completed computations */}
        {computations && computations.completed.map(comp => <div key={comp.id}>{comp.name}</div>)}
      </div>
      <div>
        <h2>New Request</h2>
        <button onClick={() => setModalOpen(true)}>New Request</button>
      </div>

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="New Request"
        style={{
          overlay: {
            backgroundColor: 'rgba(255, 255, 255, 0.75)', // Change this to the color of your webpage
          },
          content: {
            color: 'black', // Change this to the text color of your webpage
          },
        }}
      >
        <h2>Create New Request</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Client ID:
            <input type="text" name="ClientID" value={jobData.ClientID} onChange={handleChange} />
          </label>
          <label>
            Engine:
            <input type="text" name="engine" value={jobData.Spec.engine} onChange={handleChange} />
          </label>
          {/* Add more input fields as necessary */}
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => setModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}

export default Dashboard;
