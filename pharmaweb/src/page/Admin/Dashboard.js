import '../../assets/Admin/css/dashboard.css';
import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Filler,
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Filler);

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalAccounts: 0,
        newAccountsToday: 0,
        totalJobs: 0,
        newCVsToday: 0,
    });

    const weekChartRef = useRef(null);
    const monthChartRef = useRef(null);

    useEffect(() => {
        // Fetch tổng quan số liệu
        fetch('https://localhost:5194/api/statistics/account-summary')
            .then((res) => res.json())
            .then((data) => {
                setStats((prev) => ({
                    ...prev,
                    totalAccounts: data.totalAccounts,
                    newAccountsToday: data.newAccountsToday,
                }));
            })
            .catch((err) => console.error('Failed to fetch account stats:', err));

        fetch('https://localhost:5194/api/statistics/job-count')
            .then((res) => res.json())
            .then((data) => {
                setStats((prev) => ({
                    ...prev,
                    totalJobs: data.totalJobs,
                }));
            })
            .catch((err) => console.error('Failed to fetch job stats:', err));

        fetch('https://localhost:5194/api/statistics/cv-today')
            .then((res) => res.json())
            .then((data) => {
                setStats((prev) => ({
                    ...prev,
                    newCVsToday: data.newCVsToday,
                }));
            })
            .catch((err) => console.error('Failed to fetch CV stats:', err));

        // Biểu đồ theo tuần
        fetch('https://localhost:5194/api/statistics/accounts-by-weekdays')
            .then((res) => res.json())
            .then((data) => {
                const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                const labels = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
                const orderedData = dayOrder.map((day) => {
                    const found = data.find((d) => d.day === day);
                    return found ? found.count : 0;
                });

                const ctx = document.getElementById('chartWeek');
                if (weekChartRef.current) weekChartRef.current.destroy();

                weekChartRef.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Number of accounts by day',
                                data: orderedData,
                                borderColor: 'rgba(54, 162, 235, 1)',
                                backgroundColor: 'rgba(54, 162, 235, 0.1)',
                                tension: 0.4,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: { y: { beginAtZero: true } },
                    },
                });
            })
            .catch((err) => console.error('Failed to load weekly chart data:', err));

        // Biểu đồ theo tháng
        fetch('https://localhost:5194/api/statistics/accounts-by-month')
            .then((res) => res.json())
            .then((data) => {
                // Danh sách 12 tháng
                const monthLabels = Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`);

                // Chuyển dữ liệu trả về thành Map để truy vấn nhanh
                const monthMap = new Map();
                data.forEach((item) => {
                    const month = parseInt(item.month.split('-')[1]); // lấy "06" từ "2025-06"
                    monthMap.set(month, item.count);
                });

                // Tạo mảng values theo thứ tự tháng 1 -> 12
                const values = Array.from({ length: 12 }, (_, i) => {
                    return monthMap.get(i + 1) || 0;
                });

                const ctx = document.getElementById('chartMonth');
                if (monthChartRef.current) monthChartRef.current.destroy();

                monthChartRef.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: monthLabels,
                        datasets: [
                            {
                                label: 'Number of accounts by month',
                                data: values,
                                borderColor: 'rgba(75, 192, 192, 1)',
                                backgroundColor: 'rgba(75, 192, 192, 0.1)',
                                tension: 0.4,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: { y: { beginAtZero: true } },
                    },
                });
            })
            .catch((err) => console.error('Failed to load monthly chart data:', err));
    }, []);

    return (
        <div className="dashboard-container">
            <div className="row-cols-custom mb-5">
                <InfoCard
                    icon="bi-person-lines-fill text-primary"
                    title="Total Accounts"
                    value={stats.totalAccounts}
                    color="primary"
                />
                <InfoCard
                    icon="bi-person-plus-fill text-success"
                    title="New Accounts Today"
                    value={stats.newAccountsToday}
                    color="success"
                />
                <InfoCard
                    icon="bi-card-checklist text-secondary"
                    title="Total Jobs"
                    value={stats.totalJobs}
                    color="secondary"
                />
                <InfoCard
                    icon="bi-journal-text text-info"
                    title="New CV Today"
                    value={stats.newCVsToday}
                    color="info"
                />
            </div>

            {/* Biểu đồ theo tuần */}
            <div className="chart-container mb-5">
                <h5 className="mb-3">Chart showing the number of new accounts per day over one week</h5>
                <canvas id="chartWeek" height="300"></canvas>
            </div>

            {/* Biểu đồ theo tháng */}
            <div className="chart-container">
                <h5 className="mb-3">Chart comparing the number of accounts created by month</h5>
                <canvas id="chartMonth" height="300"></canvas>
            </div>
        </div>
    );
};

const InfoCard = ({ icon, title, value, color }) => (
    <div className="card-col">
        <div className="info-card text-center">
            <i className={`bi ${icon} icon-box`}></i>
            <h5 className="info-title">{title}</h5>
            <h3 className={`fw-bold text-${color}`}>{value}</h3>
        </div>
    </div>
);

export default Dashboard;
