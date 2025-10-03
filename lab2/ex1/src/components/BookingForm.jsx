// src/components/BookingForm.js
import React from 'react';

export default function BookingForm() {
  return (
    <section className="booking bg-dark py-5" id="booking">
      <div className="container text-center">
        <h2 className="text-light mb-4">Book Your Table</h2>
        <div class="alert alert-success" role="alert">
          A simple success alert—check it out!
        </div>
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
            <div class="btn-group">
              <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Danger
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" href="#">Separated link</a></li>
              </ul>
            </div>
          </div>
          <div className="mb-3">
            <textarea
              rows="6"
              placeholder="Please write your comment"
              className="form-control"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-warning px-4 fw-bold" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Send Message
          </button>
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  ...
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </section>
  );
}