import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Container, Row, Col, Nav, Card } from 'react-bootstrap';

function DashboardLayout() {
  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        {/* Sidebar */}
        <Col md={3} lg={2} className="bg-dark min-vh-100">
          <div className="p-3">
            <h2 className="text-white mb-4">
              Dashboard
            </h2>
            
            <Nav className="flex-column">
              <NavLink 
                to="/dashboard"
                end
                className={({ isActive }) => 
                  `nav-link text-white mb-2 p-2 rounded ${isActive ? 'bg-primary' : 'hover-bg-secondary'}`
                }
              >
                Trang chủ Dashboard
              </NavLink>
              
              <NavLink 
                to="/dashboard/settings"
                className={({ isActive }) => 
                  `nav-link text-white mb-2 p-2 rounded ${isActive ? 'bg-primary' : 'hover-bg-secondary'}`
                }
              >
                Cài đặt
              </NavLink>
              
              <NavLink 
                to="/dashboard/reports"
                className={({ isActive }) => 
                  `nav-link text-white mb-2 p-2 rounded ${isActive ? 'bg-primary' : 'hover-bg-secondary'}`
                }
              >
                Báo cáo
              </NavLink>
            </Nav>
          </div>
        </Col>
        
        {/* Main Content */}
        <Col md={9} lg={10} className="bg-light">
          <div className="p-4">
            <Outlet />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardLayout;
