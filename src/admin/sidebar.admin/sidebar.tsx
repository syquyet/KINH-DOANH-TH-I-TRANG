import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";
import axios from "axios";
import { API } from "../../common/ULR.common";

export default function SidebarAdmin() {
  const navigate = useNavigate();
  const [dataAdmin, setDataAdmin] = useState<any[]>([]);
  const auth: any = localStorage.getItem("admin");
  const adminLocal = JSON.parse(auth);

  useEffect(() => {
    const fetchdata = async () => {
      const reponse = await axios.get(API + `users`);
      setDataAdmin(reponse.data.data);
    };
    fetchdata();
  }, []);
  const data = dataAdmin.find((item: any) => item.id === adminLocal);
  // ================== logout admin ========================
  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <>
      <div className="sidenav-admin">
        <div className="sidenav">
          <div className="sidenav-avatar">
            <img src={data?.avatar} alt="" />
            <p>Role: Admin</p>
            <p>
              <b>{data?.user_name}</b>
            </p>
            <button className="btn btn-primary">Edit</button>
            <hr />
          </div>
          <div className="sidenav-content">
            <div>
              <Link to="/">
                <i className="fa-solid fa-list" />
                <span>Dashboard</span>
              </Link>
            </div>
            <div>
              <Link to="/customer.manager">
                <i className="fa-solid fa-users" />
                <span>Customer</span>
              </Link>
            </div>
            <div>
              <Link to="/product.manager">
                <i className="fa-solid fa-shirt" />
                <span>Products</span>
              </Link>
            </div>
            <div>
              <Link to="/category">
                <i className="fa-solid fa-shirt" />
                <span>Categories</span>
              </Link>
            </div>
            <div>
              <Link to="/order.manager">
                <i className="fa-solid fa-file-invoice" />
                <span>Orders</span>
              </Link>
            </div>
            <div>
              <Link to="">
                <i className="fa-solid fa-comments" />
                <span>Reviews</span>
              </Link>
            </div>
            <div>
              <Link to="">
                <i className="fa-solid fa-award" />
                <span>Vouchers</span>
              </Link>
            </div>
            <div>
              <i className="fa-solid fa-right-from-bracket" />
              <a onClick={handleLogout}>Log out</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
