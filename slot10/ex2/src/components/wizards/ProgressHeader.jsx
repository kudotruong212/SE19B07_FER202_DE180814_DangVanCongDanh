import React from "react";
import { ProgressBar, Tabs, Tab } from "react-bootstrap";

export default function ProgressHeader({ step, progress }) {
  return (
    <>
      {/* Header y như hình: icon tròn xanh + chữ đậm */}
      <div className="d-flex align-items-center mb-3">
        <div className="header-avatar">
          <i className="bi bi-person-fill"></i>
        </div>
        <h4 className="m-0 fw-semibold text-dark">Build Your Profile</h4>
      </div>

      {/* Thanh tiến độ mảnh */}
      <ProgressBar
        now={progress}
        className="mb-3 thin-progress"
        variant="primary"
      />

      {/* Tabs step */}
      <Tabs activeKey={step} className="mb-3" onSelect={() => {}}>
        <Tab eventKey={1} title="About" disabled />
        <Tab eventKey={2} title="Account" disabled />
        <Tab eventKey={3} title="Address" disabled />
      </Tabs>
    </>
  );
}
