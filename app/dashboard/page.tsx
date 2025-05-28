// app/dashboard/page.tsx
"use client";

import { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// ---------- Static Data ----------
const mainLabels = [
    "Cooling Towers", "Housekeeping", "Roof System", "Surveillance",
    "Fire Safety", "Escalators", "Fans", "Facades", "Signage", "Furniture"
];

const mainPieLabels = [
    "Adhoc", "In Progress", "Missed", "Pending",
    "Performed", "Scheduled", "Total"
];

const mainData = [18, 17, 15, 15, 14, 12, 10, 9, 8, 8];

const drillLabels = ["Issue A", "Issue B", "Issue C"];

const drillDownMap = {
    "Cooling Towers": [5, 6, 7],
    "Housekeeping": [3, 4, 10],
    "Roof System": [8, 4, 3],
};

const drillDownPieMap = {
    Adhoc: {
        labels: ["Zone 1", "Zone 2", "Zone 3"],
        data: [4, 3, 3],
        colors: ["#BFDBFE", "#60A5FA", "#3B82F6"],
    },
    "In Progress": {
        labels: ["Task A", "Task B"],
        data: [5, 3],
        colors: ["#A5B4FC", "#6366F1"],
    },
    Missed: {
        labels: ["Zone A", "Zone B", "Zone C"],
        data: [3, 4, 2],
        colors: ["#FECACA", "#F87171", "#EF4444"],
    },
    Pending: {
        labels: ["Check A", "Check B", "Check C"],
        data: [2, 1, 2],
        colors: ["#FEF3C7", "#FCD34D", "#F59E0B"],
    },
    Performed: {
        labels: ["Audit 1", "Audit 2", "Audit 3"],
        data: [5, 6, 3],
        colors: ["#6EE7B7", "#34D399", "#10B981"],
    },
    Scheduled: {
        labels: ["Morning", "Evening"],
        data: [2, 2],
        colors: ["#DDD6FE", "#8B5CF6"],
    },
    Total: {
        labels: ["Completed", "Remaining"],
        data: [9, 4],
        colors: ["#FCA5A5", "#F87171"],
    },
};

const metrics = [
    { label: "Sum of Active Assets", value: 654 },
    { label: "Sum of Flags", value: 56.7 },
    { label: "Sum of PPM compliance %", value: 17.5 },
    { label: "Sum of Open tickets", value: 17 },
    { label: "Sum of Avg. Resolution time", value: 18.4 },
];

// ---------- Component ----------
const Dashboard = () => {
    const [drillData, setDrillData] = useState(null);
    const [drillPieData, setDrillPieData] = useState(null);

    const barData = {
        labels: drillData ? drillLabels : mainLabels,
        datasets: [
            {
                label: drillData ? `Flags in ${drillData.label}` : "Sum of Flags",
                data: drillData ? drillData.data : mainData,
                backgroundColor: "#6366F1",
            },
        ],
    };

    const pieData = {
        labels: drillPieData ? drillPieData.labels : mainPieLabels,
        datasets: [
            {
                data: drillPieData ? drillPieData.data : [8, 4, 9, 3, 10, 1, 5],
                backgroundColor: drillPieData ? drillPieData.colors : [
                    "#3B82F6", "#6366F1", "#EC4899", "#F59E0B", "#10B981", "#8B5CF6", "#F87171"
                ],
                borderWidth: 1,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: { legend: { display: false } },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                const label = mainLabels[index];
                const data = drillDownMap[label];
                if (data) setDrillData({ label, data });
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: 20,
                ticks: { stepSize: 5 },
            },
        },
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom"
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        return `${label}: ${value}`;
                    },
                },
            },
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                const label = mainPieLabels[index];
                if (drillDownPieMap[label]) {
                    setDrillPieData({ label, ...drillDownPieMap[label] });
                }
            }
        },
    };

    return (
        <div className="min-h-screen bg-gray-50 space-y-5 p-4">
            {/* Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {metrics.map(({ label, value }) => (
                    <div key={label} className="bg-white py-4 rounded shadow text-center">
                        <div className="text-2xl font-bold text-black">{value}</div>
                        <div className="text-sm text-gray-400">{label}</div>
                    </div>
                ))}
            </div>

            {/* Bar & Pie Charts */}
            <div className="grid grid-cols-1 gap-4">
                {/* Bar Chart Section */}
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold mb-4">
                        {drillData ? `Drill Down: ${drillData.label}` : "Sum of Flags by Category"}
                    </h3>
                    {drillData && (
                        <button
                            onClick={() => setDrillData(null)}
                            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Back
                        </button>
                    )}
                    <div className="overflow-x-auto">
                        <div className="min-w-[600px] sm:min-w-[800px] md:min-w-full">
                            <Bar data={barData} options={barOptions} />
                        </div>
                    </div>
                </div>

                {/* Pie Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-xl font-semibold mb-4 text-center">
                            {drillPieData ? `Drilldown: ${drillPieData.label}` : "Overall by Status"}
                        </h3>
                        {drillPieData && (
                            <div className="text-center mb-4">
                                <button
                                    onClick={() => setDrillPieData(null)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    ← Back
                                </button>
                            </div>
                        )}
                        <Pie data={pieData} options={pieOptions} />
                    </div>

                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold mb-4">Overall by Status</h3>
                        <Pie data={pieData} options={pieOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
