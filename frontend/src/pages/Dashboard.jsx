import { useEffect } from "react";
import { Title } from "react-head";
import axiosInstance from "../api/axiosInstance";

export default function Dashboard() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/profile-view/");
        console.log("Dashboard data:", response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Title>Dashboard - Finance Dashboard</Title>
      <div className="container pt-5">
        <h2>Welcome to the Finance Dashboard</h2>
        <p>This is your dashboard where you can manage your finances.</p>
      </div>
    </>
  );
}
