// import React, { useState } from 'react';
// import * as yup from 'yup';

// const FormComponent = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });
//   const [errors, setErrors] = useState({});

//   const schema = yup.object().shape({
//     name: yup.string().required('Name is required'),
//     email: yup.string().email('Invalid email').required('Email is required'),
//     password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await schema.validate(formData, { abortEarly: false });
//       const response = await fetch('http://localhost:3001/api/submitForm', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });
//       const data = await response.json();
//       console.log(data);
//       // Reset form after successful submission
//       setFormData({
//         name: '',
//         email: '',
//         password: ''
//       });
//       setErrors({});
//     } catch (error) {
//       if (error.name === 'ValidationError') {
//         const validationErrors = {};
//         error.inner.forEach((err) => {
//           validationErrors[err.path] = err.message;
//         });
//         setErrors(validationErrors);
//       } else {
//         console.error('Error:', error);
//       }
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-lg-6">
//           <h5 className="card-title text-center p-3">REGISTRATION FORM</h5>
//           <div className="card">
//             <div className="card-body">
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="name" className="form-label">Name</label>
//                   <input
//                     type="text"
//                     className={`form-control ${errors.name ? 'is-invalid' : ''}`}
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Name"
//                     required
//                   />
//                   <div className="invalid-feedback">{errors.name}</div>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label">Email</label>
//                   <input
//                     type="email"
//                     className={`form-control ${errors.email ? 'is-invalid' : ''}`}
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Email"
//                     required
//                   />
//                   <div className="invalid-feedback">{errors.email}</div>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="password" className="form-label">Password</label>
//                   <input
//                     type="password"
//                     className={`form-control ${errors.password ? 'is-invalid' : ''}`}
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Password"
//                     required
//                   />
//                   <div className="invalid-feedback">{errors.password}</div>
//                 </div>
//                 <div className="d-grid">
//                   <button type="submit" className="btn btn-primary">Submit</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormComponent;

import React, { useState } from 'react';
import * as yup from 'yup';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      const response = await fetch('http://localhost:3001/api/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
      setSubmitted(true); // Set submitted to true after successful submission
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        password: ''
      });
      setErrors({});
    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <h5 className="card-title text-center p-3">REGISTRATION FORM</h5>
          <div className="card">
            <div className="card-body">
              {submitted && (
                <div className="alert alert-success" role="alert">
                  Submitted successfully!
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                  />
                  <div className="invalid-feedback">{errors.name}</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                  <div className="invalid-feedback">{errors.password}</div>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;


