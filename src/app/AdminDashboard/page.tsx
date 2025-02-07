"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { FaCar, FaShoppingCart, FaUsers, FaTags, FaEdit, FaTrash, FaGift } from "react-icons/fa";

const AdminDashboard = () => {
  const [users, setUsers] = useState<{ email: string; password: string }[]>([]);
  const [activeSection, setActiveSection] = useState<"cars" | "bookings" | "users" | "categories" | "promotions" | null>(null);
  const [promotions, setPromotions] = useState([
    { id: 1, name: "Summer Discount", type: "Discount", code: "SUMMER50", value: "50% off", status: "Expired" },
    { id: 2, name: "Winter Sale", type: "Discount", code: "WINTER40", value: "$40 off", status: "Active" },
    { id: 3, name: "New Year Sale", type: "Coupon", code: "NEWYEAR", value: "$70 off", status: "Expired" },
    { id: 4, name: "Referral Offer", type: "Campaign", code: "REFER", value: "10% off", status: "Active" },
  ]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

  const handleDeletePromotion = (id: number) => {
    setPromotions((prevPromotions) => prevPromotions.filter((promotion) => promotion.id !== id));
  };

  const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 2000 },
    { name: "Apr", sales: 2780 },
    { name: "May", sales: 1890 },
    { name: "Jun", sales: 2390 },
  ];

  const categoryData = [
    { name: "Sedan", value: 400 },
    { name: "SUV", value: 300 },
    { name: "Hybrid", value: 200 },
    { name: "Gasoline", value: 278 },
    { name: "Hatchback", value: 150 },
  ];

  const COLORS = ["#1D4ED8", "#059669", "#D97706", "#EF4444", "#8B5CF6"];

  const carsData = [
    { id: 1, name: "Toyota Camry", type: "Sedan", status: "Available", discount: "10% off" },
    { id: 2, name: "Honda CR-V", type: "SUV", status: "Booked", discount: "No discount" },
    { id: 3, name: "Toyota Prius", type: "Hybrid", status: "Available", discount: "15% off" },
    { id: 4, name: "Royal Rolls", type: "Sedan", status: "Booked", discount: "No discount" },
  ];

  const bookingsData = [
    { id: 1, user: "Mustafa", car: "Toyota Camry", date: "2025-10-01", status: "Confirmed" },
    { id: 2, user: "Mari", car: "Royal Rolls", date: "2025-14-05", status: "Pending" },
    { id: 3, user: "Ibrahim", car: "Honda CR-V", date: "2025-08-02", status: "Confirmed" },
  ];

  const categoriesData = [
    { id: 1, name: "Sedan" },
    { id: 2, name: "SUV" },
    { id: 3, name: "Hybrid" },
    { id: 4, name: "Gasoline" },
    { id: 5, name: "Hatchback" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">Your business insights in one place.</p>
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <FaCar className="text-blue-600 text-3xl" />
          <div>
            <p className="text-gray-600 text-sm">Total Cars</p>
            <p className="text-2xl font-semibold text-gray-900">1,538</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <FaShoppingCart className="text-green-600 text-3xl" />
          <div>
            <p className="text-gray-600 text-sm">Total Bookings</p>
            <p className="text-2xl font-semibold text-gray-900">567</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <FaUsers className="text-indigo-600 text-3xl" />
          <div>
            <p className="text-gray-600 text-sm">Total Users</p>
            <p className="text-2xl font-semibold text-gray-900">{users.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <FaTags className="text-yellow-600 text-3xl" />
          <div>
            <p className="text-gray-600 text-sm">Total Categories</p>
            <p className="text-2xl font-semibold text-gray-900">5</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Sales</h2>
          <BarChart width={500} height={300} data={salesData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#4F46E5" />
          </BarChart>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Car Category Distribution</h2>
          <PieChart width={500} height={300}>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#4F46E5"
              dataKey="value"
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* Management Tools Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Your Data</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <FaCar className="text-blue-600 text-3xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Cars</h3>
            <p className="text-sm text-gray-600">Manage your car listings.</p>
            <button
              onClick={() => setActiveSection("cars")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Manage
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <FaShoppingCart className="text-green-600 text-3xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Bookings</h3>
            <p className="text-sm text-gray-600">Manage bookings and orders.</p>
            <button
              onClick={() => setActiveSection("bookings")}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
            >
              Manage
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <FaUsers className="text-indigo-600 text-3xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Users</h3>
            <p className="text-sm text-gray-600">Manage user accounts.</p>
            <button
              onClick={() => setActiveSection("users")}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
            >
              Manage
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <FaTags className="text-yellow-600 text-3xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Categories</h3>
            <p className="text-sm text-gray-600">Manage car categories.</p>
            <button
              onClick={() => setActiveSection("categories")}
              className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all"
            >
              Manage
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <FaGift className="text-pink-600 text-3xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Promotions</h3>
            <p className="text-sm text-gray-600">Manage your promotional offers.</p>
            <button
              onClick={() => setActiveSection("promotions")}
              className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all"
            >
              Manage
            </button>
          </div>
        </div>
      </div>

      {/* Display Lists Based on Active Section */}
      {activeSection && (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {activeSection === "cars" && "Cars"}
            {activeSection === "bookings" && "Bookings"}
            {activeSection === "users" && "Users"}
            {activeSection === "categories" && "Categories"}
            {activeSection === "promotions" && "Promotions"}
          </h2>
          <div className="space-y-4">
            {activeSection === "cars" &&
              carsData.map((car) => (
                <div key={car.id} className="bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">{car.name}</p>
                      <p className="text-sm text-gray-600">{car.type}</p>
                      <p className={`text-sm ${car.status === "Available" ? "text-green-600" : "text-red-600"}`}>
                        {car.status}
                      </p>
                      <p className="text-sm text-yellow-600">{car.discount}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 transition-all">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-800 transition-all">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            {activeSection === "bookings" &&
              bookingsData.map((booking) => (
                <div key={booking.id} className="bg-green-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">{booking.user}</p>
                      <p className="text-sm text-gray-600">{booking.car}</p>
                      <p className={`text-sm ${booking.status === "Confirmed" ? "text-green-600" : "text-yellow-600"}`}>
                        {booking.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            {activeSection === "users" &&
              users.map((user, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">{user.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            {activeSection === "categories" &&
              categoriesData.map((category) => (
                <div
                  key={category.id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">{category.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            {activeSection === "promotions" &&
              promotions.map((promotion) => (
                <div
                  key={promotion.id}
                  className="bg-yellow-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">{promotion.name}</p>
                      <p className="text-sm text-gray-600">Type: {promotion.type}</p>
                      <p className="text-sm text-gray-600">Code: {promotion.code}</p>
                      <p className="text-sm text-gray-600">{promotion.value}</p>
                      <p className={`text-sm ${promotion.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                        {promotion.status}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 transition-all">
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeletePromotion(promotion.id)}
                        className="text-red-600 hover:text-red-800 transition-all"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
