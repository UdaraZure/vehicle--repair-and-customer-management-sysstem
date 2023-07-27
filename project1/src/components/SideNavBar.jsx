import React, { useState } from 'react';
import "./SideNavBar.css";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';

  import { NavLink } from 'react-router-dom';


function SideNavBar() {
    
  return (
    <>
      <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial', marginTop:"95px" }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="http://localhost:3000/OwnerDashboard" className="text-decoration-none" style={{ color: 'inherit' }}>
            Owner Options
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="http://localhost:3000/Offers" activeClassName="activeClicked" target="_blank">
              <CDBSidebarMenuItem ><p>Offers</p></CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="http://localhost:3000/ServiceTypes" activeClassName="activeClicked" target="_blank">
              <CDBSidebarMenuItem><p>Service Types</p></CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="http://localhost:3000/Employees" activeClassName="activeClicked" target="_blank">
              <CDBSidebarMenuItem><p>Employees</p></CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        {/* <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter> */}
      </CDBSidebar>
    </div>
    </>
  )
}

export default SideNavBar
