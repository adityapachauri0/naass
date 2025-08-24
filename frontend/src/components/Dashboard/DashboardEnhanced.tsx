import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Users, Target, DollarSign, Download, Filter, Search, Calendar,
  ChevronDown, Eye, Mail, Phone, Clock, CheckCircle, XCircle, AlertCircle,
  LogOut, RefreshCw, Trash2, Edit, MapPin, Globe, Shield, Zap, Save,
  FileText, CheckSquare, Square, MoreVertical, ArrowUpDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import config from '../../config';
const XLSX = require('xlsx');

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'rejected';
  source: string;
  createdAt: string;
  updatedAt: string;
  ipAddress?: string;
  location?: {
    city?: string;
    region?: string;
    country?: string;
    lat?: number;
    lng?: number;
  };
  isDraft?: boolean;
  progress?: number;
  sessionId?: string;
  userAgent?: string;
}

interface Draft {
  _id: string;
  key: string;
  formType: string;
  data: any;
  progress: number;
  sessionId: string;
  ipAddress?: string;
  location?: any;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  converted: number;
  rejected: number;
  drafts: number;
  conversionRate: number;
  growth: number;
  todayLeads: number;
  weekLeads: number;
  monthLeads: number;
}

const DashboardEnhanced: React.FC = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    converted: 0,
    rejected: 0,
    drafts: 0,
    conversionRate: 0,
    growth: 0,
    todayLeads: 0,
    weekLeads: 0,
    monthLeads: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof Lead>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 30000); // Auto-refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    filterAndSortLeads();
  }, [leads, drafts, searchTerm, statusFilter, dateFilter, sortField, sortOrder]);

  const fetchAllData = async () => {
    await Promise.all([fetchLeads(), fetchDrafts()]);
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.api.baseUrl}/leads`);
      const leadsData = response.data.data || response.data;
      setLeads(Array.isArray(leadsData) ? leadsData : []);
      return leadsData;
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error('Failed to fetch leads');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchDrafts = async () => {
    try {
      const response = await axios.get(`${config.api.baseUrl}/drafts/all`);
      const draftsData = response.data.drafts || [];
      setDrafts(draftsData);
      return draftsData;
    } catch (error) {
      console.error('Error fetching drafts:', error);
      return [];
    }
  };

  const calculateStats = (leadsData: Lead[], draftsData: Draft[]) => {
    const total = leadsData.length;
    const newLeads = leadsData.filter(l => l.status === 'new').length;
    const contacted = leadsData.filter(l => l.status === 'contacted').length;
    const qualified = leadsData.filter(l => l.status === 'qualified').length;
    const converted = leadsData.filter(l => l.status === 'converted').length;
    const rejected = leadsData.filter(l => l.status === 'rejected').length;
    const draftsCount = draftsData.length;
    
    const conversionRate = total > 0 ? (converted / total) * 100 : 0;
    
    // Calculate time-based stats
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const todayLeads = leadsData.filter(l => new Date(l.createdAt) >= today).length;
    const weekLeads = leadsData.filter(l => new Date(l.createdAt) >= weekAgo).length;
    const monthLeads = leadsData.filter(l => new Date(l.createdAt) >= monthAgo).length;
    
    // Calculate growth
    const lastMonth = leadsData.filter(l => {
      const date = new Date(l.createdAt);
      return date >= monthAgo && date < today;
    }).length;
    
    const growth = lastMonth > 0 ? ((monthLeads - lastMonth) / lastMonth) * 100 : 0;
    
    setStats({
      total,
      new: newLeads,
      contacted,
      qualified,
      converted,
      rejected,
      drafts: draftsCount,
      conversionRate,
      growth,
      todayLeads,
      weekLeads,
      monthLeads
    });
  };

  const filterAndSortLeads = () => {
    let filtered = [...leads];
    
    // Add drafts as leads
    const draftLeads = drafts.map(draft => ({
      _id: draft._id,
      name: draft.data.name || 'Draft',
      email: draft.data.email || '',
      phone: draft.data.phone,
      company: draft.data.company,
      service: draft.data.service || 'N/A',
      message: draft.data.message,
      status: 'new' as const,
      source: 'draft',
      createdAt: draft.createdAt,
      updatedAt: draft.updatedAt,
      ipAddress: draft.ipAddress,
      location: draft.location,
      isDraft: true,
      progress: draft.progress,
      sessionId: draft.sessionId
    }));
    
    filtered = [...filtered, ...draftLeads];
    
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
      if (statusFilter === 'draft') {
        filtered = filtered.filter(lead => lead.isDraft);
      } else {
        filtered = filtered.filter(lead => lead.status === statusFilter && !lead.isDraft);
      }
    }
    
    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      let startDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
      }
      
      filtered = filtered.filter(lead => new Date(lead.createdAt) >= startDate);
    }
    
    // Sort
    filtered.sort((a, b) => {
      const aValue = a[sortField] || '';
      const bValue = b[sortField] || '';
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    setFilteredLeads(filtered);
    calculateStats(leads, drafts);
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      await axios.patch(`${config.api.baseUrl}/leads/${leadId}`, { status: newStatus });
      toast.success('Lead status updated');
      fetchLeads();
    } catch (error) {
      toast.error('Failed to update lead status');
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    try {
      const lead = filteredLeads.find(l => l._id === leadId);
      
      if (lead?.isDraft) {
        // Delete draft
        await axios.delete(`${config.api.baseUrl}/drafts/contact/draft?key=${lead.sessionId}`);
        toast.success('Draft deleted successfully');
      } else {
        // Delete lead
        await axios.delete(`${config.api.baseUrl}/leads/${leadId}`);
        toast.success('Lead deleted successfully');
      }
      
      setShowDeleteConfirm(false);
      setDeleteTargetId(null);
      fetchAllData();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedLeads.length === 0) {
      toast.error('No leads selected');
      return;
    }
    
    if (window.confirm(`Delete ${selectedLeads.length} selected items?`)) {
      try {
        // Separate drafts and leads
        const draftsToDelete = filteredLeads
          .filter(l => selectedLeads.includes(l._id) && l.isDraft)
          .map(l => l._id);
        
        const leadsToDelete = filteredLeads
          .filter(l => selectedLeads.includes(l._id) && !l.isDraft)
          .map(l => l._id);
        
        // Delete drafts
        if (draftsToDelete.length > 0) {
          await axios.post(`${config.api.baseUrl}/drafts/bulk-delete`, {
            ids: draftsToDelete
          });
        }
        
        // Delete leads
        if (leadsToDelete.length > 0) {
          await axios.post(`${config.api.baseUrl}/leads/bulk-delete`, {
            ids: leadsToDelete
          });
        }
        
        toast.success(`Deleted ${selectedLeads.length} items`);
        setSelectedLeads([]);
        fetchAllData();
      } catch (error) {
        toast.error('Failed to delete selected items');
      }
    }
  };

  const toggleLeadSelection = (leadId: string) => {
    setSelectedLeads(prev =>
      prev.includes(leadId)
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const selectAllLeads = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map(l => l._id));
    }
  };

  const exportToExcel = () => {
    const exportData = filteredLeads.map(lead => ({
      'Name': lead.name,
      'Email': lead.email,
      'Phone': lead.phone || '',
      'Company': lead.company || '',
      'Service': lead.service,
      'Status': lead.isDraft ? 'Draft' : lead.status,
      'Progress': lead.progress ? `${lead.progress}%` : '100%',
      'IP Address': lead.ipAddress || '',
      'Location': lead.location ? `${lead.location.city || ''}, ${lead.location.country || ''}` : '',
      'Created': new Date(lead.createdAt).toLocaleString(),
      'Message': lead.message || ''
    }));
    
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Leads');
    XLSX.writeFile(wb, `NAASS_Leads_${new Date().toISOString().split('T')[0]}.xlsx`);
    toast.success('Data exported successfully');
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Service', 'Status', 'Progress', 'IP Address', 'Location', 'Created', 'Message'];
    const rows = filteredLeads.map(lead => [
      lead.name,
      lead.email,
      lead.phone || '',
      lead.company || '',
      lead.service,
      lead.isDraft ? 'Draft' : lead.status,
      lead.progress ? `${lead.progress}%` : '100%',
      lead.ipAddress || '',
      lead.location ? `${lead.location.city || ''}, ${lead.location.country || ''}` : '',
      new Date(lead.createdAt).toLocaleString(),
      lead.message || ''
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NAASS_Leads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('CSV exported successfully');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-gray-500';
      case 'contacted': return 'bg-gray-500';
      case 'qualified': return 'bg-gray-500';
      case 'converted': return 'bg-gray-500';
      case 'rejected': return 'bg-gray-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertCircle className="w-4 h-4" />;
      case 'contacted': return <Mail className="w-4 h-4" />;
      case 'qualified': return <Target className="w-4 h-4" />;
      case 'converted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'draft': return <Save className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-500 via-gray-500 to-gray-500">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-orange-500">NAASS Dashboard</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={fetchAllData}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-orange-500 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-500/20 hover:bg-gray-500/30 text-orange-500 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gray-500/20 rounded-lg">
                <Users className="w-6 h-6 text-gray-500" />
              </div>
              <span className="text-gray-500 text-sm">+{stats.growth.toFixed(1)}%</span>
            </div>
            <h3 className="text-orange-500/60 text-sm mb-1">Total Leads</h3>
            <p className="text-3xl font-bold text-orange-500">{stats.total}</p>
            <div className="mt-2 text-xs text-orange-500/50">
              {stats.drafts} drafts • {stats.todayLeads} today
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gray-500/20 rounded-lg">
                <Target className="w-6 h-6 text-gray-700" />
              </div>
              <span className="text-gray-700 text-sm">Active</span>
            </div>
            <h3 className="text-orange-500/60 text-sm mb-1">Qualified Leads</h3>
            <p className="text-3xl font-bold text-orange-500">{stats.qualified}</p>
            <div className="mt-2 text-xs text-orange-500/50">
              {stats.new} new • {stats.contacted} contacted
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gray-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-gray-500" />
              </div>
              <span className="text-gray-500 text-sm">{stats.conversionRate.toFixed(1)}%</span>
            </div>
            <h3 className="text-orange-500/60 text-sm mb-1">Converted</h3>
            <p className="text-3xl font-bold text-orange-500">{stats.converted}</p>
            <div className="mt-2 text-xs text-orange-500/50">
              {stats.rejected} rejected
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gray-500/20 rounded-lg">
                <Zap className="w-6 h-6 text-orange-500" />
              </div>
              <span className="text-orange-500 text-sm">This Month</span>
            </div>
            <h3 className="text-orange-500/60 text-sm mb-1">Recent Activity</h3>
            <p className="text-3xl font-bold text-orange-500">{stats.monthLeads}</p>
            <div className="mt-2 text-xs text-orange-500/50">
              {stats.weekLeads} this week
            </div>
          </motion.div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500/50 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-orange-500 placeholder-white/50 focus:outline-none focus:border-gray-400"
                />
              </div>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-orange-500 focus:outline-none focus:border-gray-400"
            >
              <option value="all" className="bg-gray-500">All Status</option>
              <option value="new" className="bg-gray-500">New</option>
              <option value="contacted" className="bg-gray-500">Contacted</option>
              <option value="qualified" className="bg-gray-500">Qualified</option>
              <option value="converted" className="bg-gray-500">Converted</option>
              <option value="rejected" className="bg-gray-500">Rejected</option>
              <option value="draft" className="bg-gray-500">Drafts</option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-orange-500 focus:outline-none focus:border-gray-400"
            >
              <option value="all" className="bg-gray-500">All Time</option>
              <option value="today" className="bg-gray-500">Today</option>
              <option value="week" className="bg-gray-500">This Week</option>
              <option value="month" className="bg-gray-500">This Month</option>
            </select>

            {selectedLeads.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-orange-500 rounded-lg transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete ({selectedLeads.length})
              </button>
            )}

            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-500 rounded-lg transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Excel
            </button>

            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-500 rounded-lg transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              CSV
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                      onChange={selectAllLeads}
                      className="rounded"
                    />
                  </th>
                  <th className="p-4 text-left text-orange-500/80 font-medium">
                    <button
                      onClick={() => {
                        setSortField('name');
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      }}
                      className="flex items-center gap-1 hover:text-orange-500"
                    >
                      Name
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="p-4 text-left text-orange-500/80 font-medium">Contact</th>
                  <th className="p-4 text-left text-orange-500/80 font-medium">Service</th>
                  <th className="p-4 text-left text-orange-500/80 font-medium">Status</th>
                  <th className="p-4 text-left text-orange-500/80 font-medium">Location</th>
                  <th className="p-4 text-left text-orange-500/80 font-medium">
                    <button
                      onClick={() => {
                        setSortField('createdAt');
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      }}
                      className="flex items-center gap-1 hover:text-orange-500"
                    >
                      Date
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="p-4 text-left text-orange-500/80 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-orange-500/50">
                      Loading...
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-orange-500/50">
                      No leads found
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedLeads.includes(lead._id)}
                          onChange={() => toggleLeadSelection(lead._id)}
                          className="rounded"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="text-orange-500 font-medium">{lead.name}</p>
                            {lead.company && (
                              <p className="text-orange-500/50 text-sm">{lead.company}</p>
                            )}
                            {lead.isDraft && (
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-orange-500">Draft</span>
                                <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gray-500"
                                    style={{ width: `${lead.progress || 0}%` }}
                                  />
                                </div>
                                <span className="text-xs text-orange-500/50">{lead.progress || 0}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3 text-orange-500/50" />
                            <span className="text-orange-500/80 text-sm">{lead.email}</span>
                          </div>
                          {lead.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3 text-orange-500/50" />
                              <span className="text-orange-500/80 text-sm">{lead.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-orange-500/80">{lead.service}</span>
                      </td>
                      <td className="p-4">
                        {lead.isDraft ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-gray-500/20 text-orange-500">
                            <Save className="w-3 h-3" />
                            Draft
                          </span>
                        ) : (
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-medium text-orange-500 ${getStatusColor(lead.status)} bg-opacity-20 border border-transparent focus:outline-none`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="converted">Converted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        )}
                      </td>
                      <td className="p-4">
                        {lead.location && (
                          <div className="flex items-center gap-1 text-orange-500/60 text-sm">
                            <MapPin className="w-3 h-3" />
                            <span>
                              {lead.location.city && `${lead.location.city}, `}
                              {lead.location.country}
                            </span>
                          </div>
                        )}
                        {lead.ipAddress && (
                          <div className="flex items-center gap-1 text-orange-500/40 text-xs mt-1">
                            <Globe className="w-3 h-3" />
                            <span>{lead.ipAddress}</span>
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="text-orange-500/60 text-sm">
                          {new Date(lead.createdAt).toLocaleDateString()}
                          <br />
                          <span className="text-xs text-orange-500/40">
                            {new Date(lead.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedLead(lead);
                              setShowViewModal(true);
                            }}
                            className="p-2 rounded-lg bg-gray-500/20 hover:bg-gray-500/30 text-gray-500 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteTargetId(lead._id);
                              setShowDeleteConfirm(true);
                            }}
                            className="p-2 rounded-lg bg-gray-500/20 hover:bg-gray-500/30 text-orange-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowViewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-500 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-white/20"
            >
              <h2 className="text-2xl font-bold text-orange-500 mb-4">Lead Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-orange-500/60 text-sm">Name</label>
                  <p className="text-orange-500">{selectedLead.name}</p>
                </div>
                
                <div>
                  <label className="text-orange-500/60 text-sm">Email</label>
                  <p className="text-orange-500">{selectedLead.email}</p>
                </div>
                
                {selectedLead.phone && (
                  <div>
                    <label className="text-orange-500/60 text-sm">Phone</label>
                    <p className="text-orange-500">{selectedLead.phone}</p>
                  </div>
                )}
                
                {selectedLead.company && (
                  <div>
                    <label className="text-orange-500/60 text-sm">Company</label>
                    <p className="text-orange-500">{selectedLead.company}</p>
                  </div>
                )}
                
                <div>
                  <label className="text-orange-500/60 text-sm">Service</label>
                  <p className="text-orange-500">{selectedLead.service}</p>
                </div>
                
                {selectedLead.message && (
                  <div>
                    <label className="text-orange-500/60 text-sm">Message</label>
                    <p className="text-orange-500 whitespace-pre-wrap">{selectedLead.message}</p>
                  </div>
                )}
                
                <div>
                  <label className="text-orange-500/60 text-sm">Status</label>
                  <p className="text-orange-500 capitalize">{selectedLead.isDraft ? 'Draft' : selectedLead.status}</p>
                </div>
                
                {selectedLead.location && (
                  <div>
                    <label className="text-orange-500/60 text-sm">Location</label>
                    <p className="text-orange-500">
                      {selectedLead.location.city && `${selectedLead.location.city}, `}
                      {selectedLead.location.region && `${selectedLead.location.region}, `}
                      {selectedLead.location.country}
                    </p>
                  </div>
                )}
                
                {selectedLead.ipAddress && (
                  <div>
                    <label className="text-orange-500/60 text-sm">IP Address</label>
                    <p className="text-orange-500">{selectedLead.ipAddress}</p>
                  </div>
                )}
                
                <div>
                  <label className="text-orange-500/60 text-sm">Created</label>
                  <p className="text-orange-500">
                    {new Date(selectedLead.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-orange-500 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-500 rounded-xl p-6 max-w-md w-full border border-white/20"
            >
              <h2 className="text-xl font-bold text-orange-500 mb-4">Confirm Delete</h2>
              <p className="text-orange-500/70 mb-6">
                Are you sure you want to delete this lead? This action cannot be undone.
              </p>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-orange-500 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteTargetId && handleDeleteLead(deleteTargetId)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-500 text-orange-500 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardEnhanced;