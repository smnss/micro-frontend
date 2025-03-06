import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpDown, DollarSign, ShoppingCart, TrendingUp, Filter } from 'lucide-react';

// Sample sales data
const initialSalesData = [
  { id: 1, date: '2024-03-01', product: 'Laptop', category: 'Electronics', revenue: 2500, units: 2, region: 'North' },
  { id: 2, date: '2024-03-01', product: 'Smartphone', category: 'Electronics', revenue: 1800, units: 3, region: 'South' },
  { id: 3, date: '2024-03-02', product: 'Desk Chair', category: 'Furniture', revenue: 900, units: 5, region: 'East' },
  { id: 4, date: '2024-03-02', product: 'Coffee Maker', category: 'Appliances', revenue: 450, units: 3, region: 'West' },
  { id: 5, date: '2024-03-03', product: 'Monitor', category: 'Electronics', revenue: 1200, units: 4, region: 'North' },
  { id: 6, date: '2024-03-03', product: 'Bookshelf', category: 'Furniture', revenue: 750, units: 2, region: 'South' },
];

const AnalyticsWidget = () => {
  const [filters, setFilters] = useState({
    category: '',
    region: '',
    dateRange: 'all',
  });
  
  const [sortConfig, setSortConfig] = useState({
    key: 'revenue',
    direction: 'desc',
  });

  // Filter and sort data
  const filteredData = useMemo(() => {
    return initialSalesData
      .filter(item => {
        if (filters.category && item.category !== filters.category) return false;
        if (filters.region && item.region !== filters.region) return false;
        return true;
      })
      .sort((a, b) => {
        const direction = sortConfig.direction === 'asc' ? 1 : -1;
        return (a[sortConfig.key] > b[sortConfig.key] ? 1 : -1) * direction;
      });
  }, [filters, sortConfig]);

  // Calculate summary metrics
  const metrics = useMemo(() => {
    return {
      totalRevenue: filteredData.reduce((sum, item) => sum + item.revenue, 0),
      totalUnits: filteredData.reduce((sum, item) => sum + item.units, 0),
      avgOrderValue: filteredData.reduce((sum, item) => sum + item.revenue, 0) / filteredData.length,
    };
  }, [filteredData]);

  // Get unique values for filters
  const categories = [...new Set(initialSalesData.map(item => item.category))];
  const regions = [...new Set(initialSalesData.map(item => item.region))];

  // Handle sort
  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-indigo-600" />
            <h3 className="text-sm font-medium text-indigo-600">Total Revenue</h3>
          </div>
          <p className="mt-2 text-3xl font-semibold text-indigo-900">
            ${metrics.totalRevenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-green-600" />
            <h3 className="text-sm font-medium text-green-600">Total Units Sold</h3>
          </div>
          <p className="mt-2 text-3xl font-semibold text-green-900">
            {metrics.totalUnits.toLocaleString()}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <h3 className="text-sm font-medium text-purple-600">Avg. Order Value</h3>
          </div>
          <p className="mt-2 text-3xl font-semibold text-purple-900">
            ${metrics.avgOrderValue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={filters.region}
            onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
          >
            <option value="">All Regions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('product')}
              >
                <div className="flex items-center gap-1">
                  Product
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('revenue')}
              >
                <div className="flex items-center gap-1">
                  Revenue
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('units')}
              >
                <div className="flex items-center gap-1">
                  Units
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Region
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((sale) => (
              <tr key={sale.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(sale.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {sale.product}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {sale.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${sale.revenue.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {sale.units}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {sale.region}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWidget;