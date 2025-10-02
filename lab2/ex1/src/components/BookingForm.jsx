// src/components/BookingForm.js
import React from 'react';

export default function BookingForm() {
  return (
    <section className="booking bg-dark py-5" id="booking">
      <div className="container text-center">
        <h2 className="text-light mb-4">Book Your Table</h2>
        
        <form 
          className="mx-auto" 
          style={{ maxWidth: '600px' }} 
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <input 
                type="text" 
                placeholder="Your Name *" 
                required 
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <input 
                type="email" 
                placeholder="Your Email *" 
                required 
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <select defaultValue="" required className="form-select">
                <option value="" disabled>Select a Service</option>
                <option>Dine In</option>
                <option>Delivery</option>
                <option>Take Away</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <textarea 
              rows="6" 
              placeholder="Please write your comment" 
              className="form-control"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-warning px-4">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}