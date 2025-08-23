import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign,
  Download,
  Filter,
  Search,
  Calendar,
  ChevronDown,
  Eye,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  LogOut,
  RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  createdAt: string;
  ipAddress?: string;
  location?: string;
}

interface Stats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  converted: number;
  conversionRate: number;
  growth: number;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    converted: 0,
    conversionRate: 0,
    growth: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, searchTerm, statusFilter, dateFilter]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5007/api/leads');
      const leadsData = response.data.data || response.data;
      setLeads(Array.isArray(leadsData) ? leadsData : []);
      calculateStats(Array.isArray(leadsData) ? leadsData : []);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (leadsData: Lead[]) => {
    const total = leadsData.length;
    const newLeads = leadsData.filter(l => l.status === 'new').length;
    const contacted = leadsData.filter(l => l.status === 'contacted').length;
    const qualified = leadsData.filter(l => l.status === 'qualified').length;
    const converted = leadsData.filter(l => l.status === 'converted').length;
    const conversionRate = total > 0 ? (converted / total) * 100 : 0;
    
    // Calculate growth (mock data for demo)
    const growth = 23.5;

    setStats({
      total,
      new: newLeads,
      contacted,
      qualified,
      converted,
      conversionRate,
      growth
    });
  };

  const filterLeads = () => {
    let filtered = [...leads];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.service.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      filtered = filtered.filter(lead => 
        new Date(lead.createdAt) >= filterDate
      );
    }

    setFilteredLeads(filtered);
  };

  const updateLeadStatus = async (leadId: string, newStatus: Lead['status']) => {
    try {
      await axios.put(`http://localhost:5007/api/leads/${leadId}`, { status: newStatus });
      fetchLeads();
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  const exportLeads = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'Company', 'Service', 'Status', 'Date', 'Message'],
      ...filteredLeads.map(lead => [
        lead.name,
        lead.email,
        lead.phone || '',
        lead.company || '',
        lead.service,
        lead.status,
        new Date(lead.createdAt).toLocaleDateString(),
        lead.message || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `naass-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const getStatusIcon = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="w-4 h-4" />;
      case 'contacted':
        return <Mail className="w-4 h-4" />;
      case 'qualified':
        return <Target className="w-4 h-4" />;
      case 'converted':
        return <CheckCircle className="w-4 h-4" />;
      case 'lost':
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return 'text-neon-yellow bg-neon-yellow/10 border-neon-yellow/30';
      case 'contacted':
        return 'text-neon-blue bg-neon-blue/10 border-neon-blue/30';
      case 'qualified':
        return 'text-neon-purple bg-neon-purple/10 border-neon-purple/30';
      case 'converted':
        return 'text-neon-green bg-neon-green/10 border-neon-green/30';
      case 'lost':
        return 'text-red-400 bg-red-400/10 border-red-400/30';
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      <div className="fixed inset-0 bg-mesh-gradient opacity-20" />
      <div className="fixed inset-0 bg-gradient-radial from-neon-purple/5 via-transparent to-transparent" />

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-black/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="white"
                  className="transform"
                  style={{ transform: 'rotate(345deg)' }}
                >
                  <path d="M3 3l18 9-9 2-2 9z" />
                </svg>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-black text-white tracking-wider">
                  NAASS
                </span>
                <span className="text-xs text-neon-pink font-medium tracking-widest uppercase">
                  Dashboard
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={fetchLeads}
                className="p-2 rounded-lg glass hover:bg-white/10 transition-colors text-white"
              >
                <RefreshCw size={20} />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-white/10 transition-colors text-white"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-neon-purple/50 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-white/60 text-sm mb-1">Total Leads</p>
                <h3 className="text-3xl font-bold text-white">{stats.total}</h3>
              </div>
              <div className="p-3 bg-gradient-to-br from-neon-purple to-neon-pink rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-neon-green" />
              <span className="text-neon-green text-sm">+{stats.growth}%</span>
              <span className="text-white/40 text-xs">vs last month</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-6 rounded-2xl border border-white/10 hover:border-neon-blue/50 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-white/60 text-sm mb-1">New Leads</p>
                <h3 className="text-3xl font-bold text-white">{stats.new}</h3>
              </div>
              <div className="p-3 bg-gradient-to-br from-neon-blue to-neon-cyan rounded-xl">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-white/40" />
              <span className="text-white/40 text-xs">Awaiting contact</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-6 rounded-2xl border border-white/10 hover:border-neon-green/50 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-white/60 text-sm mb-1">Converted</p>
                <h3 className="text-3xl font-bold text-white">{stats.converted}</h3>
              </div>
              <div className="p-3 bg-gradient-to-br from-neon-green to-neon-yellow rounded-xl">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-neon-green" />
              <span className="text-neon-green text-sm">Revenue generating</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass p-6 rounded-2xl border border-white/10 hover:border-neon-pink/50 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-white/60 text-sm mb-1">Conversion Rate</p>
                <h3 className="text-3xl font-bold text-white">{stats.conversionRate.toFixed(1)}%</h3>
              </div>
              <div className="p-3 bg-gradient-to-br from-neon-pink to-red-500 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-neon-pink" />
              <span className="text-white/40 text-xs">Industry avg: 2.5%</span>
            </div>
          </motion.div>
        </div>

        {/* Filters and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-neon-purple/50 transition-colors"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none px-4 py-3 pr-10 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-purple/50 transition-colors cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            </div>

            {/* Date Filter */}
            <div className="relative">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="appearance-none px-4 py-3 pr-10 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-purple/50 transition-colors cursor-pointer"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            </div>

            {/* Export Button */}
            <button
              onClick={exportLeads}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-xl text-white font-medium hover:shadow-neon-purple transition-all"
            >
              <Download size={18} />
              Export CSV
            </button>
          </div>
        </motion.div>

        {/* Leads Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
        >
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-purple"></div>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-20">
              <Users className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">No leads found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                      Lead
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead._id}
                      className="hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-medium">{lead.name}</p>
                          <p className="text-white/60 text-sm">{lead.email}</p>
                          {lead.phone && (
                            <p className="text-white/40 text-xs flex items-center gap-1 mt-1">
                              <Phone className="w-3 h-3" />
                              {lead.phone}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-white">{lead.service}</p>
                        {lead.company && (
                          <p className="text-white/60 text-sm">{lead.company}</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                          {getStatusIcon(lead.status)}
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-white text-sm">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-white/40 text-xs">
                          {new Date(lead.createdAt).toLocaleTimeString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLead(lead);
                            }}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                          >
                            <Eye size={16} />
                          </button>
                          <select
                            value={lead.status}
                            onChange={(e) => {
                              e.stopPropagation();
                              updateLeadStatus(lead._id, e.target.value as Lead['status']);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="appearance-none px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-neon-purple/50 transition-colors cursor-pointer"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="converted">Converted</option>
                            <option value="lost">Lost</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Lead Details Modal */}
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedLead(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gray-900/95 backdrop-blur-xl rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">Lead Details</h2>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                >
                  <XCircle size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-white/60 text-sm mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <p className="text-white">
                      <span className="text-white/60">Name:</span> {selectedLead.name}
                    </p>
                    <p className="text-white">
                      <span className="text-white/60">Email:</span> {selectedLead.email}
                    </p>
                    {selectedLead.phone && (
                      <p className="text-white">
                        <span className="text-white/60">Phone:</span> {selectedLead.phone}
                      </p>
                    )}
                    {selectedLead.company && (
                      <p className="text-white">
                        <span className="text-white/60">Company:</span> {selectedLead.company}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-white/60 text-sm mb-2">Service & Status</h3>
                  <div className="space-y-2">
                    <p className="text-white">
                      <span className="text-white/60">Service:</span> {selectedLead.service}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-white/60">Status:</span>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedLead.status)}`}>
                        {getStatusIcon(selectedLead.status)}
                        {selectedLead.status}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedLead.message && (
                  <div>
                    <h3 className="text-white/60 text-sm mb-2">Message</h3>
                    <p className="text-white bg-white/5 rounded-lg p-4">
                      {selectedLead.message}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="text-white/60 text-sm mb-2">Metadata</h3>
                  <div className="space-y-2">
                    <p className="text-white">
                      <span className="text-white/60">Submitted:</span> {new Date(selectedLead.createdAt).toLocaleString()}
                    </p>
                    {selectedLead.ipAddress && (
                      <p className="text-white">
                        <span className="text-white/60">IP Address:</span> {selectedLead.ipAddress}
                      </p>
                    )}
                    {selectedLead.location && (
                      <p className="text-white">
                        <span className="text-white/60">Location:</span> {selectedLead.location}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="flex-1 py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-xl text-white font-medium hover:shadow-neon-purple transition-all">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Send Email
                  </button>
                  <button className="flex-1 py-3 bg-gradient-to-r from-neon-blue to-neon-cyan rounded-xl text-white font-medium hover:shadow-neon-blue transition-all">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Call Lead
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;