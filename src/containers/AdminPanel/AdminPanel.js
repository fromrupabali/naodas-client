import React from "react";

import { Route } from "react-router-dom";

import Navigation from "../../components/AdminPanel/Navigation";
import NavItem from "../../components/UserProfile/NavItem";
import Ads from "../../components/AdminPanel/Ads/Ads";
import Users from "../../components/AdminPanel/Users/Users";
import Reports from "../../components/AdminPanel/Reports/Reports";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const AdminSidebar = styled.div`
  width: 20%;
  height: 100%;
  float: left;
`;
const AdminMain = styled.div`
  width: 76%;
  height: 100%;
  background: white;
  float: right;
  border-radius: 5px;
`;

function Admin() {
  const navItems = [
    {
      id: 1,
      name: "Ads",
      to: "/admin",
    },
    {
      id: 2,
      name: "Users",
      to: "/admin/users",
    },
    {
      id: 3,
      name: "Reports",
      to: "/admin/reports",
    },
  ];
  return (
    <Container>
      <AdminSidebar>
        {navItems.map((nav) => {
          return <NavItem key={nav.id} name={nav.name} to={nav.to} />;
        })}
      </AdminSidebar>
      <AdminMain>
        <Route path="/admin" exact component={Ads} />
        <Route path="/admin/users" exact component={Users} />
        <Route path="/admin/reports" exact component={Reports} />
      </AdminMain>
    </Container>
  );
}

export default Admin;
